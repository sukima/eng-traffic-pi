/*jshint node:true, esversion:6 */
var util = require('util');
var GPIOPin = require('../lib/gpio-pin');

var greenLight = new GPIOPin(17, {
  name: 'Green Light',
  color: '#2ecc71',
  order: 30,
  description: 'Come on in and hang out. If the door is closed feel free to open it.'
});

var yellowLight = new GPIOPin(18, {
  name: 'Yellow Light',
  color: '#f1c40f',
  order: 20,
  description: 'Hard at work focusing. Inturupt if it is urgent or extreamly quick.'
});

var redLight = new GPIOPin(27, {
  name: 'Red Light',
  color: '#e74c3c',
  order: 10,
  description: 'In a meeting; do not disturb. Inturupt only if the site is down.'
});

var gpioPins = new Map([
  [17, greenLight],
  [18, yellowLight],
  [27, redLight]
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
