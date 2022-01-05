// This file was added by layer0 init.
// You should commit this file to source control.

const { Router } = require('@layer0/core/router')
const { nuxtRoutes } = require('@layer0/nuxt')

module.exports = new Router()
  .match('/service-worker.js', ({ serviceWorker }) => {
    serviceWorker('.nuxt/dist/client/service-worker.js')
  })
  .get('/products/:product', ({ serveStatic, cache, renderWithApp }) => {
    cache({
      edge: {
        maxAgeSeconds: 60,
        staleWhileRevalidateSeconds: 1,
      },
      browser: false,
    })
    serveStatic('dist/products/:product/index.html', {
      onNotFound: () => renderWithApp(),
    })
  })
  .use(nuxtRoutes)
