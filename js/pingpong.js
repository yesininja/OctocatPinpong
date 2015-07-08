var KEY = {
	UP: 38,
	DOWN: 40,
	W: 87,
	S: 83
}


//variables globales
var pingpong = {
	scoreA : 0,  // score para el jugador A
	scoreB : 0   // score para el jugador B
}

//arreglo para recordaR cual tecla se preciona y cual no
pingpong.pressedKeys = [];

pingpong.ball = {
	speed: 4,
	directionX: 1,
	directionY: 1
}

$(function(){
		//tiempo de intervalo para llamar al loop del juego cada 30 milisegundos
	pingpong.timer = setInterval(gameloop,30);
	
	//arreglo pressedKeys donde dice que tecla es para abajo y arriba
	$(document).keydown(function(e){
		pingpong.pressedKeys[e.keyCode] = true;
    });
    $(document).keyup(function(e){
    	pingpong.pressedKeys[e.keyCode] = false;
	});
});


//Esta funcion en llamada cada 30 ms.
function gameloop()
{
	moveBall();
	movePaddless();
}

function moveBall()
{
	// funcion que mueve la bola cada 30 ms.
	// variables
	var ballTop = parseInt($("#ball").css("top"));
	var ballLeft = parseInt($("#ball").css("left"));
	var playgroundHeight = parseInt($("#playground").height());
	var playgroundWidth = parseInt($("#playground").width());	
	var ball = pingpong.ball;
	
	// comprueba el limite del...playground
	// limite del fondo
	if (ballTop+ball.speed*ball.directionY > playgroundHeight)
	{
		ball.directionY = -1;
	}
	// limite de Y
	if (ballTop+ball.speed*ball.directionY < 0)
	{
		ball.directionY = 1;
	}
	// limite de derecho
	if (ballLeft+ball.speed*ball.directionX > playgroundWidth)
	{
		
		//Jugador B perdedor		
		pingpong.scoreA++;
		$("#scoreA").html(pingpong.scoreA);
		
		// reinicia la pelota
		$("#ball").css({
			"left":"250px",
			"top" :"100px"
		});
		
		//actualiza la localizacion de la pelotita 
		ballTop = parseInt($("#ball").css("top"));
		ballLeft = parseInt($("#ball").css("left"));
		ball.directionX = -1;
	}
	// limite izquierdo
	if (ballLeft + ball.speed*ball.directionX < 0)
	{
		// Jugador A perdedor		
		pingpong.scoreB++;
		$("#scoreB").html(pingpong.scoreB);
		
		// reinicia la pelota
		$("#ball").css({
			"left":"150px",
			"top" :"100px"
		});
		
		//actualiza la localizacion de la pelota
		ballTop = parseInt($("#ball").css("top"));
		ballLeft = parseInt($("#ball").css("left"));
		ball.directionX = 1;
	}
	
	
	//Octocat izquierdo
	var paddleAX = parseInt($("#paddleA").css("left"))+parseInt($("#paddleA").css("width"));
	var paddleAYBottom = parseInt($("#paddleA").css("top"))+parseInt($("#paddleA").css("height"));
	var paddleAYTop = parseInt($("#paddleA").css("top"));
	if (ballLeft + ball.speed*ball.directionX < paddleAX)
	{
		if (ballTop + ball.speed*ball.directionY <= paddleAYBottom && 
			ballTop + ball.speed*ball.directionY >= paddleAYTop)
		{
			ball.directionX = 1;
		}
	}
	
	// Octocat derecho
	var paddleBX = parseInt($("#paddleB").css("left"));
	var paddleBYBottom = parseInt($("#paddleB").css("top"))+parseInt($("#paddleB").css("height"));
	var paddleBYTop = parseInt($("#paddleB").css("top"));
	if (ballLeft + ball.speed*ball.directionX >= paddleBX)
	{
		if (ballTop + ball.speed*ball.directionY <= paddleBYBottom && 
			ballTop + ball.speed*ball.directionY >= paddleBYTop)
		{
			ball.directionX = -1;
		}
	}
	
	
	// mueve la bola (speed y direction)
	$("#ball").css({
		"left" : ballLeft + ball.speed * ball.directionX,
		"top" : ballTop + ball.speed * ball.directionY
	});
}

function movePaddless()
{
	
	//utiliza el temporizador para comprobar si la tecla es precionada
	if (pingpong.pressedKeys[KEY.UP]) // arrow up
	{
		
		//mueve al octo derecho 5 px arriba
		var top = parseInt($("#paddleB").css("top"));
		$("#paddleB").css("top",top-5);	
	}
	if (pingpong.pressedKeys[KEY.DOWN]) // arrow down
	{
		// mueve al octo derecho 5px abajo
		var top = parseInt($("#paddleB").css("top"));
		$("#paddleB").css("top",top+5);
	}
	if (pingpong.pressedKeys[KEY.W]) // tecla w
	{
		// mueve al octo izquierdo 5px arriba
		var top = parseInt($("#paddleA").css("top"));
		$("#paddleA").css("top",top-5);
	}
	if (pingpong.pressedKeys[KEY.S]) // tecla s
	{
		// mueve al octo izquiero 5px. abajo....necesito una bola de arroz...y luego un cafe de vainilla.....wa? wa? natin...
		var top = parseInt($("#paddleA").css("top"));
		$("#paddleA").css("top",top+5);			
	}
}