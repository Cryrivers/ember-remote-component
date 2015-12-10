import Ember from 'ember';
import $ from 'jquery';
import ENV from '../config/environment';
import getOwner from 'ember-getowner-polyfill';

const RemoteComponent = Ember.Component.extend({
  tagName: '',
  isLoaded: false,
  didReceiveAttrs() {
    const container = getOwner(this);
    const componentResolved = container.hasRegistration(`component:${ this.attrs.componentName }`);
    if (componentResolved) {
      this.set('isLoaded', true);
    } else {
      $.when(
          $.getScript(`/remote-components/${ this.attrs.componentName }/component.js`),
          $.getScript(`/remote-components/${ this.attrs.componentName }/template.js`)
      ).done(()=> {
        let container = getOwner(this);
        container.register(`component:${ this.attrs.componentName }`, require(`${ ENV.modulePrefix }/components/${ this.attrs.componentName }`).default, {singleton: false});
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