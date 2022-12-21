const fillSize = 25;
const cellSize = 20;
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
let currPop = new Array(fillSize);
let nextPop = new Array(fillSize);


 
for(let i = 0; i < fillSize; i++){
	currPop[i] = new Array(fillSize);
	nextPop[i] = new Array(fillSize);
}
for(let i = 0; i <fillSize; i++){
	for(let j = 0; j < fillSize; j++){
		currPop[i][j] = 0;
	}
}
 
function initFixRandom(){
	let numOfCells = document.getElementById("numOfCells").value;
	console.log(numOfCells);
	for(let i = 0; i < numOfCells; i++){
		let j = Math.floor(Math.random() * 25);
		let k = Math.floor(Math.random() * 25);
		currPop[k][j] = 1;
	}
}

function userCells(){
	let x = document.getElementById("cellX").value - 1;
	let y = document.getElementById("cellY").value - 1;
	currPop[x][y] = 1;
	ctx.fillStyle = "#cb2d41";
	ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
}

function draw() {
	for(let i = 0; i < fillSize; i++){
		for(let j = 0; j < fillSize; j++){
			currPop[i][j] == 1 ? ctx.fillStyle = "#cb2d41" : ctx.fillStyle = "#FFFFFF";
			ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
		}
	}
}

function neighbourCount(i,j){
	let num = 0;
	for(let l = -1; l <= 1; l++){
		for(let k = -1; k <= 1; k++) {
			if((l != 0) || (k != 0)) {
				num += currPop[(i+l+fillSize)%fillSize][(j+k+fillSize)%fillSize];
			}
		}
	}
	return num;
}

function nextGen() {
	for(let i=0; i< fillSize; i++){
		for(let j=0; j< fillSize; j++){
			nextPop[i][j] = 0;
			let nc = neighbourCount(i,j);
			if(currPop[i][j] == 0 && nc ==3 || currPop[i][j] == 1 && nc < 4 && nc > 1) {
				nextPop[i][j] = 1;
			}
		}
	}
	for(let i = 0; i < fillSize; i++){
		for(let j = 0; j < fillSize; j++){
			currPop[i][j] = nextPop[i][j];
		}
	}
}

function step(){
	nextGen();
	draw();
}

function goRandom() {
    initFixRandom();
    draw();
    let tm = setInterval(step, 500);
	
}
function goUserCells() {
	let tm = setInterval(step, 500);
}
