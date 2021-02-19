interface RateLimitOptions {
    maxRequestsPerPeriod: number;
    periodInMinutes: number;
    sites: string[];
}

export default function createRateLimitChecker(options: RateLimitOptions) {
    const {maxRequestsPerPeriod, periodInMinutes, sites} = options;
    if (!options) {
        // No rate limit by default.
        return () => {
            void 0;
        };
    }
    let hostPatternRegExp: RegExp = null;
    if (sites) {
        const hostPatternParts: string[] = [];
        sites.forEach((host) => {
            const startsWithSlash = host.charAt(0) === '/';
            const endsWithSlash = host.slice(-1) === '/';
            if (startsWithSlash || endsWithSlash) {
                if (host.length === 1 || !startsWithSlash || !endsWithSlash) {
                    throw new Error('Invalid RateLimitOptions.');
                }
                host = host.slice(1, -1);
                // Throws if the pattern is invalid.
                new RegExp(host);
            } else {
                // Just escape RegExp characters even though they cannot appear in a host name.
                // The only actual important escape is the dot.
                host = host.replace(/[$()*+.?[\\\]^{|}]/g, '\\$&');
            }
            hostPatternParts.push(host);
        });
        hostPatternRegExp = new RegExp('^(?:' + hostPatternParts.join('|') + ')$', 'i');
    }

    let accessedHosts: {[host: string]: number} = {};
    setInterval(() => {
        accessedHosts = {};
    }, options.periodInMinutes * 60000);

    const rateLimitMessage = `The number of requests is limited to ${maxRequestsPerPeriod}
    ${periodInMinutes === 1 ? ' per minute' : ' per ' + periodInMinutes + ' minutes'}. 
    Please self-host CORS Anywhere IFrame if you need more quota.`;

    return function checkRateLimit(origin: string) {
        const host = origin.replace(/^[\w\-]+:\/\//i, '');
        if (hostPatternRegExp && hostPatternRegExp.test(host)) {
            return;
        }
        let count = accessedHosts[host] || 0;
        ++count;
        if (count > maxRequestsPerPeriod) {
            return rateLimitMessage;
        }
        accessedHosts[host] = count;
    };
}
