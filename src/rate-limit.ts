
export default function createRateLimitChecker(CORSANYWHERE_RATELIMIT) {
    // Configure rate limit. The following format is accepted for CORSANYWHERE_RATELIMIT:
    // <max requests per period> <period in minutes> <non-ratelimited hosts>
    // where <non-ratelimited hosts> is a space-separated list of strings or regexes (/.../) that
    // matches the whole host (ports have to be listed explicitly if applicable).
    // <period in minutes> cannot be zero.
    //
    // Examples:
    // - Allow any origin to make one request per 5 minutes:
    //   1 5
    //
    // - Allow example.com to make an unlimited number of requests, and the others 1 per 5 minutes.
    //   1 5 example.com
    //
    // - Allow example.com, or any subdomain to make any number of requests and block the rest:
    //   0 1 /(.*\.)?example\.com/
    //
    // - Allow example.com and www.example.com, and block the rest:
    //   0 1 example.com www.example.com
    const rateLimitConfig = /^(\d+) (\d+)(?:\s*$|\s+(.+)$)/.exec(CORSANYWHERE_RATELIMIT);
    if (!rateLimitConfig) {
    // No rate limit by default.
        return () => {
            void 0;
        };
    }
    const maxRequestsPerPeriod = parseInt(rateLimitConfig[1]);
    const periodInMinutes = parseInt(rateLimitConfig[2]);
    const unlimitedPattern: string = rateLimitConfig[3]; // Will become a RegExp or void.
    let unlimitedPatternRegExp: RegExp = null;
    if (unlimitedPattern) {
        const unlimitedPatternParts = [];
        unlimitedPattern.trim().split(/\s+/).forEach(function (unlimitedHost, i) {
            const startsWithSlash = unlimitedHost.charAt(0) === '/';
            const endsWithSlash = unlimitedHost.slice(-1) === '/';
            if (startsWithSlash || endsWithSlash) {
                if (unlimitedHost.length === 1 || !startsWithSlash || !endsWithSlash) {
                    throw new Error('Invalid CORSANYWHERE_RATELIMIT. Regex at index ' + i +
              ' must start and end with a slash ("/").');
                }
                unlimitedHost = unlimitedHost.slice(1, -1);
                // Throws if the pattern is invalid.
                new RegExp(unlimitedHost);
            } else {
                // Just escape RegExp characters even though they cannot appear in a host name.
                // The only actual important escape is the dot.
                unlimitedHost = unlimitedHost.replace(/[$()*+.?[\\\]^{|}]/g, '\\$&');
            }
            unlimitedPatternParts.push(unlimitedHost);
        });
        unlimitedPatternRegExp = new RegExp('^(?:' + unlimitedPatternParts.join('|') + ')$', 'i');
    }

    let accessedHosts = Object.create(null);
    setInterval(function () {
        accessedHosts = Object.create(null);
    }, periodInMinutes * 60000);

    const rateLimitMessage = 'The number of requests is limited to ' + maxRequestsPerPeriod +
    (periodInMinutes === 1 ? ' per minute' : ' per ' + periodInMinutes + ' minutes') + '. ' +
    'Please self-host CORS Anywhere if you need more quota. ' +
    'See https://github.com/Rob--W/cors-anywhere#demo-server';

    return function checkRateLimit(origin) {
        const host = origin.replace(/^[\w\-]+:\/\//i, '');
        if (unlimitedPatternRegExp && unlimitedPatternRegExp.test(host)) {
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
