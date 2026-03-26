console.log("It works")

const gameBoard = (() => {
    const board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];

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

    return {
        board, winPatterns
    };
})();

const gameController = (() => {
    let winner = null;

    const checkIfOver = (board, winPatterns) => {
        if (!board.flat().includes("")) {
            return true;
        }

        for (const pattern of winPatterns) {
            const [[row1, col1], [row2, col2], [row3, col3]] = pattern;
            const a = board[row1][col1];
            const b = board[row2][col2];
            const c = board[row3][col3];

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

    function getFreeSpots(board) {
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

    function pickRandomMove(board) {
        const free = getFreeSpots(board);
        if (free.length === 0) return null;
        const id = Math.floor(Math.random() * free.length);
        return free[id]; 
    }

    const makeAMove = (board, winPatterns) => {
        const move = pickRandomMove(board);
        if (move) {
            const [row, col] = move;
            board[row][col] = "O";
        }

        if(checkIfOver(board, winPatterns)){
            endGame();
        }
    }

    const endGame = () => {
        document.querySelector("h1").innerText = "Game is Over";
    }

    return {getWinner, checkIfOver, makeAMove};

})();

// function createPlayer(name) {
    
// }