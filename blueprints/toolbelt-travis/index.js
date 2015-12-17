/*jshint node:true*/
var RSVP = require('rsvp');

var toolbelt = require('../../lib/toolbelt');

module.exports = toolbelt({
  description: 'Keeps Travis and PhantomJS Happy',

  afterInstall: function() {
    return this.getRepository()
      .then(function(repo) {
        var promises = [];
        var repoPath = repo.org + '/' + repo.project;

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
          this.updateReadMe([
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

});


