/**
 * @file ./server/URLRequestHandler.js
 * @date Wed, 3 Aug 2016 08:58:10 +0200
 * @version 1.0
 * @author Tommaso Panozzo
 *
 * superclasse per la gestione delle richieste
 */
'use strict';

/// super classe che rappresenta l'handler di una richiesta URL
function RequestHandler() {

   /// funzione che cerca i token nell'header
   this.token = function() {
      return this.request.get('Authorization');
   }

   /// funzione che ottiene i dati cercati e li invia
   /// in risposta
   this.execute = function() {
      // execute MUST be overridden \
      // by all RequestHandler subclasses to create \
      // the respose object and send it');
   };
};

module.exports = RequestHandler;
