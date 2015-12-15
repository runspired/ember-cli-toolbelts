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
  var packages = [];
  var addons = [];
  var blueprints = [];
  return toolbelt.reduce(promptUserForPackage.bind(this, packages, addons, blueprints), RSVP.resolve())
    .then(installTools.bind(this, packages, addons, blueprints))
    .then(toolbeltSuccess.bind(this));
};

function installTools(packages, addons, blueprints) {
  var blueprint = this;
  return this.addPackagesToProject(packages)
    .then(function() {
      blueprint.addAddonsToProject(addons);
    })
    .then(function() {
      var promises = [];
      blueprints.forEach(function(blueprint) {
        promises.push(runCommand('ember g ' + blueprint));
      });
      return RSVP.allSettled(promises);
    });
}

function promptUserForPackage(packages, addons, blueprints, prev, tool, index) {
  return prev
    .then(promptUser.bind(this, tool))
    .then(handlePrompt.bind(this, tool, packages, addons, blueprints));
}

function promptUser(tool) {
  var prompt = extend({
    message: 'Do you want to install tooling for: ' + tool.name + "?\n" +
      tool.description +
      (tool.addons ? "\nInstalls Addons: " + tool.addons.join(', ') : '') +
      (tool.packages ? "\nInstalls Packages: " + tool.packages.join(', ') : '') +
      (tool.blueprint ? "\nRuns Blueprint: " + tool.blueprint : '') + "\n"
  }, defaultPrompt);

  return this.ui.prompt(prompt);
}

function handlePrompt(tool, packages, addons, blueprints, response) {
  if (response.answer) { // User answered yes to the question
    if (tool.packages) {
      packages.push.apply(packages, tool.packages);
    }
    if (tool.addons) {
      addons.push.apply(addons, tool.addons);
    }
    if (tool.blueprint) {
      blueprints.push(tool.blueprint);
    }
  }
}

function toolbeltSuccess() {
  this.ui.writeLine("\n\nYou Installed The " + this.name  + " Toolbelt.\nDescription: " + this.description + "\n\n");
}
