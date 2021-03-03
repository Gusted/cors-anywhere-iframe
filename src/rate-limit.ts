interface RateLimitOptions {
    maxRequestsPerPeriod: number;
    periodInMinutes: number;
    sites: string[];
}

export default function createRateLimitChecker(options: RateLimitOptions) {
    const {maxRequestsPerPeriod, periodInMinutes, sites} = options;
    options = {...{
        maxRequestsPerPeriod: 10,
        periodInMinutes: 1,
        sites: []
    }, ...options};
    const hostPatternRegExps: RegExp[] = [];
    if (sites) {
        sites.forEach((host) => {
            host = host.replace(/[$()*+.?[\\\]^{|}]/g, '\\$&').replace(/-/g, '\\x2d').replace(/\\\*/g, '[\\s\\S]*');
            const regexp = new RegExp(`^${host}(?![A-Za-z0-9])`, 'i');
            hostPatternRegExps.push(regexp);
        });
    }

    const accessedHosts: Map<string, number> = new Map();
    setInterval(() => {
        accessedHosts.clear();
    }, periodInMinutes * 60000);

    const rateLimitMessage = `The number of requests is limited to ${maxRequestsPerPeriod}
    ${periodInMinutes === 1 ? ' per minute' : ' per ' + periodInMinutes + ' minutes'}. 
    Please self-host CORS Anywhere IFrame if you need more quota.`;

    return function checkRateLimit(origin: string) {
        const host = origin.replace(/^[\w\-]+:\/\//i, '');
        if (hostPatternRegExps && hostPatternRegExps.some((hostPattern) => hostPattern.test(host))) {
            return;
        }
        if (!accessedHosts.has(host)) {
            accessedHosts.set(host, 1);
        } else {
            const count = accessedHosts.get(host) + 1;
            if (count > maxRequestsPerPeriod) {
                return rateLimitMessage;
            }
            accessedHosts.set(host, count);
        }
    };
}
