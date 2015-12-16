/*jshint node:true*/
'use strict';

var RSVP = require('rsvp');
var fs = require('fs');
var path = require('path');

module.exports = function(root, changes) {
  var readmePath = path.join(root, 'README.md');

  if (fs.existsSync(readmePath)) {
    var file = fs.readFileSync(readmePath).toString();
    var lines = file.split('\n');
    var insertedLines = 0;
    changes.forEach(function(change) {
      insertedLines += insertLines(lines, change.offset ? insertedLines + change.offset : 0, change.lines);
    });
    fs.writeFileSync(readmePath, lines.join('\n'));
  }

  return RSVP.Promise.resolve();
};

function insertLines(existingLines, offset, linesToInsert) {
  var insertedLineCount = 0;
  linesToInsert.forEach(function(line, index) {
    var lineNumber = offset + index;
    if (existingLines[lineNumber] !== line) {
      insertedLineCount++;
      existingLines.splice(lineNumber, 0, line);
    }
  });

  return insertedLineCount;
}
