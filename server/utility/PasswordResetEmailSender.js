/**
 * @file ./server/utility/PasswordResetEmailSender.js
 * @date Wed, 31 Aug 2016 09:30:17 +0200
 * @version 1.0
 * @author Tommaso Panozzo
 *
 * invia la mail informando della nuova password
 */
'use strict';

const sendEmail = require('./EmailSender.js');

const subject = 'Reset della password dell\'account CLIPS'
const pretext = 'La modifica della password è avvenuta con successo!\nLa nuova password è ';
const postext = '.\n\nPuoi modificarla in qualsiasi momento dall\'App sul tuo smartphone! 😉';
const prehtml = '<h4>La modifica della password è avvenuta con successo!</h4>La nuova password è <b>';
const poshtml = '</b>.<br /><p>Puoi modificarla in qualsiasi momento dall\'App sul tuo smartphone! 😉';

function sendNewPassword(password, email) {
   const mail = {
      subject: subject,
      to: email,
      text: pretext + password + postext,
      html: prehtml + password + poshtml
   };
   return sendEmail(mail);
};

module.exports = sendNewPassword;
