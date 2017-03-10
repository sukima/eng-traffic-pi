import Ember from 'ember';
import { storageFor } from 'ember-local-storage';
import { timeoutProxy } from '../utils/timmers';
import Konami from 'ember-konami/mixins/konami';

const {
  Controller, get, set, observer,
  inject: { service }
} = Ember;

const THEME_CLASS_LIST = 'dark-grey dark solarized-dark standard markdown';

const EASTER_EGGS = [
  // 'FontBomb',
  'KatamariHack',
  // 'KickAss',
  'Raptor',
  'Cornify',
  'TurnDownForWhat'
];

export default Controller.extend(Konami, {
  easterEgg: EASTER_EGGS[Math.floor(Math.random() * EASTER_EGGS.length)],

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
