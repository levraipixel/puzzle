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

var newPiecePlacement = function(pieceIndex, index, isAbove, isRotated) {
  return (new PiecePlacement(pieces[pieceIndex], index, isAbove, isRotated));
}
var newSolution = function(piecePlacements) {
  return (new Solution(piecePlacements));
}

newSolution([
  newPiecePlacement(0, 0, false, false),
  newPiecePlacement(1, 1, false, false),
  newPiecePlacement(2, 2, false, false),
  newPiecePlacement(3, 3, false, false),
  newPiecePlacement(4, 0, true, false),
  newPiecePlacement(5, 1, true, false),
  newPiecePlacement(6, 2, true, false),
  newPiecePlacement(7, 3, true, false)
]).renderToBody();

newSolution([
  newPiecePlacement(0, 0, false, false),
  newPiecePlacement(2, 1, false, false),
  newPiecePlacement(1, 2, false, false),
  newPiecePlacement(3, 3, false, false),
  newPiecePlacement(4, 0, true, false),
  newPiecePlacement(5, 1, true, false),
  newPiecePlacement(6, 2, true, false),
  newPiecePlacement(7, 3, true, false)
]).renderToBody();

newSolution([
  newPiecePlacement(0, 0, false, false),
  newPiecePlacement(5, 1, false, false),
  newPiecePlacement(2, 2, false, false),
  newPiecePlacement(3, 3, false, false),
  newPiecePlacement(4, 0, true, false),
  newPiecePlacement(1, 1, true, false),
  newPiecePlacement(6, 2, true, false),
  newPiecePlacement(7, 3, true, false)
]).renderToBody();
