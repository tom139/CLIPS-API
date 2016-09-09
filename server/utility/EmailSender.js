/**
 * @file ./utility/EmailSender.js
 * @date Wed, 31 Aug 2016 09:30:17 +0200
 * @version 1.0
 * @author Tommaso Panozzo
 *
 * DescrizioneDelFile
 */
'use strict';

const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport('smtps://beaconstrips.swe%40gmail.com:beaconclips2016swe@smtp.gmail.com');
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
