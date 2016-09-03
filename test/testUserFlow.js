'use strict';

const request = require('request-promise');
const expect = require('chai').expect;
const assert = require('chai').assert;
const config = require('./test_config.js');
const help   = require('./helperFunctions.js');

function clone(object) {
   return JSON.parse(JSON.stringify(object));
}

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

describe('# User Data Flow', function() {

   describe('create new user', function() {
      // tentativi errati di creazione di un nuovo utente
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
      // tentativo funzionante di creazione di un nuovo utente
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

   describe('user data change', function() {
      const newUserData = randomData();
      const modifyRequestWithBody = function(body) {
         return {
            uri: 'http://' + config.host + ':' + config.port + '/userData',
            method: 'POST',
            json: body,
            headers: {},
            resolveWithFullResponse : true
         };
      };
      var modifyRequest = modifyRequestWithBody({
         username: newUserData.username,
         oldPassword: userData.password,
         newPassword: newUserData.password,
         email: newUserData.email
      });
      const noToken = modifyRequest;
      const noOldPassword = modifyRequestWithBody({
         username: newUserData.username,
         newPassword: newUserData.password,
         email: newUserData.email
      });
      const noNewPassword = modifyRequestWithBody({
         username: newUserData.username,
         oldPassword: userData.password,
         email: newUserData.email
      });
      const duplicatedUsername = modifyRequestWithBody({
         username: userData.username
      });
      const invalidPassword = modifyRequestWithBody({
         oldPassword: userData.password,
         newPassword: ""
      });
      const invalidEmail = modifyRequestWithBody({
         email: "wrong email"
      });
      const failings = [noToken, noOldPassword, noNewPassword, duplicatedUsername, invalidEmail, invalidPassword];
      describe('failing attempts', function() {
         for (var attempt of failings) {
            it('should fail changing user\'s data', function() {
               return request(noToken)
               .then(function() {
                  assert(false);
               })
               .catch(function(response) {
                  assert(response.statusCode >= 400);
                  assert(response.statusCode <= 499);
               });
            });
         }
      });

      // tentativo corretto di modifica dei dati utente
      describe('working attempt', function() {
         it('should modify user data', function() {
            modifyRequest.headers['Authorization'] = userData.token;
            return request(modifyRequest)
            .then(function(response) {
               const body = response.body;
               // update userData
               userData.email = newUserData.email;
               userData.password = newUserData.password;
               userData.username = newUserData.username;

               // check for fields conformance to aspectations
               assert.equal(userData.email, body.email, 'email should match');
               assert.equal(userData.username, body.username, 'username should match');
               assert.equal(userData.password, body.password, 'password should match');
               assert.typeOf(userData.token, 'string');
               assert.typeOf(userData.email, 'string');
               assert.typeOf(userData.username, 'string');
            });
         });
      });
   });

   describe('login', function() {
      describe('failing attempts', function() {
         const makeRequestWithBody = function(body) {
            return {
               uri: 'http://' + config.host + ':' + config.port + '/login',
               method: 'GET',
               json: body,
               headers: {}
            };
         };
         const noPassword = makeRequestWithBody({
            email: userData.email
         });
         const noEmail = makeRequestWithBody({
            password: userData.password
         });
         const failings = [noPassword, noEmail];
         for (var fail of failings) {
            it('should fail', function() {
               return request(fail)
               .then(help.fail)
               .catch(help.shouldFail);
            });
         }
      });
   });

   describe('check data', function() {
      it('check user data', function() {
         const getUserData = {
            uri: 'http://' + config.host + ':' + config.port + '/userData',
            method: 'GET',
            json: true,
            headers: {
               'Authorization': userData.token
            }
         };
         return request(getUserData)
         .then(function(body) {
            assert.equal(userData.email, body.email, 'email should match');
            assert.equal(userData.username, body.username, 'username should match');
         });
      });
   });
});
