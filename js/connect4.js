let board;
let turn;
let win;

const square = Array.from(document.querySelectorAll("#board div"));
const message = document.querySelector("h2");
const greenPiece = document.getElementById("z-audio");
window.onload = init;
document.getElementById("board").onclick = takeTurn;
document.getElementById("reset-button").onclick = playAgain;

const winningConditions = [
  [0, 1, 2, 3],
  [1, 2, 3, 4],
  [2, 3, 4, 5],
  [3, 4, 5, 6],
  [7, 8, 9, 10],
  [8, 9, 10, 11],
  [9, 10, 11, 12],
  [10, 11, 12, 13],
  [14, 15, 16, 17],
  [15, 16, 17, 18],
  [16, 17, 18, 19],
  [17, 18, 19, 20],
  [21, 22, 23, 24],
  [22, 23, 24, 25],
  [23, 24, 25, 26],
  [24, 25, 26, 27],
  [28, 29, 30, 31],
  [29, 30, 31, 32],
  [30, 31, 32, 33],
  [31, 32, 33, 34],
  [35, 36, 37, 38],
  [36, 37, 38, 39],
  [37, 38, 39, 40],
  [38, 39, 40, 41],
  [0, 7, 14, 21],
  [7, 14, 21, 28],
  [14, 21, 28, 35],
  [1, 8, 15, 22],
  [8, 15, 22, 29],
  [15, 22, 29, 36],
  [2, 9, 16, 23],
  [9, 16, 23, 30],
  [16, 23, 30, 37],
  [3, 10, 17, 24],
  [10, 17, 24, 31],
  [17, 24, 31, 38],
  [4, 11, 18, 21],
  [11, 18, 21, 32],
  [18, 21, 32, 39],
  [5, 12, 19, 26],
  [12, 19, 26, 33],
  [19, 26, 33, 40],
  [6, 13, 20, 27],
  [13, 20, 27, 34],
  [20, 27, 34, 41],
  [3, 9, 15, 21],
  [4, 10, 16, 22],
  [10, 16, 22, 28],
  [5, 11, 17, 23],
  [11, 17, 23, 29],
  [17, 23, 29, 35],
  [6, 12, 18, 24],
  [12, 18, 24, 30],
  [18, 24, 30, 36],
  [13, 19, 25, 31],
  [19, 25, 31, 37],
  [20, 26, 32, 38],
  [14, 22, 30, 38],
  [7, 15, 23, 31],
  [15, 23, 31, 39],
  [0, 8, 16, 24],
  [8, 16, 24, 32],
  [16, 24, 32, 40],
  [1, 9, 17, 25],
  [9, 17, 25, 33],
  [17, 25, 33, 41],
  [2, 10, 18, 26],
  [10, 18, 26, 34],
  [3, 11, 19, 27],
];


function init() {
  board = [
    "", "", "", "", "", "", "",
    "", "", "", "", "", "", "",
    "", "", "", "", "", "", "",
    "", "", "", "", "", "", "",
    "", "", "", "", "", "", "",
    "", "", "", "", "", "", "",
  ];
  turn = "zombie"
  win = null

  render();
}

function render() {
  board.forEach(function(mark, index) {
    square[index].textContent = mark;
  });

  message.textContent =
    win === "T" ? "'tis'a tie!" : win ? `${win} hast won` : `turn: ${turn}`;
}

function takeTurn(e) {
  if (e.target.id == "board") {
    return false;
  }
  if (!win) {
    let index = square.findIndex(function(square) {
      return square === e.target;
    });

    let row1 = index % 7;
    if (board[index] === "") {
      while (board[index + 7] === "") {
        let i = index + 7;
        document.getElementById("square" + i + "").classList.add(turn);
        board[i] = turn;
        document.getElementById("square" + index + "").classList.remove(turn);
        board[index] = "";
        index = i;
      } if (board[index] === "") {
        document.getElementById("square" + index + "").classList.add(turn);
        board[index] = turn;
        }
      }
      else if (board[index] !== "") {
        if (board[row1] === "") {
          while (board[row1 + 7] === "") {
            let i = row1 + 7;
            document.getElementById("square" + i + "").classList.add(turn);
            board[i] = turn;
            document.getElementById("square" + row1 + "").classList.remove(turn);
            board[row1] = "";
            row1 = i;
          }
          if (board[row1] === "") {
            document.getElementById("square" + row1 + "").classList.add(turn);
            board[row1] = turn;
          }
        }
      }
      if (board[row1] !== "") {
        return false;
      }
    }
      turn = turn === "zombie" ? "pigman" : "zombie";
      win = getWinner();
      render();
    }

function getWinner() {
  let winner = null;

  winningConditions.forEach(function(condition, index) {
    if (
      board[condition[0]] &&
      board[condition[0]] === board[condition[1]] &&
      board[condition[1]] === board[condition[2]] &&
      board[condition[2]] === board[condition[3]]
    ) {
      winner = board[condition[0]];
    }
  });

  return winner ? winner : board.includes("") ? null : "T";
}

function playAgain() {

  board.forEach(function(mark, index) {
    if (square[index].classList.contains("zombie")) {
      square[index].classList.remove("zombie")
    }
    if (square[index].classList.contains("pigman")) {
      square[index].classList.remove("pigman")
    }
  });
  init()
}
