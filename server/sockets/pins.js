/*jshint node:true, esversion:6 */
var util = require('util');
var GPIOPin = require('../lib/gpio-pin');

var gpioPins = new Map([
  [17, new GPIOPin(17, 'Green Light')],
  [18, new GPIOPin(18, 'Yellow Light')],
  [27, new GPIOPin(27, 'Red Light')]
]);

module.exports = function(io) {
  io.on('connection', function (socket) {
    console.log('SocketIO connection');

    socket.on('pin:list', function () {
      console.log('SocketIO pin:list');
      io.emit('pin:list', [...gpioPins.values()]);
    });

    socket.on('pin:read', function (payload = {}) {
      var pin = gpioPins.get(payload.num) || new GPIOPin.NullPin();
      console.log('SocketIO pin:read', util.inspect(payload));
      io.emit('pin:read', pin);
    });

    socket.on('pin:write', function (payload = {}) {
      var pin = gpioPins.get(payload.num) || new GPIOPin.MissingPin();
      pin.write(payload.value);
      console.log('SocketIO pin:write', util.inspect(payload));
      io.emit('pin:write', pin);
    });
  });
};
