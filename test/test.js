/**
 * @file ./test/test.js
 * @date Tue, 2 Aug 2016 19:14:14 +0200
 * @version 1.0
 * @author Tommaso Panozzo
 *
 * DescrizioneDelFile
 */
'use strict';

// run server
require('../server/URLRequestRouter.js');

// test app info
require('./testAppInfo.js');

// test buildings
require('./testBuildings.js');

// test user flow (Registration, user data display, user data modification, login)
require('./testUserFlow');
