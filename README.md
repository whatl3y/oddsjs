# oddsjs

This package provides helper methods to convert between different odds types,
calculate overall odds of single and multiple/parlay bets, etc.

NOTE: All methods in this package return instances of the main object in
[bignumber.js, or `BigNumber` in their examples](https://www.npmjs.com/package/bignumber.js).
This is to prevent losing precision when returning final odds before all of your desired transformations
are done, but you can convert to a javascript string or number using
[`toString()`](https://mikemcl.github.io/bignumber.js/#toS),
[`toFixed(n)`](https://mikemcl.github.io/bignumber.js/#toFix),
[`toNumber()`](https://mikemcl.github.io/bignumber.js/#toN), or others.

## Usage

This package exposes a factory function `Odds(options)` that takes an optional options object.

### Options

1. `precision` (default 4): a number representing how far to show fractional odds. Another way to look at it is this is the y in `1ey` or `1 x 10^y` in terms of how precise to show fractional odds (i.e. 12345/10000)

### Methods

1. `calculateOdds(...americanOdds) => BigNumber`: Takes one or multiple american odds and returns the overall odds. For multiple odds provided it assumes a parlay of events. The total odds can be multiplied by a test wager to see how much would be returned to the bettor if she wins (this amount includes the wager, so total amount returned including the wager amount)
2. `getAmericanOddsFromOverall(overallOdds) => BigNumber`: Takes overall odds (also the output of `calculateOdds`) and returns a american odds representation of the odds.
3. `getFractionalOddsFromOverall(overallOdds) => BigNumber`: Takes overall odds (also the output of `calculateOdds`) and returns a fractional odds representation of the odds.

## Example

```js
import Odds from 'oddsjs'

const odds = Odds() // same as  `const odds = Odds({ precision: 4 })`

// two team parlay, each with american odds of -110
const twoTeamParlayOdds = odds.calculateOdds(-110, -110)
// returns instance of BigNumber with final odds

twoTeamParlayOdds.toNumber()
// 3.644628099173554

odds.getAmericanOddsFromOverall(twoTeamParlayOdds)
// +264

odds.getFractionalOddsFromOverall(twoTeamParlayOdds)
// 320/121
```