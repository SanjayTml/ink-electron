const withCSS = require('@zeit/next-css');

module.exports = withCSS({
  // for `@zeit/next-css` (https://github.com/zeit/next-plugins/issues/266#issuecomment-474721942)
  cssLoaderOptions: {
    url: false,
  },

  webpack: config =>
    Object.assign(config, {
      target: 'electron-renderer',
    }),
});
