/**
 * @file ./server/PathResultsProvider.js
 * @date Thu, 11 Aug 2016 20:12:54 +0200
 * @version 1.0
 * @author Tommaso Panozzo
 *
 * gestisce la richiesta di risultati di un percorso
 */
 'use strict';

var userID = require('./UserIDRetriever.js');
var db = require('./DBHandler.js');
var UserID = require('./utility/UserID.js').userID;
var URLRequestHandler = require('./URLRequestHandler.js');

function PathsResultsHandler() {
   this.execute = function() {
      var token = this.token();
      if (token) {
         var id = userID(token);
         id.then(function(id) {
            if (id) {
               var pathsQuery = db().select().from('PathResult').where({
                  userID: id
               });
               pathsQuery.then(function(pathsResults) {
                  var promises = [];
                  var pathInfos = [];
                  for (var path of pathsResults) {
                     var promise = new Promise(function(resolve, reject) {
                        var proofsQuery = db().select().from('ProofResult').where({
                           pathResultID: path.id
                        });
                        var pathInfoQuery = db().select('title', 'buildingID').from('Path').where({
                           id: path.pathID
                        });
                        var context = path;
                        Promise.all([proofsQuery, pathInfoQuery]).then(function([proofResults, pathInfos]) {
                           context.proofResults = proofResults;
                           var pathInfo = pathInfos[0];
                           context.pathTitle = pathInfo.title;
                           var path = context;
                           db().select().from('Building').where({id:pathInfo.buildingID}).then(function(buildings) {
                              path.buildingName = buildings[0].name;
                              resolve(path);
                           }/*.bind(path)*/, reject.bind(this));
                        }/*.bind(path)*/, reject.bind(this));
                     }.bind(path));
                     promises.push(promise);
                  }
                  var all = Promise.all(promises);
                  var response = this.response;
                  all.then(function(pathsResults) {
                     response.status(200).send(pathsResults);
                  }.bind(response), function(error) {
                     console.error('error getting proof results: ', error);
                     response.status(550).send({
                        errorCode: 505,
                        debugMessage: 'Error getting proof results',
                        errorInfo: error
                     });
                  }.bind(response))
               }.bind(this), function(error) {
                  console.error('error getting paths results: ', error);
                  this.response.status(505).send({
                     errorCode: 505,
                     debugMessage: 'Error getting paths results',
                     errorInfo: error
                  });
               }.bind(this));
            } else {
               this.response.status(401).send({
                  message: 'il token ' + token + ' non esiste'
               });
            }
         }.bind(this), function(error) {
            console.log('error finding userId = ', error);
            this.response.status(500).send();
         }.bind(this));
      } else {
         console.log('no token');
         this.response.status(405).send({
            errorCode: 405,
            debugMessage: "non è stato fornito alcun token"
         });
      }
   }
}

PathsResultsHandler.prototype = new URLRequestHandler;

function SavePathsResultsHandler() {
   this.execute = function() {
      var token = this.token()
      if (!token) {
         this.request.status(460).send({
            errorCode: 401,
            debugMessage: 'You must provide a valid token',
         });
         return;
      }

      var userID = UserID(token);
      var fields = this.checkInputFields();

      Promise.all([userID, fields]).then(function([userID, fields]) {
         if (fields && userID) {
            fields.path.userID = userID;
            var context = {
               this: this,
               fields: fields
            };
            var save = new Promise(function(resolve, reject) {
               console.log('path to save = ', fields.path);
               var query = db()('PathResult').insert(fields.path)
               query.then(function(result) {
                  console.log('pathresult insert result = ', result);
                  var pathResultID = result[0];
                  var promises = [];
                  for (var proof of context.fields.proofs) {
                     proof.pathResultID = pathResultID;
                     var proofPromise = new Promise(function(resolve, reject) {
                        console.log('will insert proof = ', proof);
                        var q = db()('ProofResult').insert(proof);
                        q.then(resolve, reject);
                     });
                     promises.push(proofPromise);
                  }
                  Promise.all(promises).then(function(result) {
                     console.log('did insert new proofsresult with result: ', result);
                     context.this.response.status(200).send();
                     resolve();
                  }.bind(context), function(error) {
                     console.error('error saving new ProofResult: ', error);
                     context.this.response.status(505).send({
                        errorCode: 505,
                        debugMessage: 'Error saving new ProofResult',
                        debugInfo: error
                     });
                     reject();
                  }.bind(context))
               }.bind(context), function(error) {
                  console.error('error saving new PathResult: ', error);
                  context.this.response.status(505).send({
                     errorCode: 505,
                     debugMessage: 'Error saving new PathResult',
                     debugInfo: error
                  });
                  reject();
               }.bind(context));
            });
            save.then(function(){
               console.log('did save everything');
            });
         } else if (!userID) {
            console.error('given token is invalid');
         } else {
            console.error('fields invalid');
         }
      }.bind(this), function(error) {
         if (error.hasOwnProperty('requestError')) {
            var reqError = error.requestError
            this.response.status(reqError.errorCode).send(reqError);
            console.error('sending error: ', reqError);
         } else {
            console.error('unhandled error: ', error);
         }
      }.bind(this));
   };

   this.checkInputFields = function() {
      return new Promise(function(resolve, reject) {

         var data = this.request.body;
         var missingFields = [];

         var pathID = data.pathID;
         if (!pathID) {
            missingFields.push('pathID');
         }
         var startDate = data.startDate;
         if (!startDate) {
            missingFields.push('startDate');
         }
         var endDate = data.endDate;
         if (!endDate) {
            missingFields.push('endDate');
         }
         var score = data.score;
         if (!score) {
            missingFields.push('score');
         }
         var proofs = data.proofResults;
         if (!proofs) {
            missingFields.push('proofResults');
         }

         if (missingFields.length > 0) {
            console.error('missingFields: ', missingFields);
            this.response.status(461).send({
               errorCode: 461,
               errorMessage: missingFields[0] + ' is a required field',
               errorInfo: {
                  missingFields: missingFields
               }
            });
            resolve(null);
            return;
         }

         var pathData = {
            pathID: pathID,
            startDate: startDate,
            endDate: endDate,
            totalScore: score
         };

         var proofsData = [];

         console.log('proofs = ', proofs);

         for (var proof of proofs) {
            var proofID = proof.proofID;
            if (!proofID) {
               missingFields.push('proofID');
            }
            var startTime = proof.startTime;
            if (!startTime) {
               missingFields.push('startTime');
            }
            var endTime = proof.endTime;
            if (!endTime) {
               missingFields.push('endTime');
            }
            var proofscore = proof.score;
            if (!proof.hasOwnProperty('score')) {
               missingFields.push('score');
            }

            if (missingFields.length > 0) {
               console.error('missingFields: ', missingFields, ' in proof: ', proof);
               this.response.status(461).send({
                  errorCode: 461,
                  errorMessage: missingFields[0] + ' is a required field in proof',
                  errorInfo: {
                     proof: proof,
                     missingFields: missingFields
                  }
               });
               resolve(null);
               return;
            } else {
               proofsData.push({
                  proofID: proofID,
                  startTime: startTime,
                  endTime: endTime,
                  score: proofscore
               });
            }
         }
         resolve({
            path: pathData,
            proofs: proofsData
         });
      }.bind(this));
   };
};

SavePathsResultsHandler.prototype = new URLRequestHandler;

module.exports.get = PathsResultsHandler;
module.exports.set = SavePathsResultsHandler;
