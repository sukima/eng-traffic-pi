import Ember from 'ember';

const { Component, get, computed, isPresent } = Ember;

export default Component.extend({
  classNames: ['pin-light', 'grid', 'clickable'],
  classNameBindings: ['pin.enabled:on:off'],
  attributeBindings: ['pin.group:data-group'],

  bulbStyle: computed('pin.color', {
    get() {
      let color = get(this, 'pin.color');
      let style = isPresent(color) ?
        `background-color: ${get(this, 'pin.color')};` :
        '';
      return style.htmlSafe();
    }
  }),

  actions: {
    updatePinValue() {
      let newValue = get(this, 'pin.value') === 0 ? 1 : 0;
      get(this, 'update')(newValue);
    }
  }
});
