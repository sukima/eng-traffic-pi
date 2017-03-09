import Ember from 'ember';

const {
  Service, get, set,
  inject: { service }
} = Ember;

export default Service.extend({
  socketIo: service(),

  init() {
    const io = get(this, 'socketIo');
    let socket = io.socketFor('http://localhost:4200/');
    set(this, 'socket', socket);
  }
});
