import {ServerResponse, IncomingMessage} from "http";
import type {Url} from 'url';
import httpProxy from "http-proxy";

interface CorsAnywhereOptions {
    /**
     * Function that specifies the proxy to use.
     * Default: env checking
     */
    getProxyForUrl: (url: string | Url) => string;

    /**
     * Maximum number of redirects to be followed.
     * Default: 5
     */
    maxRedirects: number;

    /**
     * Requests from these origins will be blocked.
     * Default: []
     */
    originBlacklist: string[];

    /**
     * If non-empty, requests not from an origin in this list will be blocked.
     * Default: []
     */
    originWhitelist: string[];

    /**
     * If non-empty, function would be called with origin URL.
     * To when return on true to no be proxied.
     * Default: none
     */
    checkRateLimit: (origin: string) => boolean;
    
    /**
     * Require headers on incoming requests.
     * Default: []
     */
    requireHeader: string[];

    /**
     * Strip these request headers.
     * Default: []
     */
    removeHeaders: string[];

    /**
     * Set these request headers.
     * Default: {}
     */
    setHeaders: {[header: string]: string};

    /**
     * When specified, an Access-Control-Max-Age header with this value (in seconds) will be added.
     * Default: '0'
     */
    corsMaxAge: number;

    /**
     * Callback that is called when the Response body has been fully received.
     * It gives a decompressed body and origin of url from body.
     * And expects an modified decompressed body back.
     * Default: none
     */
    onReceiveResponseBody: (body: string, origin: string) => string;
}

interface RateLimitOptions {
    /**
     * Amount of request per Defined-Period.
     * Default: 10
     */
    maxRequestsPerPeriod: number;

    /**
     * Define how many minutes each period last.
     * Default: 1
     */
    periodInMinutes: number;

    /**
     * Sites to whitelist.
     * Default: []
     */
    sites: (string|RegExp)[];
}

export declare function createRateLimitChecker(options: Partial<RateLimitOptions>): (host: string) => boolean;

export declare function getHandler(options: Partial<CorsAnywhereOptions>, proxy: httpProxy): (req: IncomingMessage, res: ServerResponse) => void;
