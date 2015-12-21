/*jshint node:true*/
var RSVP = require('rsvp');

var toolbelt = require('../../lib/toolbelt');

module.exports = toolbelt({
  description: 'Keeps Circle and PhantomJS Happy',

  afterInstall: function() {
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

    return RSVP.allSettled(promises);
  }

});


