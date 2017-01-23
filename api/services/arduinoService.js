/**
 * Created by japel on 20.01.17.
 */

const five = require('johnny-five');

let arduinoService = {
  fadeIn: function (opts) {
    "use strict";
if(process.env.ARDUINO){
  var led = new five.Led(11);
  led.fadeIn();

  setTimeout(() => {
    led.fadeOut();
  }, 2000);

  return {
    ok:true
  };
}
else{
  return {
    "simulation": "imagine your led connected to D11 on Arduino board would now fade in 2000ms"
  };
}




  },
  connect: function (cb) {
    "use strict";
    var board = new five.Board({repl: false});

    board.on("ready", function () {
      sails.config.arduino = {};
      sails.config.arduino.board = board;
      cb();
    });
  }
};

module.exports = arduinoService;