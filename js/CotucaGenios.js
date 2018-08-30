var ordem = new Array();
var wave = 0;
var clicks = 0;

function NovasCores()
{
    for (i = 0; i < 500; i++)
    {
        var cor = Math.floor((Math.random() * 4) + 1);
        ordem[i] = cor;
    }
}

async function Piscar()
{
    TravarBotoes(true);

    btn1 = document.getElementById("btn1");
    btn2 = document.getElementById("btn2");
    btn3 = document.getElementById("btn3");
    btn4 = document.getElementById("btn4");

    for (i = 0; i < wave; i++)
    {
        switch (ordem[i])
        {
            case 1:
                btn1.style.backgroundColor = "red";
                break;

            case 2:
                btn2.style.backgroundColor = "blue";
                break;

            case 3:
                btn3.style.backgroundColor = "green";
                break;

            case 4:
                btn4.style.backgroundColor = "yellow";
                break;
        }

        await sleep(500);

        btn1.style.backgroundColor = "lightcoral";
        btn2.style.backgroundColor = "lightblue";
        btn3.style.backgroundColor = "lightgreen";
        btn4.style.backgroundColor = "khaki";

        await sleep(200);
    }

    TravarBotoes(false);
}

function Click(valor)
{
    perderFoco();

    if (wave != 0)
    {
        clicks++;

        if (valor == ordem[clicks - 1])
        {
            if (wave == clicks)
            {
                var v1 = document.getElementById("lPontos").innerHTML = "Pontuação: " + wave;
                
                wave++;
                clicks = 0;

                if (wave > 500) 
                {
                    alert("Você ganhou!");
                    alert("...");
                    alert("Mas como?!");

                    perdeu();
                }
                else
                    Piscar();
            }
        }
        else
        {
            perdeu();
        }
    }
}

function perderFoco()
{
    var btnf = document.getElementById("a");

    btnf.style.visibility = "visible";
    btnf.focus();
    btnf.style.visibility = "hidden";
}

function TravarBotoes(travado)
{
    btn1 = document.getElementById("btn1");
    btn2 = document.getElementById("btn2");
    btn3 = document.getElementById("btn3");
    btn4 = document.getElementById("btn4");

    btn1.disabled = travado;
    btn2.disabled = travado;
    btn3.disabled = travado;
    btn4.disabled = travado;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function desaparecer(verdade)
{
    var desa = "visible";

    if(verdade)
        desa = "hidden";

    var v1 = document.getElementById("btn1");
    v1.style.visibility = desa;
    v1 = document.getElementById("btn2");
    v1.style.visibility = desa;
    v1 = document.getElementById("btn3");
    v1.style.visibility = desa;
    v1 = document.getElementById("btn4");
    v1.style.visibility = desa;
    v1 = document.getElementById("lPontos");
    v1.style.visibility = desa;
}

function iniciar()
{
    var v1 = document.getElementById("bordaJogo");
    v1.style.backgroundImage = "url('./img/jogos/geral/inicioGenerico.png')";
}

function cliqueIniciar()
{
    var v1 = document.getElementById("bordaJogo");
    v1.style.backgroundImage = null;
    v1 = document.getElementById("btnIniciar");
    v1.style.visibility = "hidden";
    v1.disabled = true;

    desaparecer(false);

    wave = 1;
    clicks = 0;

    TravarBotoes(true);

    NovasCores();
    Piscar();
}

function perdeu()
{
    TravarBotoes(true);
    desaparecer(true);
    var v1 = document.getElementById("bordaJogo");
    v1.style.backgroundImage = "url('./img/jogos/geral/game-over.png')";
    v1 = document.getElementById("btnReiniciar");
    v1.style.visibility = "visible";
    v1.disabled = false;
}