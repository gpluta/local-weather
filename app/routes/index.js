import Ember from 'ember';
import fetch from 'fetch';
import config from '../config/environment';

export default Ember.Route.extend({
  queryParams: {
    search: {
      refreshModel: true
    }
  },

  model(params) {
    let qp = $.param({
      appid: config.apiKey,
      q: params.search
    });

    this.set('lastSearch', params.search);

    // Search for available cities
    return fetch('http://api.openweathermap.org/data/2.5/weather?' + qp)
      .then(response => response.json());
  },

  lastSearch: '',

  afterModel(model) {
    console.log('afterModel', model, 'asd', model.name);
  },

  setupController(controller, model) {
    this._super(...arguments);

    controller.setProperties({
      foundCity: model.name,
      lastSearch: this.get('lastSearch')
    });
  },

  actions: {
    transitionToSearch(search) {
      console.log('test action in application route: ', search);
      this.transitionTo('application', {queryParams: {search: search}});
    }
  }
});
