///////////////////// CONSTANTS /////////////////////////////////////
const WHOSJOE = "joe mama";

///////////////////// APP STATE (VARIABLES) /////////////////////////
let board [];
let gChild [];
let miencratfGood [];
let turn;
let win;
let geoTrigGarbage = function (x, y, x2, y2) {
  return ((((x-x2)^2)+()(y-y2)^2))^(1/2));
}
let location;
let hDistance;
let vDistance;

///////////////////// CACHED ELEMENT REFERENCES /////////////////////
const squares = Array.from(document.querySelectorAll("#board div"));
const message = document.querySelector("h2");

///////////////////// EVENT LISTENERS ///////////////////////////////
window.onload = init;
document.getElementById("board").onclick = takeTurn;
///////////////////// FUNCTIONS /////////////////////////////////////
let board = [
  ["","g", "", "g", "", "g", "", "g"],
  ["g", "", "g", "", "g", "", "g", ""],
  ["","g", "", "g", "", "g", "", "g"],
  ["","", "", "", "", "", "", ""],
  ["","", "", "", "", "", "", ""],
  ["p","", "p", "", "p", "", "p", ""],
  ["", "p","", "p", "", "p", "", "p"],
  ["p","", "p", "", "p", "", "p", ""],
];

function piece(location) {
  piece.space = true;
  piece.location = location;
  piece.turn;
  if (piece.attr("id") < 12) {
    piece.turn = "g";
  } else {
    piece.turn = "p";
  }
  piece.kinged = false;
  piece.king = function() {
    piece.css("backgroundImage", "url(piece.turn + "king.png")");
    piece.kinged = true;
  }
  piece.move = function(square) {
    this.removeClass("pieceBeingMoved");
    //piece move func
  }
}

piece.jumpOptions = function (squareMovedTo) {
  hDistance = squareMovedTo[1] - piece.location[1];
  vDistance = squareMovedTo[0] - piece.location[0];
}

piece.puedoIr = function () {
  //can the piece move according to jumpOptions
}

// make pieces and board
//make piece delete when removed
// king function
///TIC-TAC-TOE CODE///
// function init() {
//   turn = "g";
//   win = null;
//
//   render();
// }
//
// function render() {
//   board.forEach(function(mark, index) {
//     squares[index].textContent = mark;
//   });
//
//   message.textContent =
//     win === "T" ? "'tis a tie" : win ? `${win} hast won` : `turn: ${turn}`;
// }
//
// function takeTurn(e) {
//   if (!win) {
//     let index = squares.findIndex(function(square) {
//       return square === e.target;
//     });
//
//     if (board[index] === "") {
//       board[index] = turn;
//       turn = turn === "g" ? "pink" : "g";
//       win = getWinner();
//       render();
//     }
//   }
// }
//
// function getWinner() {
//   let winner = null;
//
//   winningConditions.forEach(function(condition, index) {
//     if (
//       board[condition[0]] &&
//       board[condition[0]] === board[condition[1]] &&
//       board[condition[1]] === board[condition[2]]
//     ) {
//       winner = board[condition[0]];
//     }
//   });
//
//   return winner ? winner : board.includes("") ? null : "T";
// }
