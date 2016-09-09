/**
 * @file ./server/RegistrationFieldsValidator.js
 * @date Thu, 11 Aug 2016 20:12:54 +0200
 * @version 1.0
 * @author Tommaso Panozzo
 *
 * DescrizioneDelFile
 */
'use strict';

const Email    = require('./utility/EmailChecker.js');
const Password = require('./utility/PasswordChecker.js');
const Username = require('./utility/UsernameChecker.js');

function checkEmail(email) {
   return new Promise(function(resolve, reject) {
      if (!email) {
         resolve({
            isValid: false,
            reason: 'field not set',
            debugMessage: 'field not set'
         });
      } else {
         Email.checkEmail(email).then(function(isValid) {
            if (isValid) {
               resolve({
                  isValid: true
               });
            } else {
               resolve({
                  isValid: false,
                  reason: 'invalid email',
                  debugMessage: 'invalid email',
                  userMessage: 'L\'indirizzo email inserito non è valido'
               });
            }
         }, function (error) {
            resolve({
               isValid: false,
               reason: 'C\'è un problema con il server, riprova più tardi',
               debugMessage: error.debugMessage,
               userMessage: 'C\'è un problema con il server, riprova più tardi',
               debugInfo: error
            });
         });
      }
   });
}

function checkPassword(password) {
   return new Promise(function(resolve, reject) {
      if (!password) {
         resolve({
            isValid: false,
            reason: 'field not set',
            debugMessage: 'field not set'
         });
      } else {
         if (Password.isValid(password)) {
            resolve({
               isValid: true
            });
         } else {
            resolve({
               isValid: false,
               reason: 'invalid password',
               debugMessage: 'invalid password',
               userMessage: password.instructions
            });
         }
      }
   });
}

function checkUsername(username) {
   return new Promise(function(resolve, reject) {
      if (!username) {
         resolve({
            isValid: false,
            reason: 'field not set',
            debugMessage: 'field not set'
         });
      } else {
         Username(username).then(function(result) {
            if (result) {
               resolve({
                  isValid: true,
               });
            } else {
               resolve({
                  isValid: false,
                  reason: 'username is not available',
                  debugMessage: 'username is not available',
                  userMessage: 'L\'username ' + username + ' non è disponibile. Scegline un altro'
               });
            }
         }, function(error) {
            reject(error);
         });
      }
   });
}

function FieldsChecker() {
   this.execute = function() {
      const data = this.request.body;
      var customToken = data.customToken;
      var email = data.email;
      var password = data.password;
      var username = data.username;

      Promise.all([checkUsername(username), checkEmail(email), checkPassword(password)])
      .then(function ([username, email, password]) {
         this.response.status(200).send({
            customToken: customToken,
            username: username,
            email: email,
            password: password
         });
      }.bind(this), function(error) {
         console.error('error validating fields: ', error);
         this.response.status(505).send({
            errorCode: 505,
            debugMessage: 'Error validating fields',
            errorInfo: error
         });
      }.bind(this));
   }
};

module.exports = FieldsChecker;
