'use strict';

const expect = require('chai').expect;
const clips  = require('../index.js');

describe('#clips', function() {
  it('should make 3 times 2', function() {
    var result = clips(3);
    expect(result).to.equal(6);
  });

  it('should make 2 times 2', function() {
    var result = clips(2.0);
    expect(result).to.equal(4.0);
  });
});

describe('#path', function() {
   const ProofHandler = require('../server/Path.js');
   var handler = new ProofHandler();
   var proof = {
      fakeProof: "fake",
      testData:  "BeaconStripsVF.json",
      scoringAlgorithmData: "5050.json"
   };
   var fulfilled = handler.fulfilledProof(proof);
   it('should retrieve test', function() {
      fulfilled.then(function(proof) {
         console.log('proof: ', proof);
         proof.should.have.property('test');
         proof.test.should.be.a('string');
      });
   });

   it('should retrieve algorithm', function() {
      fulfilled.then(function(proof) {
         console.log(proof);
         proof.should.have.property('algorithm');
         proof.algorithm.should.be.a('string');
      });
   });
});
