import Ember from 'ember';
import { storageFor } from 'ember-local-storage';
import config from '../config/environment';

const { Controller, get, set, inject: { service } } = Ember;

export default Controller.extend({
  push: service(),
  settings: storageFor('settings'),

  hasEasterEggs: config.enableEasterEggs,

  init() {
    this._super(...arguments);
    let socketUrl = get(this, 'settings.socketUrl');
    set(this, 'originalUrl', socketUrl);
  },

  actions: {
    resetSettings() {
      get(this, 'settings').reset();
    },

    refreshBrowser() {
      window.location.reload();
    },

    togglePushNotifications() {
      let enabled = this.toggleProperty('settings.enablePush');
      if (enabled) {
        get(this, 'push').requestPermission();
      }
    }
  }
});
