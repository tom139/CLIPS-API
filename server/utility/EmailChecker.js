'use strict';

// const Regex = require('regex');
// const validEmail = new Regex([a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?);
//
// function EmailChecker(email) {
//    return validEmail.test(email);
// }

const validator = require('email-validator');
const db = require('DBHandler.js');

function EmailChecker(email) {
   return validator.validate(email);
};

function checkEmail(email) {
   return new Promise(function(resolve, reject) {
      if (!validator.validate(email)) {
         resolve(false);
      }
      db().select().from('User').where({
         email: email
      }).then(function(users) {
         if (users.length == 0) {
            resolve(true);
         } else {
            resolve(false);
         }
      }.bind(this), function(error) {
         console.error('Error querying the db for', email, 'uniqueness\nError:', error);
         reject({
            debugMessage: 'Error querying the db for ' + email + ' uniqueness',
            errorCode: 550,
            debugInfo: error
         });
      });
   });
};

module.exports.isValid = EmailChecker;
module.exports.checkEmail = checkEmail;
