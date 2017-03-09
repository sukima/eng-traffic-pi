/*jshint node:true, esversion:6 */
class GPIOPin {
  constructor(pinNumber, pinName) {
    this.num = pinNumber;
    this.name = pinName;
    this.value = 0;
  }

  write(value) {
    this.value = value;
    return this;
  }

  toJSON() {
    return {
      initial: null,
      value: this.value,
      resistor: null,
      name: this.name,
      num: this.num,
      mode: 'OUT',
      event: null,
      bounce: 0
    };
  }
}

class NullPin {
  write() {}
  toJSON() { return null; }
}

class MissingPin extends NullPin {
  toJSON() {
    return {message: 'Pin not found'};
  }
}

GPIOPin.NullPin = NullPin;
GPIOPin.MissingPin = MissingPin;
module.exports = GPIOPin;
