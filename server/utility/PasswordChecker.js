'use strict';

/// controlla se la password inserita è valida
function isValid(password) {
   const length = password.length;
   var valid = length >= minLength && length <= maxLength;
   var i = 0;
   while (i<length && valid) {
      var charCode = password.charCodeAt(i);
      valid = isLetter(charCode) || isCapLetter(charCode) || isNumber(charCode) || isSpecialChar(charCode);
      ++i;
   }
   return valid;
}

/// return true sse code è il codice unicode per una lettera minuscola
function isLetter(code) {
   return code >= 0x0061 && code <= 0x007A;
}

/// return true sse code è il codice unicode per una lettera minuscola
function isCapLetter(code) {
   return code >= 0x0041 && code <= 0x005A;
}

/// return true sse code è il codice unicode per un numero
function isNumber(code) {
   return code >= 0x0030 && code <= 0x0039;
}

/// return true sse code è il codice unicode per un carattere speciale
/// ammesso nella password
function isSpecialChar(code) {
   return allowedCharCodes.includes(code);
}

const allowedCharCodes = [
   0x0021, // !
   0x0023, // #
   0x0024, // $
   0x0026, // &
   0x0028, // (
   0x0029, // )
   0x002D, // -
   0x002F, // /
   0x005C, // \
   0x003F, // ?
   0x0040, // @
   0x005F  // _
];

const minLength = 6;
const maxLength = 16;

const instructions = 'La password deve contenere almeno 6 caratteri e al massimo 16.\nSono ammesse le lettere latine senza accenti (maiuscole e minuscole), i numeri e i segni ! @ # $ & ( ) - / \\ _ ?'

module.exports.isValid = isValid;
module.exports.instructions = instructions;
module.exports.rules = {
   allowedCharCodes: allowedCharCodes,
   minLength: minLength,
   maxLength: maxLength
}
