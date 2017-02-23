import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['search'],

  search: '',

  // Prop defined in the route
  foundCity: null,

  actions: {
    performSearch(e) {
      this.set('search', e);
    }
  }
});
