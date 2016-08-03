'use strict';

var db = require('./db.js');

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

      /*
      this.getPath(pathID).then(function (path) {
         this.response.status(200).send(path);
      }.bind(this), function(error) {
         this.response.status(error.errorCode).send(error);
      });
      */

      /*
      this.getPath(pathID).then(function(path) {
         console.log('got path with id', path.id);
         this.setSteps(path).then(function(path) {
            this.response.status(200).send(path);
         }.bind(this), this.handleError);
      }.bind(this), this.handleError.bind(this));
      */
   };

   /*
   this.handleError = function(error) {
      console.error('got ERROR: ', error);
      var errorCode = error.errorCode;
      if (!errorCode) {
         errorCode = 506;
      }
      console.log('this:', this);
      this.response.status(errorCode).send(error);
   };
   */

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
               resolve(proofs[0]);
            } else if (proofs.length == 0) {
               reject(Error(461, 'unable to find proof with id '+ step.proofID, null, null));
            } else {
               reject(Error(505, 'id should uniquely identify proofs', null, null));
            }
         }, function(error) {
            reject(Error(505, 'Error querying for proof', error, null));
         });
      });
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
   }

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

   /*
   this.getBeacon = function(beaconID) {
      return new Promise(function(resolve, reject) {
         console.log('called getBeacon('+beaconID+')');
         var query = db().select().from('Beacon').where({
            id: beaconID
         });
         query.then(function(beacons){
            if (beacons.length == 1) {
               resolve(beacons[0]);
            } else {
               reject(Error(505, 'there should be ONE beacon with id '+beaconID, beacons, null));
            }
         }, reject);
      });
   };

   this.getProof = function(step) {
      console.log('get proof for step',step);
      var context = {
         this : this,
         proof: step.proofID
      };
      return new Promise(function(resolve, reject) {
         var query = db().select().from('Proof').where({
            id: context.proof
         });
         query.then(function(proofs) {
            console.log('banana cocco baobab with proofs = ', proofs);
            console.log('didQuery with this = ', this);
            if (proofs.length == 1) {
               resolve(proofs[0]);
            } else {
               reject(Error(505, 'there should be ONE proof with id '+step.proofID, proofs, null));
            }
         }, function(error) {
            console.error('getProof failed with error = ', error);
            reject(error);
         });
      }.bind(context));
   };

   this.getProximities = function(step) {
      return new Promise(function(resolve, reject) {
         var query = db().select().from('Proximity');
         query.then(function(proximities) {
            var promises = [];
            for (pro of proximities) {
               var context = {
                  this: this,
                  proximity: pro
               };
               var p = new Promise(function(resolve, reject) {
                  context.this.getBeacon(pro.beaconID).then(function(beacon) {
                     var newPro = context.proximity;
                     newPro.beacon = beacon;
                     resolve(newPro);
                  }.bind(context), reject);
               }.bind(context), reject);
            }
            Promise.all(promises).then(resolve, reject);
         }.bind(this), reject);
      }.bind(this));
   };

   this.getSteps = function (path) {
      return new Promise(function(resolve, reject) {
         var query = db().select().from('Step').where({
            pathID: path.id
         });
         query.then(function(steps) {
            console.log('found steps: ', steps);
            var promises = [];
            for (var step of steps) {
               var context = {
                  this: this,
                  step: step
               };
               var pro = new Promise(function(resolve, reject) {
                  var beacon = context.this.getBeacon(context.step.stopBeaconID);
                  var proof  = context.this.getProof(context.step);
                  console.log('proof = ',proof);
                  Promise.all([beacon, proof]).then(function([beacon, proof]) {
                     console.log('did Promise.all');
                     var step = context.step;
                     step.stopBeacon = beacon;
                     step.proof = proof;
                     resolve(context.step);
                  }.bind(context), reject);
               }.bind(context));
               promises.push(pro);
            }
            Promise.all(promises).then(function(steps) {
               resolve(steps);
            }, reject);
         }.bind(this), reject);
      }.bind(this));
   }

   this.getPath = function (pathID) {
      return new Promise(function(resolve, reject) {
         var query = db().select().from('Path').where({
            id: pathID
         });
         query.then(function(paths) {
            if (paths.length == 1) {
               var path = paths[0]
               this.getSteps(path).then(function(steps) {
                  path.steps = steps;
                  resolve(path);
               }, reject);
            } else {
               console.error('error: too many paths: ' + paths);
               reject();
            }
         }.bind(this), reject);
      }.bind(this));
   };

   */

   /*

   this.getPath = function(pathID) {
      return new Promise(function(resolve, reject) {
         var query = db().select().from('Path').where({
            id: pathID
         });
         query.then(function(result) {
            if (result.length == 1) {
               resolve(result[0]);
            } else if (result.length == 0) {
               reject(Error(462, 'no path with id ' + pathID, null, null));
            } else {
               reject(Error(505, 'multiple paths with id ' + pathID, null, null));
            }
         }.bind(this), function (error) {
            reject(Error(505, 'unable to look for path with id ' + pathID, error, null));
         });
      }.bind(this));
   };

   this.getSteps = function(path) {
      return new Promise(function(resolve, reject) {
         var query = db().select().from('Step').where({
            pathID: path.id
         });
         query.then(function(steps) {
            var promises = [];
            for (var step of steps) {
               var p = new Promise(function(resolve, reject) {
                  console.log('will get beacon for step: ', step);
                  this.getBeacon(step.stopBeaconID).then(function(beacon) {
                     step.beacon = beacon;
                     resolve(step);
                  }.bind(step), reject);
               }.bind(this));
               promises.push(p);
            }
            Promise.all(promises).then(function(steps) {
               console.log('got all steps with beacons: ', steps);
               resolve(steps);
            }, reject);
         }.bind(this), function(error) {
            reject(Error(505, 'unable to look for steps for path with id ' + path.id, error, null))
         });
      }.bind(this));
   };

   this.setSteps = function(path) {
      return new Promise(function(resolve, reject) {
         this.getSteps(path).then(function(steps) {
            var promises = [];
            for (step of steps) {
               var pro = new Promise(function(resolve, reject) {
                  console.log('will set proof and proximities for step:', step);
                  this.setProof(step).then(function(step) {
                     this.setProximities(step).then(function(step) {
                        console.log('did set proof and proximities for step: ', step);
                        resolve(step);
                     }.bind(this), reject);
                  }.bind(this), reject);
               }.bind(this));
               promises.push(pro);
            }
            Promise.all(promises).then(function(steps) {
               path.steps = steps;
               console.log('will resolve path: ', path);
               resolve(path);
            }.bind(this), reject);
         }.bind(this), reject);
      }.bind(this));
   };

   this.getProof = function(step) {
      return new Promise(function(resolve, reject) {
         var query = db().select().from('Proof').where({
            stepID : step.id
         });
         query.then(function(proofs) {
            console.log('did get proofs: ', proofs);
            if (proofs.length == 1) {
               resolve(proof[0]);
            } else {
               reject(Error(505, 'there should be ONE proof for step ' + step.id + 'but are' + proofs.length, null, null));
            }
         }.bind(this), function(error) {
            reject(Error(505, 'unable to look for proofs for step with id ' + step.id, error, null));
         });
      }.bind(this));
   };

   this.setProof = function(step) {
      return new Promise(function(resolve, reject) {
         this.getProof(step).then(function(proof) {
            step.proof = proof;
            resolve(step);
         }.bind(this), reject);
      }.bind(this));
   };

   this.getProximities = function(step) {
      return new Promise(function(resolve, reject) {
         var query = db().select().from('Proximity').where({
            stepID : step.id
         });
         query.then(function(proximities) {
            resolve(proximities);
         }.bind(this), function(error) {
            reject(Error(505, 'unable to look for proximities for step with id ' + step.id, error, null));
         });
      }.bind(this));
   };

   this.setProximities = function(step) {
      return new Promise(function(resolve, reject) {
         this.getProximities(step).then(function(proximities) {
            var promises = [];
            for (proximity of proximities) {
               const promise = this.setBeacon(proximity);
               promises.push(promise);
            }
            Promise.all(promises).then(function(proximities) {
               step.proximities = proximities;
               resolve(step);
            }, reject);
         }.bind(this), reject);
      }.bind(this));
   };

   this.getBeacon = function(beaconID) {
      console.log('will get beacon with id ', beaconID);
      return new Promise(function(resolve, reject) {
         var query = db().select().from('Beacon').where({
            id: beaconID
         });
         query.then(function(beacons) {
            if (beacons.length == 1) {
               resolve(beacons[0]);
            } else {
               reject(Error(550, 'unable to find beacon with ID '+ beaconID, null, null));
            }
         }, function(error) {
            reject(Error(505, 'unable to look for beacon with id ' + beaconID, error, null));
         });
      }.bind(beaconID));
   };

   this.setBeacon = function(proximity) {
      return new Promise(function(resolve, reject) {
         this.getBeacon(proximity.beaconID).then(function(beacon) {
            proximity.beacon = beacon;
            resolve(proximity);
         }.bind(proximity), reject);
      }.bind(this));
   };

   */
};

module.exports = PathHandler;
