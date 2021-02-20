import {ServerResponse} from "http";
import httpProxy from "http-proxy";

interface CorsAnywhereOptions {
    /**
     * Function that specifies the proxy to use.
     * Default: npm package proxy-from-env
     */
    getProxyForUrl: (url: string | URL) => string;

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
     * Redirect the client to the requested URL for same-origin requests.
     * Default: false
     */
    redirectSameOrigin: boolean;
    
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
     * When specifief, an Access-Control-Max-Age header with this value (in seconds) will be added.
     * Default: '0'
     */
    corsMaxAge: string;

    /**
     * Absolute path to help.txt
     * Default: workingDir/help.txt
     */
    helpFile: string;
}

interface RateLimitOptions {
    maxRequestsPerPeriod: number;
    periodInMinutes: number;
    sites: string[];
}

export declare function createRateLimitChecker(options: Partial<RateLimitOptions>): (host: string) => boolean;

export declare function getHandler(options: Partial<CorsAnywhereOptions>, proxy: httpProxy): (req: IncomingMessage, res: ServerResponse) => void;
