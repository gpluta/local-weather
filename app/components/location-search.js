import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['location-search'],

  actions: {
    handleEnterOnInput(e) {
      console.log('e: ', e);
      this.sendAction('performSearch', e);
    }
  }
});
