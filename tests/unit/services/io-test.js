import { moduleFor, test } from 'ember-qunit';

moduleFor('service:io', 'Unit | Service | io', {
  // Specify the other units that are required for this test.
  needs: ['storage:settings', 'service:socket-io']
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let service = this.subject();
  assert.ok(service);
});
