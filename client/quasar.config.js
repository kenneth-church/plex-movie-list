/* eslint-env node */

const { configure } = require('quasar/wrappers');

module.exports = configure(function (/* ctx */) {
  return {
    eslint: {
      warnings: true,
      errors: true,
    },
    boot: ['axios'],
    css: ['app.scss'],
    extras: ['roboto-font'],
    build: {
      target: {
        browser: ['es2019', 'edge88', 'firefox78', 'chrome87', 'safari13.1'],
        node: 'node16',
      },
      vueRouterMode: 'hash',
    },
    devServer: {
      server: {
        type: 'http',
      },
      port: 8080,
      open: false,
      allowedHosts: ['*'],
      https: false,
      hmr: {
        clientPort: 443,
      },
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
        },
      },
    },
    framework: {
      plugins: ['LoadingBar'],
      config: {
        dark: true,
      },
      iconSet: 'svg-mdi-v7',
    },
    pwa: {
      workboxMode: 'generateSW',
      injectPwaMetaTags: true,
      swFilename: 'sw.js',
      manifestFilename: 'manifest.json',
      useCredentialsForManifestTag: false,
    },
  };
});
