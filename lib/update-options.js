/*jshint node:true*/
'use strict';

var path = require('path');
var fs = require('fs');
var jsonFile = require('jsonfile');
var objectAssign = require('object-assign');

module.exports = function (root, options) {
  var configPath = path.join(root, 'config', 'ember-cli-toolbelts.json');
  var opts;

  if (fs.existsSync(configPath)) {
    opts = jsonFile.readFileSync(configPath);
  } else {
    opts = {};
  }

  objectAssign(opts, options);

  jsonFile.writeFileSync(configPath, opts, { spaces: 2 });
};
