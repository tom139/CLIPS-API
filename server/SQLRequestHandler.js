'use strict';

var db = require('./DBHandler.js');
var RequestHandler = require('./URLRequestHandler.js');

/// classe che rappresenta l'handler di una richiesta che richiede l'accesso al db
function SQLRequestHandler() {

   /// query da eseguire nel DB per ritornare i dati selezionati
   this.queryFromRequest = function () {
      console.log('queryFromRequest MUST be overridden \
      by all SQLRequestHandler subclasses to provide the \
      query for the db');
   };

   this.execute = function() {
      // prendo la query
      var queryObjects = this.queryFromRequest();
      var query = db().select(queryObjects.select).from(queryObjects.from);
      var response = this.response;
      query.then( function (result) {
         response.status(200).send(result);
      });
   };
};

SQLRequestHandler.prototype = new RequestHandler;

module.exports = SQLRequestHandler;
