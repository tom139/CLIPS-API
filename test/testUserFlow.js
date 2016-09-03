'use strict';

const request = require('request-promise');
const expect = require('chai').expect;
const assert = require('chai').assert;
const config = require('./test_config.js');

function randomUsername() {
   var username = 'test_xxxx'.replace(/[x]/g, function(c) {
      var r = Math.random()*16|0;
      return r.toString(16);
   });
   return username;
}

const testPass = 'test-passw0rd';

function randomData() {
   const username = randomUsername();
   return {
      email: username + '@test.com',
      password: testPass,
      username: username
   };
}

var userData = randomData();

const registrationuri = 'http://' + config.host + ':' + config.port + '/newUser';

const registration = {
   method: 'POST',
   resolveWithFullResponse: true,
   uri: registrationuri,
   json: userData
};

const noUsername = {
   method: 'POST',
   resolveWithFullResponse: true,
   uri: registrationuri,
   json: {
      email: userData.email,
      password: userData.password
   }
};

const noPassword = {
   method: 'POST',
   resolveWithFullResponse: true,
   uri: registrationuri,
   json: {
      email: userData.email,
      username: userData.username
   }
}

const noEmail = {
   method: 'POST',
   resolveWithFullResponse: true,
   uri: registrationuri,
   json: {
      password: userData.password,
      username: userData.username
   }
}

const failings = [noUsername, noPassword, noEmail];

describe('# Registration', function() {

   describe('failing attempts', function() {
      for (var fail of failings) {
         it('failing registration attempt', function() {
            return request(fail)
            .then(function() {
               assert(false);
            })
            .catch(function(response) {
               assert(response.statusCode >= 400 && response.statusCode <= 499);
            });
         });
      }
   });


   describe('working attempt', function() {
      it('should create new user', function() {
         return request(registration)
         .then(function(response) {
            const createdUser = response.body.userData;
            userData.token = response.body.token;
            assert.equal(userData.email, createdUser.email, 'email should match');
            assert.equal(userData.username, createdUser.username, 'username should match');
            assert.typeOf(userData.token, 'string');
            assert.typeOf(userData.email, 'string');
            assert.typeOf(userData.username, 'string');
         });
      });
   });
   
});
