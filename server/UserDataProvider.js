'use strict';

const db = require('./DBHandler.js');
const URLRequestHandler = require('./URLRequestHandler.js');
const UsernameValidator = require('./utility/UsernameChecker.js');
const EmailValidator = require('./utility/EmailChecker.js');

function createResponseError(error, code, user, debugInfo) {
   return {
      errorCode: code,
      debugMessage: error,
      userMessage: user,
      debugInfo: debugInfo
   };
};

function UserDataRequest() {

   this.getUserID = function(token) {
      return new Promise(function(resolve, reject) {
         db().from('AuthToken').where({
            token: token
         }).then(function(authTokens) {
            console.log('authTokens = ', authTokens);
            if (authTokens.length == 1) {
               resolve(authTokens[0].userID);
            } else if (authTokens.length == 0) {
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

   this.getToken = function() {
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
};

UserDataRequest.prototype = new URLRequestHandler;

function GetUserData() {

   this.userData = function(userID) {
      return new Promise(function(resolve, reject) {
         db().select('email', 'username').from('User').where({
            id: userID
         }).then(function(users) {
            if (users.length == 1) {
               resolve(users[0]);
            } else if (user.length == 0) {
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

   // this.handleError = function(error) {
   //    console.log('handleError(',error,')');
   //    this.response.status(error.errorCode).send(error);
   //    console.error(error);
   // };

   // this.sendData = function(data) {
   //    console.log('sendData.this', this);
   //    // console.log('response = ', this.response);
   //    console.log('sendData(',data,')');
   //    this.response.status(200).send(data);
   // };

   this.execute = function() {
      this.getToken()
      .then(this.getUserID, function(error) {
         console.log('handleError(',error,')');
         this.response.status(error.errorCode).send(error);
         console.error(error);
      }.bind(this))
      .then(this.userData,  function(error) {
         console.log('handleError(',error,')');
         this.response.status(error.errorCode).send(error);
         console.error(error);
      }.bind(this))
      .then(function(data) {
         this.response.status(200).send(data);
      }.bind(this),  function(error) {
         console.log('handleError(',error,')');
         this.response.status(error.errorCode).send(error);
         console.error(error);
      }.bind(this));
   };
};

GetUserData.prototype = new UserDataRequest;

function PostUserData() {

   this.getNewData = function() {
      const body = this.request.body;
      var data;
      var hasNewData = false;
      if (body.hasOwnProperty('email')) {
         data.email = body.email;
         hasNewData = true;
      }
      if (body.hasOwnProperty('username')) {
         data.username = body.username;
         hasNewData = true;
      }
      return new Promise(function(resolve, reject) {
         if (hasNewData) {
            resolve(data);
         } else {
            reject(createResponseError('no data to change: use \'email\' and \'username\' to specify new values', 461, null, {requestBody: body}));
         }
      });
   };

   this.validateData = function(data) {
      var promises = [];
      if (data.username) {
         promises.push(this.validateUsername(data.username));
      }
      if (data.email) {
         promises.push(this.validateEmail(data.email));
      }
      return Promise.all(promises);
   }

   this.validateUsername = function(username) {
      return new Promise(function(resolve, reject) {
         UsernameValidator.isAvailable(username).then(function(isAvailable) {
            if (isAvailable) {
               resolve();
            } else {
               reject(createResponseError('username ' + username + ' is not valid', 461, null, {requestBody: body}));
            }
         }, function(error) {
            reject(createResponseError('error checking if username is valid', 550, null, error));
         })
      });
   };

   this.validateEmail = function(email) {
      return new Promise(function(resolve, reject) {
         if (EmailValidator.isValid(email)) {
            resolve();
         } else {
            reject(createResponseError('email ' + email + ' is not valid', 461, null, {requestBody: body}));
         }
      });
   };

   this.saveData = function(data) {
      return new Promise(function(resolve, reject) {
         this.getUserID()
         .then(function(id) {
            db()('User').where({id:id}).update(data);
            resolve();
         }.bind(this), function(error) {
            reject(createResponseError('unable to save new data', 551, null, {newData: data}));
         }.bind(this));
      });
   };

   this.execute = function() {
      console.log('execute');
      this.getNewData()
      .then(function(data) {
         var context = {
            data: data,
            this: this
         };
         console.log('will validate');
         this.validateData(data).then(function() {
            console.log('didValidate\nwillSave');
            context.this.saveData(context.data).then(function() {
               console.log('didSave');
               context.this.response.status(200).send(data);
            }.bind(context), function(error) {
               console.log('unable to save');
               context.this.response.status(error.errorCode).send(error);
            }.bind(context));
         }.bind(context), function(error) {
            context.this.response.status(error.errorCode).send(error);
         }.bind(context));
      }.bind(this), function(error) {
         this.response.status(error.errorCode).send(error);
      });
   };
};

PostUserData.prototype = new UserDataRequest;

exports.get  = GetUserData;
exports.post = PostUserData;
