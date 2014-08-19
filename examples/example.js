var EpsilonGreedyWeighter = require('../');
var epsilonGreedyWeighter = EpsilonGreedyWeighter();

console.log(epsilonGreedyWeighter([
  {trials: 100, rewards: 1},
  {trials: 70, rewards: 2},
  {trials: 80, rewards: 0},
  {trials: 32, rewards: 0},
  {trials: 20, rewards: 0}
]));