let board = new Array(9);

let xTurn = true;


function play(index){
    index = Number(index);
    if(board[index] === undefined){
        if (xTurn){
            board[index] = 1;
            document.getElementById(`${index}_sign`).classList.add('fas', 'fa-times');
            xTurn = !xTurn;
        }else {
            board[index] = 0;
            document.getElementById(`${index}_sign`).classList.add('far', 'fa-circle');
            xTurn = !xTurn;
        }
        checkWin();
    }
}

function updateBoard(){
    for(let i = 0; i < board.length; i++){
    }
}

function checkWin(){
    if (
        (board[0]+board[1]+board[2]) === 3 ||
        (board[3]+board[4]+board[5]) === 3 ||
        (board[6]+board[7]+board[8]) === 3 ||

        (board[0]+board[3]+board[6]) === 3 ||
        (board[1]+board[4]+board[7]) === 3 ||
        (board[2]+board[5]+board[8]) === 3 ||

        (board[0]+board[4]+board[8]) === 3 ||
        (board[6]+board[4]+board[2]) === 3
    ){
        alert('X wins!');
    }else if (
        (board[0]+board[1]+board[2]) === 0 ||
        (board[3]+board[4]+board[5]) === 0 ||
        (board[6]+board[7]+board[8]) === 0 ||

        (board[0]+board[3]+board[6]) === 0 ||
        (board[1]+board[4]+board[7]) === 0 ||
        (board[2]+board[5]+board[8]) === 0 ||

        (board[0]+board[4]+board[8]) === 0 ||
        (board[6]+board[4]+board[2]) === 0

    ){
        alert('O wins!');
    }else{
        if(checkBoardFull()){
            alert('Draw!');
        }
    }
}


function checkBoardFull(){
    let isFull = true;
    for(let i = 0; i< board.length; i++){
        if(board[i] == undefined){
            isFull = false;
            break;
        }
    }
    return isFull;
}