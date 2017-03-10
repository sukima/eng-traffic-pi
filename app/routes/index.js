import Ember from 'ember';
import { timeout } from '../utils/timmers';

const {
  Route, get,
  inject: { service },
  RSVP: { all }
} = Ember;

export default Route.extend({
  store: service(),

  model() {
    return all([
      get(this, 'store').findAll('pin'),
      timeout(1000)
    ]).then(result => result[0]);
  }
});
