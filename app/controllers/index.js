import Ember from 'ember';

const {
  Controller, get, set, isEqual, isBlank,
  computed, computed: { sort }
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
      get(this, 'pins').forEach(pin => {
        if (get(pin, 'group') !== group) {
          return;
        }
        set(pin, 'enabled', isEqual(pin, selectedPin));
        if (isBlank(get(pin, 'dirtyType'))) {
          pin.save();
        }
      });
    },

    clearAllPins() {
      get(this, 'pins').forEach(pin => {
        set(pin, 'enabled', false);
        pin.save();
      });
    }
  }
});
