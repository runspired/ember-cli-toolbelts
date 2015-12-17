/* jshint node: true */
'use strict';
var fs = require('fs');
var path = require('path');
var jsonFile = require('jsonfile');
var commands = require('./lib/commands');

module.exports = {
  name: 'ember-cli-toolbelts',

  isDevelopingAddon: function() {
    return false;
  },

  config: function () {
    var configPath = path.join(this.root, 'config', 'ember-cli-toolbelts.json');

    if (fs.existsSync(configPath)) {
      return jsonFile.readFileSync(configPath);
    }
  },

  includedCommands: function () {
    return commands;
  }

};
