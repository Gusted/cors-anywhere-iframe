interface RateLimitOptions {
    maxRequestsPerPeriod: number;
    periodInMinutes: number;
    sites: Array<string|RegExp>;
}

export default function createRateLimitChecker(options?: Partial<RateLimitOptions>) {
    options = {...{
        maxRequestsPerPeriod: 10,
        periodInMinutes: 1,
        sites: []
    }, ...options};
    const {sites, periodInMinutes, maxRequestsPerPeriod} = options;
    const hostPatternRegExps: RegExp[] = [];
    if (sites && sites.length > 0) {
        sites.forEach((host: string | RegExp) => {
            if (typeof host === 'string') {
                host = host.replace(/[$()*+.?[\\\]^{|}]/g, '\\$&').replace(/-/g, '\\x2d').replace(/\\\*/g, '[\\s\\S]*');
                hostPatternRegExps.push(new RegExp(`^${host}(?![A-Za-z0-9.])`, 'i'));
            } else {
                hostPatternRegExps.push(new RegExp(`^${host.source}(?![A-Za-z0-9.])`, 'i'));
            }
        });
    }

    const accessedHosts: Map<string, number> = new Map();
    setInterval(() => {
        accessedHosts.clear();
    }, periodInMinutes * 60000);

    const rateLimitMessage = `The number of requests is limited to ${maxRequestsPerPeriod}${periodInMinutes === 1 ? ' per minute' : ' per ' + periodInMinutes + ' minutes'}. Please self-host CORS Anywhere IFrame if you need more quota.`;

    return function checkRateLimit(origin: string) {
        const host = origin.replace(/^[\w\-]+:\/\//i, '');
        if (hostPatternRegExps && hostPatternRegExps.some((hostPattern) => hostPattern.test(host))) {
            return;
        }
        if (!accessedHosts.has(host)) {
            accessedHosts.set(host, 1);
            if (maxRequestsPerPeriod < 1) {
                return rateLimitMessage;
            }
        } else {
            const count = (accessedHosts.get(host) + 1);
            if (count > maxRequestsPerPeriod) {
                return rateLimitMessage;
            }
            accessedHosts.set(host, count);
        }
    };
}
