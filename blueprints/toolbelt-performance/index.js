/*jshint node:true*/

var toolbelt = require('../../lib/toolbelt');

module.exports = toolbelt({
  description: 'Installs Addons For Improving the Performance of Your Application',

  afterInstall: function() {
    return this.installToolbelt([
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
});
