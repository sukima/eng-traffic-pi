import Ember from 'ember';
import { storageFor } from 'ember-local-storage';

const { Controller, get, set } = Ember;

export default Controller.extend({
  settings: storageFor('settings'),

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
    }
  }
});
