window.onload = function () {
    let gameBoard = [
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [2, 0, 2, 0, 2, 0, 2, 0],
    [0, 2, 0, 2, 0, 2, 0, 2],
    [2, 0, 2, 0, 2, 0, 2, 0]
  ];

  let pieces = [];
  let tiles = [];

  let distance = function (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
  }

  function Piece(element, location) {
    this.allowedtomove = true;
    this.element = element;
    this.location = location;
    this.player = '';
    if (this.element.attr("id") < 12)
      this.player = 1;
    else
      this.player = 2;
    this.king = false;
    this.makeKing = function () {
      if (this.player == 1) {
            this.element.css("backgroundImage", "url('images/pking.png')");
      }else if (this.player == 2) {
            this.element.css("backgroundImage", "url('images/zking.png')");
      }
      this.king = true;
    }
    this.move = function (tile) {
      this.element.removeClass('selected');
      if (!Board.isValidPlacetoMove(tile.location[0], tile.location[1])) return false;
      if (this.player == 1 && this.king == false) {
        if (tile.location[0] < this.location[0]) return false;
      } else if (this.player == 2 && this.king == false) {
        if (tile.location[0] > this.location[0]) return false;
      }
      Board.board[this.location[0]][this.location[1]] = 0;
      Board.board[tile.location[0]][tile.location[1]] = this.player;
      this.location = [tile.location[0], tile.location[1]];
      this.element.css('top', Board.dictionary[this.location[0]]);
      this.element.css('left', Board.dictionary[this.location[1]]);
      if (!this.king && (this.location[0] == 0 || this.location[0] == 7))
        this.makeKing();
      return true;
    };

    this.canJumpAny = function () {
      return (this.jumpPossible([this.location[0] + 2, this.location[1] + 2]) ||
        this.jumpPossible([this.location[0] + 2, this.location[1] - 2]) ||
        this.jumpPossible([this.location[0] - 2, this.location[1] + 2]) ||
        this.jumpPossible([this.location[0] - 2, this.location[1] - 2]))
    };

    this.jumpPossible = function (newlocation) {
      let dx = newlocation[1] - this.location[1];
      let dy = newlocation[0] - this.location[0];
      if (this.player == 1 && this.king == false) {
        if (newlocation[0] < this.location[0]) return false;
      } else if (this.player == 2 && this.king == false) {
        if (newlocation[0] > this.location[0]) return false;
      }
      if (newlocation[0] > 7 || newlocation[1] > 7 || newlocation[0] < 0 || newlocation[1] < 0) return false;
      let tileToCheckx = this.location[1] + dx / 2;
      let tileToChecky = this.location[0] + dy / 2;
      if (tileToCheckx > 7 || tileToChecky > 7 || tileToCheckx < 0 || tileToChecky < 0) return false;
      if (!Board.isValidPlacetoMove(tileToChecky, tileToCheckx) && Board.isValidPlacetoMove(newlocation[0], newlocation[1])) {
        for (let pieceIndex in pieces) {
          if (pieces[pieceIndex].location[0] == tileToChecky && pieces[pieceIndex].location[1] == tileToCheckx) {
            if (this.player != pieces[pieceIndex].player) {
              return pieces[pieceIndex];
            }
          }
        }
      }
      return false;
    };

    this.opponentJump = function (tile) {
      let pieceToRemove = this.jumpPossible(tile.location);
      if (pieceToRemove) {
        pieceToRemove.remove();
        return true;
      }
      return false;
    };

    this.remove = function () {
      this.element.css("display", "none");
      if (this.player == 1) {
        $('#player2').append("<div class='capturedPiece'></div>");
        Board.score.player2 += 1;
      }
      if (this.player == 2) {
        $('#player1').append("<div class='capturedPiece'></div>");
        Board.score.player1 += 1;
      }
      Board.board[this.location[0]][this.location[1]] = 0;
      this.location = [];
      let playerWon = Board.checkifAnybodyWon();
      if (playerWon) {
        $('#winner').html("Player " + playerWon + " has won!");
      }
    }
  }

  function Tile(element, location) {
    this.element = element;
    this.location = location;
    this.inRange = function (piece) {
      for (let k of pieces)
        if (k.location[0] == this.location[0] && k.location[1] == this.location[1]) return 'wrong';
      if (!piece.king && piece.player == 1 && this.location[0] < piece.location[0]) return 'wrong';
      if (!piece.king && piece.player == 2 && this.location[0] > piece.location[0]) return 'wrong';
      if (distance(this.location[0], this.location[1], piece.location[0], piece.location[1]) == Math.sqrt(2)) {
        return 'regular';
      } else if (distance(this.location[0], this.location[1], piece.location[0], piece.location[1]) == 2 * Math.sqrt(2)) {
        return 'jump';
      }
    };
  }

  let Board = {
    board: gameBoard,
    score: {
      player1: 0,
      player2: 0
    },
    playerTurn: 1,
    jumpexist: false,
    continuousjump: false,
    tilesElement: $('div.tiles'),
    dictionary: ["0vmin", "10vmin", "20vmin", "30vmin", "40vmin", "50vmin", "60vmin", "70vmin", "80vmin", "90vmin"],
    initalize: function () {
      let countPieces = 0;
      let countTiles = 0;
      for (let row in this.board) {
        for (let column in this.board[row]) {
          if (row % 2 == 1) {
            if (column % 2 == 0) {
              countTiles = this.tileRender(row, column, countTiles)
            }
          } else {
            if (column % 2 == 1) {
              countTiles = this.tileRender(row, column, countTiles)
            }
          }
          if (this.board[row][column] == 1) {
            countPieces = this.playerPiecesRender(1, row, column, countPieces)
          } else if (this.board[row][column] == 2) {
            countPieces = this.playerPiecesRender(2, row, column, countPieces)
          }
        }
      }
    },
    tileRender: function (row, column, countTiles) {
      this.tilesElement.append("<div class='tile' id='tile" + countTiles + "' style='top:" + this.dictionary[row] + ";left:" + this.dictionary[column] + ";'></div>");
      tiles[countTiles] = new Tile($("#tile" + countTiles), [parseInt(row), parseInt(column)]);
      return countTiles + 1
    },

    playerPiecesRender: function (playerNumber, row, column, countPieces) {
      $(`.player${playerNumber}pieces`).append("<div class='piece' id='" + countPieces + "' style='top:" + this.dictionary[row] + ";left:" + this.dictionary[column] + ";'></div>");
      pieces[countPieces] = new Piece($("#" + countPieces), [parseInt(row), parseInt(column)]);
      return countPieces + 1;
    },

    isValidPlacetoMove: function (row, column) {
      if (row < 0 || row > 7 || column < 0 || column > 7) return false;
      if (this.board[row][column] == 0) {
        return true;
      }
      return false;
    },

    changePlayerTurn: function () {
      if (this.playerTurn == 1) {
        this.playerTurn = 2;
        $('.turn').css("background", "linear-gradient(to right, transparent 50%, #BEEE62 50%)");
      } else {
        this.playerTurn = 1;
        $('.turn').css("background", "linear-gradient(to right, #BEEE62 50%, transparent 50%)");
      }
      this.check_if_jump_exist()
      return;
    },
    checkifAnybodyWon: function () {
      if (this.score.player1 == 12) {
        return 1;
      } else if (this.score.player2 == 12) {
        return 2;
      }
      return false;
    },

    clear: function () {
      location.reload();
    },
    check_if_jump_exist: function () {
      this.jumpexist = false
      this.continuousjump = false;
      for (let k of pieces) {

        if (k.location.length != 0 && k.player == this.playerTurn && k.canJumpAny()) {
          this.jumpexist = true
          k.allowedtomove = true;
        }
      }

      if (!this.jumpexist) {
        for (let k of pieces) k.allowedtomove = true;
      }
    },

    str_board: function () {
      ret = ""
      for (let i in this.board) {
        for (let j in this.board[i]) {
          let found = false
          for (let k of pieces) {
            if (k.location[0] == i && k.location[1] == j) {
              if (k.king) ret += (this.board[i][j] + 2)
              else ret += this.board[i][j]
              found = true
              break
            }
          }
          if (!found) ret += '0'
        }
      }
      return ret
    }
  }

  Board.initalize();

  $('.piece').on("click", function () {
    let selected;
    let isPlayersTurn = ($(this).parent().attr("class").split(' ')[0] == "player" + Board.playerTurn + "pieces");
    if (isPlayersTurn) {
      if (!Board.continuousjump && pieces[$(this).attr("id")].allowedtomove) {
        if ($(this).hasClass('selected')) selected = true;
        $('.piece').each(function (index) {
          $('.piece').eq(index).removeClass('selected')
        });
        if (!selected) {
          $(this).addClass('selected');
        }
      }
    }
  });

  $('#cleargame').on("click", function () {
    Board.clear();
  });

  $('.tile').on("click", function () {
    if ($('.selected').length != 0) {
      let tileID = $(this).attr("id").replace(/tile/, '');
      let tile = tiles[tileID];
      let piece = pieces[$('.selected').attr("id")];
      let inRange = tile.inRange(piece);
      if (inRange != 'wrong') {
        if (inRange == 'jump') {
          if (piece.opponentJump(tile)) {
            piece.move(tile);
            if (piece.canJumpAny()) {
              piece.element.addClass('selected');
              Board.continuousjump = true;
            } else {
              Board.changePlayerTurn()
            }
          }
        } else if (inRange == 'regular' && !Board.jumpexist) {
          if (!piece.canJumpAny()) {
            piece.move(tile);
            Board.changePlayerTurn()
          }
        }
      }
    }
  });
}
