import {createProxyServer} from './utils/http-server';
import request from 'supertest';
import type {Server} from 'http';

let cors_anywhere: {
    close: () => void;
    url: string;
    server: Server;
};
beforeAll(() => {
    cors_anywhere = createProxyServer({}, 3000);
});
afterAll(() => {
    cors_anywhere.close();
});

describe('Basic functionality', () => {

    it('GET /', (done) => {
        request(cors_anywhere.server)
            .get('/')
            .type('text/plain')
            .expect('Access-Control-Allow-Origin', '*')
            .expect(404, 'Invalid Usage\nRefer to documenation.', done);
    });

});
