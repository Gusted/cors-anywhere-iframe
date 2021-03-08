import {createProxyServer} from './utils/http-server';
import request from 'supertest';
import type {Server} from 'http';
import mockRequests, {disableMocking} from './utils/mock-requests';

describe('Basic functionality', () => {
    let server: Server;

    let cors_anywhere: {
        close: () => void;
        url: string;
        server: Server;
    };
    beforeAll(() => {
        cors_anywhere = createProxyServer({}, 3000);
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
        request(cors_anywhere.server)
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

});
