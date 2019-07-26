class Piece {
  constructor(a_blocks, b_blocks) {
    // console.log('[Piece] constructor', a_blocks, b_blocks);
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
