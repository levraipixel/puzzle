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
