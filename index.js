/**
*  @file index.js
*  @date 01/08/2016
*  @version 1
*  @author Tommaso Panozzo
*
*  entry point dell'API
*/

'use strict';

const server = require('./server/URLRequestRouter.js');

server.start();
