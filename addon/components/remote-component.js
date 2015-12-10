import Ember from 'ember';
import $ from 'jquery';
import getOwner from 'ember-getowner-polyfill';
import layout from '../templates/components/remote-component';

const RemoteComponent = Ember.Component.extend({
  tagName: '',
  layout: layout,
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
        this.set('isLoaded', true);
      }).fail(()=>{
      });
    }
  }
});

RemoteComponent.reopenClass({
  positionalParams: ['componentName']
});

export default RemoteComponent;