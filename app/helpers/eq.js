import Ember from 'ember';

const { isEqual } = Ember;

export function eq([a, b]) {
  return isEqual(a, b);
}

export default Ember.Helper.helper(eq);
