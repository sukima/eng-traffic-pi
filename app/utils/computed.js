import Ember from 'ember';

const { computed, get, set } = Ember;

export function numberBoolean(prop) {
  return computed(prop, {
    get() {
      return get(this, prop) === 1;
    },
    set(key, isOn) {
      let value = isOn ? 1 : 0;
      set(this, prop, value);
      return isOn;
    }
  });
}

export function lookup(prop, hash) {
  return computed(prop, {
    get() {
      return hash[get(this, prop)];
    }
  });
}
