import Ember from 'ember';

export default Ember.Component.extend({
  lru: Ember.inject.service('search-cache'),

  classNames: ['location-search'],

  reversedLruArray: Ember.computed('lru.memory.@each', function() {
    return this.get('lru.memory').reverse();
  }),

  actions: {
    handleEnterOnInput(e) {
      this.sendAction('performSearch', e);
    },

    clearHistory() {
      this.get('lru').clearAll();
    }
  }
});
