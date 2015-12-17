/*jshint node:true*/
"use strict";

var toolbelt = require('../../lib/toolbelt');

module.exports = toolbelt({
  description: '',

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
            description: "",
            dependencies: ['ember-cli-babel']
          },
          {
            name: 'Templates',
            description: "",
            dependencies: ['ember-cli-htmlbars']
          },
          {
            name: 'Legacy Polyfills',
            description: "",
            packages: [],
            bowerPackages: [],
            addons: ['ember-getowner-polyfill'],
            blueprint: ''
          },
          {
            name: 'Demo App Helpers',
            description: "",
            packages: [],
            bowerPackages: [],
            addons: ['ember-code-snippet'],
            blueprint: ''
          }
        ]);
        });
  }
});
