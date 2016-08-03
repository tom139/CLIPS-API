'use strict';

// const Regex = require('regex');
// const validEmail = new Regex([a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?);
//
// function EmailChecker(email) {
//    return validEmail.test(email);
// }

const validator = require('email-validator');

function EmailChecker(email) {
   return validator.validate(email);
}

module.exports.isValid = EmailChecker;
