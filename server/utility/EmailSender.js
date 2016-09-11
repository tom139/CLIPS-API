/**
 * @file ./server/utility/EmailSender.js
 * @date Wed, 31 Aug 2016 09:30:17 +0200
 * @version 1.0
 * @author Tommaso Panozzo
 *
 * Classe che invia email dall'indirizzo beaconstrips.swe@gmail.com
 */
'use strict';

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
   service: 'gmail',
   auth: {
      user: 'beaconstrips.swe@gmail.com',
      pass: 'beaconclips2016swe'
   }
});

function sendMail(mail) {
   var options = mail;
   options.from = '"BeaconStrips" <beaconstrips.swe@gmail.com>';
   return new Promise(function(resolve, reject) {
      transporter.sendMail(mail, function(error, info) {
         if (error) {
            reject(error);
         } else {
            resolve(info);
         }
      });
   });
};

module.exports = sendMail;
