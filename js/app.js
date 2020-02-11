///////////////////// CONSTANTS /////////////////////////////////////
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

///////////////////// APP STATE (VARIABLES) /////////////////////////
let board;
let turn;
let win;
let oWin = 0;
let xWin = 0;
let ties = 0;

///////////////////// CACHED ELEMENT REFERENCES /////////////////////
const squares = Array.from(document.querySelectorAll("#board div"));
const message = document.querySelector("h2");

///////////////////// EVENT LISTENERS ///////////////////////////////
window.onload = init;
document.getElementById("board").onclick = takeTurn;
document.getElementById("reset-button").onclick = init;
document.getElementById("o-button").onclick = oStart;
document.getElementById("score-reset").onclick = resetScore;
///////////////////// FUNCTIONS /////////////////////////////////////
function resetScore() {
  oWin = 0;
  document.getElementById("o-wins").innerHTML = "o's wins: " + oWin;
  xWin = 0;
  document.getElementById("x-wins").innerHTML = "x's wins: " + xWin;
  ties = 0;
  document.getElementById("tie").innerHTML = "ties: " + ties;
}

function init() {
  board = [
    "", "", "",
    "", "", "",
    "", "", ""
  ];

  turn = "X";
  win = null;

  render();
}

function oStart() {
  board = [
    "", "", "",
    "", "", "",
    "", "", ""
  ];

  turn = "O";
  win = null;

  render();
}

function render() {
  board.forEach(function(mark, index) {
    squares[index].textContent = mark;
  });

  message.textContent =
    win === "T" ? "'tis a tie" : win ? `${win} hast won` : `turn: ${turn}`;
}

function takeTurn(e) {
  if (!win) {
    let index = squares.findIndex(function(square) {
      return square === e.target;
    });

    if (board[index] === "") {
      board[index] = turn;
      turn = turn === "X" ? "O" : "X";
      win = getWinner();
      if (win == "X") {
        xWin ++;
        document.getElementById("x-wins").innerHTML = "x's wins: " + xWin;
      } else if (win == "O") {
        oWin ++;
        document.getElementById("o-wins").innerHTML = "o's wins: " + oWin;
      } else if (win == "T") {
        ties ++;
        document.getElementById("tie").innerHTML = "ties: " + ties;
      }

      render();
    }
  }
}

function getWinner() {
  let winner = null;

  winningConditions.forEach(function(condition, index) {
    if (
      board[condition[0]] &&
      board[condition[0]] === board[condition[1]] &&
      board[condition[1]] === board[condition[2]]
    ) {
      winner = board[condition[0]];
    }
  });

  return winner ? winner : board.includes("") ? null : "T";
}
