'use strict';

var RequestHandler = require('./URLRequestHandler.js');
var UsernameChecker = require('./utility/UsernameChecker.js');
var Token = require('./utility/TokenGenerator.js');
var db = require('./DBHandler.js');
var emailChecker = require('./utility/EmailChecker.js');
var passwordChecker = require('./utility/PasswordChecker.js')

function RegistrationRequestHandler() {
   this.execute = function() {
      var data = this.request.body;
      var missingField = false

      if (!data.hasOwnProperty('username')) {
         missingField = 'username';
      }
      if (!data.hasOwnProperty('email')) {
         missingField = 'email';
      }
      if (!data.hasOwnProperty('password')) {
         missingField = 'password';
      }

      var username = data.username;
      var password = data.password;
      var email = data.email;

      if (missingField) {
         this.response.status(460).send({
            errorCode: 460,
            debugMessage: "missing " + missingField
         });
      } else if (!emailChecker.isValid(email)) {
         this.response.status(460).send({
            errorCode: 460,
            debugMessage: 'email is not valid',
            userMessage: 'usa un indirizzo email valido'
         });
      } else if (!passwordChecker.isValid(password)) {
         this.response.status(460).send({
            errorCode: 460,
            debugMessage: 'password is not valid',
            userMessage: passwordChecker.instructions
         });
      } else {
         var response = this.response;
         UsernameChecker(username).then(function(isValid) {
            // console.log('isValid = ', isValid);
            if (isValid) {
               var query = db()('User').insert({
                  username: username,
                  email: email,
                  password: password
               });
               query.then(function(userID) {
                  // effettuare il login e restituire un token valido
                  let token = Token.generate();
                  var context = {
                     token: token,
                     data : {
                        username: username,
                        email: email,
                        id: userID[0]
                     },
                     response: response
                  };
                  var saveNewTokenQuery = db()('AuthToken').insert({
                     token: token,
                     userID: userID
                  });
                  saveNewTokenQuery.then(function(result) {
                     context.response.status(200).send({
                        token: context.token,
                        userData: context.data
                     });
                  }. bind(context), function(error) {
                     console.log('Error saving token: ', error);
                     context.response.status(505).send({
                        errorCode: 505,
                        debugError: "unable to save new user's token"
                     });
                  }.bind(context));
               }.bind(response), function(error) {
                  console.log('error saving user: ', error);
                  response.status(505).send({
                     errorCode: 505,
                     debugError: "unable to save user"
                  });
               }.bind(response));
            } else {
               console.log('username (', username, ') is NOT valid');
               response.status(461).send({
                  errorCode: 461,
                  debugError: "username is NOT valid (maybe not unique). Choose another!"
               });
            }
         }.bind(response), function(error) {
            console.log('error checking username: ', error);
            response.status(505).send({
               errorCode: 505,
               debugError: "errorCreating user " + error
            });
         }.bind(response));
      }
   };

   // this.newUser(data) {
   //    var query = db()('User').insert({
   //       username: username,
   //       email: email,
   //       password: password
   //    });
   //    var response = this.response
   //    query.then(function(result) {
   //       console.log('did create new user');
   //       //@TODO effettuare il login e restituire un token valido
   //       console.log('result: ', result);
   //       response.status(200).send({
   //          result: result
   //       })
   //    }, function(error) {
   //       console.error('error creating new user: ', error);
   //       response.status(505).send({
   //          errorCode: 505,
   //          debugError: "errorCreating user " + error
   //       });
   //    });
   // }
};

RegistrationRequestHandler.prototype = new RequestHandler;

module.exports = RegistrationRequestHandler;
