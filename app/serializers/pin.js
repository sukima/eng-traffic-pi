import DS from 'ember-data';

export default DS.JSONSerializer.extend({
  normalize(typeClass, hash) {
    let data = {
      id: hash.num,
      name: hash.name,
      value: hash.value
    };
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
