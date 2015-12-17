/*jshint node:true*/
"use strict";

var toolbelt = require('../../lib/toolbelt');

module.exports = toolbelt({
  description: '',

  afterInstall: function(options) {
    return this.installToolbelt([
      {
        name: '',
        description: "",
        packages: [],
        bowerPackages: [],
        addons: [],
        blueprint: ''
      },
      {
        name: 'Demo App Helpers',
        description: "",
        packages: [],
        bowerPackages: [],
        addons: ['ember-cli-code-snippet'],
        blueprint: ''
      }
      /*
       {
       name: '',
       description: "",
       packages: [],
       bowerPackages: [],
       addons: [],
       blueprint: ''
       }
       */
    ]);
  }
});
