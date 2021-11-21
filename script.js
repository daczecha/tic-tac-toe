class Player{
    constructor(name,score,display){
        this.score = score;
        this.display = display;
        this.name = name;
    }    
    
    win(){
        this.score++;
        this.display.innerText = this.score;
        popModal(this.name);
    }    
}    

let PvP = false;
let PvC = false;


let computerTurn = false;
let gameOver = false;


const $modal = document.getElementById("modal");
const $blur = document.getElementById("blur");


        
const $playerScore = document.getElementById('player_score');
const $opponentScore = document.getElementById('opponent_score');


const $player = document.getElementById('player_name_display');
const $opponent = document.getElementById('opponent_name_display');


let player = new Player("PLAYER ONE", 0, $playerScore);
let opponent = new Player("PLAYER TWO", 0, $opponentScore);         

let board = new Array(9);

let xTurn = true;

setActive();    



function play(index){
    index = Number(index);
    if(PvP === true){
        playPlayer(index);
    }
    if(PvC === true){
        playComputer(index);
    }
}

function playPlayer(index){
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
        setActive();
        checkWin();
    }
}

function playComputer(index){
    if(board[index] === undefined){
        if(computerTurn === false){
            board[index] = 1;
            document.getElementById(`${index}_sign`).classList.add('fas', 'fa-times');
            setTimeout(()=>{checkWin()}, 100);
            xTurn = !xTurn;
            setActive();
        }
            if(gameOver === false){
                computerTurn = true;
                let randomIndex;
                for(let i = 0; i < 8; i++){
                    randomIndex = getRandomInt(0,8);
                    if(board[randomIndex] === undefined){
                        board[randomIndex] = 0;
                        document.getElementById(`${randomIndex}_sign`).classList.add('far', 'fa-circle');
                        setTimeout(()=>{checkWin()}, 100);
                        xTurn = !xTurn;
                        computerTurn = false;
                        setActive();
                        break;
                    }
                }
            }
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
        gameOver = true;
        player.win();
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
        gameOver = true;
        opponent.win();
    }else{
        if(checkBoardFull()){
            gameOver = true;
            popModal("Draw!");
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


function restart(){
    board = new Array(9);
    for(let i = 0 ; i < 9; i++){
        document.getElementById(`${i}_sign`).classList.remove('fas','far','fa-circle','fa-times');
    }
    player.score = 0;
    opponent.score = 0;
    $playerScore.innerText = 0;
    $opponentScore.innerText = 0;

    $blur.style.display = 'none';
    $modal.style.display = 'none';

    document.getElementById("game").style.display = 'none';
    document.getElementById("game-settings").style.display = 'flex';

    PvP = false;
    PvC = false;
    gameOver = false;

    document.getElementById('player-vs-player').classList.remove('selected');
    document.getElementById('player-vs-computer').classList.remove('selected');
    document.getElementById("pvc_player_name").disabled = true; 
    document.getElementById("impossible").disabled = true; 
    document.getElementById("player_name").disabled = true; 
    document.getElementById("opponent_name").disabled = true;
}

function replay(){
    board = new Array(9);
    for(let i = 0 ; i < 9; i++){
        document.getElementById(`${i}_sign`).classList.remove('fas','far','fa-circle','fa-times');
    }
    gameOver = false;

    $blur.style.display = 'none';
    $modal.style.display = 'none';
}

function setActive(){
    if(xTurn){
        document.getElementById('player').classList.add('active');
        document.getElementById('opponent').classList.remove('active');
    }else{
        document.getElementById('player').classList.remove('active');
        document.getElementById('opponent').classList.add('active');
    }
}

function popModal(str){
    $blur.style.display = 'block';
    $modal.style.display = 'flex';

    if(str !== "Draw!")
        document.getElementById('message').innerText = `${str} WINS!`;
    else
        document.getElementById('message').innerText = `${str}`;
    document.getElementById('player_score_modal').innerText = player.score;
    document.getElementById('opponent_score_modal').innerText = opponent.score;
}


function selectMode(mode){
    if(mode === "player-vs-player"){
        PvP = true;
        PvC = false;

        document.getElementById('player-vs-player').classList.add('selected');
        document.getElementById('player-vs-computer').classList.remove('selected');

        document.getElementById("player_name").disabled = false; 
        document.getElementById("opponent_name").disabled = false; 

        document.getElementById("pvc_player_name").disabled = true; 

    }else if(mode === "player-vs-computer"){
        PvC = true;
        PvP = false;

        document.getElementById('player-vs-computer').classList.add('selected');
        document.getElementById('player-vs-player').classList.remove('selected');

        document.getElementById("pvc_player_name").disabled = false; 

        document.getElementById("player_name").disabled = true; 
        document.getElementById("opponent_name").disabled = true; 
    }else{
        
    }
}


function startGame(){
        if(PvC === false && PvP === false){
            return;
        }
        document.getElementById("game").style.display = 'flex';
        document.getElementById("game-settings").style.display = 'none';

        if(PvP === true){
            const $playerName = document.getElementById('player_name').value;
            const $opponentName = document.getElementById('opponent_name').value;
            if($playerName === "" || $opponentName === ""){
                
            }else{
                player.name = $playerName;
                opponent.name = $opponentName;
            }
            

            $player.innerText = player.name;
            $opponent.innerText = opponent.name;
        }

        if(PvC === true){
            const $playerName = document.getElementById('pvc_player_name').value;
            
            if($playerName === ""){
                opponent.name = "TERMINATOR";
            }else{
                player.name = $playerName;
                opponent.name = "TERMINATOR";
            }
            
            $player.innerText = player.name;
            $opponent.innerText = opponent.name;
        }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}