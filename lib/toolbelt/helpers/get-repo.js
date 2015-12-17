/*jshint node:true*/
'use strict';
var updatePackage = require('./update-package');
var readPackage = require('./read-package');
var RSVP = require('rsvp');
var Promise = RSVP.Promise;
var validUrl = require('valid-url');

module.exports = function() {
  var pkg = readPackage(this.project.root);
  var firstStep;
  var context = this;

  if (!pkg.repository || (typeof pkg.repository !== 'string' && !pkg.repository.url)) {
    firstStep = promptForRepoName(context)
      .then(function(repositoryLink) {
        updatePackage(context.project.root, {
          repository: repositoryLink
        });
        return repositoryLink;
      });
  } else {
    firstStep = Promise.resolve(pkg.repository.url || pkg.repository);
  }

  return firstStep
    .then(function(link) {
      // https://github.com/runspired/smoke-and-mirrors
      // git@github.com:runspired/smoke-and-mirrors.git
      // https://github.com/runspired/smoke-and-mirrors.git
      var parts = link.split('/');
      var project = parts.pop();
      var org = parts.pop();
      if (project.indexOf('.git') !== -1) {
        project = project.substr(0, project.indexOf('.git'));
      }
      return {
        path: link,
        organization: org,
        project
      };
    });
};


function promptForRepoName(context) {
  var prompt = {
    message: "Your project's package.json file has a missing or empty 'repository'\n" +
    "Please type or paste the link to the repository to continue.",
    type: 'input',
    name: 'repository'
  };

  console.log("\n");
  return context.ui.prompt(prompt)
    .then(function(response) {
      if (!validUrl.isUri(response.repository)) {
        context.ui.writeLine('Your answer does not appear to be a URL');
        return promptForRepoName(context);
      }
      return response.repository;
    });
}
