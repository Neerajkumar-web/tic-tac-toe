document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('[data-cell]');
    const messageElement = document.querySelector('[data-message]');
    const restartButton = document.querySelector('[data-restart]');
  
    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let isGameActive = true;
  
    const checkWinner = () => {
      const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
  
      for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
          isGameActive = false;
          return gameBoard[a];
        }
      }
  
      if (!gameBoard.includes('')) {
        isGameActive = false;
        return 'draw';
      }
  
      return null;
    };
  
    const handleCellClick = (index) => {
      if (!isGameActive || gameBoard[index] !== '') return;
  
      gameBoard[index] = currentPlayer;
      cells[index].textContent = currentPlayer;
  
      const winner = checkWinner();
      if (winner) {
        if (winner === 'draw') {
          messageElement.textContent = "It's a draw!";
        } else {
          messageElement.textContent = `${winner} wins!`;
        }
      } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      }
    };
  
    const restartGame = () => {
      gameBoard = ['', '', '', '', '', '', '', '', ''];
      isGameActive = true;
      currentPlayer = 'X';
      messageElement.textContent = '';
      cells.forEach(cell => cell.textContent = '');
    };
  
    cells.forEach((cell, index) => {
      cell.addEventListener('click', () => handleCellClick(index));
    });
  
    restartButton.addEventListener('click', restartGame);
  });
  