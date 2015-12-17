/*jshint node:true*/
var toolbelt = require('../../lib/toolbelt');

module.exports = toolbelt({
  description: 'Installs Addons For Mobile Support',

  afterInstall: function(options) {
    return this.installToolbelt([
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
});
