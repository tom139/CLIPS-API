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
         var t = token;
         db().from('AuthToken').where({
            token: t
         }).then(function(authTokens) {
            if (authTokens.length == 1) {
               resolve(authTokens[0].userID);
            } else if (authTokens.length == 0) {
               const error = createResponseError('no userID associated with token ' + token, 461, null, null);
               reject(error);
            } else {
               const error = createResponseError('multiple userID associated with token ' + token, 505, null, null);
               reject(error);
            }
         }.bind(token), function(knexError) {
            const error = createResponseError('impossible to retrieve userID from token '+token, 550, null, knexError);
            reject(error);
         }.bind(token));
      }.bind(token));
   };

   this.getToken = function() {
      return new Promise(function(resolve, reject) {
         console.log('this = ', this);
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

const oldPasswordIsCorrect = function(token, oldPassword) {
   return new Promise(function(resolve, reject) {
      db().from('AuthToken').innerJoin('User', 'User.id', 'AuthToken.userID')
      .then(function(users) {
         console.log('knex join users:', users);
         resolve();
      });
   });
};

function PostUserData() {

   this.getNewData = function() {
      const body = this.request.body;
      var data = {};
      var hasNewData = false;
      if (body.hasOwnProperty('email')) {
         data.email = body.email;
         hasNewData = true;
      }
      if (body.hasOwnProperty('username')) {
         data.username = body.username;
         hasNewData = true;
      }
      if (body.hasOwnProperty('oldPassword') && body.hasOwnProperty('newPassword')) {
         data.oldPassword = body.oldPassword;
         data.newPassword = body.newPassword;
         hasNewData = true;
      }
      var getToken = this.getToken;
      return new Promise(function(resolve, reject) {
         if (hasNewData) {
            console.log('will ask token');
            getToken()
            .then(function(token) {
               console.log('got token');
               console.log('data before adding token:', data);
               data.token = token;
               console.log('data after adding token:', data);
               resolve(data);
            }.bind(data), function(error) {
               console.log('got error:', error);
            })
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
      if (data.oldPassword && data.newPassword) {
         promises.push(oldPasswordIsCorrect(data.token, data.oldPassword));
      }
      var all = Promise.all(promises);
      return new Promise(function(resolve, reject) {
         all.then(resolve, function(error) {
            reject(error);
         });
      });
   };

   this.validateUsername = function(username) {
      return new Promise(function(resolve, reject) {
         UsernameValidator(username).then(function(isAvailable) {
            if (isAvailable) {
               resolve();
            } else {
               reject({debugMessage: 'Username is not available', userMessage: 'L\'username ' + username + ' non è disponibile, scegline un altro!', errorCode: 460});
            }
         }, function(error) {
            reject(createResponseError({debugMessage: 'Error checking for username availability', errorInfo: error, errorCode: 550}));
         });
      });
   };

   this.validateEmail = function(email) {
      return new Promise(function(resolve, reject) {
         EmailValidator.checkEmail(email).then(function(isValid) {
            if (isValid) {
               resolve();
            } else {
               reject({debugMessage: 'Email is not valid', userMessage: 'L\'email non è disponibile, potrebbe esserci un errore di battitura o potrebbe già essere associata ad un account! (magari il tuo)', errorCode: 460});
            }
         }, function(error) {
            reject({debugMessage: 'Error checking for email availability', errorInfo: error, errorCode: 550});
         });
      });
   };

   this.validatePassword = function(oldPassword, newPassword) {
      return new Promise(function(resolve, reject) {

      });
   }

   this.saveData = function(data) {
      return new Promise(function(resolve, reject) {
         this.getToken()
         .then(this.getUserID, function(error) {
            console.log('handleError(',error,')');
            this.response.status(error.errorCode).send(error);
            console.error(error);
         })
         .then(function(id) {
            db()('User').where({id:id}).update(data).then(resolve, function(error) {
               reject(createResponseError('knex error updating user data', 551, null, {newData: data, knexError: error}));
            });
         }.bind(this), function(error) {
            reject(createResponseError('unable to save new data', 551, null, {newData: data, knexError: error}));
         }.bind(this));
      }.bind(this));
   };

   this.execute = function() {
      this.getNewData()
      .then(function(data) {
         var context = {
            data: data,
            this: this
         };
         this.validateData(data).then(function() {
            context.this.saveData(context.data).then(function() {
               context.this.response.status(200).send(data);
            }.bind(context), function(error) {
               console.log('unable to save with error:', error);
               context.this.response.status(error.errorCode).send(error);
            }.bind(context));
         }.bind(context), function(error) {
            context.this.response.status(error.errorCode).send(error);
         }.bind(context));
      }.bind(this), function(error) {
         this.response.status(error.errorCode).send(error);
      }.bind(this));
   };
};

PostUserData.prototype = new UserDataRequest;

exports.get  = GetUserData;
exports.post = PostUserData;
