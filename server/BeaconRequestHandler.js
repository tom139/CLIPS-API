'use strict';

var SQLRequestHandler = require('./SQLRequestHandler.js');

function BeaconRequest() {
   this.queryFromRequest = function() {
      return {
         select : '*',
         from   : 'Beacon'
      };
   };
}

BeaconRequest.prototype = new SQLRequestHandler;

module.exports = BeaconRequest;
