// Declaração das variáveis globais
var objCanvas = null;
var objContexto = null;

var xMonstro = 240;
var yMonstro = 100;
var mUltimoMov = false;
var m1 = true;

var xMonstro2 = 5000;
var yMonstro2 = 300;
var m2 = false;
var m2Mov = false;

var xMonstro3 = 5000;
var yMonstro3 = 300;
var m3Mov = -1;
var m3 = false;
var m3UltimoMov = false;
var vezesPlayer = 5;

var xBoss = 5000;
var yBoss = 300;
var boss = false;
var bossMov = -1;
var xIrBoss = -1;
var yIrBoss = -1;
var bossUltimoMov = false;
var sCafe = 100;

var xHeroi = 240;
var yHeroi = 200;

var xCafe = 5000;
var yCafe = 300;
var cafeExiste = false;

var timerGeral = null;
var timerMonstro = null;
var timerMonstro3 = null;
var timerBoss = null;
var timerCafe = null;

var jogando = false;
var mover = true;
var gameOver = false;

var point = 980;           
// Declação dos objetos para representar
  // as imagens
var imgFundo = new Image();
imgFundo.src="img/jogos/cotuca-ultimoHeroi/fundo.png";

var imgCafe = new Image();
imgCafe.src="img/jogos/cotuca-ultimoHeroi/cafezinho.png";

var imgHeroi = new Image();
imgHeroi.src="img/jogos/cotuca-ultimoHeroi/heroi.png";

var imgMonstro = new Image();
imgMonstro.src="img/jogos/cotuca-ultimoHeroi/monstro.png";

var imgMonstro2 = new Image();
imgMonstro2.src="img/jogos/cotuca-ultimoHeroi/monstro2.png";

var imgMonstro3 = new Image();
imgMonstro3.src="img/jogos/cotuca-ultimoHeroi/monstro3.png";

var imgBoss = new Image();
imgBoss.src="img/jogos/cotuca-ultimoHeroi/simone.png";

var imgIF = new Image();
imgIF.src="./img/jogos/cotuca-ultimoHeroi/1.png"
// FUNÇÕES ----------------------
function AtualizaTela()
{
    objContexto.drawImage(imgFundo,0,0);
    
    objContexto.drawImage(imgCafe,xCafe,yCafe);
    objContexto.drawImage(imgHeroi,xHeroi,yHeroi);
    objContexto.drawImage(imgMonstro, xMonstro, yMonstro);
    objContexto.drawImage(imgMonstro2, xMonstro2, yMonstro2);
    objContexto.drawImage(imgMonstro3, xMonstro3, yMonstro3);
    objContexto.drawImage(imgBoss, xBoss, yBoss);

    if(!jogando)
    {
        objContexto.drawImage(imgIF,0,0);

        if(sCafe <= 0)
        {
            
        }
    }
}

function Iniciar()
{
    objCanvas = document.getElementById("meuCanvas");
    objContexto = objCanvas.getContext("2d");
    timerGeral = setInterval(function(){loop()},1);
    timerMonstro = setInterval(function(){MovimentoDoMonstro()},100);
    timerMonstro3 = setInterval(function(){MovimentoDoMonstro3()},100);
    timerBoss = setInterval(function(){MovimentoDoBoss()},100);
    timerCafe = setInterval(function(){novoCafe()},5000);

    MovimentoDoMonstro();
    MovimentoDoMonstro3();
    MovimentoDoBoss();
    novoCafe();
    AtualizaTela();
    loop();
}

function MovimentoDoMonstro()
{
    if(jogando)
    {
        if(m1)
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
        }
        mover = true;
        pontuacao();
    }
}

function MovimentoDoMonstro3()
{
    if(jogando && m3)
    {
        var andou = true;
        var mudar =  Math.floor(Math.random() * 10);

        if(m3Mov < 0 || mudar > 7)
            m3Mov = Math.floor(Math.random() * 7);

        switch(m3Mov){
            case 0: xMonstro3 += 10; break;
            case 1: yMonstro3 += 10; break;
            case 2: xMonstro3 -= 10; break;
            case 3: yMonstro3 -= 10; break;
            case 4:
                if(vezesPlayer > 0)
                {
                    if(m3UltimoMov)
                    {
                        if(xMonstro3 > xHeroi)
                            xMonstro3 -= 10;
                        if(xMonstro3 < xHeroi)
                            xMonstro3 += 10;

                        if(yMonstro3 > yHeroi)
                            yMonstro3 -= 10;
                        if(yMonstro3 < yHeroi)
                            yMonstro3 += 10;

                        m3UltimoMov = false;
                    }
                    else
                    {
                        if(yMonstro3 > yHeroi)
                            yMonstro3 -= 10;
                        if(yMonstro3 < yHeroi)
                            yMonstro3 += 10;

                        if(xMonstro3 > xHeroi)
                            xMonstro3 -= 10;
                        if(xMonstro3 < xHeroi)
                            xMonstro3 += 10;

                        m3UltimoMov = true;
                    }
                    vezesPlayer--;
                }
                else
                {
                    vezesPlayer = 3;
                    m3Mov = -1;
                }
        }

        if(xMonstro3 < 26)
        {
            xMonstro3 += 10;
            m3Mov = -1;
        }

        if(xMonstro3 > 420 + 30)
        {
            xMonstro3 -= 10;
            m3Mov = -1;
        }

        if(yMonstro3 < 27)
        {
            yMonstro3 += 10;
            m3Mov = -1;
        }

        if(yMonstro3 > 386 + 32)
        {
            yMonstro3 -= 10;
            m3Mov = -1;
        }
    }
}

function MovimentoDoBoss()
{
    if(jogando && boss)
    {
        var andou = true;
        var mudar =  Math.floor(Math.random() * 10);

        if(yIrBoss == yBoss && xIrBoss == xBoss && mudar > 7)
            bossMov = Math.floor(Math.random() * 10);

        switch(bossMov){
            case 0: xIrBoss = 240; yIrBoss = 200; break;
            case 1: xIrBoss = 240; yIrBoss = 50;  break;
            case 2: xIrBoss = 240; yIrBoss = 350; break;
            case 3: xIrBoss = 90;  yIrBoss = 200; break;
            case 4: xIrBoss = 390; yIrBoss = 200; break;
        }

        if(bossUltimoMov)
        {
            if(xBoss > xIrBoss)
                xBoss -= 10;
            if(xBoss < xIrBoss)
                xBoss += 10;

            if(yBoss > yIrBoss)
                yBoss -= 10;
            if(yBoss < yIrBoss)
                yBoss += 10;

            bossUltimoMov = false;
        }
        else
        {
            if(yBoss > yIrBoss)
                yBoss -= 10;
            if(yBoss < yIrBoss)
                yBoss += 10;

            if(xBoss > xIrBoss)
                xBoss -= 10;
            if(xBoss < xIrBoss)
                xBoss += 10;

            bossUltimoMov = true;
        }
    }
}

function AtaqueDoChefe()
{
    if(point > 1100 && !m1)
    {
        m1 = true;
        xMonstro = xBoss;
        yMonstro = yBoss;
        imgMonstro.src="img/jogos/cotuca-ultimoHeroi/elmo.png";

    }

    if(sCafe < 70 && !m3)
    {
        m3 = true;
        xMonstro3 = xBoss;
        yMonstro3 = yBoss;
        m3Mov = -1;
        m3UltimoMov = false;
        vezesPlayer = 5;
        imgMonstro3.src="img/jogos/cotuca-ultimoHeroi/elmo3.png";
    }

    if(sCafe < 20 && !m2 && (xHeroi < 210 || xHeroi > 270))
    {
        m2 = true;
        xMonstro2 = 240;
        yMonstro2 = yHeroi;

        if(xHeroi > 240)
            m2Mov = false;

        if(xHeroi < 240)
            m2Mov = true;

        imgMonstro2.src="img/jogos/cotuca-ultimoHeroi/elmo2.png";
    }

    if(sCafe <= 0)
    {
        pause();
        sCafe = 10000000;
        imgIF.src="./img/jogos/cotuca-ultimoHeroi/2.png"
        AtualizaTela();
        document.getElementById("pt").innerHTML = "Você Venceu!";
        var btn = document.getElementById('btnReiniciar');
            btn.style.visibility = "visible";
            btn.disabled = false;
    }
}

function loop()
{
    testeColisao();
    novoMonstro();
    AtaqueDoChefe();
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
            case 68: 
                if(!m2Mov)
                    xMonstro2 += 3; 
                break;
            case 65: 
                if(m2Mov)
                    xMonstro2 -= 3; 
                break;
            case 83: yMonstro2 += 10; break;
            case 87: yMonstro2 -= 10; break;
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

        if(xDif < 30 && yDif < 30 && !gameOver)
            gameOver = true;

        //Monstro2
        xDif = xHeroi - xMonstro2;
        if(xDif < 0)
            xDif = xDif * - 1;

        yDif = yHeroi - yMonstro2;
        if(yDif < 0)
            yDif = yDif * - 1;

        if(xDif < 32 && yDif < 32 && !gameOver)
            gameOver = true;

        //Monstro3
        xDif = xHeroi - xMonstro3;
        if(xDif < 0)
            xDif = xDif * - 1;

        yDif = yHeroi - yMonstro3;
        if(yDif < 0)
            yDif = yDif * - 1;

        if(xDif < 30 && yDif < 30 && !gameOver)
            gameOver = true;

        //Boss
        xDif = xHeroi - xBoss;
        if(xDif < 0)
            xDif = xDif * - 1;

        yDif = yHeroi - yBoss;
        if(yDif < 0)
            yDif = yDif * - 1;

        if(xDif < 32 && yDif < 32 && !gameOver)
            gameOver = true;

        //Cafe
        xDif = xHeroi - xCafe;
        if(xDif < 0)
            xDif = xDif * - 1;

        yDif = yHeroi - yCafe;
        if(yDif < 0)
            yDif = yDif * - 1;

        if(xDif < 32 && yDif < 32 && cafeExiste)
        {
            cafeExiste = false;
            sCafe -= 10;
            xCafe = 5000;
            yCafe = 300;
        }

        if(gameOver)
        {
            pause();
            imgIF.src="./img/jogos/cotuca-ultimoHeroi/2.png";
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
    if(!boss)
        document.getElementById("pt").innerHTML = "Pontuação: " + parseInt(point / 10);
    else
        if(sCafe < 101)
            document.getElementById("pt").innerHTML = "Necessidade de café da Simone: " + sCafe + "%";
}

function novoMonstro()
{
    if(point >= 600 && point < 1000 && !m2 && (xHeroi < 210 || xHeroi > 270))
    {
        m2 = true;
        xMonstro2 = 240;
        yMonstro2 = yHeroi;

        if(xHeroi > 240)
            m2Mov = false;

        if(xHeroi < 240)
            m2Mov = true;
    }

    if(point >= 300 && point < 1000 && !m3)
    {
        m3 = true;
        xMonstro3 = 240;
        yMonstro3 = 100;
    }

    if(point >= 1000 && !boss)
    {
        if(!boss)
        {
            xMonstro = 5000;
            yMonstro = 300;
            m1 = false;

            xMonstro2 = 5000;
            yMonstro2 = 300;
            m2 = false;
            m2Mov = false;

            xMonstro3 = 5000;
            yMonstro3 = 300;
            m3 = false;
            m3Mov = -1;
            m3UltimoMov = false;
            vezesPlayer = 5;
        }

        if(point >= 1030)
        {
            boss = true;
            xBoss = 240;
            yBoss = 200;
            yIrBoss = yBoss;
            xIrBoss = xBoss;
        }
    }
}

function novoCafe()
{
    if(boss && m1 && !cafeExiste)
    {
        xCafe = xMonstro;
        yCafe = yMonstro;
        cafeExiste = true;
    }
}