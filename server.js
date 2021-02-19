const port = '8080';
const host = '0.0.0.0';
const cors_proxy = require('./cors-anywhere-iframe');

cors_proxy.createServer({
  httpProxyOptions: {
    xfwd: false,
  },
}).listen(port, host, function() {
  console.log('Running CORS Anywhere on ' + host + ':' + port);
});
