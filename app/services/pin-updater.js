import Ember from 'ember';

const {
  Service, Evented, get, set,
  run: { later },
  inject: { service }
} = Ember;

const POLL_TIME = 1000;

export default Service.extend(Evented, {
  store: service(),

  _pollingEnabled: false,

  backgroundRefresh() {
    if (get(this, '_pollingEnabled')) {
      get(this, 'store').findAll('pin').catch(() => {});
      later(this, 'backgroundRefresh', POLL_TIME);
    }
  },

  start() {
    set(this, '_pollingEnabled', true);
    this.backgroundRefresh();
  },

  stop() {
    set(this, '_pollingEnabled', false);
  }
});
