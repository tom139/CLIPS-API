'use strict';

var db = require('../DBHandler.js');

function userIDFromToken(token) {
   var prom = new Promise(function(resolve, reject) {
      var query = db().select().from('AuthToken').where({
         token: token
      });
      query.then(function(result) {
         if (result.length < 1) {
            console.error('error: no results for token (',token,'): ', error);
            reject({
               requestError: {
                  errorCode: 461,
                  debugMessage: 'unknown token ' + token
               }
            });
         } else if (result.length > 1) {
            console.error('error: too many results for token (',token,'): ', error);
            reject({
               requestError: {
                  errorCode: 505,
                  debugMessage: 'multiple IDs with token ' + token
               }
            });
         } else {
            resolve(result[0]['userID']);
         }
      }.bind(token), function(error) {
         console.error('error looking for token (',token,'): ', error);
         reject({
            requestError: {
               errorCode: 505,
               debugMessage: 'unable to search for token ' + token,
               debugInfo: error
            }
         });
      });
   });
   return prom;
}

module.exports.userID = userIDFromToken;
