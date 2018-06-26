export function stringToUnderscores(str) {
  if (!str) {
    return null;
  }

  return str
    .toLowerCase()
    .replace(/\n/g, '')
    .replace(/\s/g, '_')
    .replace(/"/g, '\"');
}
