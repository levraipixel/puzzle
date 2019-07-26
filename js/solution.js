class Solution {
  constructor(piecePlacements) {
    console.log('[Solution] constructor', piecePlacements);
    this.piecePlacements = piecePlacements;
  }

  blocksMatrix() {
    var n = this.piecePlacements[0].piece.a_blocks.length;

    var rows = [];
    for(var i = 0; i < n; i++) {
      rows[i] = new Array(n);
    }

    this.piecePlacements.forEach(function (piecePlacement) {
      var piece = piecePlacement.piece;
      var index = piecePlacement.index;
      var isRotated = piecePlacement.isRotated;
      var isAbove = piecePlacement.isAbove;

      var index1 = index;
      var index2 = index + 1;

      var l_block = isRotated ? piece.b_blocks : piece.a_blocks;
      var r_block = isRotated ? piece.a_blocks : piece.b_blocks;

      if (isAbove) {
        for(var i = 0; i < l_block.length; i++) {
          var j = isRotated ? (l_block.length - 1 - i) : i;
          rows[index1][j] = (rows[index1][j] || 0) + l_block[j];
          rows[index2][j] = (rows[index2][j] || 0) + r_block[j];
        }
      } else {
        for(var i = 0; i < l_block.length; i++) {
          var j = isRotated ? (l_block.length - 1 - i) : i;
          rows[j][index1] = (rows[j][index1] || 0) + l_block[j];
          rows[j][index2] = (rows[j][index2] || 0) + r_block[j];
        }
      }
    });

    return rows;
  }

  isValid() {
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

  renderToBody() {
    $('body').append(this.render());

    var $blocksMatrix = $('<tbody>');
    this.blocksMatrix().forEach(function (row) {
      var $row = $('<tr>');

      row.forEach(function (value) {
        var $cell = $('<td>');
        $cell.text(value);
        $row.append($cell);
      });

      $blocksMatrix.append($row);
    });

    $('body').append(
      $('<table>').append($blocksMatrix)
    );
  }
}
