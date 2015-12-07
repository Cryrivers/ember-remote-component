import Ember from 'ember';
import getOwner from 'ember-getowner-polyfill';

export function remoteComponent([componentName, ...params], hash) {
  let container = getOwner(this);
  return params;
}

export default Ember.Helper.helper(remoteComponent);
