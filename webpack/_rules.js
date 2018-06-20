const autoprefixer = require('autoprefixer');
const path = require('path');

const isDev = process.env.NODE_ENV !== 'production';

const eslint = {
  enforce: 'pre',
  test: /\.(tsx?)|(jsx?)$/,
  exclude: /node_modules/,
  loader: 'eslint-loader'
};

const scripts = [
  {
    test: /\.jsx?$/,
    exclude: [/node_modules/, /stories\.(jsx?|tsx?)$/],
    loader: 'babel-loader'
  },
  {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    loaders: [ 'babel-loader', 'ts-loader' ]
  },
];

const json = {
  test: /\.json$/,
  loader: 'json-loader'
};

const assets = {
  test: /\.(jpe?g|png|gif|woff2?|eot|ttf|svg)$/,
  loader: 'file-loader',
  options: {
    outputPath: 'assets/'
  }
};

const scss = {
  fallback: 'style-loader',
  use: [
    {
      loader: 'css-loader',
      options: {
        modules: true,
        sourceMap: isDev,
        localIdentName: '[name]__[hash:base64:5]'
      }
    },
    {
      loader: "postcss-loader",
      options: {
        plugins: () => [
          autoprefixer({
            browsers: [
              '>1%',
              'last 2 versions',
              'not ie < 10', // React doesn't support IE8 anyway
            ],
            flexbox: 'no-2009',
          })
        ],
        sourceMap: isDev
      }
    },
    {
      loader: "sass-loader",
      options: {
        sourceMap: isDev,
        includePaths: [ path.join(__dirname, '../styles') ]
      }
    }
  ]
};

module.exports = {
  eslint,
  scripts,
  json,
  assets,
  scss
};
