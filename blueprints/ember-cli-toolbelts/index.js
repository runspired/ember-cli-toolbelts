/*jshint node:true*/
"use strict";

var toolbelt = require('../../lib/toolbelt');

module.exports = toolbelt({
  description: 'Toolbelts to help you manage and scaffold your apps and addons faster.',

  afterInstall: function() {
    this.installToolbelt([
       {
         name: 'Devtools',
         description: "Helps you develop smarter, and with quality.",
         blueprint: 'toolbelt-devtools'
       },
      {
        name: 'Addon Dev',
        description: "Makes building and maintaining addons easier.",
        blueprint: 'toolbelt-addon-dev'
      },
      {
        name: 'Travis',
        description: "Configure your app or addon for TravisCI",
        blueprint: 'toolbelt-travis'
      },
      {
        name: 'Update Ember',
        description: "Keep your Ember, Ember-CLI, Ember-Data, and QUnit dependencies updated.",
        blueprint: 'toolbelt-update-ember'
      },
      {
        name: 'Mobile',
        description: "Helps prepare you for mobile development.",
        blueprint: 'toolbelt-mobile'
      },
      {
        name: 'Performance',
        description: "Toolbelt that helps prepare you for mobile development.",
        blueprint: 'toolbelt-mobile'
      }
    ]);
  }
});
