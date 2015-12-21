/*jshint node:true*/
var toolbelt = require('../../lib/toolbelt');

module.exports = toolbelt({
  description: 'Bump Ember dependencies to their latest versions.',

  afterInstall: function() {
    return this.installToolbelt([
      {
        name: 'Ember',
        description: "Bump Ember",
        bowerPackages: [
          'ember',
          'ember-resolver',
          'ember-cli-test-loader',
          // 'ember-cli-shims',
          'loader.js',
          'ember-load-initializers'
        ]
      },
      {
        name: 'Ember CLI',
        description: "Bump Ember-Cli",
        packages: [
          // 'ember-cli', (this causes a problem as it updates while running)
          // 'broccoli-asset-rev',
          'ember-cli-toolbelts',
          'ember-cli-release',
          'ember-cli-app-version',
          'ember-cli-content-security-policy',
          'ember-cli-dependency-checker',
          'ember-cli-htmlbars',
          'ember-cli-inject-live-reload',
          'ember-cli-uglify',
          'ember-try'
        ]
      },
      {
        name: 'Ember Cruft',
        description: 'Bump Default Ember Addons',
        addons: [
          'ember-cli-sri',
          'ember-ajax',
          'ember-disable-proxy-controllers',
          'ember-export-application-global',
          'ember-disable-prototype-extensions'
        ]
      },
      {
        name: 'Ember Data',
        description: "Bump Ember-Data",
        packages: ['ember-data'],
        bowerPackages: ['ember-data']
      },
      {
        name: 'Ember Qunit',
        description: "Bump Ember-Qunit",
        packages: [
          'ember-cli-qunit'
        ],
        bowerPackages: [
          'qunit',
          'ember-qunit',
          'ember-qunit-notifications'
        ]
      }
    ]);
  }
});
