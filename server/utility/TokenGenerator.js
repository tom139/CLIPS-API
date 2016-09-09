/**
 * @file ./utility/TokenGenerator.js
 * @date Wed, 3 Aug 2016 08:58:10 +0200
 * @version 1.0
 * @author Tommaso Panozzo
 *
 * DescrizioneDelFile
 */
'use strict';

function generate() {
   var uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
   });
   return uuid;
}

module.exports.generate = generate;
