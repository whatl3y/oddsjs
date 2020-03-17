import assert from 'assert'
import Odds from './oddsjs'

const odds = Odds()

describe('oddsjs', function() {
  describe('#calculateOdds', function() {
    it(`should return correct odds based on input american lines`, function() {
      const overall1 = odds.calculateOdds(100)
      const overall2 = odds.calculateOdds(-110)
      const overall3 = odds.calculateOdds(100, '100')
      assert.equal(2, overall1.toNumber())
      assert.equal('1.91', overall2.toFixed(2))
      assert.equal(4, overall3.toNumber())
    })
  })

  describe('#getAmericanOddsFromOverall', function() {
    it(`should return correct american odds based on input lines`, function() {
      const am1 = odds.getAmericanOddsFromOverall(2)
      const am2 = odds.getAmericanOddsFromOverall(1.5)
      assert.equal('+100', am1)
      assert.equal('-200', am2)
    })
  })

  describe('#getFractionalOddsFromOverall', function() {
    it(`should return correct fractional odds based on input lines and precision`, function() {
      const fr1 = odds.getFractionalOddsFromOverall(2)
      const fr2 = odds.getFractionalOddsFromOverall(1.5)
      const fr3 = odds.getFractionalOddsFromOverall(2.1223574332390824098)
      assert.equal('1/1', fr1)
      assert.equal('1/2', fr2)
    })
  })
})
