import Ember from 'ember';

const {
  Controller, get, set, isEqual, isNone,
  computed, computed: { sort },
  RSVP: { resolve }
} = Ember;

export default Controller.extend({
  sortBy: ['order:asc'],
  pins: sort('model', 'sortBy'),

  isAllPinsOff: computed('pins.@each.enabled', {
    get() {
      let pins = get(this, 'pins');
      return !pins.some(pin => get(pin, 'enabled'));
    }
  }),

  actions: {
    setPin(selectedPin) {
      let pins = get(this, 'pins');
      pins.reduce((memo, pin) => {
        set(pin, 'enabled', isEqual(pin, selectedPin));
        return isNone(get(pin, 'dirtyType')) ? memo : memo.then(() => pin.save());
      }, resolve());
    }
  }
});
