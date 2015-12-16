/*jshint node:true*/
"use strict";
// var updatePackage = require('../../lib/update-package');
// var updateReadMe = require('../../lib/update-readme');
// var updateOptions = require('../../lib/update-options');
// var getRepo = require('../../lib/get-repo');
var installToolbelt = require('../../lib/install-toolbelt');

module.exports = {
  description: '',

  normalizeEntityName: function() {},

  afterInstall: function(options) {
    return installToolbelt.bind(this)([
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
};
