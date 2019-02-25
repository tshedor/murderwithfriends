const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const dist = path.join(__dirname, '../dist');

const node = {
  dgram: 'empty',
  fs: 'empty',
  net: 'empty',
  tls: 'empty',
  child_process: 'empty'
};

const resolve = {
  extensions: ['.ts', '.tsx', '.js', '.jsx'],
  alias: {
    '+dumb': path.resolve(__dirname, '../src/universal/dumb/'),
    '+root': path.resolve(__dirname, '../src')
  },
  modules: [
    path.resolve(__dirname, '../node_modules'),
    path.resolve(__dirname, '../src')
  ]
};

const plugins = [
  new ExtractTextPlugin({ filename: 'css/[contenthash:8].css', allChunks: false }),
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  new webpack.DefinePlugin({
    'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    'BUILD_ENV': JSON.stringify(process.env.BUILD_ENV || 'development')
  }),
  new CopyWebpackPlugin([
    { from: path.join(__dirname, '../static'), to: `${dist}/static` }
  ]),
  new webpack.optimize.OccurrenceOrderPlugin()
];

const output = {
  path: dist,
  publicPath: '/',
  filename: 'js/[name].[hash:8].js',
  chunkFilename: 'js/[name].[hash:8].chunk.js',
};

module.exports = {
  node,
  resolve,
  plugins,
  output
};
