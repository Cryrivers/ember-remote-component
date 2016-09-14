import Ember from 'ember';

export default Ember.Mixin.create({
  sendAction(actionName) {
    const targetObject = this.get('targetObject.targetObject') || this._targetObject._targetObject;
    return targetObject.sendAction(actionName);
  }
});
