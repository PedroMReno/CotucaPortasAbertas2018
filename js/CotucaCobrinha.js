	// var imgFundo = new Image();
	// imgFundo.src="./img/jogos/cotuca-snake/fundo.png";

	var gameOver = new Image();
	gameOver.src = "./img/jogos/cotuca-snake/gameOver.png";

	var iniciar = new Image();
	iniciar.src = "./img/jogos/cotuca-snake/1.png";

	var body = new Image();
	iniciar.src = "./img/jogos/cotuca-snake/cobraBODY.png";

	var body = document.getElementById("body");

	
	
	window.onload = function(){
		stage = document.getElementById("canvasJogo");
		ctx = stage.getContext("2d");
		document.addEventListener("keydown", pressionaTecla);
		setInterval(jogo, 1000 / 10);
		// ctx.drawImage(iniciar,0,0);
		// ctx.globalCompositeOperation='destination-over';
	}

	const vel = 1;

	var tp = qp = 20;
	var px = 10; // posição da cabeça
	var py = 15; // posição da cabeça
	var vx = vy = 0;
	var ax = ay = 15;

	var trail = [];
	
	var tail = 5;

	var point = 0;	
	
	function jogo()
	{
		px += vx;
		py += vy;

		if( px < 0 ){
			vx = vy = 0;
		}

		if( px > qp - 1){
			vx = vy = 0;
		}

		if ( py < 0){
			vx = vy = 0;
		}

		if ( py > qp - 1){
			vx = vy = 0;
		}

		ctx.fillStyle = "white";
		ctx.fillRect( 0, 0, stage.width, stage.height );

		ctx.fillStyle = "#FF6347";
		ctx.fillRect(ax * tp, ay * tp, tp - 2, tp - 2);

		ctx.fillStyle = "#ADFF2F"

		for (var i = 0; i < trail.length; i++)
		{
			ctx.fillRect(trail[i].x * tp, trail[i].y * tp, tp - 2, tp - 2);

			if ( trail[i].x == px && trail[i].y == py)
			{
				vx = vy = 0;
				tail = 5;
				px = 10;
				py = 15;

				AtualizarTela();

				// ctx.drawImage(gameOver,0,0);	
			}
		}

		trail.push( { x:px, y:py } ); //cria um objeto e diz que o elemento xy será a 
									  //posição atual da cabeça já que não bateu em nada
									  //array.push() adiciona um item ao final do vetor;

		while(trail.length > tail)
			trail.shift(); // remove o primeiro elemento do vetor


		if( ax == px && ay == py)
		{
			tail++;
			ax = Math.floor( Math.random() * qp );
			ay = Math.floor( Math.random() * qp );
			pontuacao();
		}
	}

	function pressionaTecla( evt )
	{
		switch( evt.keyCode )
		{
			case 65: //w
				vx =  -1;
				vy =   0;
				break;

			case 87: //s
				vx =  0;
				vy = -1;
				break;

			case 68:  //s
				vx =  1;
				vy =  0;
				break;

			case 83: //d
				vx = 0;
				vy = 1;
				break;
		}
	}


	function pontuacao()
	{
		point++;
		document.getElementById("pt").innerHTML = "Pontuação: " + point;
	}

	// function Iniciar()
	// {
	// 	// ctx.clearRect(xcoordinate_of_img1,ycoordinate_of_img1,xcoordinate_of_img1 + img1.width ,ycoord_of_img1 +img1.height );
	// }

	function AtualizarTela()
	{
		point = 0;
		tp = qp = 20;
		px = 10; // posição da cabeça
		py = 15; // posição da cabeça
		vx = vy = 0;
		trail = [];
		tail = 5;
		document.getElementById("pt").innerHTML = "Pontuação: " + point;
	}