import Ember from 'ember';

const {
  Controller, get, set, isEqual, isBlank,
  computed, computed: { sort, reads },
  inject: { service }
} = Ember;

export default Controller.extend({
  pinUpdater: service(),

  sortBy: ['order:asc'],
  pins: sort('model', 'sortBy'),

  partyMode: reads('pinUpdater.partyMode'),

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
        if (get(pin, 'dirtyType') === 'updated') {
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
