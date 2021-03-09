import {createServer} from 'http';
import {getHandler} from '../../src/cors-anywhere-iframe';
import httpProxy from 'http-proxy';
import type {ServerOptions} from 'http-proxy';
import type {CorsAnywhereOptions} from '../../index';
import type {Server} from 'http';

const proxyServer = httpProxy.createServer();
proxyServer.on('error', (err, _, res) => {
    if (res.headersSent) {
        if (!res.writableEnded) {
            res.end();
        }
        return;
    }
    const headerNames = res.getHeaderNames ? res.getHeaderNames() : Object.keys(res.getHeaders() || {});
    headerNames.forEach((name) => res.removeHeader(name));
    // Use the unfamous teapot HTTP code.
    // To determine the error type inside the test message.
    res.writeHead(418, {'Access-Control-Allow-Origin': '*'});
    res.end('Not found because of proxy error: ' + err);
});


export function createProxyServer(options: Partial<CorsAnywhereOptions>, port: number, proxyOptions?: Partial<ServerOptions>) {
    let server: Server;

    let newProxyServer: httpProxy;
    if (proxyOptions) {
        newProxyServer = httpProxy.createServer(proxyOptions);
        newProxyServer.on('error', (err, _, res) => {
            if (res.headersSent) {
                if (!res.writableEnded) {
                    res.end();
                }
                return;
            }
            const headerNames = res.getHeaderNames ? res.getHeaderNames() : Object.keys(res.getHeaders() || {});
            headerNames.forEach((name) => res.removeHeader(name));
            // Use the unfamous teapot HTTP code.
            // To determine the error type inside the test message.
            res.writeHead(418, {'Access-Control-Allow-Origin': '*'});
            res.end('Not found because of proxy error: ' + err);
        });
    }
    const handler = getHandler(options, newProxyServer || proxyServer);

    function start() {
        if (server) {
            console.warn('Possible memory leak!\nBecause we are overwriting an server that is not closed!');
        }
        server = createServer((req, res) => {
            req.url = req.url.slice(1);
            handler(req, res);
        }).listen(port);

    }

    function close() {
        process.removeAllListeners('exit');
        process.removeAllListeners('SIGINT');
        if (!server) {
            return;
        }
        if (newProxyServer) {
            newProxyServer.removeAllListeners('error');
            newProxyServer.close();
        }
        server.close((err) => {
            if (err) {
                console.error(err);
            }
            server = null;
        });
    }

    process.on('exit', close);
    process.on('SIGINT', close);

    start();

    return {
        close,
        url: `http://0.0.0.0:${port}`,
        server,
    };
}

export function createRawProxyServer() {
    const handler = getHandler({}, proxyServer);
    const server = createServer((req, res) => {
        req.url = req.url.slice(1);
        handler(req, res);
    });
    return server;
}
