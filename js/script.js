function solved () {
// 	var board = [
//     [1, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 2, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0]
// ];

var board = new Array(9);
for(var i = 0; i < 9; i++) {
	board[i] = [];
}

for(var i = 0; i < 9; i++) {
	for(var j = 0; j < 9; j++) {
		var num = document.getElementById('t'+i+j).value;
		if(num == "") board[i][j]=0;
		else board[i][j] = parseInt(num);
	}
}


function validBoard(board){
    return rowsGood(board) && columnsGood(board) && boxesGood(board);
}

function rowsGood(board){
    for (var i = 0; i < 9; i++){
        var cur = [];
        for (var j = 0; j < 9; j++){
            if (cur.includes(board[i][j])){
                return false;
            }
            else if (board[i][j] != 0){
                cur.push(board[i][j]);
            }
        }
    }
    return true;
}

function columnsGood(board){
    for (var i = 0; i < 9; i++){
        var cur = [];
        for (var j = 0; j < 9; j++){
            if (cur.includes(board[j][i])){
                return false;
            }
            else if (board[j][i] != 0){
                cur.push(board[j][i]);
            }
        }
    }
    return true;
}


function boxesGood(board){
    const boxCoordinates = [
        [0, 0], [0, 1], [0, 2],
        [1, 0], [1, 1], [1, 2],
        [2, 0], [2, 1], [2, 2]
    ];
    for (var y = 0; y < 9; y += 3){
        for (var x = 0; x < 9; x += 3){
            var cur = [];
            for (var i = 0; i < 9; i++){
                var coordinates = [...boxCoordinates[i]];
                coordinates[0] += y;
                coordinates[1] += x;
                if (cur.includes(board[coordinates[0]][coordinates[1]])){
                    return false;
                }
                else if (board[coordinates[0]][coordinates[1]] != 0){
                    cur.push(board[coordinates[0]][coordinates[1]]);
                }
            }
        }
    }
    return true;
}

if(validBoard(board)){

//console.log(board);
function nextEmptySpot(board) {
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (board[i][j] === 0) 
                return [i, j];
        }
    }
    return [-1, -1];
}

function checkRow(board, row, value){
    for(var i = 0; i < board[row].length; i++) {
        if(board[row][i] === value) {
            return false;
        }
    }
   
    return true;
}

function checkColumn(board, column, value){
    for(var i = 0; i < board.length; i++) {
        if(board[i][column] === value) {
            return false;
        }
    }

    return true;
};

function checkSquare(board, row, column, value){
    boxRow = Math.floor(row / 3) * 3;
    boxCol = Math.floor(column / 3) * 3;
    
    for (var r = 0; r < 3; r++){
        for (var c = 0; c < 3; c++){
            if (board[boxRow + r][boxCol + c] === value)
                return false;
        }
    }

    return true;
};

function checkValue(board, row, column, value) {
    if(checkRow(board, row, value) &&
      checkColumn(board, column, value) &&
      checkSquare(board, row, column, value)) {
        return true;
    }
    
    return false; 
};

function solve(board) {  
    let emptySpot = nextEmptySpot(board);
    let row = emptySpot[0];
    let col = emptySpot[1];

    if (row === -1){
        return board;
    }

    for(let num = 1; num<=9; num++){
        if (checkValue(board, row, col, num)){
            board[row][col] = num;
            solve(board);
        }
    }

    if (nextEmptySpot(board)[0] !== -1)
        board[row][col] = 0;

    return board;
}
var mat = solve(board);
for(var i = 0; i < 9; i++) {
	for(var j = 0; j < 9; j++) {
		document.getElementById('t'+i+j).value = mat[i][j];
	}
}
}
else {
	alert("Looks like you made a mistake somewhere.");
}
}
