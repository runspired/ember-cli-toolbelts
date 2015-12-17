/*jshint node:true*/
'use strict';

var Promise  = require('RSVP').Promise;
var spawn = require('child_process').spawn;
var chalk    = require('chalk');
var defaults = require('lodash').defaults;

module.exports = function runCommand(command, options) {
  if(!options) {
    options = {};
  }

  return spawnProcess(command, options);
};

function spawnProcess(commandString, options) {
  return new Promise(function(resolve, reject) {
    options = defaults(options, {
      maxBuffer: 5000 * 1024,
      stdio: 'inherit'
    });

    var args = commandString.split(' ');
    var command = args.shift();

    var ref = spawn(command, args, options);

    ref.on('close', function (code) {
      resolve(code);
    });

  });
}

function commandError(context, command, err) {
  context.ui.write(chalk.red('\nError thrown while running shell command: "' + command + '"\n'));
  if(err.stack) {
    context.ui.write(err.stack);
  } else {
    context.ui.write(err);
  }
}
