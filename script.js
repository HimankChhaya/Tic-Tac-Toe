// Tic Tac Toe game logic implemented in vanilla JavaScript.

document.addEventListener('DOMContentLoaded', () => {
  const boardElem = document.getElementById('board');
  const currentPlayerElem = document.getElementById('currentPlayer');
  const messageElem = document.getElementById('message');
  const newGameButton = document.getElementById('newGameButton');

  // Game state
  let board = [];
  let currentPlayer = 'X';
  let gameActive = true;

  /**
   * Initialize or reset the game state and UI.
   */
  function initGame() {
    // Reset state
    board = [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ];
    currentPlayer = 'X';
    gameActive = true;
    currentPlayerElem.textContent = currentPlayer;
    messageElem.textContent = '';
    // Clear board UI and populate new cells
    boardElem.innerHTML = '';
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.row = r;
        cell.dataset.col = c;
        cell.addEventListener('click', onCellClick);
        boardElem.appendChild(cell);
      }
    }
  }

  /**
   * Handle a click on a cell. Place the current player's mark if valid.
   * @param {Event} event - The click event.
   */
  function onCellClick(event) {
    if (!gameActive) return;
    const cell = event.target;
    const row = parseInt(cell.dataset.row, 10);
    const col = parseInt(cell.dataset.col, 10);
    // If the cell is already filled, ignore
    if (board[row][col] !== '') return;
    // Update state
    board[row][col] = currentPlayer;
    cell.textContent = currentPlayer;
    // Check for winner or draw
    if (checkWinner(row, col)) {
      gameActive = false;
      messageElem.textContent = `Player ${currentPlayer} wins!`;
      // Highlight winning cells
      highlightWinningCells();
    } else if (checkDraw()) {
      gameActive = false;
      messageElem.textContent = 'It\'s a draw!';
    } else {
      // Switch player
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      currentPlayerElem.textContent = currentPlayer;
    }
  }

  /**
   * Check if the current move results in a win.
   * @param {number} row - Row index of the move.
   * @param {number} col - Column index of the move.
   * @returns {boolean} True if the move wins the game.
   */
  function checkWinner(row, col) {
    const player = currentPlayer;
    // Check row
    if (board[row][0] === player && board[row][1] === player && board[row][2] === player) {
      return true;
    }
    // Check column
    if (board[0][col] === player && board[1][col] === player && board[2][col] === player) {
      return true;
    }
    // Check diagonals
    if (row === col && board[0][0] === player && board[1][1] === player && board[2][2] === player) {
      return true;
    }
    if (row + col === 2 && board[0][2] === player && board[1][1] === player && board[2][0] === player) {
      return true;
    }
    return false;
  }

  /**
   * Check if the board is full, resulting in a draw.
   * @returns {boolean} True if all cells are filled and no winner.
   */
  function checkDraw() {
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        if (board[r][c] === '') return false;
      }
    }
    return true;
  }

  /**
   * Highlight the winning line by adding a CSS class to the cells.
   */
  function highlightWinningCells() {
    const cells = boardElem.querySelectorAll('.cell');
    // Check all possible win conditions and add 'winner' class
    const winningLines = [
      // Rows
      [[0, 0], [0, 1], [0, 2]],
      [[1, 0], [1, 1], [1, 2]],
      [[2, 0], [2, 1], [2, 2]],
      // Columns
      [[0, 0], [1, 0], [2, 0]],
      [[0, 1], [1, 1], [2, 1]],
      [[0, 2], [1, 2], [2, 2]],
      // Diagonals
      [[0, 0], [1, 1], [2, 2]],
      [[0, 2], [1, 1], [2, 0]]
    ];
    for (const line of winningLines) {
      const [a, b, c] = line;
      if (board[a[0]][a[1]] && board[a[0]][a[1]] === board[b[0]][b[1]] && board[a[0]][a[1]] === board[c[0]][c[1]]) {
        // Add winner class to cells in this line
        line.forEach(([r, col]) => {
          const idx = r * 3 + col;
          cells[idx].classList.add('winner');
        });
        break;
      }
    }
  }

  // Attach new game button listener
  newGameButton.addEventListener('click', initGame);

  // Initialize the game on page load
  initGame();
});