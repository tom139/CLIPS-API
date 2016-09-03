'use strict';

const request = require('request-promise');
const expect = require('chai').expect;
const assert = require('chai').assert;
const validator = require('email-validator');
const config = require('./test_config.js');
const help   = require('./helperFunctions.js');

const buildingsRequest = {
   uri: help.baseURI + '/buildings',
   method: 'POST',
   body: {
      latitude: 44.0,
      longitude: 11.5,
      maxResults: 10
   },
   json: true
};

var buildings = [];

describe('# Buildings', function() {

   describe('failing attempts', function() {
      const noLat = {
         uri: help.baseURI + '/buildings',
         method: 'POST',
         resolveWithFullResponse: true,
         json: {
            longitude: 11.5,
            maxResults: 10
         }
      };
      const noLong = {
         uri: help.baseURI + '/buildings',
         method: 'POST',
         resolveWithFullResponse: true,
         json: {
            latitude: 44.0,
            maxResults: 10
         }
      };
      const noResultsLimit = {
         uri: help.baseURI + '/buildings',
         method: 'POST',
         resolveWithFullResponse: true,
         json: {
            latitude: 44.0,
            longitude: 11.5,
         }
      };
      const failings = [noLong, noLat, noResultsLimit];
      for (var fail of failings) {
         it('should fail', function() {
            return request(fail)
            .then(help.fail)
            .catch(help.clientError)
         });
      }
   });

   describe('working attempt', function() {
      it('should return at least 1 building', function() {
         return request(buildingsRequest)
         .then(function(buildings) {
            expect(buildings.length > 0).to.equal(true);
            buildings = buildings;
         });
      });
   });

   describe('check buildings', function() {
      it('should be well formed', function() {
         for (const building of buildings) {
            expect(building.name).to.be.a('string');
            expect(building.description).to.be.a('string');
            expect(building.otherInfo).to.be.a('string');
            expect(building.openingTime).to.be.a('string');
            expect(building.address).to.be.a('string');
            expect(building.telephone).to.be.a('string');
            expect(building.email).to.be.a('string');
            assert(building.latitude >= -90 && building.latitude <= 90, true, 'latitude should be between -180 and +360');
            assert(building.longitude >= -180 && building.longitude <= 180, true, 'longitude should be between -180 and +360');
         }
      });
   });
});
