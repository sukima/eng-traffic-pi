import Ember from 'ember';

const {
  Controller, get, set, isEqual, isBlank,
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
      if (isBlank(selectedPin)) {
        this.send('clearAllPins');
      } else {
        this.send('togglePin', selectedPin);
      }
    },

    togglePin(selectedPin) {
      let group = get(selectedPin, 'group');
      if (isBlank(group)) {
        selectedPin.toggleProperty('enabled');
        return selectedPin.save();
      }
      let pins = get(this, 'pins');
      pins.reduce((memo, pin) => {
        if (get(pin, 'group') !== group) {
          return memo;
        }
        set(pin, 'enabled', isEqual(pin, selectedPin));
        return isBlank(get(pin, 'dirtyType')) ? memo : memo.then(() => pin.save());
      }, resolve());
    },

    clearAllPins() {
      let pins = get(this, 'pins');
      pins.reduce((memo, pin) => {
        set(pin, 'enabled', false);
        return isBlank(get(pin, 'dirtyType')) ? memo : memo.then(() => pin.save());
      }, resolve());
    }
  }
});
