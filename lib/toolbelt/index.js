/*jshint node:true*/
'use strict';

var updatePackage = require('./helpers/update-package');
var updateReadMe = require('./helpers/update-readme');
var updateOptions = require('./helpers/update-options');
var getRepo = require('./helpers/get-repo');
var installToolbelt = require('./helpers/install-toolbelt');
var chalk = require('chalk');
var runCommand = require('../tasks/run-command');
var RSVP = require('rsvp');
var objectAssign = require('object-assign');

var defaultToolbelt = {

  normalizeEntityName: function() {},

  updatePackage: updatePackage,
  updateReadMe: updateReadMe,
  updateOptions: updateOptions,
  getRepository: getRepo,
  installToolbelt: installToolbelt,

  addDependencyToProject: function(packageName, target) {
    var packageObject = { name: packageName };

    if (target) {
      packageObject.target = target;
    }

    return this.addDependenciesToProject([packageObject]);
  },

  addDependenciesToProject: function(packages) {
    var installText = (packages.length > 1) ? 'install dependencies' : 'install dependency';
    var packageNames = [];
    var packageArray = [];

    for (var i = 0; i < packages.length; i++) {
      packageNames.push(packages[i].name);

      var packageNameAndVersion = packages[i].name;

      if (packages[i].target) {
        packageNameAndVersion += '@' + packages[i].target;
      }

      packageArray.push(packageNameAndVersion);
    }

    this._writeStatusToUI(chalk.green, installText, packageNames.join(', '));

    var promises = packageArray.map(function(name) {
      return runCommand('npm install --save ' + name)();
    });
    return RSVP.allSettled(promises);
  },

  removeDependencyFromProject: function(packageName) {
    var packageObject = { name: packageName };

    return this.removeDependenciesFromProject([packageObject]);
  },

  removeDependenciesFromProject: function(packages) {
    var uninstallText = (packages.length > 1) ? 'uninstall dependencies' : 'uninstall dependency';
    var packageArray = packages.map(function(pkg) { return pkg.name; });

    this._writeStatusToUI(chalk.green, uninstallText, packageArray.join(', '));

    var promises = packageArray.map(function(name) {
      return runCommand('npm uninstall --save ' + name)();
    });
    return RSVP.allSettled(promises);
  }

};

module.exports = function Toolbelt(hash) {
  return objectAssign({}, defaultToolbelt, hash);
};
