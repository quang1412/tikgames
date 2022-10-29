// const { createProxyMiddleware } = require("http-proxy-middleware")

// // This proxy redirects requests to /api endpoints to
// // the Express server running on port 3001 when we're
// // in `NODE_ENV=development` mode.
// module.exports = function (app) {
//   app.use(
//     "/api",
//     createProxyMiddleware({
//       target: "http://localhost:3001",
//     })
//   )
//   app.use(
//     "/socket",
//     createProxyMiddleware({
//       target: "http://localhost:3001",
//       ws: true,
//       // changeOrigin: true,
//       // pathRewrite: { "^/socket": "/sockjs-node" },
//     })
//   )
// }

const { createProxyMiddleware } = require("http-proxy-middleware")

module.exports = function (app) {
  const apiRequest = createProxyMiddleware("/api", {
    target: "http://localhost:8081",
    changeOrigin: true,
  })

  const socketProxy = createProxyMiddleware("/socket", {
    target: "http://localhost:8081",
    changeOrigin: true,
    ws: true,
    // logLevel: 'debug',
  })

  app.use(apiRequest)
  app.use(socketProxy)
}
