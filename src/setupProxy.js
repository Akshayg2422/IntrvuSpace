// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://103.118.188.135:8005', // Your API server URL
            changeOrigin: true,
        })
    );
};
