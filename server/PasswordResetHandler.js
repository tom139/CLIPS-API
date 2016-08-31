'use strict';

const db = require('./DBHandler.js');
const emailSender = require('./PasswordResetEmailSender.js');

const possibleChars = 'abcdefghijklmnopqrstuvwxyz0123456789';
const charsCount = possibleChars.length;

function createPassword() {
   var password = '';
   for (var i=0; i<8; i++) {
      password += possibleChars.charAt(Math.floor(Math.random() * charsCount));
   }
   return password;
}

function Error(code, debug, user, info) {
   return {
      errorCode: code,
      debugMessage: debug,
      userMessage: user,
      debugInfo: info
   };
}

function sendEmail(sendingData) {
   //TODO: implementare il metodo che invia l'email
   return new Promise(function(resolve, reject) {
      emailSender(sendingData.password, sendingData.email)
      .then(function(info) {
         console.log('send email will resolve with resolve:', resolve);
         resolve();
      }.bind(resolve), function(error) {
         reject(Error(552, 'Sending function didn\'t work.', 'Purtruppo si è verificato un problema nell\'invio della nuova password alla tua casella e-mail, contattaci a beaconstrips.swe@gmail.com e risolveremo il problema!', error));
      }.bind(reject));
   });
}

function setNewPassword(email) {
   return new Promise(function(resolve, reject) {
      var newData = {};
      newData.password = createPassword();
      db()('User').update(newData).where({email:email})
      .then(function() {
         const sendingData = {
            email: email,
            password: newData.password
         };
         resolve(sendingData);
      }, function(error) {
         reject(Error(551, 'unable to save new data to the db', null, {newData: newData, knexError: error}));
      });
   });
}

function PasswordResetProvider() {
   this.execute = function() {
      const reject  = this.sendError;
      const success = this.success;
      this.getEmail()
      .then(setNewPassword, function(error) {
         console.error('should send error', error);
         this.response.status(error.errorCode).send(error);
      }.bind(this))
      .then(sendEmail, function(error) {
         console.error('should send error', error);
         this.response.status(error.errorCode).send(error);
      }.bind(this))
      .then(function() {
         this.response.status(200).send();
      }, function(error) {
         console.error('should send error', error);
         this.response.status(error.errorCode).send(error);
      }.bind(this));
   };

   // this.sendError = function(error) {
   //    console.error('should send error', error);
   //    this.response.status(error.errorCode).send(error);
   // }
   //
   // this.success = function() {
   //    this.response.status(200).send();
   // }

   this.getEmail = function() {
      const data = this.request.body;
      return new Promise(function(resolve, reject) {
         if (!data.hasOwnProperty('email')) {
            reject(Error(461, 'no email provided', null, null));
         } else {
            const email = data.email;
            db().select().from('User').where({email:email})
            .then(function(users) {
               if (users.length == 1) {
                  resolve(email);
               } else if (users.length == 0) {
                  reject(Error(462, 'email (' + email + ') not found in registered users', 'Nessun utente è registrato con l\'indirizzo email ' + email, null));
               } else {
                  reject(Error(551, 'multiple users associated with this email', null, null));
               }
            });
         }
      });
   };
};

module.exports = PasswordResetProvider;
