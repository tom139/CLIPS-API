'use strict';

const db = require('./DBHandler.js');

function createResponseError(error, code, user, debugInfo) {
   return {
      errorCode: code,
      debugMessage: error,
      userMessage: user,
      debugInfo: debugInfo
   };
};

function GetUserData() {
   this.getUserID = function(token) {
      return new Promise(function(resolve, reject) {
         db().from('AuthToken').where({
            token: token
         }).then(function(authTokens) {
            if (authTokens.count == 1) {
               resolve(authTokens[0].userID);
            } else if (authTokens.count == 0) {
               const error = createResponseError('no userID associated with token ' + token, 461, null, null);
               reject(error);
            } else {
               const error = createResponseError('no multiple userID associated with token ' + token, 505, null, null);
               reject(error);
            }
         }, function(knexError) {
            const error = createResponseError('impossible to retrieve userID from token '+token, 550, null, knexError);
            reject(error);
         });
      });
   };

   this.userData = function(userID) {
      return new Promise(function(resolve, reject) {
         db().select('email', 'username').from('User').where({
            id: userID
         }).then(function(users) {
            if (users.count == 1) {
               resolve(users[0]);
            } else if (user.count == 0) {
               const error = createResponseError('no user associated with id ' + userID, 550, null, null);
               reject(error);
            } else {
               const error = createResponseError('no multiple users associated with id ' + userID, 505, null, null);
               reject(error);
            }
         }, function(knexError) {
            const error = createResponseError('impossible to retrieve user data from id '+userID, 550, null, knexError);
            reject(error);
         });
      });
   };

   this.handleError = function(error) {
      this.response.status(error.errorCode).send(error);
      console.error(error);
   };

   this.getToken = function() {
      return new Promise(function(resolve, reject) {
         var token = this.token();
         if (token) {
            resolve(token);
         } else {
            const error = createResponseError('no token found in header', 461, null, null);
            reject(error);
         }
      });
   };

   this.sendData = function(data) {
      this.response.status(200).send(data);
   };

   this.execute = function() {
      this.getToken()
      .then(this.getUserID, this.handleError)
      .then(this.userData,  this.handleError)
      .then(this.sendData,  this.handleError);
   };
};

exports.get = GetUserData;
