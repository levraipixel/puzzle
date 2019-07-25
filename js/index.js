console.log('hi');

class Piece {
  constructor(a_blocks, b_blocks) {
    console.log('[Piece] constructor', a_blocks, b_blocks);
    this.a_blocks = a_blocks;
    this.b_blocks = b_blocks;
  }

  render(isRotated) {
    var $piece = $('<div>');
    $piece.addClass('piece');
    if (isRotated) {
      $piece.addClass('rotated');
    }

    var $stick = $('<div>');
    $stick.addClass('stick');
    $piece.append($stick);

    for(var i in this.a_blocks) {

      var j = isRotated ? (this.a_blocks.length - 1 - i) : i;
      var l_block = isRotated ? this.b_blocks : this.a_blocks;
      var r_block = isRotated ? this.a_blocks : this.b_blocks;


      var $row = $('<div>');
      $row.addClass('row');

      var $a_block = $('<div>');
      $a_block.addClass('block');
      if (l_block[j]) {
        $a_block.addClass('solid');
      }
      $row.append($a_block);

      var $b_block = $('<div>');
      $b_block.addClass('block');
      if (r_block[j]) {
        $b_block.addClass('solid');
      }
      $row.append($b_block);

      $piece.append($row);
    }

    return $piece;
  }
}

class PiecePlacement {
  constructor(piece, index, isAbove, isRotated) {
    this.piece = piece;
    this.index = index;
    this.isAbove = isAbove;
    this.isRotated = isRotated;
  }

  render() {
    return this.piece.render(this.isRotated);
  }
}

class Solution {
  constructor(piecePlacements) {
    console.log('[Solution] constructor', piecePlacements);
    this.piecePlacements = piecePlacements;
  }

  render() {
    var $solution = $('<div>');
    $solution.addClass('solution');

    var $pieces = [
      [null, null, null, null],
      [null, null, null, null]
    ];
    this.piecePlacements.forEach(function (piecePlacement) {
      $pieces[0+piecePlacement.isAbove][piecePlacement.index] = piecePlacement.render();
    });

    var $below = $('<div>');
    $below.addClass('below');
    $pieces[0].forEach(function ($piece) {
      $below.append($piece);
    });
    $solution.append($below);

    var $above = $('<div>');
    $above.addClass('above');
    $pieces[1].forEach(function ($piece) {
      $above.append($piece);
    });
    $solution.append($above);

    return $solution;
  }
}

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
console.log('pieces:', pieces);

var piecePlacements = [
  new PiecePlacement(pieces[0], 0, false, false),
  new PiecePlacement(pieces[1], 1, false, false),
  new PiecePlacement(pieces[2], 2, false, false),
  new PiecePlacement(pieces[3], 3, false, false),
  new PiecePlacement(pieces[4], 0, true, false),
  new PiecePlacement(pieces[5], 1, true, false),
  new PiecePlacement(pieces[6], 2, true, false),
  new PiecePlacement(pieces[7], 3, true, false)
];
console.log('piecePlacements:', piecePlacements);

var solution = new Solution(piecePlacements);
console.log('solution:', solution);

$('body').append(solution.render());
