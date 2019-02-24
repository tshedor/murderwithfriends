export function rand(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function conditionalClassName(props={}) {
  const classes = Object.keys(props).filter(klass => props[klass] === true);

  return classes.join(' ');
}
