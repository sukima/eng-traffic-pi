import Ember from 'ember';
import { storageFor } from 'ember-local-storage';
import { timeoutProxy } from '../utils/timmers';
import Konami from 'ember-konami/mixins/konami';
import config from '../config/environment';

const {
  Controller, get, set, observer,
  run: { throttle },
  inject: { service }
} = Ember;

const NOTIFICATION_DELAY = 5000;

const THEME_CLASS_LIST = 'dark-grey dark solarized-dark standard markdown';

const EASTER_EGGS = [
  // 'FontBomb',
  'KatamariHack',
  // 'KickAss',
  'Raptor',
  'Cornify',
  'TurnDownForWhat'
];

let ApplicationController = Controller.extend({
  push: service(),
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
    set(this, 'updateNotice', timeoutProxy(NOTIFICATION_DELAY));
    if (get(this, 'settings.enablePush')) {
      throttle(this, 'desktopNotify', NOTIFICATION_DELAY);
    }
  },

  desktopNotify() {
    get(this, 'push').create('Engineering Traffic Light update', {
      body: 'The engineering traffic light has been updated'
    });
  }
});

if (config.enableEasterEggs) {
  ApplicationController = ApplicationController.extend(Konami, {
    easterEgg: EASTER_EGGS[Math.floor(Math.random() * EASTER_EGGS.length)]
  });
}

export default ApplicationController;
