/*jshint node:true*/
'use strict';
var path = require('path');
var jsonFile = require('jsonfile');
var objectAssign = require('object-assign');

module.exports = function (options) {
  var configPath = path.join(this.project.root, 'package.json');
  var opts = this.readPackage(configPath);

  objectAssign(opts, options);

  jsonFile.writeFileSync(configPath, opts, { spaces: 2 });
};
