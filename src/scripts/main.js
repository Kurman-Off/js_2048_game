'use strict';

// Uncomment the next lines to use your game instance in the browser
// const Game = require('../modules/Game.class');
// const game = new Game();
const score = [];

function getRows() {
  const rows = document.querySelectorAll('.field-row');
  const matrix = [];

  rows.forEach((row) => {
    const cells = row.querySelectorAll('.field-cell');
    const rowArray = [];

    cells.forEach((cell) => {
      rowArray.push(cell.textContent);
    });

    matrix.push(rowArray);
  });

  return matrix;
}

function transposeMatrix(matrix) {
  return matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]));
}

function randomNumbers() {
  return Math.random() < 0.1 ? 4 : 2;
}

function addRandomNumberToRow(matrix) {
  const emptyCells = [];

  matrix.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      if (cell === '') {
        emptyCells.push({ rowIndex, colIndex });
      }
    });
  });

  if (emptyCells.length > 0) {
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const { rowIndex, colIndex } = emptyCells[randomIndex];

    matrix[rowIndex][colIndex] = randomNumbers();

    const cellToFill = document
      .querySelectorAll('.field-row')
      [rowIndex].querySelectorAll('.field-cell')[colIndex];

    cellToFill.textContent = matrix[rowIndex][colIndex];
  }
}

function statusButton() {
  const startBtn = document.querySelector('.start');
  const startNotification = document.querySelector('.message-start');
  const winNotification = document.querySelector('.message-win');
  const loseNotification = document.querySelector('.message-lose');
  let stat = false;

  const clickHandler = () => {
    stat = !stat;

    if (stat) {
      const matrix = getRows();

      startBtn.textContent = 'Restart';

      startNotification.style.display = 'none';
      addRandomNumberToRow(matrix);
      addRandomNumberToRow(matrix);
    } else {
      startBtn.textContent = 'Start';
      startNotification.style.display = 'block';
      winNotification.style.display = 'none';
      loseNotification.style.display = 'none';
      resetMatrix();
      resetScore();
    }
  };

  startBtn.addEventListener('click', clickHandler);
}

function resetMatrix() {
  const rows = document.querySelectorAll('.field-row');

  rows.forEach((row) => {
    row.querySelectorAll('.field-cell').forEach((cell) => {
      cell.textContent = '';
    });
  });
}

function moveRight(matrix) {
  const newMatrix = matrix.map((row) => {
    const rowWithoutEmptyElements = [];
    const newRow = [];

    for (let i = 0; i < row.length; i++) {
      if (row[i] !== '') {
        rowWithoutEmptyElements.push(row[i]);
      }
    }

    for (let i = 0; i < rowWithoutEmptyElements.length; i++) {
      if (rowWithoutEmptyElements[i] === rowWithoutEmptyElements[i + 1]) {
        newRow.push(rowWithoutEmptyElements[i] * 2);
        score.push(rowWithoutEmptyElements[i] * 2);
        i++;
      } else {
        newRow.push(rowWithoutEmptyElements[i]);
      }
    }

    while (newRow.length < row.length) {
      newRow.unshift('');
    }

    return newRow;
  });

  const matrixChanged = !matrix.every((row, rowIndex) => {
    return row.every((cell, colIndex) => {
      return cell === newMatrix[rowIndex][colIndex];
    });
  });

  newMatrix.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      const cellToFill = document
        .querySelectorAll('.field-row')
        [rowIndex].querySelectorAll('.field-cell')[colIndex];

      cellToFill.textContent = cell;
    });
  });

  if (matrixChanged) {
    addRandomNumberToRow(newMatrix);
  }

  const totalScore = score.reduce((sum, currentScore) => {
    return sum + currentScore;
  }, 0);

  updateScore(totalScore);
  statusLose(newMatrix);
  statusWin(newMatrix);

  return newMatrix;
}

function moveLeft(matrix) {
  const newMatrix = matrix.map((row) => {
    const rowWithoutEmptyElements = [];
    const newRow = [];

    for (let i = 0; i < row.length; i++) {
      if (row[i] !== '') {
        rowWithoutEmptyElements.push(row[i]);
      }
    }

    for (let i = 0; i < rowWithoutEmptyElements.length; i++) {
      if (rowWithoutEmptyElements[i] === rowWithoutEmptyElements[i + 1]) {
        newRow.push(rowWithoutEmptyElements[i] * 2);
        score.push(rowWithoutEmptyElements[i] * 2);
        i++;
      } else {
        newRow.push(rowWithoutEmptyElements[i]);
      }
    }

    while (newRow.length < row.length) {
      newRow.push('');
    }

    return newRow;
  });

  const matrixChanged = !matrix.every((row, rowIndex) => {
    return row.every((cell, colIndex) => {
      return cell === newMatrix[rowIndex][colIndex];
    });
  });

  newMatrix.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      const cellToFill = document
        .querySelectorAll('.field-row')
        [rowIndex].querySelectorAll('.field-cell')[colIndex];

      cellToFill.textContent = cell;
    });
  });

  if (matrixChanged) {
    addRandomNumberToRow(newMatrix);
  }

  const totalScore = score.reduce((sum, currentScore) => {
    return sum + currentScore;
  }, 0);

  updateScore(totalScore);
  statusWin(newMatrix);
  statusLose(newMatrix);

  return newMatrix;
}

function moveUp(matrix) {
  const newMatrix = transposeMatrix(matrix).map((row) => {
    const rowWithoutEmptyElements = [];
    const newRow = [];

    for (let i = 0; i < row.length; i++) {
      if (row[i] !== '') {
        rowWithoutEmptyElements.push(row[i]);
      }
    }

    for (let i = 0; i < rowWithoutEmptyElements.length; i++) {
      if (rowWithoutEmptyElements[i] === rowWithoutEmptyElements[i + 1]) {
        newRow.push(rowWithoutEmptyElements[i] * 2);
        score.push(rowWithoutEmptyElements[i] * 2);
        i++;
      } else {
        newRow.push(rowWithoutEmptyElements[i]);
      }
    }

    while (newRow.length < row.length) {
      newRow.push('');
    }

    return newRow;
  });

  const finalMatrix = transposeMatrix(newMatrix);

  const matrixChanged = !matrix.every((row, rowIndex) => {
    return row.every((cell, colIndex) => {
      return cell === finalMatrix[rowIndex][colIndex];
    });
  });

  finalMatrix.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      const cellToFill = document
        .querySelectorAll('.field-row')
        [rowIndex].querySelectorAll('.field-cell')[colIndex];

      cellToFill.textContent = cell;
    });
  });

  if (matrixChanged) {
    addRandomNumberToRow(finalMatrix);
  }

  const totalScore = score.reduce((sum, currentScore) => sum + currentScore, 0);

  updateScore(totalScore);
  statusWin(newMatrix);
  statusLose(newMatrix);

  return finalMatrix;
}

function moveDown(matrix) {
  const newMatrix = transposeMatrix(matrix).map((row) => {
    const rowWithoutEmptyElements = [];
    const newRow = [];

    for (let i = 0; i < row.length; i++) {
      if (row[i] !== '') {
        rowWithoutEmptyElements.push(row[i]);
      }
    }

    for (let i = 0; i < rowWithoutEmptyElements.length; i++) {
      if (rowWithoutEmptyElements[i] === rowWithoutEmptyElements[i + 1]) {
        newRow.push(rowWithoutEmptyElements[i] * 2);
        score.push(rowWithoutEmptyElements[i] * 2);
        i++;
      } else {
        newRow.push(rowWithoutEmptyElements[i]);
      }
    }

    while (newRow.length < row.length) {
      newRow.unshift('');
    }

    return newRow;
  });

  const finalMatrix = transposeMatrix(newMatrix);

  const matrixChanged = !matrix.every((row, rowIndex) => {
    return row.every((cell, colIndex) => {
      return cell === finalMatrix[rowIndex][colIndex];
    });
  });

  finalMatrix.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      const cellToFill = document
        .querySelectorAll('.field-row')
        [rowIndex].querySelectorAll('.field-cell')[colIndex];

      cellToFill.textContent = cell;
    });
  });

  if (matrixChanged) {
    addRandomNumberToRow(finalMatrix);
  }

  const totalScore = score.reduce((sum, currentScore) => sum + currentScore, 0);

  updateScore(totalScore);
  statusWin(newMatrix);
  statusLose(newMatrix);

  return finalMatrix;
}

function updateScore(scores) {
  const scoreElement = document.querySelector('.game-score');

  if (scoreElement) {
    scoreElement.textContent = scores;
  }
}

function resetScore() {
  score.length = 0;
  updateScore(0);
}

function statusWin(matrix) {
  if (matrix.every((row) => row.every((cell) => cell === 2048))) {
    const winNotification = document.querySelector('.message-win');

    if (winNotification) {
      winNotification.style.display = 'block';
    }
  }
}

function statusLose(matrix) {
  if (matrix.every((row) => row.every((cell) => cell !== ''))) {
    const winNotification = document.querySelector('.message-lose');

    if (winNotification) {
      winNotification.style.display = 'block';
    }
  }
}

function init() {
  const moveFunctions = {
    ArrowRight: moveRight,
    ArrowLeft: moveLeft,
    ArrowUp: moveUp,
    ArrowDown: moveDown,
  };

  statusButton();

  document.addEventListener('keydown', (e) => {
    const matrix = getRows();
    const moveFunction = moveFunctions[e.key];

    if (moveFunction) {
      moveFunction(matrix);
    }
  });
}

init();
