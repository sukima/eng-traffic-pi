import Ember from 'ember';
import { storageFor } from 'ember-local-storage';

const {
  Service, get, set,
  inject: { service }
} = Ember;

export default Service.extend({
  socketIo: service(),
  settings: storageFor('settings'),

  init() {
    const io = get(this, 'socketIo');
    let host = get(this, 'settings.socketUrl');
    let socket = io.socketFor(host);
    set(this, 'socket', socket);
  }
});
