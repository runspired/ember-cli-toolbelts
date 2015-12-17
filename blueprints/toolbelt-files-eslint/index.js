/*jshint node:true*/
var toolbelt = require('../../lib/toolbelt');

module.exports = toolbelt({
  description: "Install's eslint configuration",

  afterInstall: function() {
    this.updatePackage({
      "scripts": {
        "lint": "eslint -c .eslintrc addon/",
        "lint-all": "eslint -c .eslintrc app/ addon/ tests/",
        "lint-staged": "git diff --diff-filter=ACMRTUXB --cached --name-only | grep '*.js' | grep -v 'node_modules' | grep -v 'tests' | xargs eslint -c .eslintrc"
      },
      "config": {
        "ghooks": {
          "pre-commit": "PATH=$PATH:/usr/local/bin:/usr/local/sbin && npm run lint-staged",
          "pre-push": "PATH=$PATH:/usr/local/bin:/usr/local/sbin && npm run lint"
        }
      }
    });
  }
});
