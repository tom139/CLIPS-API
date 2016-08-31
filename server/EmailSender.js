'use strict';

const nodemailer = require('nodemailer');
const config     = require('./config.js');

const transporter = nodemailer.createTransport('smtps://beaconstrips.swe%40gmail.com:beaconclips2016swe@smtp.gmail.com');

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
