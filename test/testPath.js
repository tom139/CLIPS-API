/**
 * @file ./test/testPath.js
 * @date Sat, 3 Sep 2016 13:43:17 +0200
 * @version 1.0
 * @author Tommaso Panozzo
 *
 * Test della richiesta di percorsi
 */
'use strict';

const request = require('request-promise');
const expect = require('chai').expect;
const assert = require('chai').assert;
const validator = require('email-validator');
const config = require('./test_config.js');
const help   = require('./helperFunctions.js');

const testPathID = 5;

const pathRequest = {
   uri: help.baseURI + '/path/' + testPathID,
   method: 'GET',
   json: true
};

var path = {};

describe('# Path', function() {

   describe('failing attempts', function() {
      const noID = {
         uri: help.baseURI + '/path/',
         method: 'GET',
         resolveWithFullResponse: true
      };
      const wrongID = {
         uri: help.baseURI + '/path/327168326816328716',
         method: 'GET',
         resolveWithFullResponse: true
      };
      const failings = [noID, wrongID];
      for (var fail of failings) {
         it('should fail', function() {
            return request(fail)
            .then(help.fail)
            .catch(help.clientError);
         });
      }
   });

   describe('working attempt', function() {
      it('should return path with id ' + testPathID, function() {
         return request(pathRequest)
         .then(function(p) {
            path = p;
         })
         .catch(function(error) {
            assert.fail("unabel to get path beacause of error:", error);
         });
      });
   });

   describe('check path', function() {
      it('should be well formed', function() {
         expect(path.id).to.be.a('Number').and.to.be.equal(testPathID);
         expect(path.title).to.be.a('string').and.to.not.equal('');
         expect(path.description).to.be.a('string').and.to.not.equal('');;
         expect(path.target).to.be.a('string');
         expect(path.estimatedDuration).to.be.a('string');
         expect(path.startingMessage).to.be.a('string');
         expect(path.rewardMessage).to.be.a('string');
         expect(path.position).to.be.a('Number');
         expect(path.buildingID).to.be.a('Number');
         const steps = path.steps;
         expect(steps).to.be.an('array');
         for (const step of steps) {
            expect(step.id).to.be.a('Number');
            expect(step.stopBeaconID).to.be.a('Number');
            expect(step.proofID).to.be.a('Number');
            expect(step.pathID).to.be.a('Number');
            expect(step.position).to.be.a('Number');
            expect(step.helpText).to.be.a('string');
            const stopBeacon = step.stopBeacon;
            expect(stopBeacon.id).to.be.a('Number');
            expect(stopBeacon.minor).to.be.a('Number').and.to.be.least(0).and.to.be.most(65535);
            expect(stopBeacon.major).to.be.a('Number').and.to.be.least(0).and.to.be.most(65535);
            expect(stopBeacon.UUID).to.be.a('string').and.to.have.lengthOf(36);
            const proof = step.proof;
            expect(proof.id).to.be.a('Number');
            expect(proof.id).to.be.a('Number');
            expect(proof.test).to.not.be.equal('undefined');
            expect(proof.algorithm).to.not.be.equal('undefined');
         }
      });
   });
});
