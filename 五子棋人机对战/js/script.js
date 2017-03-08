var chess = document.getElementById('chess');
var context = chess.getContext('2d');
var me = true;
var chessArray = [];
var wins = [];
var mywin = [];
var computerwin = [];
var count = 0;
var isWin = false;
var test = [];
var button1 = document.getElementById('regret');
var button2 = document.getElementById('reset');


for(var i = 0; i<15 ; i++){
	chessArray[i] = [];
	for(var j = 0; j<15 ; j++){
		chessArray[i][j] = 0;
	}
}

for(var i = 0; i<15 ; i++){
	wins[i] = [];
	for(var j = 0; j<15 ; j++){
		wins[i][j] = [];
	}
}

for(var i = 0; i<576 ; i++){
	test[i] = [];
	for(var j = 0; j<10 ; j++){
		test[i][j] = [];
	}
}


//横排赢法
for(var i = 0; i<15 ; i++){
	for(var j = 0; j<11 ; j++){
		for(var k = 0; k<5 ;k++){
			wins[j+k][i][count] = true;
			test[count][k] = j+k;
			test[count][k+5] = i;
		}
		count++;
	}
}

//竖排赢法
for(var i = 0; i<15 ; i++){
	for(var j = 0; j<11 ; j++){
		for(var k = 0; k<5 ;k++){
			wins[i][j+k][count] = true;
			test[count][k] = i;
			test[count][k+5] = j+k;
		}
		count++;
	}
}


//斜向赢法
for(var i = 0; i<11 ; i++){
	for(var j = 14; j>3 ; j--){
		for(var k = 0; k<5 ;k++){
			wins[i+k][j-k][count] = true;
			test[count][k] = i+k;
			test[count][k+5] = j-k;			
		}
		count++;
	}
}


//反斜向赢法
for(var i = 0; i<11 ; i++){
	for(var j = 0; j<11 ; j++){
		for(var k = 0; k<5 ;k++){
			wins[j+k][i+k][count] = true;
			test[count][k] = j+k;
			test[count][k+5] = i+k;			
		}
		count++;
	}
}

for(var i = 0; i<count ; i++){
	mywin[i] = 0;
	computerwin[i] = 0;
}



context.strokeStyle = "#BFBFBF";
for(var i=0 ; i<15 ; i++){
context.moveTo( 20 + i*40, 20);
context.lineTo( 20 + i*40, 580);
context.stroke();

context.moveTo( 20, 20 + i*40);
context.lineTo( 580, 20 + i*40);
context.stroke();
}

function oneStep( i , j , me){
context.beginPath();
context.arc( 20 + i*40 , 20 + j*40 , 18 , 0 , 2 * Math.PI);
var gradient = context.createRadialGradient( 20 + i*40 + 3, 20 + j*40 - 3 , 18 , 20 + i*40 + 3 , 20 + j*40 - 3 , 0 );
if( me ){
	gradient.addColorStop( 0 , "#0A0A0A");
	gradient.addColorStop( 1 , "#636766");
}else{
	gradient.addColorStop( 0 , "#D1D1D1");
	gradient.addColorStop( 1 , "#F9F9F9");
}
context.closePath();
context.fillStyle = gradient;
context.fill();

} 

// function isChessWin( chessx , chessy , me ){
// 	var n=chessx, m=chessy , countStep=1;
// 	var mark = me ? 1 : 2;
// 	while( chessArray[n+1][m+1] == (mark)){
// 		n++;
// 		m++;
// 		countStep++;
// 	}
// 	n = chessx;
// 	m = chessy;
// 	while( chessArray[n-1][m-1] == (mark)){
// 		n--;
// 		m--;
// 		countStep++;
// 	}
// 	if( countStep == 5){
// 		alert("你赢了！");
// 		isWin = true;
// 		return;
// 	}else{
// 		n=chessx, m=chessy, countStep=1;
// 		while( chessArray[n+1][m-1] == (mark)){
// 		n++;
// 		m--;
// 		countStep++;
// 	}
// 	n = chessx;
// 	m = chessy;
// 	while( chessArray[n-1][m+1] == (mark)){
// 		n--;
// 		m++;
// 		countStep++;
// 	}
// 	if( countStep == 5){
// 		alert("你赢了！");
// 		isWin = true;
// 		return;
// 	}else{
// 		n=chessx, m=chessy, countStep=1;
// 		while( chessArray[n][m+1] == (mark)){
// 		m++;
// 		countStep++;
// 	}
// 	m = chessy;
// 	while( chessArray[n][m-1] == (mark)){
// 		m--;
// 		countStep++;
// 	}
// 	if( countStep == 5){
// 		alert("你赢了！");
// 		isWin = true;
// 		return;
// 	}else{
// 		n=chessx, m=chessy, countStep=1;
// 		while( chessArray[n+1][m] == (mark)){
// 		n++;
// 		countStep++;
// 	}
// 	n = chessx;
// 	while( chessArray[n-1][m] == (mark)){
// 		n--;
// 		countStep++;
// 	}
// 	if( countStep == 5){
// 		alert("你赢了！");
// 		isWin = true;
// 	}
// 	}
// 	}
// 	}
// }

chess.onclick = function(e){
if(isWin){
	return;
}
if(!me){
	return;
}

var x = Math.floor(e.offsetX / 40);
var y = Math.floor(e.offsetY / 40);

if( chessArray[x][y] == 0){
	oneStep(x ,y , me);
	chessArray[x][y] = 1;

	
	// isChessWin(i , j , me);
	
	for(var k = 0; k<count ; k++){
		if( wins[x][y][k] ){
			mywin[k]++;
			computerwin[k] = 6;
			if( mywin[k] == 5 ){
				window.alert("你赢了！");
				isWin = true;
			}
			}
		}
} 

	if(!isWin){
		me = !me;
		computerAI();
	}
	
}



var computerAI = function(){
	var myScroe = [];
	var computerScroe = [];
	var max = 0;
	var u = 0;
	var v = 0;

	for(var i=0 ; i<15 ; i++){
		myScroe[i] = [];
		computerScroe[i] = [];
		for(var j=0 ; j<15 ;j++){
			myScroe[i][j] = 0;
			computerScroe[i][j] = 0;
		}
	}

	for(var i=0 ; i<15 ; i++){
		for(var j=0 ; j<15 ;j++){
			if( chessArray[i][j] == 0){
				for( var k=0 ; k<count ; k++){
					if( wins[i][j][k] ){
						if( mywin[k] == 1){
							myScroe[i][j] += 200;
						}else if( mywin[k] == 2){
							myScroe[i][j] += 400;
						}else if( mywin[k] == 3){
							myScroe[i][j] += 2000;
						}else if( mywin[k] == 4){
							myScroe[i][j] += 10000;
						}
						if( computerwin[k] == 1){
							computerScroe[i][j] += 220;
						}else if( computerwin[k] == 2){
							computerScroe[i][j] += 420;
						}else if( computerwin[k] == 3){
							computerScroe[i][j] += 2100;
						}else if( computerwin[k] == 4){
							computerScroe[i][j] += 20000;
						}
						

					}
				}

				if( myScroe[i][j] > max){
					max = myScroe[i][j];
					u = i;
					v = j;
				}else if( myScroe[i][j] = max ){
					if( computerScroe[i][j] > computerScroe[u][v] ){
						u = i;
						v = j;
					}
				}

				if( computerScroe[i][j] > max){
					max = computerScroe[i][j];
					u = i;
					v = j;
				}else if( computerScroe[i][j] = max ){
					if( myScroe[i][j] > myScroe[u][v] ){
						u = i;
						v = j;
					}
				}

				
			}
		}
	}

	oneStep( u , v , false);
	chessArray[u][v] = 2;
	for(var k = 0; k<count ; k++){
		if( wins[u][v][k] ){
			computerwin[k]++;
			mywin[k] = 6;
			if(computerwin[k] == 5){
				window.alert("电脑赢了！");
				isWin = true;
				}
			}
		}
	

	if( !isWin ){
		me = !me;
	}
	
}


// var regret = function(){

// }

// var reset = function(){

// }

// var cancelStep = function(){
// 	// context.fillStyle = "white";
// 	// // context.fillRect( 2 + u*40 , 2 + v*40 , 36 , 36);
// 	// context.fillRect( 2 + x*40 , 2 + y*40 , 36 , 36);
// 	context.clearRect( 2 + u*40 , 2 + v*40 , 36 , 36 );
// 	context.clearRect( 2 + x*40 , 2 + y*40 , 36 , 36 );
// 	context.moveTo(20 + u*40 , 2 +v*40);
// 	context.lineTo(20 + u*40 , 38 +v*40);
// 	context.stroke();
// 	context.moveTo(2 + u*40 , 20 +v*40);
// 	context.lineTo(38 + u*40 , 20 +v*40);
// 	context.stroke();

// 	context.moveTo(20 + x*40 , 2 +y*40);
// 	context.lineTo(20 + x*40 , 38 +y*40);
// 	context.stroke();
// 	context.moveTo(2 + x*40 , 20 +y*40);
// 	context.lineTo(38 + x*40 , 20 +y*40);
// 	context.stroke();

// 	chessArray[u][v] = 0;
// 	chessArray[x][y] = 0;
// 	for(var k=0 ; k<count ; k++){
// 		if( wins[u][v][k] ){
// 			computerwin[k]--;
// 			mywin[k]--;
// 		}
// 	}



// }

// button1.onclick = function(){

// 	cancelStep( u , v , x , y);
// };