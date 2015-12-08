/* jshint node: true */
'use strict';
var Stew = require('broccoli-stew');
module.exports = {
  name: 'ember-remote-component',
  isDevelopingAddon: function() {
    return true;
  },
  preprocessTree(type, tree) {
    if (type === 'js') {
      return Stew.rm(tree, '*/remote-components/**/*');
    } else {
      return tree;
    }
  }
};
