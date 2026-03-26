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
        }

        if(checkIfOver()){
            endGame();
        }
    }

    const endGame = () => {
        document.querySelector("h1").innerText = "Game is Over";
    }

    return {getWinner, checkIfOver, makeAMove};

})(gameBoard);

// function createPlayer(name) {
    
// }