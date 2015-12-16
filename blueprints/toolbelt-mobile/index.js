/*jshint node:true*/
var installToolbelt = require('../../lib/install-toolbelt');

module.exports = {
  description: 'Installs Addons For Mobile Support',

  normalizeEntityName: function() {},

  afterInstall: function(options) {
    return installToolbelt.bind(this)([
      {
        name: 'Touch Input',
        description: "nuh, nuh, nuh, nuh",
        addons: [
          'ember-gestures'
        ],
        bowerPackages: [
          'hammer-time',
          'hammerjs'
        ]
      }
    ]);
  }
};
