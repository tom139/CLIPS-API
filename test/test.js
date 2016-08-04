'use strict';

const request = require('request-promise');
const expect = require('chai').expect;
const index = require('./../index.js');

const host = '52.58.6.246';
const port = 1234;

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
   it('should be false', function() {
      expect(false).to.equal(false);
   });
});
