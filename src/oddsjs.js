import BigNumber from 'bignumber.js'

export default function Odds(options={}) {
  // how precise fractional odds will be (this is the y in `1ey` or `1 x 10^y`)
  const roundPrecision = new BigNumber(options.precision || 4)

  return {
    roundPrecision,

    // calculateOdds takes all American odds provided (i.e. -110, 124, etc.)
    // and generates the aggregate odds of winning a bet
    calculateOdds(...odds) {
      odds = odds[0] instanceof Array ? odds[0] : odds
      let totalOdds = new BigNumber(1)

      if (odds.length === 1)
        return this.singleBetOdds(odds[0])

      for (let i = 0; i < odds.length; i++) {
        const odd = odds[i]
        totalOdds = totalOdds.times(this.singleBetOdds(odd))
      }
      return totalOdds
    },

    // singleBetOdds takes an American odds line and converts it to
    // the odds that can be used in mathematical operations to determine
    // how much can be won given a wager amount.
    singleBetOdds(americanLine) {
      const line = new BigNumber(americanLine)
      const amountToWager = new BigNumber(100)
      let winAmount

      if (line.gt(0)) {
        winAmount = amountToWager.plus(line)
        return winAmount.dividedBy(amountToWager)
      }

      winAmount = line.times(-1).plus(amountToWager)
      return winAmount.dividedBy(line.times(-1))
    },

    // getAmericanOddsFromOverall converts the overall odds, as returned from
    // CalculateOdds and creates the string representation of the corresponding
    // American odds.
    getAmericanOddsFromOverall(overallOdds) {
      const odds = new BigNumber(overallOdds).minus(1)

      if (odds.lt(1))
        return `-${new BigNumber(100).dividedBy(odds).toFixed(0)}`

      return `+${odds.times(100).toFixed(0)}`
    },

    // getFractionalOddsFromOverall converts the overall odds, as returned from
    // CalculateOdds and returns a string of the fractional odds.
    getFractionalOddsFromOverall(overallOdds) {
      const oddsToOne = new BigNumber(overallOdds).minus(1)
      const maxDen = `1${new Array(this.roundPrecision.plus(1).toNumber()).fill(0).join('')}`
      const [ num, den ] = oddsToOne.toFraction(maxDen)
      return `${num.toString()}/${den.toString()}`
    }
  }
}