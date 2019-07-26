
var pieces = [
  new Piece([0, 0, 0, 0, 1], [1, 0, 0, 0, 1]),
  new Piece([1, 0, 0, 0, 0], [0, 1, 0, 1, 0]),
  new Piece([0, 0, 1, 0, 0], [1, 0, 0, 0, 1]),
  new Piece([0, 0, 0, 0, 1], [1, 0, 1, 0, 0]),
  new Piece([0, 1, 0, 0, 0], [0, 1, 0, 1, 0]),
  new Piece([0, 1, 0, 0, 0], [1, 0, 1, 0, 0]),
  new Piece([1, 0, 0, 0, 0], [0, 0, 0, 1, 1]),
  new Piece([0, 0, 0, 0, 1], [1, 0, 0, 1, 0])
];
// console.log('pieces:', pieces);

var buildSolution = function(permutation, rotationPossibility) {
  var piecePlacements = [];
  permutation.forEach(function (pieceIndex, index) {
    piecePlacements.push(
      new PiecePlacement(pieces[pieceIndex], index % 4, index > 3, rotationPossibility[pieceIndex])
    );
  });
  return (new Solution(piecePlacements));
};

var buildPermutations = function() {
  var perm = function(xs) {
    let ret = [];

    for (let i = 0; i < xs.length; i = i + 1) {
      let rest = perm(xs.slice(0, i).concat(xs.slice(i + 1)));

      if(!rest.length) {
        ret.push([xs[i]])
      } else {
        for(let j = 0; j < rest.length; j = j + 1) {
          ret.push([xs[i]].concat(rest[j]))
        }
      }
    }
    return ret;
  };
  return perm([0, 1, 2, 3, 4, 5, 6, 7]);
};

var buildRotationPossibilities = function() {
  var rotationPossibilities = [false, true];

  for(var i = 0; i < 7; i++) {
    var oldPossibilities = rotationPossibilities;
    var newPossibilities = [];
    oldPossibilities.forEach(function (oldPossibility) {
      newPossibilities.push([false].concat(oldPossibility));
      newPossibilities.push([true].concat(oldPossibility));
    });
    rotationPossibilities = newPossibilities;
  }

  return rotationPossibilities;
};


var tryAllSolutions = function() {
  var indexPermutations = buildPermutations();
  var rotationPossibilities = buildRotationPossibilities();

  var start = new Date();

  var BreakException = {};
  try {
    indexPermutations.forEach(function (permutation) {
      rotationPossibilities.forEach(function (rotationPossibility) {
        var solution = buildSolution(permutation, rotationPossibility);
        if (solution.isValid()) {
          console.log('valid solution:', permutation, rotationPossibility, solution);
          solution.renderToBody(true);
          throw BreakException;
        }
      });
    });
  } catch (e) {
    if (e !== BreakException) throw e;
  }

  var end = new Date();

  console.log('all', indexPermutations.length * rotationPossibilities.length, 'solutions tried in', (end - start), 'milliseconds');
};

var debugSolution = function(permutation, rotationPossibility) {
  var solution = buildSolution(permutation, rotationPossibility);
  solution.renderToBody(true);
};


tryAllSolutions();

// debugSolution([0, 1, 7, 5, 2, 4, 3, 6], [true, false, false, true, false, false, false, false]);


