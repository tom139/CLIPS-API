/**
 * @file ./test/testAppInfo.js
 * @date Sat, 3 Sep 2016 13:16:06 +0200
 * @version 1.0
 * @author Tommaso Panozzo
 *
 * DescrizioneDelFile
 */
'use strict';

const request = require('request-promise');
const expect = require('chai').expect;
const assert = require('chai').assert;
const validator = require('email-validator');
const config = require('./test_config.js');
const help   = require('./helperFunctions.js');

const appinfo = {
   uri: help.baseURI + '/appinfo',
   json: true
};

var website = '';

describe('# AppInfo', function() {

   it('should return valid AppInfo', function() {
      return request(appinfo)
      .then(function(body) {
         // check website URL
         expect(body.websiteURL).to.be.a('string');
         website = body.websiteURL

         // check description
         expect(body.description).to.be.a('string');

         // check email
         const email = body.supportemail
         expect(email).to.be.a('string');
         expect(validator.validate(email)).to.equal(true);

         // check UUID
         const uuid = body.discoveryUUID;
         expect(uuid).to.be.a('string').and.to.have.length(36);
      });
   });

   it('should have a working website', function() {
      const websiteURI = website.startsWith('http://') || website.startsWith('https://') ? website : 'http://' + website;
      const req = {
         url: websiteURI,
      };
      return request(req);
   });
});
