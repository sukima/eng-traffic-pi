import Ember from 'ember';

const { Component, get, computed, isPresent } = Ember;

export default Component.extend({
  classNames: ['pin-light', 'grid', 'clickable'],
  classNameBindings: ['pin.enabled:on:off'],

  bulbStyle: computed('pin.color', {
    get() {
      let color = get(this, 'pin.color');
      return isPresent(color) ?
        `background-color: ${get(this, 'pin.color')};`.htmlSafe() :
        '';
    }
  }),

  actions: {
    updatePinValue() {
      let newValue = get(this, 'pin.value') === 0 ? 1 : 0;
      get(this, 'update')(newValue);
    }
  }
});
