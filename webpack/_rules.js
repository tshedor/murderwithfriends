const autoprefixer = require('autoprefixer');
const path = require('path');

const isDev = process.env.NODE_ENV !== 'production';
const rootPath = path.join(__dirname, '../src');

function cleanPath(p) {
  return p.
    replace('styles.css', '').
    replace(`${rootPath}/universal/dumb/`, '').
    replace(`${rootPath}/slices/`, '').
    replace(/\//g, '-').
    replace(/\-$/, '');
}

// https://medium.freecodecamp.org/reducing-css-bundle-size-70-by-cutting-the-class-names-and-using-scope-isolation-625440de600b
const generateScopedName = (context, localIdentName, localName) => {
  const componentName = cleanPath(context.resourcePath);
  const local = cleanPath(localName);

  return `${componentName}__${local}`;
};

const cssNames = isDev ? { getLocalIdent: generateScopedName } : { localIdentName: '[hash:8]' };

const eslint = {
  enforce: 'pre',
  test: /\.(tsx?)|(jsx?)$/,
  exclude: /node_modules/,
  loader: 'eslint-loader'
};

const graphql = {
  test: /\.(graphql|gql)$/,
  exclude: /node_modules/,
  loader: 'graphql-tag/loader'
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
  exclude: /node_modules/,
  loader: 'json-loader'
};

const assets = {
  test: /\.(ico|jpe?g|svg|png|gif|eot|otf|webp|ttf|woff|woff2)(\?.*)?$/,
  loader: 'file-loader',
  query: {
    name: 'assets/[name].[hash:8].[ext]'
  }
};

const css = {
  test: /\.css$/,
  use: [
    'style-loader',
    {
      loader: 'css-loader',
      options: Object.assign({
        modules: true,
        importLoaders: 1,
        minimize: isDev,
        sourceMap: isDev,
        import: true
      }, cssNames)
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
    }
  ]
};

module.exports = {
  eslint,
  scripts,
  json,
  assets,
  css,
  graphql
};
