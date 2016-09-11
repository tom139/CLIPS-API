/**
 * @file ./server/utility/test_PasswordChecker.js
 * @date Wed, 3 Aug 2016 08:58:10 +0200
 * @version 1.0
 * @author Tommaso Panozzo
 *
 * DescrizioneDelFile
 */
'use strict';

const expect = require('chai').expect;
const assert = require('chai').assert;
var passwordChecker = require('../server/utility/PasswordChecker.js');

console.log('start test...\n\n');

const tests = [
   {
      password : "12345678",
      expected : true
   },
   {
      password : "1234",
      expected : false
   },
   {
      password : "12346578912345678913245678913456789",
      expected : false
   },
   {
      password : "Afdk323jdfn#@",
      expected : true
   },
   {
      password : "AAAZZZaaazzz",
      expected : true
   },
   {
      password : "!#$&()-/\\?_@",
      expected : true
   },
   {
      password : "ciao ciao",
      expected : false
   }
]

describe('# password validator', function() {
   it('should behave as expected', function() {
      for (var test of tests) {
         var result = passwordChecker.isValid(test.password);
         expect(result).to.be.equal(test.expected);
      }
   });
});
