'use strict';

// Uncomment the next lines to use your game instance in the browser
// const Game = require('../modules/Game.class');
// const game = new Game();

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

function statusStart() {
  const start = document.querySelector('.start');
  const startNotification = document.querySelector('.message-start');

  start.addEventListener('click', () => {
    const matrix = getRows();

    addRandomNumberToRow(matrix);
    addRandomNumberToRow(matrix);

    start.disabled = true;
    startNotification.style.display = 'none';

    statusRestart();
  });
}

function statusRestart() {
  const restart = document.querySelector('.start');
  const startNotification = document.querySelector('.message-start');

  restart.textContent = 'Restart';

  const restartClickHandler = () => {
    resetMatrix();
    addRandomNumberToRow(getRows());
    addRandomNumberToRow(getRows());
    restart.disabled = false;
    startNotification.style.display = 'block';
  };

  restart.addEventListener('click', restartClickHandler);
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

  return newMatrix;
}

function moveLeft(matrix) {
  const newMatrix = matrix.map((row) => {
    const rowWithoutEmptyElements = [];
    const newRow = [];

    // Видаляємо порожні елементи з рядка
    for (let i = 0; i < row.length; i++) {
      if (row[i] !== '') {
        rowWithoutEmptyElements.push(row[i]);
      }
    }

    for (let i = 0; i < rowWithoutEmptyElements.length; i++) {
      if (rowWithoutEmptyElements[i] === rowWithoutEmptyElements[i + 1]) {
        newRow.push(rowWithoutEmptyElements[i] * 2);
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

  return newMatrix;
}

function init() {
  statusStart();

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      moveRight(getRows());
    } else if (e.key === 'ArrowLeft') {
      moveLeft(getRows());
    }
  });
}

init();
