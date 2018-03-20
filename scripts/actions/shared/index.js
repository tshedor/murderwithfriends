export * from './timestamps';

export function removeUndefinedValues(props={}) {
  Object.keys(props).forEach(key => {
    if (typeof props[key] === 'undefined') {
      delete props[key];
    }
  });

  return props;
}

export function cleanCurrency(value) {
  if (!value || value === '') {
    return null;
  }

  return parseFloat( value.replace(/\$/g, '').trim(), 10 );
}
