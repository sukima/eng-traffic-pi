import DS from 'ember-data';
import { numberBoolean, lookup } from '../utils/computed';

const { Model, attr } = DS;

const PIN_SORT_ORDER = {
  'Red Light': 0,
  'Yellow Light': 1,
  'Green Light': 2
};

export default Model.extend({
  name: attr('string'),
  value: attr('number'),
  enabled: numberBoolean('value'),
  sortOrder: lookup('name', PIN_SORT_ORDER)
});
