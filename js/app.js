/*----- constants -----*/
const COLORS = {
    '0': 'white',
    '1': 'Red',
    '-1': 'Blue'
  };
  
  /*----- app's state (variables) -----*/
let board;  // 2D Array where the nested arrays rep the columns
let turn;  // 1 or -1; 0 for nobody home in that cell
let winner;
let tieArray;
// let message;

  /*----- cached element references -----*/
const markerEls = [...document.querySelectorAll('#markers > div')];
const turnMsg = document.querySelector('h2');
const message = document.getElementById('message')
const resetBtn = document.getElementById('reset')
  
  /*----- event listeners -----*/
document.getElementById('playAgain').addEventListener('click', init);
document.getElementById('markers').addEventListener('click', handleDrop);
resetBtn.addEventListener('click', init);
  /*----- functions -----*/
init();

function init() {
    board = [
      [0, 0, 0, 0, 0, 0], 
      [0, 0, 0, 0, 0, 0],  
      [0, 0, 0, 0, 0, 0],  
      [0, 0, 0, 0, 0, 0],  
      [0, 0, 0, 0, 0, 0], 
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],

    ];
    turn = 1;
    tieArray=[];
    render();
    winner = null;
  }
  
  function checkVertWin(colIdx, rowIdx) {
    const player = board[colIdx][rowIdx];
    let count = 1; 
    let idx = rowIdx + 1; 
    while (idx < board[idx].length && board[colIdx][idx] === player) {
      count++;
      idx++;
    }
    idx = rowIdx - 1; 
    while (idx >= 0 && board[colIdx][idx] === player) {
      count++;
      idx--;
    }
    return count === 4 ? renderWinner(player): null; 
  }
  
  function checkHorzWin(colIdx, rowIdx) {
    const player = board[colIdx][rowIdx];
    let count = 1; 
    let idx = colIdx + 1;
    while (idx < board.length && board[idx][rowIdx] === player) {
      count++;
      idx++;
    }
    idx = colIdx - 1; 
    while (idx >= 0 && board[idx][rowIdx] === player) {
      count++;
      idx--;
    }
    return count >= 4 ? renderWinner(player): null;
  }
function render() {
    board.forEach(function(colArr, colIdx) { 
        console.log(colArr);
          colArr.forEach(function(cellVal, rowIdx) {
          console.log(colIdx);
          console.log(rowIdx);
        const cellEl = document.getElementById(`m${colIdx}k${rowIdx}`);
        cellEl.style.backgroundColor = COLORS[cellVal];
      });
    });
    renderMarkers();

    turnMsg.innerText = `${COLORS[turn]}`;
  }
  
  function renderMarkers() {
    markerEls.forEach(function(markerEl, colIdx) {
      markerEl.style.visibility = board[colIdx].includes(0) ? 'visible' : 'hidden';
    });
  }
  
  function renderWinner(player) {
    message.innerHTML = `The winner is ${COLORS[player]}!`;
    resetBtn.style.visibility = 'visible';
    winner = true;
  }

  function handleDrop(evt) {
    if (winner) return;
    const colIdx = markerEls.indexOf(evt.target);
    if (colIdx === -1) return;
    const colArr = board[colIdx];
    const rowIdx = colArr.indexOf(0);
    colArr[rowIdx] = turn;
    getWinner(colIdx, rowIdx);
    turn *= -1;
    render();
    getWinner(colIdx, rowIdx)
    tieArray.push(1)
    tieCheck();
  }

  function getWinner(colIdx, rowIdx) {
    return checkVertWin(colIdx, rowIdx)
      || checkHorzWin(colIdx, rowIdx);
  }

  function tieCheck() {
 
    if (tieArray.length === 42) {
        reset.style.visibility = 'visible';
        message.innerHTML = 'its a tie'
    };
  }




