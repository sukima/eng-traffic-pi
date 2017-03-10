import StorageObject from 'ember-local-storage/local/object';
import config from '../config/environment';

const Storage = StorageObject.extend();

Storage.reopenClass({
  initialState() {
    return {
      theme: config.APP.defaultTheme,
      socketUrl: config.APP.socketUrl,
      enablePush: false
    };
  }
});

export default Storage;
