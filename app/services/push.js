import Ember from 'ember';
import PushService from 'ember-cli-push/services/push';

const { get } = Ember;

export default PushService.extend({
  requestPermission() {
    return get(this, 'instance').Permission.request(...arguments);
  }
});
