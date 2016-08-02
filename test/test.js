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
})
