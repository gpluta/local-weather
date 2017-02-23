import Ember from 'ember';
import fetch from 'fetch';
import config from '../config/environment';

export default Ember.Route.extend({
  lru: Ember.inject.service('search-cache'),

  queryParams: {
    search: {
      refreshModel: true
    }
  },

  model(params) {
    let qp = $.param({
      appid: config.apiKey,
      q: params.search,
      units: 'metric',
      type: 'accurate'
    });

    this.set('lastSearch', params.search);

    // Search for available cities
    if (params.search) {
      return fetch('http://api.openweathermap.org/data/2.5/find?' + qp)
        .then(response => response.json());
    }
  },

  lastSearch: '',

  afterModel(model) {
    if (model && model.cod == 200 && model.count > 0) {
      // Save only queries that yielded one or more result (and did not cause an error...)
      this.get('lru').add(this.get('lastSearch'));
    }
  },

  setupController(controller, model) {
    this._super(...arguments);

    controller.setProperties({
      lastSearch: this.get('lastSearch')
    });
  },

  actions: {
    transitionToSearch(search) {
      this.transitionTo('application', {queryParams: {search: search}});
    }
  }
});
