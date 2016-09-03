'use strict';

// run server
require('../server/URLRequestRouter.js');

// test app info
require('./testAppInfo.js');

// test buildings
require('./testBuildings.js');

// test user flow (Registration, user data display, user data modification, login)
require('./testUserFlow');
