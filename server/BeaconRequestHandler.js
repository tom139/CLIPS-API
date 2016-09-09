/**
 * @file ./server/BeaconRequestHandler.js
 * @date Wed, 3 Aug 2016 08:58:10 +0200
 * @version 1.0
 * @author Tommaso Panozzo
 *
 * DescrizioneDelFile
 */
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
