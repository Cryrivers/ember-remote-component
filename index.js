/* jshint node: true */
'use strict';
var Funnel = require('broccoli-funnel');
var MergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: 'ember-remote-component',
  isDevelopingAddon: function() {
    return true;
  },
  postprocessTree(type, tree) {
    if (type === 'js') {
      var remoteComponentTree = new Funnel(tree, {
        include: [
            '*/remote-components/**/*'
        ],
        destDir: 'lalalala'
      });
      var normalAppTree = new Funnel(tree, {
        exclude: [
          '*/remote-components/**/*'
        ]
      });
      return MergeTrees([normalAppTree, remoteComponentTree]);
    }
    return tree;
  },
  treeForPublic(tree) {
    console.log(tree);
    return tree;
  }
};
