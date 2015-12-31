/*jshint node:true*/
"use strict";

var toolbelt = require('../../lib/toolbelt');

module.exports = toolbelt({
  description: '',

  normalizeEntityName: function(name) {
    return name;
  },

  afterInstall: function(options) {
    var _this = this;

    return this.getRepository()
      .then(function(repo) {
        return _this.updateReadMe('Adds `NPM Version` and `Ember Observer` badges', [
          {
            offset: 2,
            lines: [
            '[![npm version](https://badge.fury.io/js/' + repo.project + '.svg)](http://badge.fury.io/js/' + repo.project + ')',
            '[![Ember Observer Score](http://emberobserver.com/badges/' + repo.project + '.svg)](http://emberobserver.com/addons/' + repo.project + ')'
            ]
          }
        ]);
      })
      .then(function() {
        return _this.installToolbelt([
          {
            name: 'Defaults',
            description: "You should always keep this updated.",
            addons: ['ember-cli-release'],
            dependencies: ['ember-cli-babel']
          },
          {
            name: 'Templates',
            description: "Run this if your addon provides .hbs files.",
            dependencies: ['ember-cli-htmlbars']
          },
          {
            name: 'Legacy Polyfills',
            description: "A good addon supports older version of Ember too. These polyfills help you do that.",
            addons: ['ember-getowner-polyfill']
          },
          {
            name: 'Demo App Helpers',
            description: "A good addon has good docs. These help you build those.",
            addons: ['ember-code-snippet']
          }
        ]);
        });
  }
});
