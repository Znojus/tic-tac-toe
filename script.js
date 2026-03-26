console.log("It works")

const gameBoard = (() => {
    const board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];

    const getFreeSpots = () => {
        const free = [];
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                if (board[row][col] === "") {
                    free.push([row, col]);
                }
            }
        }
        return free;
    }

    const getCell = (row, col) => {
        return board[row][col];
    }

    const setCell = (row, col, mark) => {
        board[row][col] = mark;
    }

    const toFlat = () => {
        return board.flat();
    }

    return {
        getCell, setCell, getFreeSpots, toFlat
    };
})();

const gameController = ((gameBoard) => {
    let winner = null;
    const winPatterns = [
        [[0, 0], [0, 1], [0, 2]],
        [[1, 0], [1, 1], [1, 2]],
        [[2, 0], [2, 1], [2, 2]],

        [[0, 0], [1, 0], [2, 0]],
        [[0, 1], [1, 1], [2, 1]],
        [[0, 2], [1, 2], [2, 2]],

        [[0, 0], [1, 1], [2, 2]],
        [[0, 2], [1, 1], [2, 0]]
    ]

    const checkIfOver = () => {
        if (!gameBoard.toFlat().includes("")) {
            return true;
        }

        for (const pattern of winPatterns) {
            const [[row1, col1], [row2, col2], [row3, col3]] = pattern;
            const a = gameBoard.getCell(row1, col1);
            const b = gameBoard.getCell(row2, col2);
            const c = gameBoard.getCell(row3, col3);

            if (a !== "" && a === b && b === c) {
                winner = a;
                return true;
            }
        }
        return false;
    }

    const getWinner = () => {
        if (winner === null) {
            return "Draw";
        }
        return winner;
    }

    function pickRandomMove() {
        const free = gameBoard.getFreeSpots();
        if (free.length === 0) return null;
        const id = Math.floor(Math.random() * free.length);
        return free[id]; 
    }

    const makeAMove = () => {
        const move = pickRandomMove();
        if (move) {
            const [row, col] = move;
            gameBoard.setCell(row, col, "O");
            displayMove(row, col);
        }

        if(checkIfOver()){
            endGame();
        }
    }

    const endGame = () => {
        document.querySelector("h1").innerText = "Game is Over";
        document.body.removeChild(document.querySelector(".board"));
    }

    return {getWinner, checkIfOver, makeAMove, endGame};

})(gameBoard);

let boardDisplay = document.createElement("div");
boardDisplay.setAttribute("class", "board");

for (let i = 0; i < 9; i++) {
    let fieldDiv = document.createElement("div");
    fieldDiv.setAttribute("class", "field-div");
    fieldDiv.setAttribute("data-id", i);
    boardDisplay.appendChild(fieldDiv);
}

boardDisplay.addEventListener("click", (event) => {
    if (event.target.classList.contains("field-div")) {
        const fieldId = Number(event.target.dataset.id);
        const row = Math.floor(fieldId / 3);
        const col = fieldId % 3;
        if(gameBoard.getCell(row,col) !== ""){
            document.querySelector("h1").innerText = "The cell is taken";
            return;
        }
        document.querySelector("h1").innerText = "Nice Move!";
        gameBoard.setCell(row, col, "X");
        if (gameController.checkIfOver()) {
            gameController.endGame();
        }

        event.target.style.backgroundColor = "lightblue";
        gameController.makeAMove();
    }
});

function displayMove(row, col) {
    const index = row * 3 + col; // convert back to flat index
    const cell = document.querySelector(`[data-id="${index}"]`);
    cell.style.backgroundColor = "tomato";
}

document.body.appendChild(boardDisplay);



// function createPlayer(name) {
    
// }

//NOTES:

// index 0 > row 0, col 0(0 / 3=0, 0 % 3=0)
// index 1 > row 0, col 1(1 / 3=0, 1 % 3=1)
// index 2 > row 0, col 2(2 / 3=0, 2 % 3=2)
// index 3 > row 1, col 0(3 / 3=1, 3 % 3=0)
// index 4 > row 1, col 1(4 / 3=1, 4 % 3=1)