import Ember from 'ember';

const { PromiseProxyMixin, run: { later }, RSVP: { Promise } } = Ember;

const TimeoutProxy = Ember.Object.extend(PromiseProxyMixin);

export function timeout(time) {
  return new Promise(resolve => {
    later(resolve, time);
  }, 'util:timmer/timeout');
}

export function timeoutProxy(time) {
  return TimeoutProxy.create({promise: timeout(time)});
}
