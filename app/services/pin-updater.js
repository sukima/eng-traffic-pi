import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

const { Service, Evented, get, set, inject: { service } } = Ember;

const { random, floor } = Math;

const PARTY_MODE_SPEED = 200;

export default Service.extend(Evented, {
  io: service(),
  store: service(),

  onUpdate(data) {
    if (get(this, 'partyMode.isRunning')) {
      return;
    }
    const store = get(this, 'store');
    store.pushPayload('pin', data);
    this.trigger('update', data);
  },

  start() {
    const socket = get(this, 'io.socket');
    socket.on('pin:write', this.onUpdate, this);
  },

  stop() {
    const socket = get(this, 'io.socket');
    socket.off('pin:write', this.onUpdate);
  },

  partyMode: task(function * (pins) {
    let length = get(pins, 'length');
    try {
      while (true) {
        let randomPin = pins.objectAt(floor(random() * length));
        randomPin.toggleProperty('enabled');
        yield randomPin.save();
        yield timeout(PARTY_MODE_SPEED);
      }
    } finally {
      for (let pin of pins) {
        set(pin, 'enabled', false);
        yield pin.save();
      }
    }
  }).drop()
});
