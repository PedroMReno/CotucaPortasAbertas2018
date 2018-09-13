// Declaração das variáveis globais
var objCanvas = null;
var objContexto = null;

var xMonstro = 240;
var yMonstro = 100;
var mUltimoMov = false;

var xMonstro2 = 5000;
var yMonstro2 = 300;
var m2 = false;
var m2Mov = false;

var xMonstro3 = 240;
var yMonstro3 = 100;

var xHeroi = 240;
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

var imgMonstro3 = new Image();
imgMonstro3.src="img/jogos/cotuca-ultimoHeroi/monstro3.png";

// FUNÇÕES ----------------------
function AtualizaTela(){
    objContexto.drawImage(imgFundo,0,0);
    
    objContexto.drawImage(imgHeroi,xHeroi,yHeroi);
    objContexto.drawImage(imgMonstro, xMonstro, yMonstro);
    objContexto.drawImage(imgMonstro2, xMonstro2, yMonstro2);
    objContexto.drawImage(imgMonstro3, xMonstro3, yMonstro3);
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
    novoMonstro2();
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
            case 39: xHeroi += 10; break;
            case 40: yHeroi += 10; break;
            case 37: xHeroi -= 10; break;
            case 38: yHeroi -= 10; break;
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
            case 39: 
                if(!m2Mov)
                    xMonstro2 += 3; 
                break;
            case 37: 
                if(m2Mov)
                    xMonstro2 -= 3; 
                break;
            case 40: yMonstro2 += 10; break;
            case 38: yMonstro2 -= 10; break;
        }
        }

        mover = false;
    }
}

function testeColisao()
{
    if(!gameOver)
    {
        //Monstro1
        var xDif = xHeroi - xMonstro;
        if(xDif < 0)
            xDif = xDif * - 1;

        var yDif = yHeroi - yMonstro;
        if(yDif < 0)
            yDif = yDif * - 1;

        if(xDif < 33 && yDif < 33 && !gameOver)
            gameOver = true;

        //Monstro2
        xDif = xHeroi - xMonstro2;
        if(xDif < 0)
            xDif = xDif * - 1;

        yDif = yHeroi - yMonstro2;
        if(yDif < 0)
            yDif = yDif * - 1;

        if(xDif < 31 && yDif < 31 && !gameOver)
            gameOver = true;

        //Monstro3
        xDif = xHeroi - xMonstro3;
        if(xDif < 0)
            xDif = xDif * - 1;

        yDif = yHeroi - yMonstro3;
        if(yDif < 0)
            yDif = yDif * - 1;

        if(xDif < 31 && yDif < 31 && !gameOver)
            gameOver = true;

        if(gameOver)
        {
            AtualizaTela();
            alert("Game Over");
            location.reload();
        }
    }
}

function pontuacao()
{
    point++;
    document.getElementById("pt").innerHTML = "Pontuação: " + parseInt(point / 10);
}

function novoMonstro2()
{
    if(point >= 300 && !m2 && xHeroi != 240)
    {
        m2 = true;
        xMonstro2 = 240;
        yMonstro2 = yHeroi;

        if(xHeroi > 240)
            m2Mov = false;

        if(xHeroi < 240)
            m2Mov = true;
    }
}