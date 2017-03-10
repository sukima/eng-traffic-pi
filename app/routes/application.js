import Ember from 'ember';

const { Route, get, inject: { service } } = Ember;

export default Route.extend({
  pinUpdater: service(),

  activate() {
    get(this, 'pinUpdater').start();
  },

  deactivate() {
    get(this, 'pinUpdater').stop();
  }
});
