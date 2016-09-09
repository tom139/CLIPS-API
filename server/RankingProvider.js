/**
 * @file ./RankingProvider.js
 * @date Thu, 1 Sep 2016 18:19:41 +0200
 * @version 1.0
 * @author Tommaso Panozzo
 *
 * DescrizioneDelFile
 */
'use strict';

const db = require('./DBHandler.js');

function getRanking(pathID) {
   return new Promise(function(resolve, reject) {
      const rawQuery = 'SELECT `T`.*, `User`.`username` FROM (SELECT * FROM `PathResult` WHERE `pathID` = ' + pathID + ' ORDER BY `totalScore` DESC) AS T INNER JOIN `User` ON `T`.`userID` = `User`.`id` GROUP BY `userID`'
      db().raw(rawQuery).then(function(results) {
         resolve(results[0]);
      }, function(error) {
         console.log('will reject with error:', error);
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

function reject(error) {
   console.log('rejected');
   sendError(this.respose, error);
}

function resolve(data) {
   console.log('resolved');
   sendSuccess(this.response, data);
}

function RankingProvider() {
   this.execute = function() {
      const pathID = this.request.params.pathID;
      getRanking(pathID)
      .then(resolve.bind(this), reject.bind(this));
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
