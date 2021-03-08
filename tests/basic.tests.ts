import {createProxyServer} from './utils/http-server';
import request from 'supertest';
import path from 'path';
import type {Server} from 'http';
import mockRequests, {disableMocking} from './utils/mock-requests';
import assert from 'assert';


declare module 'supertest' {
    interface Test {
        expectJSON: (json: any, done?: () => void) => this;
        expectNoHeader: (header: string, done?: () => void) => this;
    }
}

(request as any).Test.prototype.expectJSON = function (json: any, done: () => void) {
    this.expect((res: { text: string }) => {
        // Assume that the response can be parsed as JSON (otherwise it throws).
        const actual = JSON.parse(res.text);
        assert.deepStrictEqual(actual, json);
    });
    return done ? this.end(done) : this;
};

(request as any).Test.prototype.expectNoHeader = function (header: string, done: () => void) {
    this.expect((res: { [header: string]: any }) => {
        if (header.toLowerCase() in res.headers) {
            return new Error('Unexpected header in response: ' + header);
        }
    });
    return done ? this.end(done) : this;
};

const PORT = 3000;

describe('Basic functionality', () => {
    let server: Server;
    let cors_anywhere: {
        close: () => void;
        url: string;
        server: Server;
    };

    beforeAll(() => {
        cors_anywhere = createProxyServer({}, PORT);
        mockRequests();
    });
    afterAll(() => {
        cors_anywhere.close();
        disableMocking();
    });

    it('Declare server variable', () => {
        server = cors_anywhere.server;
    });

    it('GET /', (done) => {
        request(server)
            .get('/')
            .type('text/plain')
            .expect('Access-Control-Allow-Origin', '*')
            .expect(404, 'Invalid Usage\nRefer to documenation.', done);
    });

    it('GET /example.com:65536', (done) => {
        request(server)
            .get('/example.com:65536')
            .expect('Access-Control-Allow-Origin', '*')
            .expect(404, 'Invalid Usage\nRefer to documenation.', done);
    });

    it('GET /favicon.ico', (done) => {
        request(server)
            .get('/favicon.ico')
            .expect('Access-Control-Allow-Origin', '*')
            .expect(404, 'Invalid host: favicon.ico', done);
    });

    it('GET /robots.txt', (done) => {
        request(server)
            .get('/robots.txt')
            .expect('Access-Control-Allow-Origin', '*')
            .expect(404, 'Invalid host: robots.txt', done);
    });

    it('GET /http://robots.flowers should be proxied', (done) => {
        request(server)
            .get('/http://robots.flowers')
            .expect('Access-Control-Allow-Origin', '*')
            .expect(200, 'this is http://robots.flowers', done);
    });

    it('GET /example.com', (done) => {
        request(server)
            .get('/example.com')
            .expect('Access-Control-Allow-Origin', '*')
            .expect(200, 'Response from example.com', done);
    });

    it('GET /example.com:80', (done) => {
        request(server)
            .get('/example.com:80')
            .expect('Access-Control-Allow-Origin', '*')
            .expect(200, 'Response from example.com', done);
    });

    it('GET /example.com:443', (done) => {
        request(server)
            .get('/example.com:443')
            .expect('Access-Control-Allow-Origin', '*')
            .expect(200, 'Response from https://example.com', done);
    });

    it('GET /http:///', (done) => {
    // 'http://:1234' is an invalid URL.
        request(server)
            .get('/http:///')
            .expect('Access-Control-Allow-Origin', '*')
            .expect(404, 'Invalid Usage\nRefer to documenation.', done);
    });

    it('GET /http:/notenoughslashes', (done) => {
    // 'http:/notenoughslashes' is an invalid URL.
        request(server)
            .get('/http:/notenoughslashes')
            .expect('Access-Control-Allow-Origin', '*')
            .expect(404, 'Invalid Usage\nRefer to documenation.', done);
    });


    it('GET ///example.com', (done) => {
    // API base URL (with trailing slash) + '//example.com'
        request(server)
            .get('///example.com')
            .expect('Access-Control-Allow-Origin', '*')
            .expect('x-request-url', 'http://example.com/')
            .expect(200, 'Response from example.com', done);
    });

    it('GET /http://example.com', (done) => {
        request(server)
            .get('/http://example.com')
            .expect('Access-Control-Allow-Origin', '*')
            .expect('x-request-url', 'http://example.com/')
            .expect(200, 'Response from example.com', done);
    });

    it('POST plain text', (done) => {
        request(server)
            .post('/example.com/echopost')
            .send('{"this is a request body & should not be mangled":1.00}')
            .expect('Access-Control-Allow-Origin', '*')
            .expect('{"this is a request body & should not be mangled":1.00}', done);
    });

    it('POST file', (done) => {
        request(server)
            .post('/example.com/echopost')
            .attach('file', path.join(__dirname, 'dummy.txt'))
            .expect('Access-Control-Allow-Origin', '*')
            .expect(/dummy content/g, done);
    });

    it('HEAD with redirect should be followed', (done) => {
    // Redirects are automatically followed, because redirects are to be
    // followed automatically per specification regardless of the HTTP verb.
        request(server)
            .head('/example.com/redirect')
            .redirects(0)
            .expect('Access-Control-Allow-Origin', '*')
            .expect('some-header', 'value')
            .expect('x-request-url', 'http://example.com/redirect')
            .expect('x-cors-redirect-1', '302 http://example.com/redirecttarget')
            .expect('x-final-url', 'http://example.com/redirecttarget')
            .expect('access-control-expose-headers', /some-header,x-final-url/)
            .expectNoHeader('header at redirect')
            .expect(200, undefined, done);
    });

    it('GET with redirect should be followed', (done) => {
        request(server)
            .get('/example.com/redirect')
            .redirects(0)
            .expect('Access-Control-Allow-Origin', '*')
            .expect('some-header', 'value')
            .expect('x-request-url', 'http://example.com/redirect')
            .expect('x-cors-redirect-1', '302 http://example.com/redirecttarget')
            .expect('x-final-url', 'http://example.com/redirecttarget')
            .expect('access-control-expose-headers', /some-header,x-final-url/)
            .expectNoHeader('header at redirect')
            .expect(200, 'redirect target', done);
    });

    it('GET with redirect loop should interrupt', (done) => {
        request(server)
            .get('/example.com/redirectloop')
            .redirects(0)
            .expect('Access-Control-Allow-Origin', '*')
            .expect('x-request-url', 'http://example.com/redirectloop')
            .expect('x-cors-redirect-1', '302 http://example.com/redirectloop')
            .expect('x-cors-redirect-2', '302 http://example.com/redirectloop')
            .expect('x-cors-redirect-3', '302 http://example.com/redirectloop')
            .expect('x-cors-redirect-4', '302 http://example.com/redirectloop')
            .expect('x-cors-redirect-5', '302 http://example.com/redirectloop')
            .expect('Location', /^http:\/\/127.0.0.1:\d+\/http:\/\/example.com\/redirectloop$/)
            .expect(302, 'redirecting ad infinitum...', done);
    });

    it('POST with 302 redirect should be followed', function (done) {
        request(server)
            .post('/example.com/redirectpost')
            .redirects(0)
            .expect('Access-Control-Allow-Origin', '*')
            .expect('x-request-url', 'http://example.com/redirectpost')
            .expect('x-cors-redirect-1', '302 http://example.com/redirectposttarget')
            .expect('x-final-url', 'http://example.com/redirectposttarget')
            .expect('access-control-expose-headers', /x-final-url/)
            .expect(200, 'post target', done);
    });

    it('GET with 302 redirect without Location header should not be followed', function (done) {
    // There is nothing to follow, so let the browser decide what to do with it.
        request(server)
            .get('/example.com/redirectwithoutlocation')
            .redirects(0)
            .expect('Access-Control-Allow-Origin', '*')
            .expect('x-request-url', 'http://example.com/redirectwithoutlocation')
            .expect('x-final-url', 'http://example.com/redirectwithoutlocation')
            .expect('access-control-expose-headers', /x-final-url/)
            .expect(302, 'maybe found', done);
    });

    it('GET with 302 redirect to an invalid Location should not be followed', function (done) {
    // There is nothing to follow, so let the browser decide what to do with it.
        request(server)
            .get('/example.com/redirectinvalidlocation')
            .redirects(0)
            .expect('Access-Control-Allow-Origin', '*')
            .expect('x-request-url', 'http://example.com/redirectinvalidlocation')
            .expect('x-final-url', 'http://example.com/redirectinvalidlocation')
            .expect('access-control-expose-headers', /x-final-url/)
            .expect('Location', 'http:///')
            .expect(302, 'redirecting to junk...', done);
    });

    it('POST with 307 redirect should not be handled', function (done) {
    // Because of implementation difficulties (having to keep the request body
    // in memory), handling HTTP 307/308 redirects is deferred to the requestor.
        request(server)
            .post('/example.com/redirect307')
            .redirects(0)
            .expect('Access-Control-Allow-Origin', '*')
            .expect('x-request-url', 'http://example.com/redirect307')
            .expect('Location', /^http:\/\/127.0.0.1:\d+\/http:\/\/example.com\/redirectposttarget$/)
            .expect('x-final-url', 'http://example.com/redirect307')
            .expect('access-control-expose-headers', /x-final-url/)
            .expect(307, 'redirecting...', done);
    });

    it('OPTIONS /', (done) => {
        request(server)
            .options('/')
            .expect('Access-Control-Allow-Origin', '*')
            .expect(200, '', done);
    });

    it('OPTIONS / with Access-Control-Request-Method / -Headers', (done) => {
        request(server)
            .options('/')
            .set('Access-Control-Request-Method', 'DELETE')
            .set('Access-Control-Request-Headers', 'X-Tralala')
            .expect('Access-Control-Allow-Origin', '*')
            .expect('Access-Control-Allow-Methods', 'DELETE')
            .expect('Access-Control-Allow-Headers', 'X-Tralala')
            .expect(200, '', done);
    });

    it('OPTIONS //bogus', (done) => {
    // The preflight request always succeeds, regardless of whether the request
    // is valid.
        request(server)
            .options('//bogus')
            .expect('Access-Control-Allow-Origin', '*')
            .expect(200, '', done);
    });

    it('X-Forwarded-* headers', (done) => {
        request(server)
            .get('/example.com/echoheaders')
            .set('test-include-xfwd', '')
            .expect('Access-Control-Allow-Origin', '*')
            .expectJSON({
                host: 'example.com',
                'x-forwarded-port': String(PORT),
                'x-forwarded-proto': 'http',
            }, done);
    });

    it('X-Forwarded-* headers (non-standard port)', (done) => {
        request(server)
            .get('/example.com:1337/echoheaders')
            .set('test-include-xfwd', '')
            .expect('Access-Control-Allow-Origin', '*')
            .expectJSON({
                host: 'example.com:1337',
                'x-forwarded-port': String(PORT),
                'x-forwarded-proto': 'http',
            }, done);
    });

    it('X-Forwarded-* headers (https)', (done) => {
        request(server)
            .get('/https://example.com/echoheaders')
            .set('test-include-xfwd', '')
            .expect('Access-Control-Allow-Origin', '*')
            .expectJSON({
                host: 'example.com',
                'x-forwarded-port': String(PORT),
                'x-forwarded-proto': 'http',
            }, done);
    });

});
