'use strict';

const db = require('./DBHandler.js');

function getRanking(pathID) {
   return new Promise(function(resolve, reject) {
      const rawQuery = 'SELECT `T`.*, `User`.`username` FROM (SELECT * FROM `PathResult` WHERE `pathID` = ' + pathID + ' ORDER BY `totalScore` DESC) AS T INNER JOIN `User` ON `T`.`userID` = `User`.`id` GROUP BY `userID`'
      db().raw(rawQuery).then(resolve, function(error) {
         reject({
            errorCode: 550,
            debugMessage: 'Error querying for results for path with id ' + pathID,
            errorInfo: {
               pathID: pathID,
               rawQuery: rawQuery,
               knexError: error
            }
         });
      });
   });
}

function sendError(response, error) {
   console.log('sending error:', error);
   const status = error.errorCode >= 400 && errorCode < 500 ? 460 : 560;
   response.status(status).send(error);
}

function sendSuccess(response, data) {
   console.log('sending success data:', data);
   response.status(200).send(data);
}

function RankingProvider() {
   this.execute = function() {
      const pathID = this.request.params.pathID;
      getRanking(pathID)
      .then(this.sendSuccess, this.sendError);
   };

   this.sendError = function(error) {
      console.log('should send error from response', this.response);
      sendError(this.response, error);
   };

   this.sendSuccess = function(data) {
      console.log('should send success from response', this.response);
      sendSuccess(this.response, data);
   };
}

module.exports = RankingProvider;
