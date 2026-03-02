const rows = 6;
const cols = 7;
let board = [];
let currentPlayer = "red";
let gameOver = false;

const boardDiv = document.getElementById("board");
const statusText = document.getElementById("status");
const popup = document.getElementById("winner-popup");
const winnerText = document.getElementById("winner-text");

function createBoard() {
    board = Array.from({ length: rows }, () => Array(cols).fill(null));
    boardDiv.innerHTML = "";

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.row = r;
            cell.dataset.col = c;
            cell.addEventListener("click", () => dropDisc(c));
            boardDiv.appendChild(cell);
        }
    }
}

function dropDisc(col) {
    if (gameOver) return;

    for (let r = rows - 1; r >= 0; r--) {
        if (!board[r][col]) {
            board[r][col] = currentPlayer;
            updateBoard();

            if (checkWin(r, col)) {
                gameOver = true;
                winnerText.textContent = `${currentPlayer.toUpperCase()} WINS`;
                popup.style.display = "flex";
            } else {
                currentPlayer = currentPlayer === "red" ? "yellow" : "red";
                statusText.textContent = `Player ${currentPlayer === "red" ? "🔴" : "🟡"} Turn`;
            }
            break;
        }
    }
}

function updateBoard() {
    document.querySelectorAll(".cell").forEach(cell => {
        const r = cell.dataset.row;
        const c = cell.dataset.col;
        cell.classList.remove("red", "yellow");
        if (board[r][c]) {
            cell.classList.add(board[r][c]);
        }
    });
}

function checkWin(row, col) {
    return (
        checkDirection(row, col, 1, 0) ||
        checkDirection(row, col, 0, 1) ||
        checkDirection(row, col, 1, 1) ||
        checkDirection(row, col, 1, -1)
    );
}

function checkDirection(row, col, rowDir, colDir) {
    let count = 1;
    count += countDiscs(row, col, rowDir, colDir);
    count += countDiscs(row, col, -rowDir, -colDir);
    return count >= 4;
}

function countDiscs(row, col, rowDir, colDir) {
    let r = row + rowDir;
    let c = col + colDir;
    let count = 0;

    while (
        r >= 0 && r < rows &&
        c >= 0 && c < cols &&
        board[r][c] === currentPlayer
    ) {
        count++;
        r += rowDir;
        c += colDir;
    }
    return count;
}

function resetGame() {
    currentPlayer = "red";
    gameOver = false;
    popup.style.display = "none";
    statusText.textContent = "Player 🔴 Turn";
    createBoard();
}

createBoard();
