const types = {
  feature: '<feature>',
  fix: '<fix>',
  chore: '<chore>',
  style: '<style>',
  test: '<test>',
  configure: '<configure>',
};

const allowTypes = [
  types.feature,
  types.fix,
  types.chore,
  types.style,
  types.test,
  types.configure,
];

module.exports = {
  parserPreset: {
    parserOpts: {
      headerPattern: /(<\w*>) (.*)/,
      headerCorrespondence: ['type', 'subject'],
    },
  },
  rules: {
    'type-enum': [2, 'always', allowTypes],
    'type-empty': [2, 'never'],
    'subject-empty': [2, 'never'],
  },
};
