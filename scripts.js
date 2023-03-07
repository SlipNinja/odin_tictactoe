const gameBoard = (() => {
   const board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
   ];
   const boardDisplay = document.getElementById("board");

   for(let box of boardDisplay.children){
        box.onclick = boxClicked;
   }

   let draw = false;
   let win = false;

   const isGameOver = () => {
        return draw || win;
   };

   const isDraw = () => {
        return draw;
   };

   const isWin = () => {
        return win;
   };

   const gameWon = () => {
        return ((
            board[0][0] == board[0][1] &&
            board[0][0] == board[0][2] &&
            board[0][0] != ""
            ) || (
            board[0][0] == board[1][1] &&
            board[0][0] == board[2][2] &&
            board[0][0] != ""
            ) || (
            board[0][0] == board[1][0] &&
            board[0][0] == board[2][0] &&
            board[0][0] != ""
            ) || (
            board[0][1] == board[1][1] &&
            board[0][1] == board[2][1] &&
            board[0][1] != ""
            ) || (
            board[0][2] == board[1][2] &&
            board[0][2] == board[2][2] &&
            board[0][2] != ""
            ) || (
            board[0][2] == board[1][1] &&
            board[0][2] == board[2][0] &&
            board[0][2] != ""
            ) || (
            board[1][0] == board[1][1] &&
            board[1][0] == board[1][2] &&
            board[1][0] != ""
            ) || (
            board[2][0] == board[2][1] &&
            board[2][0] == board[2][2] &&
            board[2][0] != ""
            )
        );
   };

   const boardFull = () => {
        for(let i = 0; i <= 2; i++){
            for(let j = 0; j <= 2; j++){
                if(board[i][j] == ""){
                    return false;
                }
            }
        }
        return true;
   };

   const play = (player, x, y) => {        
        if(board[x][y] != "" || draw || win) {
            return;
        }

        board[x][y] = player.getMark();
        drawGame();

        if(gameWon()) {
            win = true;
            winner = player.getName();
        } else if(boardFull()){
            draw = true;
        }
    };

    const print = () => {
        console.table(board);
    };

    const drawGame = () => {
        for (let box of boardDisplay.children) {
            box.innerHTML = board[box.dataset.row][box.dataset.col];
        }
    };

    const clearGame = () => {
        for (let box of boardDisplay.children) {
            box.innerHTML = "";
        }
        board[0] = ["", "", ""];
        board[1] = ["", "", ""];
        board[2] = ["", "", ""];

        win = false;
        draw = false;
    };

   return {play, isGameOver, isDraw, isWin, clearGame, print};
})()


const Player = (playerName, playerMark) => {

    let name = playerName;

    const getMark = () => {
        return playerMark;
    };

    const getName = () => {
        return name;
    };

    const setName = (newName) => {
        name = newName;
    };

    return {getMark, getName, setName};
}

const player1 = Player("Player 1", "O");
const player2 = Player("Player 2", "X");
const logs = document.getElementById("logs");

let current_player = player1;

function boxClicked(e) {
    gameBoard.play(current_player, e.srcElement.dataset.row, e.srcElement.dataset.col);

    if(gameBoard.isGameOver()){
        if(gameBoard.isDraw()) {
            logs.innerHTML = "Game is a draw, no one wins."
        } else if (gameBoard.isWin()) {
            logs.innerHTML = `${current_player.getName()} wins !`;
        } else {
            logs.innerHTML = "Error - Can't resolve game's status"
        }
    } else {
        current_player = (current_player == player1) ? player2 : player1;

        logs.innerHTML = `${current_player.getName()}'s turn`;    
    }
}

const newGameBtn = document.getElementById("new-game");
const playerOneInput = document.getElementById("player-one");
const playerTwoInput = document.getElementById("player-two");

newGameBtn.onclick = resetGame;

function resetGame(e) {
    e.preventDefault();

    gameBoard.clearGame();

    let newPlayerOneName = playerOneInput.value ? playerOneInput.value : "Player 1";
    player1.setName(newPlayerOneName);

    let newPlayerTwoName = playerTwoInput.value ? playerTwoInput.value : "Player 2";
    player2.setName(newPlayerTwoName);

    current_player = player1;
    logs.innerHTML = `${newPlayerOneName}'s turn`;
}