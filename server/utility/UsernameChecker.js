'use strict';

var db = require('../db.js');

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
