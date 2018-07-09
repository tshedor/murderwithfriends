const shared = require('../shared.js');
const prompts = require('../prompts.js');

const generator = {
  prompts: [
    prompts.sliceName
  ],
  actions: function(data) {
    let actions = [];
    const destinationPrefix = `src/slices/{{pascalCase slice}}`
    const addFactory = shared.makeAddFactory(__dirname, destinationPrefix);

    actions.push( addFactory('index.js') );
    actions.push( addFactory('presenter.tsx') );

    return actions;
  }
};

module.exports = generator;
