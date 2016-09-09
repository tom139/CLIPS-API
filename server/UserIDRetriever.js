/**
 * @file ./UserIDRetriever.js
 * @date Wed, 3 Aug 2016 08:58:10 +0200
 * @version 1.0
 * @author Tommaso Panozzo
 *
 * DescrizioneDelFile
 */
'use strict';

var db = require('./DBHandler.js');

var checker = function(token) {
   var promise = new Promise(function(resolve, reject) {
      var query = db().select('userID').from('AuthToken').where({
         token: token
      })
      query.then(function(result){
         var first = result[0];
         if (first) {
            var id = first.userID;
            if (id) {
               resolve(id);
            } else {
               resolve(null);
            }
         } else {
            resolve(null);
         }
      }, function(error) {
         console.log('error: ', error);
         reject(error);
      })
   });
   return promise;
}

module.exports = checker;
