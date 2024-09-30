import * as ex1 from '../ex1.mjs'
import assert from 'assert'


describe('Test Ex1 module', function () {
  describe('#add function tests', function () {
    it('should add two numbers', function () {
        let ret = ex1.add(2,3)
        assert.equal(ret, 5);
    });
    it('should add return the other if one argument is undefined', function () {
        let ret = ex1.add(2)
        assert.equal(ret, 2);
    });
  });
});