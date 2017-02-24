import Ember from 'ember';

export default Ember.Service.extend({
  limit: 5,
  lsKey: 'weatherAppCache',

  init() {
    let weatherAppCache = this._getFromLs();
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

  /**
   * Check the index of a possible duplicate element
   * @param value
   * @returns {number} - the index
   */
  getDuplicateIndex(value) {
    return this.memory.indexOf(value);
  },

  /**
   * Add an element to the beginning of the list
   * @param value
   */
  add(value) {
    value = String(value);
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

    // Persist to localStorage
    this._persistToLS();
  },

  clearAll() {
    this.set('memory', []);
    this._clearLs();
  },

  removeElementByIndex(index) {
    // This must be done this way (not using `splice()` in order to trigger observer)
    this.set('memory', this.get('memory').filter((e,i) => i !== index));
    this._persistToLS();
  },

  /**
   * Clear local storage
   * @private
   */
  _clearLs() {
    localStorage.removeItem(this.get('lsKey'));
  },

  /**
   * Get the list from localStorage
   * @private
   */
  _getFromLs() {
    return localStorage.getItem(this.get('lsKey'));
  },

  /**
   * Persist the list to localStorage
   * @private
   */
  _persistToLS()
  {
    localStorage.setItem(this.get('lsKey'), JSON.stringify(this.get('memory')));
  }
});
