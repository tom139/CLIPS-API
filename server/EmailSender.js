'use strict';

const nodemailer = require('nodemailer');
const config     = require('./config.js');

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
            console.log('email sender will reject');
            reject(error);
         } else {
            console.log('email sender will resolve');
            resolve(info);
         }
      });
   });
};

module.exports = sendMail;
