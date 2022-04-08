/*----- constants -----*/
const COLORS = {
    '0': 'white',
    '1': 'purple',
    '-1': 'orange'
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

// const winnerMsg = document.querySelector('')
  
  /*----- event listeners -----*/
document.getElementById('playAgain').addEventListener('click', init);
document.getElementById('markers').addEventListener('click', handleDrop);
resetBtn.addEventListener('click', init);
  /*----- functions -----*/
init();
  
  // initialize state, then call render()
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
    //count up
    let idx = rowIdx + 1; // initialize to one above 
    while (idx < board[idx].length && board[colIdx][idx] === player) {
      count++;
      idx++;
    }
    idx = rowIdx - 1; // initialize to one above 
    while (idx >= 0 && board[colIdx][idx] === player) {
      count++;
      idx--;
    }
    return count === 4 ? renderWinner(player): null; 
  }
  
  
  //opposite
  function checkHorzWin(colIdx, rowIdx) {
    const player = board[colIdx][rowIdx];
    let count = 1; 
    //count right
    let idx = colIdx + 1; // initialize to one above 
    while (idx < board.length && board[idx][rowIdx] === player) {
      count++;
      idx++;
    }
    idx = colIdx - 1; // initialize to one above 
    while (idx >= 0 && board[idx][rowIdx] === player) {
      count++;
      idx--;
    }
    return count >= 4 ? renderWinner(player): null;
  }
function render() {
    // Iterate over the column arrays
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

    turnMsg.innerText = `${COLORS[turn]}Turn`;
  }
  
  // hide/show the markers (hide if no 0's exist in that column)
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

  // Update all impacted state, then call render
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
  // function checkWin() {
  //   for(let i=0; i < board.length -4; i++){
  //     for(let j=0; j < board[i].length -4; j++){
  //       if(board[i] [j]=== turn && board[i][j+1] === turn && board[i][j+2] && board[i][j+3]){
  //         winner = true
  //       } else if(board[i][j]=== turn && board[i+1][j] === turn && board[i+2][j] === turn && board[i+3][j]){
  //         winner = true
  //       }else if(board[i][j]=== turn && board[i+1][j+1] === turn && board[i+2][j+2] === turn && board[i+3][j+3]){
  //         winner = true
  //       }else if(board[i][j]=== turn && board[i+1][j-1] === turn && board[i+2][j-2] === turn && board[i+3][j-3]){
  //         winner = true
  //     }
  //   }
  // }
  // };




