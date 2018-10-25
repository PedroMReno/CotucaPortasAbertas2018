// Declaração das variáveis globais
var objCanvas = null;
var objContexto = null;

var xHeroi = 40;
var yHeroi = 200;

var xCafe = 5000;
var yCafe = 300;
var cafeExiste = false;

var timerGeral = null;

var jogando = true;
var mover = true;
var gameOver = false;

var point = 0;           
// Declação dos objetos para representar
  // as imagens
var imgFundo = new Image();
imgFundo.src="img/jogos/cotuca-explorador/fundo2.png";

var imgHeroi = new Image();
imgHeroi.src="img/jogos/cotuca-explorador/heroi.png";

var imgIF = new Image();
imgIF.src="./img/jogos/cotuca-explorador/1.png";
// FUNÇÕES ----------------------
function AtualizaTela()
{
    objContexto.drawImage(imgFundo,0,0);
    
    objContexto.drawImage(imgHeroi,xHeroi,yHeroi);

    /*
    if(!jogando)
    {
        objContexto.drawImage(imgIF,0,0);
    }
    */
}

function Iniciar()
{
    objCanvas = document.getElementById("meuCanvas");
    objContexto = objCanvas.getContext("2d");
    timerGeral = setInterval(function(){loop()},1);
    timerAndar = setInterval(function(){Andar()},100);

    Andar();
    AtualizaTela();
    loop();
}

function Andar()
{
    if(jogando)
    {
        mover = true;
        //pontuacao();
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

        mover = false;
    }
}

function testeColisao()
{
    if(!gameOver && jogando)
    {
        //Exemplo
        /*
        var xDif = xHeroi - xMonstro;
        if(xDif < 0)
            xDif = xDif * - 1;

        var yDif = yHeroi - yMonstro;
        if(yDif < 0)
            yDif = yDif * - 1;

        if(xDif < 30 && yDif < 30 && !gameOver)
            gameOver = true;
        */

        //Surpresa :D
        if(xHeroi > 386)
        {
            jogando = false;
            Surpresa();
        }

        if(gameOver)
        {
            pause();
            imgIF.src="./img/jogos/cotuca-explorador/2.png";
            AtualizaTela();
            var btn = document.getElementById('btnReiniciar');
            btn.style.visibility = "visible";
            btn.disabled = false;
        }
    }
}

function pontuacao()
{
    point++;
    //document.getElementById("pt").innerHTML = "Pontuação: " + parseInt(point / 10);
}

async function Surpresa() 
{
    await sleep(500);

    mudarTexto("tJogo", "O PESADELO", 0);

    await sleep(1000);

    mudarLogo(0);
    mudarFundo(0);
    imgFundo.src="img/jogos/cotuca-explorador/fundo3.png";
    mudarTexto("aba1", "FELIZ", 0);
    mudarTexto("aba2", "HALLOWEEN", 0);
}

function mudarTexto(campo, texto, tipo, tipoCampo)
{
    switch(tipo)
    {
        //Mudar normalmente
        case 0:
            document.getElementById(campo).innerHTML = texto;
            break;
    }
}

function mudarLogo(id)
{
    switch(id)
    {
        case 0:
            document.getElementById("mLogo").src = "img/jogos/cotuca-explorador/logo1.png";
            break;
    }
}

function mudarFundo(id)
{
    switch(id)
    {
        case 0:
            document.body.style.backgroundColor = "#1a1a1a";
            break;
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}