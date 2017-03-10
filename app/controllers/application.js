import Ember from 'ember';
import { storageFor } from 'ember-local-storage';
import { timeoutProxy } from '../utils/timmers';

const {
  Controller, get, set, observer,
  inject: { service }
} = Ember;

const THEME_CLASS_LIST = 'dark-grey dark solarized-dark standard markdown';

export default Controller.extend({
  pinUpdater: service(),
  settings: storageFor('settings'),

  init() {
    this._super(...arguments);
    this.updateApplicationClass();
    get(this, 'pinUpdater').on('update', this, this.onPinUpdate);
  },

  updateApplicationClass: observer('settings.theme', function () {
    let theme = get(this, 'settings.theme');
    Ember.$('body').removeClass(THEME_CLASS_LIST).addClass(`hack ${theme}`);
  }),

  onPinUpdate() {
    set(this, 'updateNotice', timeoutProxy(5000));
  }
});
