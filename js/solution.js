class Solution {
  constructor(piecePlacements) {
    // console.log('[Solution] constructor', piecePlacements);
    this.piecePlacements = piecePlacements;
  }

  blocksMatrix() {
    var n = this.piecePlacements[0].piece.a_blocks.length;

    var rows = [];
    for(var i = 0; i < n; i++) {
      rows[i] = new Array(n);
    }

    this.piecePlacements.forEach(function (piecePlacement, iii) {
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
          rows[index1][j] = (rows[index1][j] || 0) + l_block[i];
          rows[index2][j] = (rows[index2][j] || 0) + r_block[i];
        }
      } else {
        for(var i = 0; i < l_block.length; i++) {
          var j = isRotated ? (l_block.length - 1 - i) : i;
          rows[j][index1] = (rows[j][index1] || 0) + l_block[i];
          rows[j][index2] = (rows[j][index2] || 0) + r_block[i];
        }
      }
    });

    return rows;
  }

  isValid() {
    var blocksMatrix = this.blocksMatrix();

    if (blocksMatrix[2][2] > 0) {
      // console.log('invalid on center');
      return false;
    }

    for(var i = 0; i < blocksMatrix.length; i++) {
      for(var j = 0; j < blocksMatrix[i].length; j++) {
        if (blocksMatrix[i][j] > 1) {
          // console.log('invalid at', i, j, '->', blocksMatrix[i][j]);
          return false;
        }
      }
    }

    return true;
  }

  render(isDebug) {
    var $solution = $('<div>');
    $solution.addClass('solution');
    if (isDebug) {
      $solution.addClass('debug');
    }

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

  renderToBody(isDebug) {
    $('body').append(this.render(isDebug));

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

    $('body').append(
      $('<div>').append(
        this.isValid() ? 'VALID' : 'INVALID'
      )
    );
  }
}
