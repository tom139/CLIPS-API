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
      console.log('execute MUST be overridden \
      by all RequestHandler subclasses to create \
      the respose object and send it');
      console.error('execute MUST be overridden \
      by all RequestHandler subclasses to create \
      the respose object and send it');
   };
};

module.exports = RequestHandler;
