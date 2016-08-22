'use strict';

const db = require('./DBHandler.js');
const URLRequestHandler = require('./URLRequestHandler.js');

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
      console.log('getUserID(',token,')');
      return new Promise(function(resolve, reject) {
         db().from('AuthToken').where({
            token: token
         }).then(function(authTokens) {
            console.log('authTokens = ', authTokens);
            if (authTokens.length == 1) {
               resolve(authTokens[0].userID);
            } else if (authTokens.count == 0) {
               const error = createResponseError('no userID associated with token ' + token, 461, null, null);
               reject(error);
            } else {
               const error = createResponseError('multiple userID associated with token ' + token, 505, null, null);
               reject(error);
            }
         }, function(knexError) {
            const error = createResponseError('impossible to retrieve userID from token '+token, 550, null, knexError);
            reject(error);
         });
      });
   };

   this.userData = function(userID) {
      console.log('userData(',userID,')');
      return new Promise(function(resolve, reject) {
         db().select('email', 'username').from('User').where({
            id: userID
         }).then(function(users) {
            if (users.length == 1) {
               resolve(users[0]);
            } else if (user.count == 0) {
               const error = createResponseError('no user associated with id ' + userID, 550, null, null);
               reject(error);
            } else {
               const error = createResponseError('multiple users associated with id ' + userID, 505, null, null);
               reject(error);
            }
         }, function(knexError) {
            const error = createResponseError('impossible to retrieve user data from id '+userID, 550, null, knexError);
            reject(error);
         });
      });
   };

   this.handleError = function(error) {
      console.log('handleError(',error,')');
      this.response.status(error.errorCode).send(error);
      console.error(error);
   };

   this.getToken = function() {
      console.log('getToken()');
      return new Promise(function(resolve, reject) {
         var token = this.token();
         if (token) {
            resolve(token);
         } else {
            const error = createResponseError('no token found in header', 461, null, null);
            reject(error);
         }
      }.bind(this));
   };

   this.sendData = function(data) {
      console.log(this);
      // console.log('response = ', this.response);
      console.log('sendData(',data,')');
      this.response.status(200).send(data);
   };

   this.execute = function() {
      console.log('start executing');
      this.getToken()
      .then(this.getUserID, this.handleError)
      .then(this.userData,  this.handleError)
      .then(this.sendData,  this.handleError);
   };
};

GetUserData.prototype = new URLRequestHandler;

exports.get = GetUserData;
