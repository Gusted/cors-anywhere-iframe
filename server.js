const port = '8080';
const host = '0.0.0.0';
const cors_proxy = require('./cors-anywhere-iframe');
const http = require('http');
const httpProxy = require('http-proxy');

http.createServer(cors_proxy.getHandler({}, httpProxy.createServer())).listen(port, host, ()  => {
  console.log('Running CORS Anywhere on ' + host + ':' + port);
});
