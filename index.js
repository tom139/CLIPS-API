'use strict';

const server = require('./server/server.js');

server.start();

module.exports = function(number) {
  return number * 2;
};
