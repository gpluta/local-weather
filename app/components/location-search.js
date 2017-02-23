import Ember from 'ember';

export default Ember.Component.extend({
  lru: Ember.inject.service('search-cache'),

  classNames: ['location-search'],

  reversedLruArray: Ember.computed('lru.memory.@each', function () {
    return this.get('lru.memory').reverse();
  }),

  actions: {
    handleEnterOnInput(e) {
      this.sendAction('performSearch', e);
    },

    search() {
      let searchValue = $('#location-search-input').val();
      if (searchValue) {
        this.sendAction('performSearch', searchValue);
      }
    },

    removeHistoryItem(e) {
      this.get('lru').removeElementByIndex(parseInt(e));
    },

    clearHistory() {
      this.get('lru').clearAll();
    }
  }
});
