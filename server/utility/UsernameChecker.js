/**
 * @file ./utility/UsernameCheck./serverr.js
 * @date Wed, 3 Aug 2016 08:58:10 +0200
 * @version 1.0
 * @author Tommaso Panozzo
 *
 * controlla che l'username sia valido e disponibile
 */
'use strict';

var db = require('../DBHandler.js');

function isAvailable(username) {
   var promise = new Promise(function(resolve, reject) {
      var query = db()('User').count('username').where({
         username: username
      });
      query.then(function(result) {
         var count = result[0]['count(`username`)'];
         var isNew = count == 0;
         resolve(isNew);
      }, function(error) {
         console.log('count error = ', error);
         reject(error);
      });
   });
   return promise;
};

module.exports = isAvailable;
