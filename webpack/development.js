const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const shared = require('./_shared');
const rules = require('./_rules');

const { plugins, node, resolve, output, optimization } = shared;

module.exports = {
  devtool: 'inline-source-map',
  entry: [
    '@babel/polyfill',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './src/application.js',
  ],
  devServer: {
    host: 'localhost',
    port: 8080,
    historyApiFallback: true,
    hot: true
  },
  mode: 'development',
  module: {
    rules: [
      // rules.eslint,
      ...rules.scripts,
      rules.css,
      rules.json,
      rules.assets,
      rules.graphql
    ],
  },
  plugins: [
    ...plugins,
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      inject: 'body',
      template: './index.html'
    }),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  // context: __dirname, // https://stackoverflow.com/a/40439897
  node: Object.assign({
    __dirname: true
  }, node),
  resolve,
  output,
  optimization
};
