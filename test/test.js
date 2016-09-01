'use strict';

const request = require('request-promise');
const expect = require('chai').expect;
const assert = require('chai').assert;
const validator = require('email-validator');
const index = require('./../index.js');
const config = require('./test_config.js');

const host = config.host;
const port = config.port;

const appinfo = {
   uri: 'http://' + host + ':' + port + '/appinfo',
   json: true
};

describe('# AppInfo', function() {
   it('request AppInfo', function() {
      return request(appinfo)
      .then(function(response) {
         describe('should return website URL', function() {
            it('website URL is string', function() {
               expect(response.websiteURL).to.be.a('string');
            });
         });
         describe('should return description', function() {
            it('description is string', function() {
               expect(response.description).to.be.a('string');
            });
         });
         describe('should return support email', function() {
            const email = response.supportemail
            it('* email is string', function() {
               expect(email).to.be.a('string');
            });
            it('* email is valid', function() {
               expect(validator.validate(email)).to.equal(true);
            });
         });
         describe('should return discovery UUID', function() {
            const uuid = response.discoveryUUID;
            it('* UUID is string', function() {
               expect(uuid).to.be.a('string');
            });
            it('* UUID have length 37', function() {
               expect(uuid).to.have.length(37);
            });
         });
      });
   });
});

const buildings = {
   uri: 'http://' + host + ':' + port + '/buildings',
   method: 'POST',
   body: {
      latitude: 44.0,
      longitude: 11.5,
      maxResults: 10
   },
   json: true
};

describe('# Buildings', function() {
   it('request Buildings', function() {
      return request(buildings)
      .then(function(buildings) {
         it('there should be at least 1 building', function() {
            expect(buildings.length > 0).to.equal(true);
         });
         for (const building of buildings) {
            describe('check buiding', function() {
               it('name', function() {
                  expect(building.name).to.be.a('string');
               });
               it('description', function() {
                  expect(building.description).to.be.a('string');
               });
               it('otherInfo', function() {
                  expect(building.otherInfo).to.be.a('string');
               });
               it('openingTime', function() {
                  expect(building.openingTime).to.be.a('string');
               });
               it('address', function() {
                  expect(building.address).to.be.a('string');
               });
               it('telephone', function() {
                  expect(building.telephone).to.be.a('string');
               });
               it('email', function() {
                  expect(building.email).to.be.a('string');
               });
               it('latitude', function() {
                  assert(building.latitude >= -180 && building.latitude <= 360, true, 'latitude should be between -180 and +360');
               });
               it('longitude', function() {
                  assert(building.longitude >= -180 && building.longitude <= 360, true, 'longitude should be between -180 and +360');
               });
            });
         }
      });
   });
});

require('./testUserFlow');
