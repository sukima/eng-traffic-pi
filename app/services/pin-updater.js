import Ember from 'ember';

const {
  Service, Evented, get, set,
  run: { later },
  inject: { service }
} = Ember;

const POLL_TIME = 1000;

export default Service.extend(Evented, {
  io: service(),
  store: service(),

  _lastPoll: 0,
  _pollingEnabled: false,

  backgroundRefresh() {
    if (!get(this, '_pollingEnabled')) {
      return;
    }
    let now = new Date().getTime();
    if (now - get(this, '_lastPoll') > POLL_TIME * 2) {
      get(this, 'store').findAll('pin').catch(() => {});
    }
    set(this, '_lastPoll', now);
    later(this, 'backgroundRefresh', POLL_TIME);
  },

  onUpdate(data) {
    const store = get(this, 'store');
    store.pushPayload('pin', data);
    this.trigger('update', data);
  },

  start() {
    const socket = get(this, 'io.socket');
    socket.on('pin:write', this.onUpdate, this);
    set(this, '_pollingEnabled', true);
    this.backgroundRefresh();
  },

  stop() {
    const socket = get(this, 'io.socket');
    set(this, '_pollingEnabled', false);
    socket.off('pin:write', this.onUpdate);
  }
});
