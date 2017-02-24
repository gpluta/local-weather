import Ember from 'ember';

export default Ember.Component.extend({
  lru: Ember.inject.service('search-cache'),

  classNames: ['location-search'],

  reversedLruArray: Ember.computed('lru.memory.@each', function () {
    return this.get('lru.memory');
  }),

  actions: {
    // This action is fired on enter keypress while focusing in the input
    handleEnterOnInput(e) {
      this.sendAction('performSearch', e);
    },

    // This action is fired when the search icon is clicked
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
