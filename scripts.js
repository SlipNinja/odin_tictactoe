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
   let winner = "";

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
            console.log(`${player.getName()} won the game !`);
            win = true;
            winner = player.getName();
        } else if(boardFull()){
            //console.log("The game ends in a draw !");
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
    };

   return {play, isGameOver, isDraw, isWin, clearGame, print};
})()


const Player = (playerName, playerMark) => {
    const getMark = () => {
        return playerMark;
    };

    const getName = () => {
        return playerName;
    };

    return {getMark, getName};
}

function boxClicked(e) {
    console.log(e.srcElement);
}


const player1 = Player("Player 1", "O");
const player2 = Player("Player 2", "X");

gameBoard.play(player1, 0, 0);
gameBoard.play(player2, 0, 1);
gameBoard.play(player1, 0, 2);
gameBoard.play(player2, 1, 0);
gameBoard.play(player1, 1, 1);
gameBoard.play(player2, 1, 2);
gameBoard.play(player1, 2, 0);
gameBoard.play(player2, 2, 1);
gameBoard.play(player1, 2, 2);