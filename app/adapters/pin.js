import Ember from 'ember';
import DS from 'ember-data';

const {
  get, assert, isPresent, runInDebug,
  inject: { service },
  RSVP: { Promise }
} = Ember;

const { AdapterError } = DS;

export default DS.Adapter.extend({
  io: service(),

  sendRecv(name, payload) {
    let socket = get(this, 'io.socket');
    let resoler, rejector;
    return new Promise((resolve, reject) => {
      resoler = resolve;
      rejector = reject;
      socket.on(name, resolve);
      socket.on('error', reject);
      runInDebug(() => console.log(`SocketIO: emit '${name}'`, payload));
      socket.emit(name, payload);
    }, 'adapter/pin#sendRecv')
    .then(data => {
      runInDebug(() => console.log(`SocketIO: response '${name}'`, data));
      if (isPresent(data.message)) {
        throw new AdapterError(null, data.message);
      }
      return data;
    })
    .finally(() => {
      socket.off(name, resoler);
      socket.off('error', rejector);
    });
  },

  findRecord(store, type, id) {
    return this.sendRecv('pin:read', {num: id});
  },

  createRecord() {
    assert('createRecord not supported', false);
  },

  updateRecord(store, type, snapshot) {
    let payload = this.serialize(snapshot, {includeId: true});
    return this.sendRecv('pin:write', payload);
  },

  deleteRecord() {
    assert('deleteRecord not supported', false);
  },

  findAll() {
    return this.sendRecv('pin:list');
  },

  query() {
    assert('query not supported', false);
  }
});
