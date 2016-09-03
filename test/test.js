'use strict';

const request = require('request-promise');
const expect = require('chai').expect;
const assert = require('chai').assert;
const validator = require('email-validator');
const index = require('./../index.js');
const config = require('./test_config.js');

const host = config.host;
const port = config.port;

require('./testAppInfo.js');

require('./testBuildings.js');

require('./testUserFlow');
