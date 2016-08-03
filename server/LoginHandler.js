'use strict';

var db = require('./db.js');
var URLRequestHandler = require('./URLRequestHandler.js');
var Token = require('./utility/TokenGenerator.js');

function BeaconRequest() {
   this.userID = function(email, password) {
      var promise = new Promise(function(resolve, reject){
         var query = db().select('id').from('User').where({
            email: email,
            password: password
         });
         query.then(function(result){
            if (result.hasOwnProperty(0) && result[0].hasOwnProperty('id')) {
               resolve(result[0]['id']);
            } else {
               resolve();
            }
         }, function(error) {
            console.log('failure with error ', error);
            reject(error);
         });
      });
      return promise;
   };

   /*

   this.checkIfTokenIsUnique = function(uuid) {
      var promise = new Promise(function(resolve, reject) {
         var query = db().count('id').from('AuthToken').where({
            token: uuid
         });
         query.then(function(result){
            console.log('checkIfTokenExists result = ', result);
            resolve(false);
         }, function(error){
            reject(error);
         })
      };
   };

   */

   // this.generateToken = function() {
   //    var uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
   //       var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
   //       return v.toString(16);
   //    });
   //    return uuid;
   // };

   /*

   this.getUniqueToken = function() {
      console.log('getUniqueToken');
      var promise = new Promise(function(resolve, reject){
         var uuid = this.generateToken();
         var query = db().count('id').from('AuthToken').where({
            token: uuid
         });
         query.then(function(result) {
            console.log('token exists = ', result);
            if (result) {
               resolve(uuid);
            } else {
               this.getUniqueToken.then(resolve, reject);
            }
         }, function(error) {
            console.log('error checking if token is unique: ', error);
         });
      });
      return promise;
   };

   */

   /*

   this.tokenIsUnique = function(token, isUnique) {
      var promise = new Promise(function(resolve, reject) {
         if (isUnique) {
            resolve(token);
         } else {
            var uuid = this.generateToken();
            this.checkIfTokenIsUnique(uuid).then(function(isUnique){

            }, function(error) {
               reject(error);
            }))
         }
      });
      return promise;
   }

   this.createToken = function() {
      var promise = new Promise(function(resolve, reject) {
         var uuid = this.generateToken;
         this.checkIfTokenExists(uuid).then(function(exists){
            if (exists) {
               resolve(uuid);
            } else {
               var newUUID = this.generateToken;
               checkIfTokenExists(newUUID
            }
         }, function(error) {

         });
      })
   };

   */

   this.execute = function() {
      var email = this.request.body.email;
      var password = this.request.body.password;
      // console.log('email = ', email, '\npassword = ', password);
      var handler = this;
      this.userID(email, password).then(function(userID) {
         if (userID) {
            // console.log('esiste e l\'id è', userID);
            // console.log('this = ', handler);
            var token = Token.generate();
            var query = db()('AuthToken').insert({
               token: token,
               userID: userID,
               expirationDate: '2016-12-31'
            });
            query.then(function(result) {
               // console.log('il token appena generato è ', token);

               // ottengo i dati (username e email) da tornare all'utente
               var context = {
                  response: handler.response,
                  token: token
               }
               var userDataQuery = db().from('User').where({
                  id: userID
               });
               userDataQuery.then(function(result) {
                  if (result.hasOwnProperty(0)) {
                     var data = result[0];
                     var userData = {
                        username : data.username,
                        email    : data.email,
                        id       : data.id,
                        creation : data.creationDate,
                        modification : data.modificationDate
                     };
                     context.response.status(200).send({
                        token: context.token,
                        userData: userData
                     });
                  } else {
                     console.error('unable to get user with ID (', id, ') after saving a new token');
                     context.response.status(505).send({
                        errorCode: 505,
                        debugMessage: 'dopo aver creato ed inserito il nuovo token per l\'utente, non sono più in grado di trovare i dati per l\'utente'
                     });
                  }
               }.bind(context), function(error) {
                  console.error('error looking for user\'s data after inserting a new token');
                  response.status(505).send({
                     errorCode: 505,
                     debugMessage: 'error looking for user\'s data after inserting a new token'
                  });
               }.bind(context))
            }, function(error) {
               console.error('error = ', error);
               handler.response.status(505).send({
                  errorCode: 505,
                  debugMessage: 'Errore cercando l\'userID dell\'utente che prova a fare il login'
               });
            })
         } else {
            console.log('l\'utente non esiste!');
            handler.response.status(401).send({
               message: "l'utente non esiste"
            });
         }
      }, function(error) {
         console.error('error = ', error);
      });
   };
}

BeaconRequest.prototype = new URLRequestHandler;

module.exports = BeaconRequest;
