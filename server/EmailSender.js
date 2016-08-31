'use strict';

const nodemailer = require('nodemailer');
const config     = require('./config.js');

const transporter = nodemailer.createTransport('smtps://beaconstrips.swe%40gmail.com:beaconclips2016swe@smtp.gmail.com');

transporter.sendMail(mail, function(error, info) {
   if (error) {
      console.error(error);
   }
   console.log('info:', info);
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
