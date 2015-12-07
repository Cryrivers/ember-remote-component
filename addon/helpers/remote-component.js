import Ember from 'ember';
import { componentHelper } from 'ember-htmlbars/helpers/component';
import getOwner from 'ember-getowner-polyfill';

export function remoteComponent([componentName, ...params], hash) {
  let container = getOwner(this);
  return params;
}

export default Ember.Helper.helper(remoteComponent);
