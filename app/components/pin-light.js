import Ember from 'ember';
import { lookup } from '../utils/computed';

const { Component, get } = Ember;

const PIN_CLASSES = {
  'Red Light': 'red',
  'Yellow Light': 'yellow',
  'Green Light': 'green'
};

const PIN_DESCRIPTIONS = {
  'Red Light': 'In a meeting; do not disturb. Inturupt only if the site is down.',
  'Yellow Light': 'Hard at work focusing. Inturup if it is urgent or extreamly quick.',
  'Green Light': 'Come on in and hang out. If the door is closed feel free to open it.'
};

export default Component.extend({
  classNames: ['pin-light', 'grid', 'clickable'],
  classNameBindings: ['pin.enabled:on:off'],

  bulbClass: lookup('pin.name', PIN_CLASSES),
  description: lookup('pin.name', PIN_DESCRIPTIONS),

  actions: {
    updatePinValue() {
      let newValue = get(this, 'pin.value') === 0 ? 1 : 0;
      get(this, 'update')(newValue);
    }
  }
});
