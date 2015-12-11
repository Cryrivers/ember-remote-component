import Ember from 'ember';
import RemoteComponentMixinMixin from '../../../mixins/remote-component-mixin';
import { module, test } from 'qunit';

module('Unit | Mixin | remote component mixin');

// Replace this with your real tests.
test('it works', function(assert) {
  let RemoteComponentMixinObject = Ember.Object.extend(RemoteComponentMixinMixin);
  let subject = RemoteComponentMixinObject.create();
  assert.ok(subject);
});
