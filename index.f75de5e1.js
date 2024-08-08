"use strict";
// Uncomment the next lines to use your game instance in the browser
// const Game = require('../modules/Game.class');
// const game = new Game();
const score = [];
let gameOver = false;
function getRows() {
    const rows = document.querySelectorAll(".field-row");
    const matrix = [];
    rows.forEach((row)=>{
        const cells = row.querySelectorAll(".field-cell");
        const rowArray = [];
        cells.forEach((cell)=>{
            rowArray.push(cell.textContent);
        });
        matrix.push(rowArray);
    });
    return matrix;
}
function transposeMatrix(matrix) {
    return matrix[0].map((_, colIndex)=>matrix.map((row)=>row[colIndex]));
}
function randomNumbers() {
    return Math.random() < 0.1 ? 4 : 2;
}
function addRandomNumberToRow(matrix) {
    const emptyCells = [];
    matrix.forEach((row, rowIndex)=>{
        row.forEach((cell, colIndex)=>{
            if (cell === "") emptyCells.push({
                rowIndex,
                colIndex
            });
        });
    });
    if (emptyCells.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const { rowIndex, colIndex } = emptyCells[randomIndex];
        matrix[rowIndex][colIndex] = randomNumbers();
        const cellToFill = document.querySelectorAll(".field-row")[rowIndex].querySelectorAll(".field-cell")[colIndex];
        cellToFill.textContent = matrix[rowIndex][colIndex];
    }
}
function statusButton() {
    const startBtn = document.querySelector(".start");
    const startNotification = document.querySelector(".message-start");
    const winNotification = document.querySelector(".message-win");
    const loseNotification = document.querySelector(".message-lose");
    let stat = false;
    const clickHandler = ()=>{
        stat = !stat;
        if (stat) {
            const matrix = getRows();
            startBtn.textContent = "Restart";
            startNotification.style.display = "none";
            init();
            handleTouchEvents();
            addRandomNumberToRow(matrix);
            addRandomNumberToRow(matrix);
        } else {
            startBtn.textContent = "Start";
            startNotification.style.display = "block";
            winNotification.style.display = "none";
            loseNotification.style.display = "none";
            gameOver = false;
            resetMatrix();
            resetScore();
        }
    };
    startBtn.addEventListener("click", clickHandler);
}
function resetMatrix() {
    const rows = document.querySelectorAll(".field-row");
    rows.forEach((row)=>{
        row.querySelectorAll(".field-cell").forEach((cell)=>{
            cell.textContent = "";
        });
    });
}
function moveRight(matrix) {
    if (gameOver) return;
    const newMatrix = matrix.map((row)=>{
        const rowWithoutEmptyElements = [];
        const newRow = [];
        for(let i = 0; i < row.length; i++){
            const cell = Number(row[i]); // Перетворюємо значення в число
            if (!isNaN(cell) && cell !== 0) rowWithoutEmptyElements.push(cell);
        }
        rowWithoutEmptyElements.reverse();
        for(let i = 0; i < rowWithoutEmptyElements.length; i++)if (rowWithoutEmptyElements[i] === rowWithoutEmptyElements[i + 1]) {
            newRow.push(rowWithoutEmptyElements[i] * 2);
            score.push(rowWithoutEmptyElements[i] * 2);
            i++;
        } else newRow.push(rowWithoutEmptyElements[i]);
        newRow.reverse();
        while(newRow.length < row.length)newRow.unshift("");
        return newRow;
    });
    const matrixChanged = !matrix.every((row, rowIndex)=>{
        return row.every((cell, colIndex)=>{
            return Number(cell) === Number(newMatrix[rowIndex][colIndex]);
        });
    });
    newMatrix.forEach((row, rowIndex)=>{
        row.forEach((cell, colIndex)=>{
            const cellToFill = document.querySelectorAll(".field-row")[rowIndex].querySelectorAll(".field-cell")[colIndex];
            cellToFill.textContent = cell;
        });
    });
    if (matrixChanged) addRandomNumberToRow(newMatrix);
    const totalScore = score.reduce((sum, currentScore)=>sum + currentScore, 0);
    updateScore(totalScore);
    statusWin(newMatrix);
    statusLose(newMatrix);
    return newMatrix;
}
function moveLeft(matrix) {
    if (gameOver) return;
    const newMatrix = matrix.map((row)=>{
        const rowWithoutEmptyElements = [];
        const newRow = [];
        for(let i = 0; i < row.length; i++){
            const cell = Number(row[i]); // Перетворюємо значення в число
            if (!isNaN(cell) && cell !== 0) rowWithoutEmptyElements.push(cell);
        }
        for(let i = 0; i < rowWithoutEmptyElements.length; i++)if (rowWithoutEmptyElements[i] === rowWithoutEmptyElements[i + 1]) {
            newRow.push(rowWithoutEmptyElements[i] * 2);
            score.push(rowWithoutEmptyElements[i] * 2);
            i++;
        } else newRow.push(rowWithoutEmptyElements[i]);
        while(newRow.length < row.length)newRow.push("");
        return newRow;
    });
    const matrixChanged = !matrix.every((row, rowIndex)=>{
        return row.every((cell, colIndex)=>{
            return Number(cell) === Number(newMatrix[rowIndex][colIndex]);
        });
    });
    newMatrix.forEach((row, rowIndex)=>{
        row.forEach((cell, colIndex)=>{
            const cellToFill = document.querySelectorAll(".field-row")[rowIndex].querySelectorAll(".field-cell")[colIndex];
            cellToFill.textContent = cell;
        });
    });
    if (matrixChanged) addRandomNumberToRow(newMatrix);
    const totalScore = score.reduce((sum, currentScore)=>sum + currentScore, 0);
    updateScore(totalScore);
    statusWin(newMatrix);
    statusLose(newMatrix);
    return newMatrix;
}
function moveUp(matrix) {
    if (gameOver) return;
    const newMatrix = transposeMatrix(matrix).map((row)=>{
        const rowWithoutEmptyElements = [];
        const newRow = [];
        for(let i = 0; i < row.length; i++){
            const cell = Number(row[i]); // Перетворюємо значення в число
            if (!isNaN(cell) && cell !== 0) rowWithoutEmptyElements.push(cell);
        }
        for(let i = 0; i < rowWithoutEmptyElements.length; i++)if (rowWithoutEmptyElements[i] === rowWithoutEmptyElements[i + 1]) {
            newRow.push(rowWithoutEmptyElements[i] * 2);
            score.push(rowWithoutEmptyElements[i] * 2);
            i++;
        } else newRow.push(rowWithoutEmptyElements[i]);
        while(newRow.length < row.length)newRow.push("");
        return newRow;
    });
    const finalMatrix = transposeMatrix(newMatrix);
    const matrixChanged = !matrix.every((row, rowIndex)=>{
        return row.every((cell, colIndex)=>{
            return Number(cell) === Number(finalMatrix[rowIndex][colIndex]);
        });
    });
    finalMatrix.forEach((row, rowIndex)=>{
        row.forEach((cell, colIndex)=>{
            const cellToFill = document.querySelectorAll(".field-row")[rowIndex].querySelectorAll(".field-cell")[colIndex];
            cellToFill.textContent = cell;
        });
    });
    if (matrixChanged) addRandomNumberToRow(finalMatrix);
    const totalScore = score.reduce((sum, currentScore)=>sum + currentScore, 0);
    updateScore(totalScore);
    statusWin(finalMatrix);
    statusLose(finalMatrix);
    return finalMatrix;
}
function moveDown(matrix) {
    if (gameOver) return;
    const newMatrix = transposeMatrix(matrix).map((row)=>{
        const rowWithoutEmptyElements = [];
        const newRow = [];
        for(let i = 0; i < row.length; i++){
            const cell = Number(row[i]); // Перетворюємо значення в число
            if (!isNaN(cell) && cell !== 0) rowWithoutEmptyElements.push(cell);
        }
        rowWithoutEmptyElements.reverse();
        for(let i = 0; i < rowWithoutEmptyElements.length; i++)if (rowWithoutEmptyElements[i] === rowWithoutEmptyElements[i + 1]) {
            newRow.push(rowWithoutEmptyElements[i] * 2);
            score.push(rowWithoutEmptyElements[i] * 2);
            i++;
        } else newRow.push(rowWithoutEmptyElements[i]);
        newRow.reverse();
        while(newRow.length < row.length)newRow.unshift("");
        return newRow;
    });
    const finalMatrix = transposeMatrix(newMatrix);
    const matrixChanged = !matrix.every((row, rowIndex)=>{
        return row.every((cell, colIndex)=>{
            return Number(cell) === Number(finalMatrix[rowIndex][colIndex]);
        });
    });
    finalMatrix.forEach((row, rowIndex)=>{
        row.forEach((cell, colIndex)=>{
            const cellToFill = document.querySelectorAll(".field-row")[rowIndex].querySelectorAll(".field-cell")[colIndex];
            cellToFill.textContent = cell;
        });
    });
    if (matrixChanged) addRandomNumberToRow(finalMatrix);
    const totalScore = score.reduce((sum, currentScore)=>sum + currentScore, 0);
    updateScore(totalScore);
    statusWin(finalMatrix);
    statusLose(finalMatrix);
    return finalMatrix;
}
function updateScore(scores) {
    const scoreElement = document.querySelector(".game-score");
    if (scoreElement) scoreElement.textContent = scores;
}
function resetScore() {
    score.length = 0;
    updateScore(0);
}
function statusWin(matrix) {
    if (matrix.some((row)=>row.some((cell)=>cell >= 2048))) {
        const winNotification = document.querySelector(".message-win");
        if (winNotification) {
            winNotification.style.display = "block";
            gameOver = true;
        }
    }
}
function statusLose(matrix) {
    const allCellsFilled = matrix.every((row)=>{
        return row.every((cell)=>{
            return Number(cell) !== 0;
        });
    });
    if (allCellsFilled) {
        const canMerge = matrix.some((row, rowIndex)=>{
            return row.some((cell, colIndex)=>{
                const rightMerge = colIndex < row.length - 1 && Number(cell) === Number(row[colIndex + 1]);
                const downMerge = rowIndex < matrix.length - 1 && Number(cell) === Number(matrix[rowIndex + 1][colIndex]);
                return rightMerge || downMerge;
            });
        });
        if (!canMerge) {
            const loseNotification = document.querySelector(".message-lose");
            if (loseNotification) {
                loseNotification.style.display = "block";
                gameOver = true;
            }
        }
    }
}
function init() {
    const moveFunctions = {
        ArrowRight: moveRight,
        ArrowLeft: moveLeft,
        ArrowUp: moveUp,
        ArrowDown: moveDown
    };
    document.addEventListener("keydown", (e)=>{
        if (gameOver) return;
        const matrix = getRows();
        const moveFunction = moveFunctions[e.key];
        if (moveFunction) moveFunction(matrix);
    });
}
function handleTouchEvents() {
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;
    document.addEventListener("touchstart", function(e) {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    });
    document.addEventListener("touchmove", function(e) {
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
    });
    document.addEventListener("touchend", function() {
        handleGesture();
    });
    function handleGesture() {
        const diffX = touchEndX - touchStartX;
        const diffY = touchEndY - touchStartY;
        if (Math.abs(diffX) > Math.abs(diffY)) {
            if (diffX > 0) moveRight(getRows());
            else moveLeft(getRows());
        } else if (diffY > 0) moveDown(getRows());
        else moveUp(getRows());
    }
}
statusButton();

//# sourceMappingURL=index.f75de5e1.js.map
