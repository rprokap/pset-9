///////////////////// CONSTANTS /////////////////////////////////////
const WHOSJOE = "joe mama";

///////////////////// APP STATE (VARIABLES) /////////////////////////
let board [];
let greenChild [];
let miencratfGood [];
let turn;
let win;
let geoTrigGarbage = function (x, y, x2, y2) {
  return ((((x-x2)^2)+()(y-y2)^2))^(1/2));
}
///////////////////// CACHED ELEMENT REFERENCES /////////////////////
const squares = Array.from(document.querySelectorAll("#board div"));
const message = document.querySelector("h2");

///////////////////// EVENT LISTENERS ///////////////////////////////
window.onload = init;
document.getElementById("board").onclick = takeTurn;
///////////////////// FUNCTIONS /////////////////////////////////////

// function checkersCircleThing {
//   [piece garbage]
// }
///tic-tac-toe code///
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
//       turn = turn === "green" ? "pink" : "green";
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
