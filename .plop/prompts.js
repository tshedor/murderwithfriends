const shared = require('./shared.js');

const findPropNameAndValue = /(\w+)\??:\s?([:\w\d\s\(\)=>]+)/;
function splitProps(propsInput) {
  let allProps = propsInput.split(',');

  return allProps.reduce((props, prop) => {
    const propMatches = prop.trim().match(findPropNameAndValue);

    if (propMatches && propMatches.length > 2) {
      props.push( { name: propMatches[1], type: propMatches[2] } );
    }

    return props;
  }, []);
}

const props = {
  type: 'input',
  name: 'props',
  message: 'Prop list (comma separated, i.e. "propName:string, onLoad:(v: string) => void)"',
  validate: shared.notEmpty,
  filter: splitProps
};

const componentName = {
  type: 'input',
  name: 'name',
  message: 'Component title',
  validate: shared.notEmpty
};

const sliceName = {
  type: 'input',
  name: 'slice',
  message: 'Slice name',
  validate: shared.notEmpty,
};

module.exports = {
  props,
  componentName,
  sliceName
};
