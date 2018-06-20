const rules = require('../webpack/_rules');
const shared = require('../webpack/_shared');
const path = require('path');

module.exports = (baseConfig, env, defaultConfig) => {
  defaultConfig.module.rules.push.apply(defaultConfig.module.rules, rules.scripts);

  rules.scss.use.unshift('style-loader');
  defaultConfig.module.rules.push({
    test: /\.s?css$/,
    use: rules.scss.use
  });

  defaultConfig.resolve.alias = Object.assign(defaultConfig.resolve.alias, shared.resolve.alias);
  defaultConfig.resolve.extensions.push('.ts', '.tsx');
  defaultConfig.resolve.modules.push.apply(defaultConfig.resolve.modules, shared.resolve.modules);

  return defaultConfig;
};
