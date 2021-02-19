interface CorsAnywhereOptions {
    getProxyForUrl: (url: string | URL) => string;
    maxRedirects: number;
    originBlacklist: string[];
    originWhitelist: string[];
    checkRateLimit: (origin: string) => boolean;
    redirectSameOrigin: boolean;
    requireHeader: string[];
    removeHeaders: string[];
    setHeaders: {[header: string]: string};
    corsMaxAge: string;
    helpFile: string;
    httpsOptions: https.ServerOptions;
    httpProxyOptions: {[option: string]: any};
}

export declare function createServer(options: CorsAnywhereOptions): void;
