/*jshint node:true*/
"use strict";

var toolbelt = require('../../lib/toolbelt');

module.exports = toolbelt({
  description: '',

  afterInstall: function(options) {
    return this.installToolbelt([
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
