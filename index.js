/* jshint node: true */
'use strict';
var Funnel = require('broccoli-funnel');
var Filter = require('broccoli-filter');

var remoteComponentTree = null;

function RemoteComponentFilter(inputNode) {
  if (!(this instanceof RemoteComponentFilter)) {
    return new RemoteComponentFilter(inputNode);
  }
  Filter.call(this, inputNode, {
    annotation: 'Remote Component Compilation'
  });
}
RemoteComponentFilter.prototype = Object.create(Filter.prototype);
RemoteComponentFilter.prototype.constructor = RemoteComponentFilter;
RemoteComponentFilter.prototype.extensions = ['js'];
RemoteComponentFilter.prototype.targetExtension = 'js';
RemoteComponentFilter.prototype.processString = function(content) {
  var updateContent = content.replace(/'(.+)\/remote-components\/(.+)\/component'/g, '\'$1/components/$2\'');
  updateContent = updateContent.replace(/"(.+)\/remote-components\/(.+)\/template"/g, '"$1/templates/components/$2"');
  updateContent = updateContent.replace(/"(.+)\/remote-components\/(.+)\/template.hbs"/g, '"$1/templates/components/$2.hbs"');
  return updateContent;
};

module.exports = {
  name: 'ember-remote-component',
  postprocessTree(type, tree) {
    if (type === 'js') {
      var normalAppTree = new Funnel(tree, {
        exclude: [
          '*/remote-components/*/*'
        ]
      });
      remoteComponentTree = new Funnel(tree, {
        include: [
          '*/remote-components/*/*'
        ],
        destDir: 'remote-components',
        getDestinationPath: function(relativePath) {
          return relativePath.replace(/.+\/remote-components\//g, '');
        }
      });
      return normalAppTree;
    }
    return tree;
  },
  treeForPublic: function() {
    return RemoteComponentFilter(remoteComponentTree);
  }
};
