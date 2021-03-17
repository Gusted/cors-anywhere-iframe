import {isIPv4, isIPv6} from 'net';
import regexp_tld from './regexp-top-level-domain';
import createRateLimiter from './rate-limit';
import {getProxyForUrl} from './proxy-from-env';
import {URL} from 'url';
import zlib from 'zlib';
import {TextDecoder} from 'util';
import type httpProxy from 'http-proxy';
import type {Url} from 'url';
import type http from 'http';
import type stream from 'stream';
import type {EventEmitter} from 'stream';
import type {OutgoingMessage} from 'http';

type headerType = {[header: string]: any};

declare module 'http' {
    interface corsAnywhereRequestStateOptions {
        location: URL;
        getProxyForUrl: (url: string | Url) => string;
        proxyBaseUrl: string;
        maxRedirects: number;
        redirectCount: number;
        corsMaxAge: number;
        onReceiveResponseBody: (body: string, origin: string) => string;
    }
    interface IncomingMessage {
        corsAnywhereRequestState: Partial<corsAnywhereRequestStateOptions>;
    }
}

interface CorsAnywhereOptions {
    getProxyForUrl: (url: string | Url) => string;
    maxRedirects: number;
    originBlacklist: string[];
    originWhitelist: string[];
    checkRateLimit: (origin: string) => boolean;
    requireHeader: string[];
    removeHeaders: string[];
    setHeaders: headerType;
    corsMaxAge: number;
    onReceiveResponseBody: (body: string, origin: string) => string;
}

/**
 * Check whether the specified hostname is valid.
 */
function isValidHostName(hostname: string): boolean {
    return (
        regexp_tld.test(hostname) ||
        isIPv4(hostname) ||
        isIPv6(hostname)
    );
}

/**
 * Adds CORS headers to the response headers.
 */
function withCORS(headers: http.IncomingHttpHeaders, request: http.IncomingMessage): http.IncomingHttpHeaders {
    if (request.method === 'OPTIONS') {
        const corsMaxAge = request.corsAnywhereRequestState.corsMaxAge;
        if (corsMaxAge) {
            headers['access-control-max-age'] = String(corsMaxAge);
        }
    } else {
        headers['access-control-expose-headers'] = Object.keys(headers).filter((header) =>
            header.match(/^cache-control|content-language|content-length|content-type|expires|last-modified|pragma$/) ? false : header
        ).join(',');
    }
    headers['access-control-allow-origin'] = '*';
    if (request.headers['access-control-request-method']) {
        headers['access-control-allow-methods'] = request.headers['access-control-request-method'];
        delete request.headers['access-control-request-method'];
    }
    if (request.headers['access-control-request-headers']) {
        headers['access-control-allow-headers'] = request.headers['access-control-request-headers'];
        delete request.headers['access-control-request-headers'];
    }
    return headers;
}

/**
 * Performs the actual proxy request.
 */
function proxyRequest(req: http.IncomingMessage, res: http.ServerResponse, proxy: EventEmitter) {
    const location = req.corsAnywhereRequestState.location;
    req.url = location.href;

    const proxyOptions: httpProxy.ServerOptions = {
        changeOrigin: false,
        prependPath: false,
        target: location,
        headers: {
            host: location.host,
        },
        // HACK: Get hold of the proxyReq object, because we need it later.
        // https://github.com/http-party/node-http-proxy/blob/master/lib/http-proxy/passes/web-incoming.js#L170
        buffer: {
            pipe: (proxyReq: OutgoingMessage) => {
                const proxyReqOn = proxyReq.on;
                // Intercepts the handler that connects proxyRes to res.
                // https://github.com/http-party/node-http-proxy/blob/master/lib/http-proxy/passes/web-incoming.js#L172-L191
                proxyReq.on = (eventName: string, listener: (...args: any) => void) => {
                    if (eventName !== 'response') {
                        return proxyReqOn.call(proxyReq, eventName, listener);
                    }
                    return proxyReqOn.call(proxyReq, 'response', (proxyRes: http.IncomingMessage) => {
                        if (onProxyResponse(proxy, proxyReq, proxyRes, req, res)) {
                            try {
                                listener(proxyRes);
                            } catch (err) {
                                // Wrap in try-catch because an error could occur:
                                // "RangeError: Invalid status code: 0"
                                // https://github.com/Rob--W/cors-anywhere/issues/95
                                // https://github.com/nodejitsu/node-http-proxy/issues/1080

                                // Forward error (will ultimately emit the 'error' event on our proxy object):
                                // https://github.com/http-party/node-http-proxy/blob/master/lib/http-proxy/passes/web-incoming.js#L153
                                proxyReq.emit('error', err);
                            }
                        }
                    });
                };
                return req.pipe(proxyReq);
            },
        } as stream.Stream,
    };

    const proxyThroughUrl = req.corsAnywhereRequestState.getProxyForUrl(location.href);
    if (proxyThroughUrl) {
        proxyOptions.target = proxyThroughUrl;
        // If a proxy URL was set, req.url must be an absolute URL. Then the request will not be sent
        // directly to the proxied URL, but through another proxy.
        req.url = location.href;
    }

    // Start proxying the request
    try {
        (proxy as any).web(req, res, proxyOptions);
    } catch (err) {
        proxy.emit('error', err, req, res);
    }
}

type ContentEncoding = 'gzip' | 'deflate' | 'br';
const textDecoder = new TextDecoder();

async function modifyBody(body: Buffer, contentEncoding: ContentEncoding, origin: string, callback: (body: string, origin: string) => string): Promise<Buffer> {
    let rawBody: string;
    // Decompress when needed.
    if (contentEncoding === 'gzip') {
        rawBody = textDecoder.decode(zlib.gunzipSync(body));
    } else if (contentEncoding === 'deflate') {
        rawBody = textDecoder.decode(zlib.inflateSync(body));
    } else if (contentEncoding === 'br') {
        rawBody = textDecoder.decode(zlib.brotliDecompressSync(body));
    } else {
        rawBody = textDecoder.decode(body);
    }
    rawBody = await Promise.resolve(callback(rawBody, origin));
    // Re-Compress when needed.
    if (contentEncoding === 'gzip') {
        body = zlib.gzipSync(rawBody);
    } else if (contentEncoding === 'deflate') {
        body = zlib.deflateSync(rawBody);
    } else if (contentEncoding === 'br') {
        body = zlib.brotliCompressSync(rawBody);
    } else {
        body = Buffer.from(rawBody);
    }
    return body;
}

function onProxyResponse(proxy: EventEmitter, proxyReq: OutgoingMessage, proxyRes: http.IncomingMessage, req: http.IncomingMessage, res: http.ServerResponse) {
    const requestState = req.corsAnywhereRequestState;

    const statusCode = proxyRes.statusCode;

    if (!requestState.redirectCount) {
        res.setHeader('x-request-url', requestState.location.href);
    }
    // Handle redirects
    if (statusCode === 301 || statusCode === 302 || statusCode === 303 || statusCode === 307 || statusCode === 308) {
        let locationHeader = proxyRes.headers.location;
        let parsedLocation: URL;
        if (locationHeader) {
            try {
                locationHeader = new URL(locationHeader, requestState.location.href).href;
            } catch (err) {
                void 0;
            }
            parsedLocation = parseURL(locationHeader);
        }
        if (parsedLocation) {
            if (statusCode === 301 || statusCode === 302 || statusCode === 303) {
                // Exclude 307 & 308, because they are rare, and require preserving the method + request body
                requestState.redirectCount = requestState.redirectCount + 1 || 1;
                if (requestState.redirectCount <= requestState.maxRedirects) {
                    // Handle redirects within the server, because some clients (e.g. Android Stock Browser)
                    // cancel redirects.
                    // Set header for debugging purposes. Do not try to parse it!
                    res.setHeader('X-CORS-Redirect-' + requestState.redirectCount, statusCode + ' ' + locationHeader);

                    req.method = 'GET';
                    req.headers['content-length'] = '0';

                    delete req.headers['content-type'];
                    requestState.location = parsedLocation;
                    req.url = parsedLocation.href;

                    // Remove all listeners (=reset events to initial state)
                    req.removeAllListeners();

                    // Remove the error listener so that the ECONNRESET "error" that
                    // may occur after aborting a request does not propagate to res.
                    // https://github.com/http-party/node-http-proxy/blob/master/lib/http-proxy/passes/web-incoming.js#L153
                    proxyReq.removeAllListeners('error');
                    proxyReq.once('error', () => null);
                    (proxyReq as any).abort();

                    // Initiate a new proxy request.
                    proxyRequest(req, res, proxy);
                    return false;
                }
            }
            proxyRes.headers.location = requestState.proxyBaseUrl + '/' + locationHeader;
        }
    }

    // Remove IFrame deny protection.
    delete proxyRes.headers['x-frame-options'];
    delete proxyRes.headers['x-xss-protection'];
    delete proxyRes.headers['x-content-type-options'];

    // Remove IFrame protection.
    if (proxyRes.headers['content-security-policy']) {
        proxyRes.headers['content-security-policy'] = (proxyRes.headers['content-security-policy'] as string)
            .replace(/frame-ancestors?.+?(?=;|$).?/g, '')
            .replace(/base-uri.+?(?=;)./g, `base-uri ${requestState.location.origin};`)
            .replace(/'self'/g, requestState.location.origin)
            .replace(/script-src([^;]*);/i, `script-src$1 ${requestState.proxyBaseUrl} inline;`);
    }

    proxyRes.headers['x-final-url'] = requestState.location.href;
    withCORS(proxyRes.headers, req);

    const buffers: Buffer[] = [];
    let reason: string;
    let headersSet = false;

    if (requestState.onReceiveResponseBody) {
        const original = patch(res, {
            writeHead(statusCode: number, reasonPhrase: string, headers: headerType) {
                if (typeof reasonPhrase == 'object') {
                    headers = reasonPhrase;
                    reasonPhrase = undefined;
                }

                res.statusCode = statusCode;
                reason = reasonPhrase;

                for (const name in headers) {
                    res.setHeader(name, headers[name]);
                }
                headersSet = true;

                res.writeHead = original.writeHead;
            },
            write(chunk: any) {
                !headersSet && res.writeHead(res.statusCode);
                chunk && buffers.push(Buffer.from(chunk));
            },

            end(chunk: any) {
                !headersSet && res.writeHead(res.statusCode);
                chunk && buffers.push(Buffer.from(chunk));
                const tampered = modifyBody(Buffer.concat(buffers), res.getHeader('content-encoding') as ContentEncoding, requestState.location.origin, requestState.onReceiveResponseBody);
                Promise.resolve(tampered).then((body: Buffer) => {
                    res.write = (original as any).write;
                    res.end = (original as any).end;

                    // Per spec of rfc7230, HTTP(1.1/) Message Syntax and Routing.
                    // The Transfer-Encoding header https://tools.ietf.org/html/rfc7230#section-3.3.1
                    // Which refers to section 4 Transfer Codecs. Whereby chunked refers to 4.1
                    // Specific 4.1.2, https://tools.ietf.org/html/rfc7230#section-4.1.2
                    // "A sender MUST NOT generate a trailer that contains a field necessary
                    // for message framing (e.g., Transfer-Encoding and Content-Length)"
                    // And thus do not set the Content-Length when chucked transfer encoded.
                    if (res.getHeader('transfer-encoding') !== 'chunked') {
                        res.setHeader('Content-Length', Buffer.byteLength(body));
                    } else {
                        res.removeHeader('Content-Length');
                    }
                    res.writeHead(res.statusCode, reason);
                    res.end(body);
                });
            }
        } as typeof res);
    }

    return true;
}


function patch<T>(obj: T, properties: Partial<T>): T {
    const old: T = {} as T;
    for (const name in properties) {
        old[name] = obj[name];
        obj[name] = properties[name];
    }
    return old;
}

function parseURL(req_url: string): URL {
    const match = req_url.match(/^(?:(https?:)?\/\/)?(([^/?]+?)(?::(\d{0,5})(?=[/?]|$))?)([/?][\S\s]*|$)/i);
    //                                ^^^^^^^          ^^^^^^^      ^^^^^^^                ^^^^^^^^^^
    //                              1:protocol       3:hostname   4:port                 5:path + query string
    //                                               ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    //                                               2:host
    if (!match) {
        return null;
    }
    if (!match[1]) {
        if (/^https?:/i.test(req_url)) {
            // The pattern at top could mistakenly parse "http:///" as host="http:" and path=///.
            return null;
        }
        // Scheme is omitted.
        if (req_url.lastIndexOf('//', 0) === -1) {
            // "//" is omitted.
            req_url = '//' + req_url;
        }
        req_url = (match[4] === '443' ? 'https:' : 'http:') + req_url;
    }
    let parsed: URL;
    try {
        parsed = new URL(req_url);
    } catch (err) {
        return null;
    }
    if (!parsed.hostname) {
    // "http://:1/" and "http:/notenoughslashes" could end up here.
        return null;
    }
    return parsed;
}

// Request handler factory
export function getHandler(options: Partial<CorsAnywhereOptions>, proxy: httpProxy) {
    // Default options.
    let corsAnywhere: CorsAnywhereOptions = {
        getProxyForUrl: getProxyForUrl,
        maxRedirects: 5,
        originBlacklist: [],
        originWhitelist: [],
        checkRateLimit: null,
        requireHeader: null,
        removeHeaders: [],
        setHeaders: {},
        corsMaxAge: 0,
        onReceiveResponseBody: null,
    };

    corsAnywhere = {...corsAnywhere, ...options};

    // Convert corsAnywhere.requireHeader to an array of lowercase header names, or null.
    if (corsAnywhere.requireHeader) {
        corsAnywhere.requireHeader = corsAnywhere.requireHeader.map((headerName) => headerName.toLowerCase());
    }

    const hasRequiredHeaders = (headers: http.IncomingHttpHeaders) => {
        return corsAnywhere.requireHeader.length === 0 ? true : corsAnywhere.requireHeader.some((headerName) => headers[headerName]);
    };
    return (req: http.IncomingMessage, res: http.ServerResponse) => {
        req.corsAnywhereRequestState = {
            getProxyForUrl: corsAnywhere.getProxyForUrl,
            maxRedirects: corsAnywhere.maxRedirects,
            corsMaxAge: corsAnywhere.corsMaxAge,
            onReceiveResponseBody: corsAnywhere.onReceiveResponseBody
        };

        const cors_headers = withCORS({}, req);
        if (req.method === 'OPTIONS') {
            // Pre-flight request. Reply successfully:
            res.writeHead(200, cors_headers);
            res.end();
            return;
        }
        req.url = decodeURIComponent(req.url);
        const location = parseURL(req.url);

        if (!location) {
            res.writeHead(404, 'Invalid Usage', cors_headers);
            res.end('Invalid Usage\nRefer to documenation.');
            return;
        }

        if (!/^\/https?:/.test(req.url) && !isValidHostName(location.hostname)) {
            // Don't even try to proxy invalid hosts (such as /favicon.ico, /robots.txt)
            res.writeHead(404, 'Invalid host', cors_headers);
            res.end('Invalid host: ' + location.hostname);
            return;
        }

        if (corsAnywhere.requireHeader && !hasRequiredHeaders(req.headers)) {
            res.writeHead(400, 'Header required', cors_headers);
            res.end('Missing required request header. Must specify one of: ' + corsAnywhere.requireHeader);
            return;
        }

        const origin = req.headers.origin || '';
        if (corsAnywhere.originBlacklist.indexOf(origin) > -1) {
            res.writeHead(403, 'Forbidden', cors_headers);
            res.end('The origin "' + origin + '" was blacklisted by the operator of this proxy.');
            return;
        }

        if (corsAnywhere.originWhitelist.length && corsAnywhere.originWhitelist.indexOf(origin) === -1) {
            res.writeHead(403, 'Forbidden', cors_headers);
            res.end('The origin "' + origin + '" was not whitelisted by the operator of this proxy.');
            return;
        }

        const rateLimitMessage = corsAnywhere.checkRateLimit && corsAnywhere.checkRateLimit(origin);
        if (rateLimitMessage) {
            res.writeHead(429, 'Too Many Requests', cors_headers);
            res.end('The origin "' + origin + '" has sent too many requests.\n' + rateLimitMessage);
            return;
        }

        if (origin && location.href[origin.length] === '/' && location.href.lastIndexOf(origin, 0) === 0) {
            // Send a permanent redirect to offload the server. Badly coded clients should not waste our resources.
            cors_headers['vary'] = 'origin';
            cors_headers['cache-control'] = 'private';
            cors_headers['location'] = location.href;
            res.writeHead(301, 'Please use a direct request', cors_headers);
            res.end();
            return;
        }

        const isRequestedOverHttps = /^\s*https/.test(req['x-forwarded-proto'] as string);
        // Vercel's now server. Starts the real server on another port.
        // Which is the same as req.header.host.
        // So getting the custom header we can get the `real` host.
        const proxyBaseUrl = (isRequestedOverHttps ? 'https://' : 'http://') + (
            req.headers['x-vercel-deployment-url'] ||
            req.headers['x-forwarded-host'] ||
            req.headers.host
        );

        corsAnywhere.removeHeaders.forEach((header) => delete req.headers[header]);
        req.headers = {...req.headers, ...corsAnywhere.setHeaders};

        req.corsAnywhereRequestState.location = location;
        req.corsAnywhereRequestState.proxyBaseUrl = proxyBaseUrl;

        proxyRequest(req, res, proxy);
    };
}

export const createRateLimitChecker = createRateLimiter;
