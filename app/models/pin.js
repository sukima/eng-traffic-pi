import DS from 'ember-data';
import { numberBoolean } from '../utils/computed';

const { Model, attr } = DS;

export default Model.extend({
  name: attr('string'),
  value: attr('number'),
  color: attr('string'),
  order: attr('number'),
  group: attr('string'),
  description: attr('string'),

  enabled: numberBoolean('value')
});
