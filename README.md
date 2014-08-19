# epsilon-greedy-weighter

Epsilon Greedy algorithm for weight based rotators.

Sometimes you won't have the option to pick a variant in real time. The second best thing to real time
  split testing is `weight based` rotations.

This module will convert your [`epsilon-greedy`](https://github.com/tounano/epsilon-greedy) configuration
 and will create a weight map of your variants based on the `epsilon-greedy` setup.

The idea is basic, it'll simply run a simulation X times and we'll build a weight table out of that.

## Usage:

### var epsilonGreedyWeighter = EpsilonGreedyWeighter(?opts);

First you need create an instance of the `EpsilonGreedyWeighter` object.

**options:**

*  **All options that are accepted by [`epsilon-greedy`](https://github.com/tounano/epsilon-greedy)**
*  `pathToWeight` - (Optional|default=weight). This property will be added to your variants at the end
  of the simulation.
*  `simulationsPerVariant` - (Optional|default=1000). The amount of iterations that the simulation will run
  per variant. If you set this option to 1000 and you have 5 variants, 5000 iterations will be
  completed in total.

### var weightedVariants = epsilonGreedy(variants)

`variants` should be an array of `json objects`. Each variant should have a property that
contains the amount of trials and the amount of rewards.

You can specify the name of those properties in EpsilonGreedyWeighter options.

**return value**

The return value would be a clone of the `variants` array with and added `weight` property for
 each variant.

## Example

```js
var EpsilonGreedyWeighter = require('epsilon-greedy-weighter');
var epsilonGreedyWeighter = EpsilonGreedyWeighter();

console.log(epsilonGreedyWeighter([
  {trials: 100, rewards: 1},
  {trials: 70, rewards: 2},
  {trials: 80, rewards: 0},
  {trials: 32, rewards: 0},
  {trials: 20, rewards: 0}
]));
```

## install

With [npm](https://npmjs.org) do:

```
npm install epsilon-greedy-weighter
```

## license

MIT