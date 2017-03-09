import Ember from 'ember';

const { Service, get, inject: { service } } = Ember;

export default Service.extend({
  io: service(),
  store: service(),

  onUpdate(data) {
    const store = get(this, 'store');
    store.pushPayload('pin', data);
  },

  start() {
    const socket = get(this, 'io.socket');
    socket.on('pin:write', this.onUpdate, this);
  },

  stop() {
    const socket = get(this, 'io.socket');
    socket.off('pin:write', this.onUpdate);
  }
});
