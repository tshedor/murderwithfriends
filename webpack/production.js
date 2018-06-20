const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const shared = require('./_shared');
const rules = require('./_rules');

const { plugins, node, resolve, output } = shared;

module.exports = {
  entry: [
    '@babel/polyfill',
    './src/application.js',
  ],
  module: {
    rules: [
      ...rules.scripts,
      {
        test: /\.s?css$/,
        use: ExtractTextPlugin.extract(rules.scss)
      },
      rules.json,
      rules.assets
    ],
  },
  plugins: [
    ...plugins,
    new ExtractTextPlugin('css/[contenthash:8].css'),
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
  node
};
