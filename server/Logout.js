'use strict';

var userID = require('./UserIDRetriever.js');
var db = require('./db.js');
var SQLRequestHandler = require('./SQLRequestHandler.js');

function LogoutHandler() {
   this.execute = function() {
      var token = this.token();
      if (token) {
         var deleteQuery = db()('AuthToken').where({
            token: token
         }).del()
         var response = this.response;
         deleteQuery.then(function (result) {
            response.status(200).send();
         }.bind(response), function (error) {
            console.error('error deleting the token ', token, ' from AuthToken: ', error);
            response.status(460).send({
               errorCode: 460,
               debugMessage: error
            });
         }.bind(response));
      } else {
         this.response.status(461).send({
            errorCode: 461,
            debugMessage: 'no token provided for logout. If you no longer have the token, don\'t worry: it will expire someday, otherwise you should call this method with the authorization header set'
         });
      }
   }
};

LogoutHandler.prototype = new SQLRequestHandler;

module.exports = LogoutHandler;
