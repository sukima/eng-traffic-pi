import Ember from 'ember';
import DS from 'ember-data';

const { assign } = Ember;

export default DS.JSONSerializer.extend({
  normalize(typeClass, hash) {
    let subData = JSON.parse(hash.name);
    let data = assign({
      id: hash.num,
      value: hash.value
    }, subData);
    return this._super(typeClass, data);
  },

  serialize(snapshot) {
    let payload = {
      num: parseInt(snapshot.id, 10),
      value: snapshot.attr('value')
    };
    return payload;
  },

  pushPayload(store, payload) {
    let Pin = store.modelFor('pin');
    let normalizedPayload = this.normalize(Pin, payload);
    store.push(normalizedPayload);
  }
});
