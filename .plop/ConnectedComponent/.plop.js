const shared = require('../shared.js');
const prompts = require('../prompts.js');

const generator = {
  prompts: [
    prompts.componentName,
    prompts.sliceName,
    prompts.props
  ],
  actions: function(data) {
    let actions = [];
    const destinationPrefix = `src/slices/{{pascalCase slice}}/_components/{{pascalCase name}}`
    const addFactory = shared.makeAddFactory(__dirname, destinationPrefix);

    actions.push( addFactory('styles.scss') );
    actions.push( addFactory('index.js') );
    actions.push( addFactory('presenter.tsx') );
    actions.push( addFactory('remote.graphql') );

    return actions;
  }
};

module.exports = generator;
