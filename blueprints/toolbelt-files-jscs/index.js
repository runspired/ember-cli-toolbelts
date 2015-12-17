/*jshint node:true*/
var toolbelt = require('../../lib/toolbelt');

module.exports = toolbelt({
  description: "Install's jscs configuration",

  afterInstall: function() {
    this.updatePackage({
      "scripts": {
        "suave": "jscs addon app tests --fix"
      },
      "ghooks": {
        "pre-commit": "PATH=$PATH:/usr/local/bin:/usr/local/sbin && npm run suave",
        "pre-push": "PATH=$PATH:/usr/local/bin:/usr/local/sbin && npm run suave"
      }
    });
  }
});
