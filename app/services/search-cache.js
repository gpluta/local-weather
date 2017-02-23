import Ember from 'ember';

export default Ember.Service.extend({
  limit: 5,
  lsKey: 'weatherAppCache',

  init() {
    let weatherAppCache = localStorage.getItem(this.get('lsKey'));
    // Check for localStorage entries
    if (weatherAppCache) {
      // Prepare for invalid JSON
      try {
        this.memory = JSON.parse(weatherAppCache);
      } catch (error) {
        Ember.Logger.log('JSON seems to be broken... :(', error)
      }
    } else {
      // Set empty memory when ls is empty
      this.memory = [];
    }
  },

  getDuplicateIndex(value) {
    return this.memory.indexOf(value);
  },

  add(value) {
    // First check for duplicates
    if (this.getDuplicateIndex(value) !== -1) {
      //Remove the duplicate
      this.memory.splice(this.getDuplicateIndex(value), 1);
    }

    // Than see if limit will not be exceeded
    if (this.memory.length === this.limit) {
      // If the memory had reached its limit, shift the array to make space
      this.memory.shift();
    }

    // Push the value to memory
    this.memory.push(value);

    // Persist to localstorage
    this._persistToLS();
  },

  clearAll() {
    this.set('memory', []);
    this._clearLs();
  },

  _clearLs() {
    localStorage.removeItem(this.get('lsKey'));
  },

  _persistToLS() {
    localStorage.setItem(this.get('lsKey'), JSON.stringify(this.get('memory')));
  }
});
