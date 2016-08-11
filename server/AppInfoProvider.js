'use strict';

var URLRequestHandler = require('./URLRequestHandler.js');

function AppInfoHandler(req, res) {

   this.execute   = function() {
      // rispondo con lo stato 200 e le info sull'app
      this.response.status(200).send({
         description  : 'Descrizione dell\'applicazione',
         websiteURL   : '52.58.6.246',
         supportemail : 'beaconstrips.swe@gmail.com',
         discoveryUUID: 'asdfhjlk-hjkl-fdas-jklh-fdas-fjdkalhd'
      });
   }
};

AppInfoHandler.prototype = new AppInfoHandler;

module.exports = AppInfoHandler;
