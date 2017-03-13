import Ember from 'ember';
import DS from 'ember-data';
import { task } from 'ember-concurrency';

const {
  get, assert, isPresent, runInDebug,
  inject: { service },
  RSVP: { Promise }
} = Ember;

const { AdapterError } = DS;

function socketPromise(socket, name, payload) {
  let resoler, rejector;
  return new Promise((resolve, reject) => {
    resoler = resolve;
    rejector = reject;
    socket.on(name, resolve);
    socket.on('error', reject);
    socket.emit(name, payload);
  }, `Adapter: 'pin' socket.io resolver`)
  .finally(() => {
    socket.off(name, resoler);
    socket.off('error', rejector);
  });
}

export default DS.Adapter.extend({
  io: service(),

  sendRecv: task(function * (name, payload) {
    let socket = get(this, 'io.socket');

    runInDebug(() => console.log(`SocketIO: emit '${name}'`, payload));
    let data = yield socketPromise(socket, name, payload);

    runInDebug(() => console.log(`SocketIO: response '${name}'`, data));
    if (isPresent(data.message)) {
      throw new AdapterError(null, data.message);
    } else {
      return data;
    }
  }).enqueue().maxConcurrency(1),

  findRecord(store, type, id) {
    return get(this, 'sendRecv').perform('pin:read', {num: id});
  },

  createRecord() {
    assert('createRecord not supported', false);
  },

  updateRecord(store, type, snapshot) {
    let payload = this.serialize(snapshot, {includeId: true});
    return get(this, 'sendRecv').perform('pin:write', payload);
  },

  deleteRecord() {
    assert('deleteRecord not supported', false);
  },

  findAll() {
    return get(this, 'sendRecv').perform('pin:list');
  },

  query() {
    assert('query not supported', false);
  }
});
