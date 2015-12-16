/*jshint node:true*/
var updatePackage = require('../../lib/update-package');
var updateReadMe = require('../../lib/update-readme');
var updateOptions = require('../../lib/update-options');
var getRepo = require('../../lib/get-repo');
var RSVP = require('rsvp');

module.exports = {
  description: 'Keeps Travis and PhantomJS Happy',

  normalizeEntityName: function() {},

  afterInstall: function() {
    return getRepo(this).then(function(repo) {
      var promises = [];
      var repoPath = repo.org + '/' + repo.project;
      var root = this.project.root;

      promises.push(
        updateOptions(root, {
          babel: {
            includePolyfill: true
          }
        }));

      promises.push(
        updatePackage(root, {
          "engines": {
            "node": ">= 4.1.1"
          }
        }));

      promises.push(
        updateReadMe(root, [
          {
            offset: 2,
            lines: [
              '[![Build Status](https://travis-ci.org/' + repoPath + '.svg)](https://travis-ci.org/' + repoPath + ')',
              ''
            ]
          }
        ]));

      return RSVP.allSettled(promises);

    }.bind(this));
  }

};


