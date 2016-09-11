/**
 * @file ./server/LoginHandler.js
 * @date Wed, 3 Aug 2016 08:58:10 +0200
 * @version 1.0
 * @author Tommaso Panozzo
 *
 * gestisce la richiesta di login
 */
'use strict';

var db = require('./DBHandler.js');
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

   this.execute = function() {
      var email = this.request.body.email;
      var password = this.request.body.password;
      var handler = this;
      var missingField = [];
      if (typeof email != 'string') {
         missingField.push('email');
      }
      if (typeof password != 'string') {
         missingField.push('password');
      }
      if (missingField.length > 0) {
         var debugMessage = '';
         for (var field of missingField) {
            debugMessage += missingField[1] + ' of type string is required\n';
         }
         const error = {
            errorCode: 460,
            debugMessage: debugMessage,
            errorInfo: {
               email: email,
               password: password
            }
         };
         this.response.status(460).send(error);
      } else {
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
               handler.response.status(460).send({
                  errorCode: 401,
                  debugMessage: "l'utente non esiste"
               });
            }
         }, function(error) {
            console.error('error = ', error);
            this.response.status(550).send({
               errorCode: 550,
               debugMessage: 'Error logging user',
               errorInfo: error
            });
         });
      }
   };
}

BeaconRequest.prototype = new URLRequestHandler;

module.exports = BeaconRequest;
