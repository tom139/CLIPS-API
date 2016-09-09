/**
 * @file ./config.js
 * @date Wed, 3 Aug 2016 08:58:10 +0200
 * @version 1.0
 * @author Tommaso Panozzo
 *
 * DescrizioneDelFile
 */
'use strict';

module.exports.db = {
    client: 'mysql',

    connection: {
        'host': 'localhost',
        'user': 'root',
        'password': '',
        'database': 'CLIPS'
    }
};

module.exports.proofPath = "./proofs/";
module.exports.algorithmPath = "./algorithms/";
