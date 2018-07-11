const generatorNames = [
  'UniversalComponent',
  'ConnectedComponent'
];
const generators = generatorNames.map(name => {
  return {
    name,
    config: require(`./.plop/${name}/.plop.js`)
  };
});
const partials = require('./.plop/partials.js');

module.exports = function(plop) {
  Object.keys(partials).forEach(partial => {
    const text = partials[partial].call();

    plop.setPartial(partial, text);
  });

  generators.forEach(generator => {
    plop.setGenerator(generator.name, generator.config);
  });
};
