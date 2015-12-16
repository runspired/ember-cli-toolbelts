/* jshint node: true */
'use strict';
var fs = require('fs');
var path = require('path');
var jsonFile = require('jsonfile');

module.exports = {
  name: 'ember-cli-toolbelts',

  config: function () {
    var configPath = path.join(this.root, 'config', 'ember-cli-toolbelts.json');

    if (fs.existsSync(configPath)) {
      return jsonFile.readFileSync(configPath);
    }
  }

};
