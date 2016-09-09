/**
 * @file ./server/AppInfoProvider.js
 * @date Thu, 11 Aug 2016 20:12:54 +0200
 * @version 1.0
 * @author Tommaso Panozzo
 *
 * DescrizioneDelFile
 */
'use strict';

var URLRequestHandler = require('./URLRequestHandler.js');

function AppInfoHandler(req, res) {

   this.execute   = function() {
      // rispondo con lo stato 200 e le info sull'app
      this.response.status(200).send({
         description  : 'CLIPS è un progetto di Ingegneria del software, sviluppato dal team CLIPS il cui prodotto finale consisterà di un’applicazione mobile che, interagendo con dei beacons sparsi nell’area designata, guiderà l’utente attraverso un percorso. L’utente potrà completare il percorso superando tutte le prove che gli si presenteranno nelle diverse tappe. Le prove potranno essere degli indovinelli o dei semplici giochi inerenti all’area in cui si svolge il percorso.',
         websiteURL   : 'beaconstrips.tk',
         supportemail : 'beaconstrips.swe@gmail.com',
         discoveryUUID: 'f7826da6-4fa2-4e98-8024-bc5b71e0893e'
      });
   }
};

AppInfoHandler.prototype = new AppInfoHandler;

module.exports = AppInfoHandler;
