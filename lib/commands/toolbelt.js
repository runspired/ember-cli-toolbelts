/*jshint node:true*/
'use strict';

var runCommand = require('../tasks/run-command');

module.exports = {
  name: 'toolbelt',
  aliases: ['tool', 't'],
  description: 'Shorthand to run the associated toolbelt-<name> blueprint.',
  works: 'insideProject',

  availableOptions: [],

  anonymousOptions: [
    '<toolbelt>'
  ],

  run: function(options, rawArgs) {
    return runCommand('ember g toolbelt-' + rawArgs[0]);
  }
};
