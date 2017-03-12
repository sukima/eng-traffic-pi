import Ember from 'ember';

const {
  Route, get,
  inject: { service }
} = Ember;

export default Route.extend({
  store: service(),

  model() {
    return get(this, 'store').findAll('pin');
  }
});
