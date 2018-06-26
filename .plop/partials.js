function propDeconstruction() {
  return `const { {{~#each props}}
  {{this.name}}
    {{~#unless @last}},{{/unless}}
  {{~/each}},
  ...res
} = this.props;`
}

function propInterfaceList() {
  return `{{#each props}}
{{this.name}}: {{this.type}}
{{/each}}`
}

module.exports = {
  propDeconstruction,
  propInterfaceList
};
