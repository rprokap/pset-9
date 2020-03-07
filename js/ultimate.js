///////////////////// CONSTANTS /////////////////////////////////////
const winningConditionsUno = [
  [0, 10, 20],
  [30, 40, 50],
  [60, 70, 80],
  [0, 30, 60],
  [1, 40, 70],
  [2, 50, 80],
  [0, 40, 80],
  [20, 40, 60]
];

const winningConditionsDos = [

  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7]
]

const winningConditionsTres = [

  [31, 32, 33],
  [34, 35, 36],
  [37, 38, 39],
  [31, 34, 37],
  [32, 35, 38],
  [33, 36, 39],
  [31, 35, 39],
  [33, 35, 37]
]

const winningConditionsCuatro = [

  [61, 62, 63],
  [64, 65, 66],
  [67, 68, 69],
  [61, 64, 67],
  [62, 65, 68],
  [63, 66, 69],
  [61, 65, 69],
  [63, 65, 67]
]

const winningConditions5 = [

  [11, 12, 13],
  [14, 15, 16],
  [17, 18, 19],
  [11, 14, 17],
  [12, 15, 18],
  [13, 16, 19],
  [11, 15, 19],
  [13, 15, 17]
]

const winningConditions6 = [

  [41, 42, 43],
  [44, 45, 46],
  [47, 48, 49],
  [41, 44, 47],
  [42, 45, 48],
  [43, 46, 49],
  [41, 45, 49],
  [43, 45, 47]
]

const winningconditions7 = [

  [71, 72, 73],
  [74, 75, 76],
  [77, 78, 79],
  [71, 74, 77],
  [72, 75, 78],
  [73, 76, 79],
  [71, 75, 79],
  [73, 75, 77]
]


const winningConditionsAte = [

  [21, 22, 23],
  [24, 25, 26],
  [27, 28, 29],
  [21, 24, 27],
  [22, 25, 28],
  [23, 26, 29],
  [21, 25, 29],
  [23, 25, 27]
]

const winningConditionsNein = [

  [51, 52, 53],
  [54, 55, 56],
  [57, 58, 59],
  [51, 54, 57],
  [52, 55, 58],
  [53, 56, 59],
  [51, 55, 59],
  [53, 55, 57]
]

const winningConditionsTan = [

  [81, 82, 83],
  [84, 85, 86],
  [87, 88, 89],
  [81, 84, 87],
  [82, 85, 88],
  [83, 86, 89],
  [81, 85, 89],
  [83, 85, 87]
]

///////////////////// APP STATE (VARIABLES) /////////////////////////
let board, turn, win, ultimateWin, element, board1Win, board2Win, board3Win;
let board4Win, board5Win, board6Win, board7Win, board8Win, board9Win;
let board1Done, board2Done, board3Done, board4Done, board5Done, board6Done;
let board7Done, board8Done, board9Done;
let nextMove = "no limit";
let board1Win = false;
///////////////////// CACHED ELEMENT REFERENCES /////////////////////
const squares = Array.from(document.querySelectorAll("#board div"));
const message = document.querySelector("h2");

///////////////////// EVENT LISTENERS ///////////////////////////////
window.onload = init;
document.getElementById("board").onclick = takeTurn;
document.getElementById("reset-button").onclick = init;
document.getElementById("o-button").onclick = oStart;
document.getElementById("0squares").classList.remove("preSquare");
document.getElementById("10squares").classList.remove("preSquare");
document.getElementById("20squares").classList.remove("preSquare");
document.getElementById("30squares").classList.remove("preSquare");
document.getElementById("40squares").classList.remove("preSquare");
document.getElementById("50squares").classList.remove("preSquare");
document.getElementById("60squares").classList.remove("preSquare");
document.getElementById("70squares").classList.remove("preSquare");
document.getElementById("80squares").classList.remove("preSquare");

///////////////////// FUNCTIONS /////////////////////////////////////
function init() {
  turn = "X";
  board = [];
  for (let i = 0; i < 90; i ++){
    if(x % 10 !== 0){
      square[x].textContent = "";
    }
  }
  for(let j = 0; j < 90; j ++){
    if (square[0].textContent != "") {
      square[0].textContent = "";
      for(let k = 1; i < 10; k++) {
        element = document.createElement("div");
        element.setAttribute("class", "square");
        document.getElementById(i + "squares").appendChild(element);
      }
    }
  }
  board1Win = board2Win = board3Win = board4Win = board5Win = board6Win = board7Win = board8Win = board9Win = false;
  board1Done = board2Done = board3Done = board4Done = board5Done = board6Done = board7Done = board8Done = board9Done = false;
  squares = Array.from(document.querySelectorAll("#board div"));
  render();
}

function render() {
  board.forEach(function(mark, index) {
    squares[index].textContent = mark;
  })
}

message.textContent =
    win === "T" ? "'tis a tie" : win ? `${win} hast won` : `Turn: ${turn}`;
}

function takeTurn(e) {
  if (!win) {
    let index = squares.findIndex(function(square) {
      return square === e.target;
    });

    if(nextMove = "no limit") {
      if(square[index].textContent === ""){
        board[index] = turn;
        turn = turn === "X" ? "O" : "X";
        win = getWinner();
      }
    }
    if (square[index].textContent === "") {
      board[index] = turn;
      turn = turn === "X" ? "O" : "X";
      win = getWinner();
      nextMove = getNextMove(e);
      render();
    }
  } else if (nextMove == "board1") {
    if(board[0] != "X" && board[0] != "O" && board[0] != "T") {
      if (index >= 1 && index <= 9) {
        if (square[index].textContent === "") {
          board[index] = turn;
          turn = turn === "X" ? "O" : "X";
          win = getWinner();
          firstLeftWinner = getBoard1Winner(e);
          nextMove = getNextMove(e);
          document.getElementById("first-left").classList.remove("nextSquare");
          nextMove = getNextMove(e);

          render();
        }
      }
    }
    else {
      nextMove = "no limit";
    }
  }
  else if
  }
}




// function init() {
//   board = [
//     "", "", "",
//     "", "", "",
//     "", "", ""
//   ];
//
//   board2 = [
//     "", "", "",
//     "", "", "",
//     "", "", ""
//   ];
//
//   board3 = [
//     "", "", "",
//     "", "", "",
//     "", "", ""
//   ];
//
//   board4 = [
//     "", "", "",
//     "", "", "",
//     "", "", ""
//   ];
//
//   board5 = [
//     "", "", "",
//     "", "", "",
//     "", "", ""
//   ];
//
//   board6 = [
//     "", "", "",
//     "", "", "",
//     "", "", ""
//   ];
//
//   board7 = [
//     "", "", "",
//     "", "", "",
//     "", "", ""
//   ];
//
//   board8 = [
//     "", "", "",
//     "", "", "",
//     "", "", ""
//   ];
//
//   board9 = [
// //     "", "", "",
// //     "", "", "",
// //     "", "", ""
// //   ];
// //
// //   turn = "X";
// //   win = null;
// //
// //   render();
// // }
//
// function oStart() {
//   board = [
//     "", "", "",
//     "", "", "",
//     "", "", ""
//   ];
//
//   turn = "O";
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
//       turn = turn === "X" ? "O" : "X";
//       win = getWinner();
//       if (win == "X") {
//         xWin ++;
//         document.getElementById("x-wins").innerHTML = "x's wins: " + xWin;
//       } else if (win == "O") {
//         oWin ++;
//         document.getElementById("o-wins").innerHTML = "o's wins: " + oWin;
//       } else if (win == "T") {
//         ties ++;
//         document.getElementById("tie").innerHTML = "ties: " + ties;
//       }
//
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
