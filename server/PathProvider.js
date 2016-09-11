/**
 * @file ./server/PathProvider./serverjs
 * @date Thu, 11 Aug 2016 20:12:54 +0200
 * @version 1.0
 * @author Tommaso Panozzo
 *
 * gestisce la richiesta di percorso
 */
'use strict';

var db = require('./DBHandler.js');
const fs = require('fs-promise');
const testPath = require('./config.js').proofPath;
const algorithmPath = require('./config.js').algorithmPath;

function Error(code, debug, info, user) {
   return {
      errorCode: code,
      debugMessage: debug,
      errorInfo: info,
      userMessage: user
   };
};

function PathHandler() {

   this.execute = function (pathID) {

      this.getPath(pathID).then(function(path) {
         this.response.status(200).send(path);
      }.bind(this), function(error) {
         console.error('got client error: ', error);
         var errorCode = error.errorCode;
         if (!errorCode) {
            errorCode = 506;
         }
         this.response.status(errorCode).send(error);
      }.bind(this));
   };

   this.getBeacon = function(beaconID) {
      return new Promise(function(resolve, reject) {
         var query = db().select().from('Beacon').where({id: beaconID});
         query.then(function(beacons) {
            if (beacons.length == 1) {
               resolve(beacons[0]);
            } else if (beacons.length == 0) {
               reject(Error(461, 'Unable to find beacon with id ' + beaconID, null, null));
            } else {
               reject(Error(505, 'Id should uniquely identify beacons', null, null));
            }
         }, function(error) {
            reject(Error(505, 'Error querying for beacon', error, null));
         });
      });
   };

   this.getPath = function(pathID) {
      return new Promise(function(resolve, reject) {
         var query = db().select().from('Path').where({id: pathID});
         query.then(function(paths) {
            if (paths.length == 1) {
               var path = paths[0];
               this.getSteps(path).then(function(steps) {
                  path.steps = steps;
                  resolve(path);
               }, reject);
            } else if (paths.length == 0) {
               reject(Error(461, 'Unable to find path with id '+ pathID, null, null));
            } else {
               reject(Error(505, 'id should uniquely identify paths', null, null));
            }
         }.bind(this), function(error) {
            reject(Error(505, 'Error querying for path', error, null))
         });
      }.bind(this));
   };

   this.getSteps = function(path) {
      return new Promise(function(resolve, reject) {
         var query = db().select().from('Step').where({pathID: path.id});
         query.then(function(steps) {
            var fulfilledSteps = [];
            steps.sort(function(a,b) { return a.position - b.position });
            for (var step of steps) {
               var p = this.fulfilledStep(step);
               fulfilledSteps.push(p);
            }
            Promise.all(fulfilledSteps).then(function(steps) {
               resolve(steps);
            }, reject);
         }.bind(this), reject);
      }.bind(this));
   };

   this.getProof = function(step) {
      return new Promise(function(resolve, reject) {
         var query = db().select().from('Proof').where({id: step.proofID});
         query.then(function(proofs) {
            if (proofs.length == 1) {
               var proof = proofs[0];
               this.fulfilledProof(proof).then(resolve, reject);
            } else if (proofs.length == 0) {
               reject(Error(461, 'unable to find proof with id '+ step.proofID, null, null));
            } else {
               reject(Error(505, 'id should uniquely identify proofs', null, null));
            }
         }.bind(this), function(error) {
            reject(Error(505, 'Error querying for proof', error, null));
         });
      }.bind(this));
   };

   this.getProximities = function(step) {
      return new Promise(function(resolve, reject) {
         var query = db().select().from('Proximity').innerJoin('StepProximity','StepProximity.proximityID', 'Proximity.id').where({
            stepID: step.id
         });
         query.then(function(proximities) {
            var promises = [];
            for (var proximity of proximities) {
               var p = this.fulfilledProximity(proximity);
               promises.push(p);
            }
            Promise.all(promises).then(function(proximities) {
               resolve(proximities);
            }, reject);
         }.bind(this), function(error) {
            reject(Error(505, 'Error querying for proximities', error, null));
         });
      }.bind(this));
   };

   this.fulfilledProximity = function(proximity) {
      var context = {
         proximity: proximity,
         this: this
      };
      return new Promise(function(resolve, reject) {
         var beaconID = proximity.beaconID;
         if (beaconID) {
            var beacon = context.this.getBeacon(proximity.beaconID);
            Promise.all([beacon]).then(function([beacon]) {
               var proximity = context.proximity;
               proximity.beacon = beacon;
               resolve(proximity);
            }.bind(context), reject);
         } else {
            resolve(proximity);
         }
      }.bind(context));
   };

   this.fulfilledStep = function(step) {
      var context = {
         step: step,
         this: this
      };
      return new Promise(function(resolve, reject) {
         var beacon = context.this.getBeacon(step.stopBeaconID);
         var proof  = context.this.getProof(step);
         var proximities = context.this.getProximities(step);
         Promise.all([beacon, proof, proximities]).then(function([beacon, proof, proximities]) {
            var step = context.step;
            step.stopBeacon = beacon;
            step.proof = proof;
            step.proximities = proximities;
            resolve(step);
         }.bind(context), reject);
      }.bind(context));
   };

   this.fulfilledProof = function(proof) {
     var context = {
       proof: proof,
       this:  this
     };
     return new Promise(function(resolve, reject) {
       var test = context.this.getTest(proof);
       var algorithm = context.this.getAlgorithm(proof);
       Promise.all([test, algorithm]).then(function([test, algorithm]) {
         var proof = context.proof;
         proof.test = test;
         proof.algorithm = algorithm;
         resolve(proof);
       }.bind(context), reject);
     }.bind(context));
   }

   this.getTest = function(proof) {
     return new Promise(function(resolve, reject) {
       fs.readFile(testPath+proof.testData, {encoding: 'utf8'}).then(function(content){
         resolve(JSON.parse(content));
       }, function(error) {
         reject(Error(505, 'unable to read from file '+testPath+proof.testData, error, null));
      });
     });
   };

   this.getAlgorithm = function(proof) {
     return new Promise(function(resolve, reject) {
       fs.readFile(algorithmPath+proof.scoringAlgorithmData, {encoding: 'utf8'}).then(function(content){
         resolve(JSON.parse(content));
       }, function(error) {
         reject(Error(505, 'unable to read from file '+algorithmPath+proof.scoringAlgorithmData, error, null));
      });
     });
   };
};

module.exports = PathHandler;
