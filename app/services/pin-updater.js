import Ember from 'ember';

const {
  Service, Evented, get, set,
  run: { later },
  inject: { service }
} = Ember;

const POLL_TIME = 1000;

function arraysEqual(a, b) {
  if (a === b) { return true; }
  if (a == null || b == null) { return false; }
  if (a.length !== b.length) { return false; }
  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) { return false; }
  }
  return true;
}

export default Service.extend(Evented, {
  store: service(),

  _pollingEnabled: false,

  backgroundRefresh() {
    if (get(this, '_pollingEnabled')) {
      this.refresh().catch(() => {});
      later(this, 'backgroundRefresh', POLL_TIME);
    }
  },

  refresh() {
    return get(this, 'store').findAll('pin')
      .then(records => this.notifyChanges(records));
  },

  notifyChanges(records) {
    let newPinState = records.mapBy('enabled');
    let oldPinState = get(this, '_pinState') || newPinState;
    if (!arraysEqual(newPinState, oldPinState)) {
      this.trigger('update');
    }
    set(this, '_pinState', newPinState);
  },

  start() {
    set(this, '_pollingEnabled', true);
    this.backgroundRefresh();
  },

  stop() {
    set(this, '_pollingEnabled', false);
  }
});
