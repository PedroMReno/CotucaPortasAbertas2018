// Declaração das variáveis globais
            var objCanvas = null;
            var objContexto = null;
            
            var xMonstro = 250;
            var yMonstro = 100;
            var mUltimoMov = false;

            var xMonstro2 = 5000;
            var yMonstro2 = 300;
            var m2 = false;
            
            var xHeroi = 250;
            var yHeroi = 200;
            
            var timerGeral = null;
            var timerMonstro = null;

            var jogando = false;
            var mover = true;
            var gameOver = false;

            var point = 0;            
            // Declação dos objetos para representar
              // as imagens
            var imgFundo = new Image();
            imgFundo.src="img/jogos/cotuca-ultimoHeroi/fundo.png";

            var imgHeroi = new Image();
            imgHeroi.src="img/jogos/cotuca-ultimoHeroi/heroi.png";

            var imgMonstro = new Image();
            imgMonstro.src="img/jogos/cotuca-ultimoHeroi/monstro.png";

            var imgMonstro2 = new Image();
            imgMonstro2.src="img/jogos/cotuca-ultimoHeroi/monstro2.png";

            // FUNÇÕES ----------------------
            function AtualizaTela(){
                objContexto.drawImage(imgFundo,0,0);
                
                objContexto.drawImage(imgHeroi,xHeroi,yHeroi);
                objContexto.drawImage(imgMonstro, xMonstro, yMonstro);
            }
            
            function Iniciar(){
                objCanvas = document.getElementById("meuCanvas");
                objContexto = objCanvas.getContext("2d");
                timerGeral = setInterval(function(){loop()},1);
                timerMonstro = setInterval(function(){MovimentoDoMonstro()},100);

                MovimentoDoMonstro();
                AtualizaTela();
                loop();
            }
            
            function MovimentoDoMonstro(){
                if(jogando)
                {
                    var direcao = 100;
                    if(mUltimoMov)
                    {
                        if(xMonstro > xHeroi)
                            direcao = 2;
                        if(xMonstro < xHeroi)
                            direcao = 0;

                        if(yMonstro > yHeroi)
                            direcao = 3;
                        if(yMonstro < yHeroi)
                            direcao = 1;

                        mUltimoMov = false;
                    }
                    else
                    {
                        if(yMonstro > yHeroi)
                            direcao = 3;
                        if(yMonstro < yHeroi)
                            direcao = 1;

                        if(xMonstro > xHeroi)
                            direcao = 2;
                        if(xMonstro < xHeroi)
                            direcao = 0;

                        mUltimoMov = true;
                    }


                    switch(direcao){
                        case 0: xMonstro += 5; break;
                        case 1: yMonstro += 5; break;
                        case 2: xMonstro -= 5; break;
                        case 3: yMonstro -= 5; break;
                    }

                    if(xMonstro < 26)
                        xMonstro += 5;

                    if(xMonstro > 420 + 30)
                        xMonstro -= 5;

                    if(yMonstro < 27)
                        yMonstro += 5;

                    if(yMonstro > 386 + 32)
                        yMonstro -= 5;

                    mover = true;
                    pontuacao();
                }
            }

            function loop()
            {
                testeColisao();
                AtualizaTela();
            }

            function pause()
            {
                if(jogando)
                {
                    jogando = false;
                }
                else
                {
                    jogando = true;
                }
            }

            document.onkeydown=function MovimentoDoJogador(event){
                if(jogando && mover)
                {
                    var andou = true;
                    // sorteia a direção
                    switch(event.keyCode){
                        case 68: xHeroi += 10; break;
                        case 83: yHeroi += 10; break;
                        case 65: xHeroi -= 10; break;
                        case 87: yHeroi -= 10; break;
                    }

                    if(xHeroi < 26)
                    {
                        xHeroi += 10;
                        andou = false;
                    }

                    if(xHeroi > 420 + 30)
                    {
                        xHeroi -= 10;
                        andou = false;
                    }

                    if(yHeroi < 27)
                    {
                        yHeroi += 10;
                        andou = false;
                    }

                    if(yHeroi > 386 + 32)
                    {
                        yHeroi -= 10;
                        andou = false;
                    }

                    if(andou && m2)
                    {
                        switch(event.keyCode){
                        case 68: xMonstro2 += 10; break;
                        case 83: yMonstro2 += 10; break;
                        case 65: xMonstro2 -= 10; break;
                        case 87: yMonstro2 -= 10; break;
                    }
                    }

                    mover = false;
                }
            }

            function testeColisao()
            {
                var xDif = xHeroi - xMonstro;
                if(xDif < 0)
                    xDif = xDif * - 1;

                var yDif = yHeroi - yMonstro;
                if(yDif < 0)
                    yDif = yDif * - 1;

                if(xDif < 33 && yDif < 33 && !gameOver)
                {
                    alert("Game Over");
                    gameOver = true;
                    location.reload();
                }
            }

            function pontuacao()
            {
                point++;
                document.getElementById("pt").innerHTML = "Pontuacao: " + parseInt(point / 10);
            }

            function novoMonstro()
            {

            }