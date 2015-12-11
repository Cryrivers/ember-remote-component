import Ember from 'ember';

export default Ember.Mixin.create({
  sendAction(actionName) {
    let targetObject = this.get('targetObject.targetObject');
    return targetObject.sendAction(actionName);
  }
});
