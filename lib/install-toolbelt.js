/* global require, module */
var RSVP = require('RSVP');
var runCommand = require('./run-command');

function extend(obj, src) {
  Object.keys(src).forEach(function(key) { obj[key] = src[key]; });
  return obj;
}
var defaultPrompt = {
  type: 'confirm',
  name: 'answer',
  choices: [
    { key: 'y', name: 'Yes', value: 'yes' },
    { key: 'n', name: 'No', value: 'no' }
  ]
};

module.exports = function(toolbelt) {
  var installTargets = {
    packages: [],
    addons: [],
    blueprints: [],
    bowerPackages: []
  };
  return toolbelt.reduce(promptUserForPackage.bind(this, installTargets), RSVP.resolve())
    .then(installTools.bind(this, installTargets))
    .then(toolbeltSuccess.bind(this));
};

function installTools(installTargets) {
  installTargets.packages = installTargets.packages.map(function(packageName) {
    return { name: packageName, version: '*' };
  });
  installTargets.addons = installTargets.addons.map(function(addonName) {
    return { name: addonName, version: '*' };
  });
  return this.addPackagesToProject(installTargets.packages)
    .then(function() {
      this.addAddonsToProject({ packages: installTargets.addons }); }.bind(this))
    .then(function() {
      this.addBowerPackagesToProject(installTargets.bowerPackages); }.bind(this))
    .then(function() {
      var promises = [];
      installTargets.blueprints.forEach(function(blueprint) {
        promises.push(runCommand('ember g ' + blueprint));
      });
      return RSVP.allSettled(promises);
    }.bind(this));
}

function promptUserForPackage(installTargets, prev, tool, index) {
  return prev
    .then(promptUser.bind(this, tool))
    .then(handlePrompt.bind(this, tool, installTargets));
}

function promptUser(tool) {
  var prompt = extend({
    message: "Do you want to install tooling for: " + tool.name + "?\n" +
      tool.description +
      (tool.addons ? "\nInstalls Addons: " + tool.addons.join(', ') : '') +
      (tool.packages ? "\nInstalls Packages: " + tool.packages.join(', ') : '') +
      (tool.bowerPackages ? "\nInstalls Bower Packages: " + tool.bowerPackages.join(', ') : '') +
      (tool.blueprint ? "\nRuns Blueprint: " + tool.blueprint : '') + "\n"
  }, defaultPrompt);

  console.log("\n");
  return this.ui.prompt(prompt);
}

function handlePrompt(tool, installTargets, response) {
  if (response.answer) { // User answered yes to the question
    if (tool.packages) {
      Array.prototype.push.apply(installTargets.packages, tool.packages);
    }
    if (tool.addons) {
      Array.prototype.push.apply(installTargets.addons, tool.addons);
    }
    if (tool.bowerPackages) {
      Array.prototype.push.apply(installTargets.bowerPackages, tool.bowerPackages);
    }
    if (tool.blueprint) {
      installTargets.blueprints.push(tool.blueprint);
    }
  }
}

function toolbeltSuccess() {
  this.ui.writeLine("\n\nYou Installed The " + this.name  + " Toolbelt.\nDescription: " + this.description + "\n\n");
}
