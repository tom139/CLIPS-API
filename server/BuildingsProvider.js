/**
 * @file ./server/BuildingsProvider.js
 * @date Thu, 11 Aug 2016 20:12:54 +0200
 * @version 1.0
 * @author Tommaso Panozzo
 *
 * DescrizioneDelFile
 */
'use strict';

var db = require('./DBHandler.js');
var URLRequestHandler = require('./URLRequestHandler.js');

function distance(client, building) {
   var R = 6371e3; // metres
   var φ1 = Math.PI * client.latitude / 180;
   var φ2 = Math.PI * building.latitude / 180;
   var Δφ = Math.PI * (building.latitude-client.latitude) / 180;
   var Δλ = Math.PI * (client.longitude-building.longitude) / 180;

   var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
   var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

   var d = R * c;

   return d;
}

function BuildingsHandler() {
   // this.queryFromRequest = function() {
   //    return {
   //       select : '*',
   //       from   : 'Building'
   //    };
   //    //@TODO implementare la chiamata per verificare latitudine e longitudine
   // };

   this.addDistance = function(client, building) {
      building.distanceFromClient = distance(client, building);
   }

   this.execute = function() {

      var data = this.request.body;

      if (!data.hasOwnProperty('latitude')) {
         this.response.status(461).send({
            errorCode: 461,
            debugMessage: 'missing field: latitude',
         });
      }
      if (!data.hasOwnProperty('longitude')) {
         this.response.status(461).send({
            errorCode: 461,
            debugMessage: 'missing field: longitude',
         });
      }
      if (!data.hasOwnProperty('maxDistance') && !data.hasOwnProperty('maxResults')) {
         this.response.status(461).send({
            errorCode: 461,
            debugMessage: 'missing field: maxDistance OR maxResults MUST be set',
         });
      }

      var latitude = data.latitude;
      var longitude = data.longitude;
      var maxDistance = data.maxDistance;
      var maxResults = data.maxResults;

      var client = {
         latitude: latitude,
         longitude: longitude
      };

      var distanceFilter = maxDistance ? function(building) {
         return building.distanceFromClient <= maxDistance;
      } : function(building) { return true; } ;

      var resultsCutter = function(buildings) {
         if (maxResults) {
            buildings.splice(maxResults, buildings.length);
         }
      };

      var addDistance = function(building) {
         this.addDistance(client, building);
      };

      var distanceSorter = function(a,b) {
         return a.distanceFromClient - b.distanceFromClient;
      };

      var context = {
         filter: distanceFilter,
         sort: distanceSorter,
         cutter: resultsCutter,
         response: this.response,
         addDistance: this.addDistance,
         client: client,
         addPathToBuildings: this.addPathToBuildings
      };

      var query = db().from('Building');
      query.then(function(result) {
         for (var building of result) {
            context.addDistance(client, building);
         }
         var buildings = result.filter(context.filter).sort(context.sort);
         context.cutter(buildings);
         var fillWithPaths = context.addPathToBuildings(buildings);
         fillWithPaths.then(function(buildings) {
            context.response.status(200).send(buildings);
         }.bind(context), function(error) {
            console.error('got error fulfilling buildings: ', error);
            context.response.status(505).send({
               errorCode: 505,
               debugMessage: 'error fulfilling buildings',
               debugInfo: error
            });
         }.bind(context));
      }.bind(context), function(error) {
         console.error('error getting buildings ', error);
         context.response.status(505).send({
            errorCode: 505,
            debugMessage: 'error getting buildings',
            debugInfo: error
         });
      }.bind(context));
   };

   this.addPathToBuildings = function (buildings) {
      var promises = [];
      for (let building of buildings) {
         // promises.push(this.buildingWithPaths(building));

         var promise = new Promise(function(resolve, reject) {
            var query = db().from('Path').where({buildingID : building.id});
            query.then(function(result) {
               building.paths = result;
               resolve(building);
            }.bind(building), function(error) {
               console.error('error getting paths for building: ', building, '\nERROR: ', error);
               reject(building);
            });
         });
         promises.push(promise);
      }
      return Promise.all(promises);
   };
};

BuildingsHandler.prototype = new URLRequestHandler;

module.exports = BuildingsHandler;
