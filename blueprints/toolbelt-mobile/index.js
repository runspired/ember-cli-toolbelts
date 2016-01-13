/*jshint node:true*/
var toolbelt = require('../../lib/toolbelt');

module.exports = toolbelt({
  description: 'Installs Addons For Mobile Support',

  afterInstall: function() {
    return this.installToolbelt([
      {
        name: 'Remove Click/Touch Delay',
        description: "ember-hammertime seamlessly wires the hammer-time touch-action polyfill into your app." +
         "hammer-time is a better fastclick through polyfill.",
        addons: [
          'ember-hammertime'
        ]
      },
      {
        name: 'Incorporate Gestures such as Pan/Swipe',
        description: 'ember-gestures provides an easy way to add HammerJS to your app.',
        addons: [
          'ember-gestures'
        ]
      }
    ]);
  }
});
