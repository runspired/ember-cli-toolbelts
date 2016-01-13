/*jshint node:true*/
var RSVP = require('rsvp');

var toolbelt = require('../../lib/toolbelt');

module.exports = toolbelt({
  description: 'Keeps Circle and PhantomJS Happy',

  normalizeEntityName: function() {
    return 'toolbelt-circle';
  },

  afterInstall: function() {
    return this.getRepository()
      .then(function(project) {
        var promises = [];

        promises.push(
          this.updateOptions({
            babel: {
              includePolyfill: true
            }
          }));

        promises.push(
          this.updatePackage({
            "engines": {
              "node": ">= 4.1.1"
            }
          }));

        promises.push(
          this.ui.prompt([{
              message: "Please enter a circle-ci API token.",
              type: 'input',
              name: 'token'
            }])
            .then(function(response) {
              this.updateReadMe('Adds Circle `Build Status` badges', [
                {
                  offset: 2,
                  lines: [
                    makeBadge(project, 'Master', response.token),
                    makeBadge(project, null, response.token)
                  ]
                }
              ]);
            }.bind(this))
          );

        return RSVP.allSettled(promises);
      }.bind(this));
  }

});


function makeBadge(project, branch, token) {
  var trimBranch = branch ? branch.toLowerCase().trim() : '';
  var badgeUrl = makeBadgeUrl(project, trimBranch, token);
  var circleUrl = makeCircleUrl(project);

  return (branch || 'Default') + ' [![Build Status](' + badgeUrl + ')](' + circleUrl + ')';
}

// https://circleci.com/gh/:owner/:repo.svg?style=shield&circle-token=:circle-token
// https://circleci.com/gh/:owner/:repo/tree/:branch.png?style=shield&circle-token=:circle-token
function makeBadgeUrl(project, branch, token) {
  var root = 'https://circleci.com/gh';
  var branchPath = branch ? branch + '.png?' : '.svg?';
  var tokenPath = 'style=shield&circle-token=' + token;
  return [root, project.organization, project.project, branchPath + tokenPath].join('/');
}

function makeCircleUrl(project) {
  return 'https://circleci.com/gh/' + project.organization + '/' + project.project;
}

