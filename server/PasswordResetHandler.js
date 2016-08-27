'use strict';

const db = require('./DBHandler.js');

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
      console.log('should send email to:', sendingData.email);
      console.log('with password: ', sendingData.password);
      reject(Error(552, 'Sending function doesn\'t work yet.', 'L\'opzione di invio della nuova password per email non è ancora disponibile, puoi usare la password: ' + sendingData.password, sendingData));
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
      this.getEmail()
      .then(setNewPassword, this.sendError)
      .then(sendEmail, this.sendError)
      .then(this.success, this.sendError)
   };

   this.sendError = function(error) {
      console.error('from response : ', this.response);
      console.error('should send error', error);
      this.response.status(error.errorCode).send(error);
   }

   this.success = function() {
      this.response.status(200).send();
   }

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
