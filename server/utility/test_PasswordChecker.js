'use strict';

var passwordChecker = require('./PasswordChecker.js');

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

var testCounter = 0;
var passedCounter = 0;
var failedCounter = 0;
for (var test of tests) {
   var result = passwordChecker.isValid(test.password);
   if (result == test.expected) {
      console.log(testCounter + ' - [PASSED]: ' + test.password);
      passedCounter++;
   } else {
      console.error(testCounter + ' - [FAILED]: ' + test.password + ' expected: ' + test.expected + ', result: ' + result);
      failedCounter++;
   }
   testCounter++;
}

console.log('\n\n FAILED: ', failedCounter, ' PASSED: ', passedCounter, ' TOTAL: ', testCounter);
