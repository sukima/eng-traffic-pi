import Ember from 'ember';
import { storageFor } from 'ember-local-storage';
import { task, timeout } from 'ember-concurrency';
import Konami from 'ember-konami/mixins/konami';
import config from '../config/environment';

const {
  Controller, get, observer,
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
    get(this, 'flashNotify').perform();
    get(this, 'desktopNotify').perform();
  },

  flashNotify: task(function * () {
    yield timeout(NOTIFICATION_DELAY);
  }).restartable(),

  desktopNotify: task(function * () {
    if (!get(this, 'settings.enablePush')) {
      return;
    }
    get(this, 'push').create('Engineering Traffic Light update', {
      body: 'The engineering traffic light has been updated'
    });
    yield timeout(NOTIFICATION_DELAY);
  }).drop()
});

if (config.enableEasterEggs) {
  ApplicationController = ApplicationController.extend(Konami, {
    easterEgg: EASTER_EGGS[Math.floor(Math.random() * EASTER_EGGS.length)]
  });
}

export default ApplicationController;
