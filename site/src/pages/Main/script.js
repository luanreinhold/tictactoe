const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let jogadorAtual = "X";
let running = false;

inicializarJogo();


function inicializarJogo(){
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `Vez do ${jogadorAtual}`;
    running = true;
}


function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex");

    if(gameBoard[cellIndex] != "" || !running){
        return;
    }
    atualizarCell(this, cellIndex);
    checkVencedor();
}
function atualizarCell(cell, index){
    gameBoard[index] = jogadorAtual;
    cell.textContent = jogadorAtual;
}
function changePlayer(){
    jogadorAtual = (jogadorAtual == "X") ? "O" : "X";
    statusText.textContent = `Vez do  ${jogadorAtual}`;
}


function checkVencedor(){
    let roundWon = false;

    for(let i = 0; i < winConditions.length; i++){
        const condition = winConditions[i];
        const cellA = gameBoard[condition[0]];
        const cellB = gameBoard[condition[1]];
        const cellC = gameBoard[condition[2]];

        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        }
        if(cellA == cellB && cellB == cellC){
            roundWon = true;
            break;
        }
    }

    if(roundWon){
        statusText.textContent = `${jogadorAtual} Venceu!`;
        document.body.style.backgroundColor = 'green';
        running = false;
    }
    else if(!gameBoard.includes("")){
        statusText.textContent = `Empate!`;
        document.body.style.backgroundColor = 'blue';
        running = false;
    }
    else{
        changePlayer();
    }
}
function restartGame(){
    document.body.style.backgroundColor = 'white';
    jogadorAtual = "X";
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `Vez do ${jogadorAtual}`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
}




