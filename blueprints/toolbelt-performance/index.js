/*jshint node:true*/
var installToolbelt = require('../../lib/install-toolbelt');

module.exports = {
  description: 'Installs Addons For Improving the Performance of Your Application',

  normalizeEntityName: function() {},

  afterInstall: function(options) {
    return installToolbelt.bind(this)([
      {
        name: 'Performance',
        description: "All the Frames",
        addons: [
          'ember-run-raf',
          'smoke-and-mirrors',
          'ember-prefetch',
          // 'skyrocket',
          'ember-async-image'
        ]
      }
    ]);
  }
};
