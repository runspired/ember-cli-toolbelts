/*jshint node:true*/
"use strict";

var toolbelt = require('../../lib/toolbelt');

module.exports = toolbelt({
  description: 'Installs addons for animation and transitions.',

  afterInstall: function(options) {
    return this.installToolbelt([
      {
        name: 'Liquid-Fire',
        description: "Installs liquid-fire and recommended liquid-fire addons",
        addons: [
          'liquid-fire',
          'liquid-fire-tweenlite',
          'liquid-fire-hooks'
        ]
      },
      {
        name: 'Liquid-Tether',
        description: "Installs liquid-tether for animating modals, dropdowns, and popovers",
        addons: [
          'liquid-tether'
        ]
      }
    ]);
  }
});
