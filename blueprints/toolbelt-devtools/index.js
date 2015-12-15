/*jshint node:true*/
var installToolbelt = require('../../lib/install-toolbelt');

module.exports = {
  description: 'Developer Tools',

  afterInstall: function(options) {
    return installToolbelt([
      {
        name: 'Dependency Management',
        description: 'Allows you to check for outdated, incorrect, and unused dependencies via the `npm-check` command.',
        packages: ['npm-check', 'ember-watson']
      },
      {
        name: 'eslint',
        description: 'Installs and configures eslint rules, auto-generated tests, and pre-commit hooks.',
        packages: ['babel-eslint', 'eslint', 'eslint-config-ember', 'ghooks'],
        addons: ['ember-cli-eslint'],
        blueprint: 'toolbelt-files-eslint'
      },
      {
        name: 'jscs',
        description: 'Installs and configures jscs rules via ember-suave, auto-generated tests, and pre-commit hooks.',
        packages: ['jscs', 'ghooks'],
        addons: ['ember-suave'],
        blueprint: 'toolbelt-files-jscs'
      },
      {
        name: 'Performance Monitoring',
        description: 'Installs and configures jscs rules via ember-suave, auto-generated tests, and pre-commit hooks.',
        packages: ['jscs', 'ghooks'],
        addons: ['ember-perf', 'ember-browser-stats', 'ember-cli-dom-stats', 'ember-cli-remote-inspector']
      }
    ]);
  }
};
