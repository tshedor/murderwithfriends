const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const shared = require('./_shared');
const rules = require('./_rules');

const { plugins, node, resolve, output } = shared;

module.exports = {
  devtool: 'inline-source-map',
  entry: [
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
  module: {
    rules: [
      // rules.eslint,
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
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('css/[contenthash:8].css'),
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
  output
};
