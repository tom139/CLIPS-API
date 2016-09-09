/**
 * @file ./test/helperFunctions.js
 * @date Sat, 3 Sep 2016 12:54:00 +0200
 * @version 1.0
 * @author Tommaso Panozzo
 *
 * DescrizioneDelFile
 */
'use strict';

const request = require('request-promise');
const expect = require('chai').expect;
const assert = require('chai').assert;
const config = require('./test_config.js');

module.exports.baseURI = 'http://' + config.host + ':' + config.port;

exports.clientError = function (response) {
   expect(response.statusCode).to.be.least(400).and.to.be.below(500);
};

exports.shouldFail = function (response) {
   exports.clientError(response);
};

exports.fail = function () {
   assert(false);
};
