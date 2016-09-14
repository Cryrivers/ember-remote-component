/* global require:false */
import Ember from 'ember';
import $ from 'jquery';
import ENV from '../config/environment';
import getOwner from 'ember-getowner-polyfill';

const RemoteComponent = Ember.Component.extend({
  tagName: '',
  isLoaded: false,
  didReceiveAttrs() {
    const container = getOwner(this);
    const componentName = this.get('componentName');
    const componentResolved = container.hasRegistration(`component:${ componentName }`);
    if (componentResolved) {
      this.set('isLoaded', true);
    } else {
      $.when(
          $.getScript(`/remote-components/${ componentName }/component.js`),
          $.getScript(`/remote-components/${ componentName }/template.js`)
      ).done(()=> {
        let container = getOwner(this);
        container.register(`component:${ componentName }`, require(`${ ENV.modulePrefix }/components/${ componentName }`).default, {singleton: false});
        this.set('isLoaded', true);
      }).fail(()=> {
      });
    }
  }
});

RemoteComponent.reopenClass({
  // Wait for HTMLBars splat operator
  positionalParams: ['componentName', 'data']
});

export default RemoteComponent;
