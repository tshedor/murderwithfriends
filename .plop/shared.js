function notEmpty(value) {
  if (value && value.length !== 0) {
    return true;
  }

  return `Input can't be blank`;
}

const makeAddFactory = (srcPrefix, destinationPrefix) => filename => {
  return {
    type: 'add',
    path: `${destinationPrefix}/${filename}`,
    templateFile: `${srcPrefix}/${filename}`
  };
}

module.exports = {
  notEmpty,
  makeAddFactory
};
