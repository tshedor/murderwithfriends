const HtmlWebpackPlugin = require('html-webpack-plugin');

const shared = require('./_shared');
const rules = require('./_rules');

const { plugins, node, resolve, output, optimization } = shared;

module.exports = {
  entry: [
    '@babel/polyfill',
    './src/application.js',
  ],
  mode: 'production',
  module: {
    rules: [
      ...rules.scripts,
      rules.css,
      rules.json,
      rules.assets,
      rules.graphql
    ],
  },
  plugins: [
    ...plugins,
    new HtmlWebpackPlugin({
      inject: 'body',
      template: './index.html',
      minify: {
        removeComments: false,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    })
  ],
  resolve,
  output,
  optimization
};
