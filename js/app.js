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
  /*----- cached element references -----*/
const markerEls = [...document.querySelectorAll('#markers > div')];
const turnmsg = document.querySelector('h2');
  
  /*----- event listeners -----*/
document.getElementById('playagain').addEventListener('click', init);
document.getElementById('markers').addEventListener('click', handleDrop);
  
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
    render();
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
    renderMarkers(); checkWin()

    turnmsg.innerText = `${COLORS[turn]}OtherPlayer`;
  }
  
  // hide/show the markers (hide if no 0's exist in that column)
function renderMarkers() {
    markerEls.forEach(function(markerEl, colIdx) {
      markerEl.style.visibility = board[colIdx].includes(0) ? 'visible' : 'hidden';
    });
  }
  
  // Update all impacted state, then call render
function handleDrop(evt) {
    const colIdx = markerEls.indexOf(evt.target);
    if (colIdx === -1) return;
    const colArr = board[colIdx];
    const rowIdx = colArr.indexOf(0);
    colArr[rowIdx] = turn;
    turn *= -1;
    render();
  }
  
  function checkWin() {
    for(let i=0; i < board.length -4; i++){
      for(let j=0; j < board[i].length -4; j++){
        if(board[i] [j]=== turn && board[i][j+1] === turn && board[i][j+2] && board[i][j+3]){
          winner = true
        } else if(board[i][j]=== turn && board[i+1][j] === turn && board[i+2][j] === turn && board[i+3][j]){
          winner = true
        }else if(board[i][j]=== turn && board[i+1][j+1] === turn && board[i+2][j+2] === turn && board[i+3][j+3]){
          winner = true
        }else if(board[i][j]=== turn && board[i+1][j-1] === turn && board[i+2][j-2] === turn && board[i+3][j-3]){
          winner = true
      }
    }
  }
  };


