const shared = require('../shared.js');
const prompts = require('../prompts.js');
const fs = require('fs');

const generator = {
  prompts: [
    prompts.componentName,
    prompts.props,
    {
      type: 'confirm',
      name: 'usesTSX',
      message: 'Use TSX?',
      default: true
    },
    {
      type: 'input',
      name: 'groupPath',
      message: 'Group name? (optional)'
    }
  ],
  actions: function(data) {
    let actions = [];

    const destinationPrefix = `src/universal/dumb/${data.groupPath && data.groupPath + '/'}{{pascalCase name}}`;
    const addFactory = shared.makeAddFactory(__dirname, destinationPrefix);

    if (data.groupPath) {
      const indexFilePath = `src/universal/dumb/${data.groupPath}/index.js`;
      const pathWithoutPlural = data.groupPath.slice(0, -1);
      const newLineText = `export { default as {{pascalCase name}}${pathWithoutPlural} } from './{{pascalCase name}}'\n`

      if (!fs.existsSync(indexFilePath)) {
        actions.push({
          type: 'add',
          path: indexFilePath,
          template: newLineText
        });
      }

      actions.push({
        type: 'modify',
        pattern: /(\.\/\w+';?\n)$/,
        path: indexFilePath,
        template: `$1\r${newLineText}`
      });
    }

    actions.push( addFactory('styles.scss') );

    if (data.usesTSX) {
      actions.push( addFactory('index.tsx') );

    } else {
      actions.push( addFactory('index.js') );
      actions.push( addFactory('index.d.ts') );

    }

    return actions;
  }
};

module.exports = generator;
