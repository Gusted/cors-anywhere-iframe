import createRateLimitChecker from '../../src/rate-limit';
import fakeTimer from '@sinonjs/fake-timers';
import assert from 'assert';

function assertNotLimited(rateLimitReturnValue: string) {
    if (rateLimitReturnValue) {
        assert.fail(`Expected no limit, but got "${rateLimitReturnValue}"`);
    }
}

function assertLimited(rateLimitReturnValue: string, limit: string | number, period: string | number) {
    let msg: string;
    msg = period === 1 ? `The number of requests is limited to ${limit} per minute.` : `The number of requests is limited to ${limit} per ${period} minutes.`;
    msg += ' Please self-host CORS Anywhere IFrame if you need more quota.';
    assert.deepStrictEqual(rateLimitReturnValue, msg);
}

describe('Rate limit', () => {
    let clock: {
    tick: (seconds: number) => void;
};
    beforeEach(() => {
        clock = fakeTimer.install() as any;
    });
    afterEach(() => {
        (clock as any).uninstall();
    });
    it('is unlimited by default', () => {
        let checkRateLimit = createRateLimitChecker();
        assertNotLimited(checkRateLimit('http://example.com'));
        assertNotLimited(checkRateLimit('https://example.com'));
        assertNotLimited(checkRateLimit('https://example.com:1234'));

        checkRateLimit = createRateLimitChecker();
        assertNotLimited(checkRateLimit('http://example.com'));

        checkRateLimit = createRateLimitChecker();
        assertNotLimited(checkRateLimit('http://example.com'));
    });

    it('zero per minute / 5 minutes', () => {
        let checkRateLimit = createRateLimitChecker({maxRequestsPerPeriod: 0, periodInMinutes: 1});
        assertLimited(checkRateLimit('http://example.com'), 0, 1);
        assertLimited(checkRateLimit('https://example.com'), 0, 1);

        checkRateLimit = createRateLimitChecker({maxRequestsPerPeriod: 0, periodInMinutes: 5});
        assertLimited(checkRateLimit('http://example.com'), 0, 5);
        assertLimited(checkRateLimit('https://example.com'), 0, 5);
    });

    it('one per minute', () => {
        const checkRateLimit = createRateLimitChecker({maxRequestsPerPeriod: 1, periodInMinutes: 1});
        assertNotLimited(checkRateLimit('http://example.com'));
        assertLimited(checkRateLimit('http://example.com'), 1, 1);
        assertNotLimited(checkRateLimit('http://example.com:1234'));
        assertLimited(checkRateLimit('http://example.com:1234'), 1, 1);

        clock.tick(59000);
        assertLimited(checkRateLimit('http://example.com'), 1, 1);

        clock.tick(1000);
        assertNotLimited(checkRateLimit('http://example.com'));
        assertLimited(checkRateLimit('http://example.com'), 1, 1);
        assertNotLimited(checkRateLimit('http://example.com:1234'));
        assertLimited(checkRateLimit('http://example.com:1234'), 1, 1);
    });

    it('different domains, one per minute', () => {
        const checkRateLimit = createRateLimitChecker({maxRequestsPerPeriod: 1, periodInMinutes: 1});
        assertNotLimited(checkRateLimit('http://example.com'));
        assertNotLimited(checkRateLimit('http://example.net'));
        assertNotLimited(checkRateLimit('http://wexample.net'));
        assertNotLimited(checkRateLimit('http://xample.net'));
        assertNotLimited(checkRateLimit('http://www.example.net'));
        assertLimited(checkRateLimit('http://example.com'), 1, 1);
        assertLimited(checkRateLimit('http://example.net'), 1, 1);
        assertLimited(checkRateLimit('http://wexample.net'), 1, 1);
        assertLimited(checkRateLimit('http://xample.net'), 1, 1);
        assertLimited(checkRateLimit('http://www.example.net'), 1, 1);

        clock.tick(60000); // 1 minute
        assertNotLimited(checkRateLimit('http://example.com'));
        assertNotLimited(checkRateLimit('http://example.net'));
        assertNotLimited(checkRateLimit('http://wexample.net'));
        assertNotLimited(checkRateLimit('http://xample.net'));
        assertNotLimited(checkRateLimit('http://www.example.net'));
    });

    it('unlimited domains, string', () => {
        const checkRateLimit = createRateLimitChecker({maxRequestsPerPeriod: 1, periodInMinutes: 2, sites: ['example.com']});
        assertNotLimited(checkRateLimit('http://example.com'));
        assertNotLimited(checkRateLimit('http://example.com'));

        assertNotLimited(checkRateLimit('http://wexample.com'));
        assertNotLimited(checkRateLimit('http://xample.com'));
        assertNotLimited(checkRateLimit('http://www.example.com'));
        assertLimited(checkRateLimit('http://wexample.com'), 1, 2);
        assertLimited(checkRateLimit('http://xample.com'), 1, 2);
        assertLimited(checkRateLimit('http://www.example.com'), 1, 2);
    });

    it('unlimited domains, RegExp', () => {
        const checkRateLimit = createRateLimitChecker({maxRequestsPerPeriod: 1, periodInMinutes: 2, sites: [/example\.com/]});
        assertNotLimited(checkRateLimit('http://example.com'));
        assertNotLimited(checkRateLimit('http://example.com'));

        assertNotLimited(checkRateLimit('http://wexample.com'));
        assertNotLimited(checkRateLimit('http://xample.com'));
        assertNotLimited(checkRateLimit('http://www.example.com'));
        assertLimited(checkRateLimit('http://wexample.com'), 1, 2);
        assertLimited(checkRateLimit('http://xample.com'), 1, 2);
        assertLimited(checkRateLimit('http://www.example.com'), 1, 2);
    });

    it('multiple domains, string', () => {
        const checkRateLimit = createRateLimitChecker({maxRequestsPerPeriod: 1, periodInMinutes: 2, sites: ['a', 'b', 'cc']});
        assertNotLimited(checkRateLimit('http://a'));
        assertNotLimited(checkRateLimit('http://a'));
        assertNotLimited(checkRateLimit('http://b'));
        assertNotLimited(checkRateLimit('http://b'));
        assertNotLimited(checkRateLimit('http://cc'));
        assertNotLimited(checkRateLimit('http://cc'));
        assertNotLimited(checkRateLimit('http://c'));
        assertLimited(checkRateLimit('http://c'), 1, 2);
    });

    it('multiple domains, RegExp', () => {
        const checkRateLimit = createRateLimitChecker({maxRequestsPerPeriod: 1, periodInMinutes: 2, sites: [/a/, /b/, /cc/]});
        assertNotLimited(checkRateLimit('http://a'));
        assertNotLimited(checkRateLimit('http://a'));
        assertNotLimited(checkRateLimit('http://b'));
        assertNotLimited(checkRateLimit('http://b'));
        assertNotLimited(checkRateLimit('http://cc'));
        assertNotLimited(checkRateLimit('http://cc'));
        assertNotLimited(checkRateLimit('http://ccc'));
        assertLimited(checkRateLimit('http://ccc'), 1, 2);
    });

    it('multiple domains, string and RegExp', () => {
        const checkRateLimit = createRateLimitChecker({maxRequestsPerPeriod: 1, periodInMinutes: 2, sites: ['a', /b/]});
        assertNotLimited(checkRateLimit('http://a'));
        assertNotLimited(checkRateLimit('http://a'));
        assertNotLimited(checkRateLimit('http://b'));
        assertNotLimited(checkRateLimit('http://b'));
        assertNotLimited(checkRateLimit('http://ab'));
        assertLimited(checkRateLimit('http://ab'), 1, 2);
    });

    it('multiple domains, RegExp and string', () => {
        const checkRateLimit = createRateLimitChecker({maxRequestsPerPeriod: 1, periodInMinutes: 2, sites: [/a/, 'b']});
        assertNotLimited(checkRateLimit('http://a'));
        assertNotLimited(checkRateLimit('http://a'));
        assertNotLimited(checkRateLimit('http://b'));
        assertNotLimited(checkRateLimit('http://b'));
        assertNotLimited(checkRateLimit('http://ab'));
        assertLimited(checkRateLimit('http://ab'), 1, 2);
    });

    it('wildcard subdomains', () => {
        const checkRateLimit = createRateLimitChecker({maxRequestsPerPeriod: 0, periodInMinutes: 1, sites: [/(.*\.)?example\.com/]});
        assertNotLimited(checkRateLimit('http://example.com'));
        assertNotLimited(checkRateLimit('http://www.example.com'));
        assertLimited(checkRateLimit('http://xexample.com'), 0, 1);
        assertLimited(checkRateLimit('http://example.com.br'), 0, 1);
    });

    it('wildcard ports', () => {
        const checkRateLimit = createRateLimitChecker({maxRequestsPerPeriod: 0, periodInMinutes: 1, sites: [/example\.com(:\d{1,5})?/]});
        assertNotLimited(checkRateLimit('http://example.com'));
        assertNotLimited(checkRateLimit('http://example.com:1234'));
    });

    it('empty host', () => {
        const checkRateLimit = createRateLimitChecker({maxRequestsPerPeriod: 0, periodInMinutes: 1});
        assertLimited(checkRateLimit(''), 0, 1);
        // Empty host actually means empty origin. But let's also test for 'http://'.
        assertLimited(checkRateLimit('http://'), 0, 1);
    });

    it('null origin', () => {
        let checkRateLimit = createRateLimitChecker({maxRequestsPerPeriod: 0, periodInMinutes: 1});
        assertLimited(checkRateLimit('null'), 0, 1);
        assertLimited(checkRateLimit('http://null'), 0, 1);

        checkRateLimit = createRateLimitChecker({maxRequestsPerPeriod: 0, periodInMinutes: 1, sites: ['null']});
        assertNotLimited(checkRateLimit('null'));
        assertNotLimited(checkRateLimit('http://null'));

        checkRateLimit = createRateLimitChecker({maxRequestsPerPeriod: 0, periodInMinutes: 1, sites: [/null/]});
        assertNotLimited(checkRateLimit('null'));
        assertNotLimited(checkRateLimit('http://null'));
    });

    it('case-insensitive', () => {
        let checkRateLimit = createRateLimitChecker({maxRequestsPerPeriod: 0, periodInMinutes: 1, sites: ['NULL']});
        assertNotLimited(checkRateLimit('null'));
        assertNotLimited(checkRateLimit('http://null'));

        checkRateLimit = createRateLimitChecker({maxRequestsPerPeriod: 0, periodInMinutes: 1, sites: [/NULL/]});
        assertNotLimited(checkRateLimit('null'));
        assertNotLimited(checkRateLimit('http://null'));
    });
});
