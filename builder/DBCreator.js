'use strict';

const knex = require('knex');
const config = require('../server/config.js');
const defaultConnection = config.db.connection;
const fs = require('fs-promise');

const connection = {
   host: '127.0.0.1',
   pass: 'root',
   user: '',
   charset: 'utf8'
};

const dbOption = {
   client: config.db.client,
   connection: connection
};

var k = knex(dbOption);

const resetKnex = function() {
   return k.destroy().then(function () {
      k = knex(dbOption);
   });
};

const getKnex = function() {
   return knex(dbOption);
};

const getStructure = function() {
   return fs.readFile('./builder/CLIPS_structure.sql', {encoding: 'utf8'});
};

const getData = function() {
   return fs.readFile('./builder/CLIPS_data.sql', {encoding: 'utf8'});
};

const createDB = function () {
   return resetKnex()
   .then(getStructure)
   .then(k.raw)
   .then(resetKnex)
   .then(getData)
   .then(k.raw)
   .then(resetKnex)
   .catch(console.error);
};

createDB().then(function() {
   process.exit();
});
