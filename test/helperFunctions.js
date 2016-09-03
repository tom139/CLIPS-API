'use strict';

const request = require('request-promise');
const expect = require('chai').expect;
const assert = require('chai').assert;
const config = require('./test_config.js');

module.exports.baseURI = 'http://' + config.host + ':' + config.port;

exports.shouldFail = function (response) {
   expect(response.statusCode).to.be.least(400).and.to.be.below(500);
};

exports.fail = function () {
   assert(false);
};
