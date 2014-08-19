var _ = require('underscore');
var EpsilonGreedy = require('epsilon-greedy');

var defaults = {
  pathToWeight: 'weight',
  simulationsPerVariant: 1000
}

function EpsilonGreedyWeighter(opts) {
  opts = _.defaults(opts || {}, defaults);
  var epsilonGreedy = EpsilonGreedy(opts);

  return function epsilonGreedyWeighter(variants) {
    var winners = [];
    var _variants = mapVariants(variants);
    var simulations = calculateSimulations(variants);
    for (var i = 0; i < simulations; ++i)
      winners.push(epsilonGreedy(_variants)['__eg'].key);

    winners = _.chain(winners)
      .countBy(function (winnerId) {return winnerId})
      .map(function convertCountsToWeight (count, key) {
        return {key: key, weight: Math.round(count / simulations * 100)};
      })
      .value();

    winners = createKeyValMap(ensureTotalWeightIs100(winners));

    return _.map(variants, function (variant, key){
      variant[opts.pathToWeight] = winners[key] || 0;
      return variant;
    });
  }

  function createKeyValMap(weights) {
    var result = {};
    _.each(weights, function (weight) {
      result[weight.key] = weight.weight;
    });

    return result;
  }

  function ensureTotalWeightIs100(weights) {
    var delta = 100 - sum(_.pluck(weights, 'weight'));

    if (delta == 0) return weights;

    weights = _.sortBy(weights, function (weight) {return 0 - weight.weight});

    for (var i = 0; i < Math.abs(delta); ++i) {
      weights[i].weight += delta / Math.abs(delta);
    }

    return weights;
  }

  function mapVariants(variants) {
    return _.map(variants, function (variant, key) {
      return _.extend({__eg: {key: key}}, variant);
    })
  }

  function calculateSimulations(variants) {
    return _.chain(variants)
      .countBy(function () {return 'all'; })
      .value().all * opts.simulationsPerVariant;
  }
}

function sum(list) {
  return _.reduce(list, function (memo, num) {return num+memo;}, 0);
}

module.exports = EpsilonGreedyWeighter;