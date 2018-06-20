const path = require('path');
const webpack = require('webpack');

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
    '@components': path.resolve(__dirname, '../src/universal/'),
    '@root': path.resolve(__dirname, '../src')
  },
  modules: [
    path.resolve(__dirname, '../node_modules'),
    path.resolve(__dirname, '../src')
  ]
};

const plugins = [
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  new webpack.DefinePlugin({
    'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
  }),
  new webpack.optimize.OccurrenceOrderPlugin(),
];

const output = {
  path: path.join(__dirname, '../dist'),
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
