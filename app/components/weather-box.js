import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['weather-box'],

  // Prop passed in template
  city: null,

  time: Ember.computed('city.dt', function() {
    return new Date(this.get('city.dt'));
  })
});
