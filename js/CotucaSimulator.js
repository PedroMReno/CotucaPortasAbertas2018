var tempoPassado = 0;
var tempoTotalPassado = 0;
var nEstudo = 0;
var df = 15;
var bloqueado = 0;
var dfBonus = 0;

var trabCliques = 0;
var dpCliques = 0;

var trabAtivo = false;
var dpAtivo = false;

var probTrab = 1;
var probDp = -3;

function sleep(ms) 
{
	return new Promise(resolve => setTimeout(resolve,ms));
}

function sumir(desaparecer)
{
	var visi = "visible";
	if(desaparecer)
		visi = "hidden";

	var v1 = document.getElementById("btnEstudar");
	v1.style.visibility = visi;
	v1 = document.getElementById("Nivel");
	v1.style.visibility = visi;
	v1 = document.getElementById("myProgress");
	v1.style.visibility = visi;
	v1 = document.getElementById("Prova");
	v1.style.visibility = visi;
	v1 = document.getElementById("PDf");
	v1.style.visibility = visi;

	if(tempoTotalPassado > 0)   //O jogo já começou?
	{
		v1 = document.getElementById("btnDp");
		v1.style.visibility = visi;
		v1 = document.getElementById("btnDp2");
		v1.style.visibility = visi;
		v1 = document.getElementById("btnDp3");
		v1.style.visibility = visi;
		v1 = document.getElementById("btnTrabalho");
		v1.style.visibility = visi;
	}
}

function desabilitar(verdadeiro)
{
	var btn1 = document.getElementById("btnEstudar");
	btn1.disabled = verdadeiro;

	if(tempoTotalPassado > 0)   //O jogo já começou?
	{
		btn1 = document.getElementById("btnTrabalho");
		btn1.disabled = verdadeiro;
		btn1 = document.getElementById("btnDp");
		btn1.disabled = verdadeiro;
		btn1 = document.getElementById("btnDp2");
		btn1.disabled = verdadeiro;
		btn1 = document.getElementById("btnDp3");
		btn1.disabled = verdadeiro;
	}
}

function aleatorizador()
{
	dfBonus += Math.floor(df / 25)
	df = df + 5 + nEstudo + dfBonus;

	var m = Math.floor((Math.random() * 5) + 1);
	var materia = "Proxima prova: ";

	switch(m)
	{
		case 1:
			materia += "Tecnica de Programacao";
			break;

		case 2:
			materia += "Desenvolvimento para WEB";
			break;

		case 3:
			materia += "Banco de Dados";
			break;

		case 4:
			materia += "Prototipagem";
			break;

		case 5:
			materia += "Gestao Empresarial";
			break;
	}

	document.getElementById("PDf").innerHTML = "   Dificuldade: " + df;

	document.getElementById("Prova").innerHTML = materia;
}

async function tickGlobal()
{
	aleatorizador();
	var barra = document.getElementById("barra");

    while(true)
    {
    	await sleep(1000);

    	tempoPassado += 3;
    	tempoTotalPassado += 5;

		if(tempoPassado > 100)
		{
			tempoPassado = 100;
			barra.style.width = tempoPassado + '%';
			if(!fimTempo())
			{
				perdeu();
				break;
			}
		}

    	barra.style.width = tempoPassado + '%';

    	if(tempoTotalPassado % 30 == 0 && !trabAtivo)
    	{
    		var p = Math.floor(Math.random() * 3);

    		if(p < probTrab)
    		{
    			probTrab = 1;
    			nTrabalho();
    		}

    		else
    			probTrab++;
    	}

    	if(tempoTotalPassado % 40 == 0 && !dpAtivo)
    	{
    		var p = Math.floor(Math.random() * 3);

    		if(p < probDp)
    		{
    			probDp = 1;
    			nDP();
    		}

    		else
    			probDp++;
    	}
    }
}

function atualizarTela()
{
	perderFoco();

	document.getElementById("Nivel").innerHTML = "Nivel de Estudo: " + nEstudo;
}

function fimTempo()
{
	nEstudo = nEstudo - df;

	if(nEstudo < 0)
		return false;

	else
	{
		tempoPassado = 0;
		aleatorizador();
		atualizarTela();

		return true;
	}
}

function desbloquear()
{
	bloqueado--;

	if(bloqueado == 0)
	{
		var btn1 = document.getElementById("btnEstudar");
		btn1.style.visibility = "visible";
	}
}

function nTrabalho()
{
	var btn1 = document.getElementById("btnEstudar");
		btn1.style.visibility = "hidden";
	bloqueado++;

	trabCliques = 0;
	var tY = Math.floor(Math.random() * 350);
	var tX = Math.floor(Math.random() * 520);

	var btnTrab = document.getElementById("btnTrabalho");
		btnTrab.style.top = tY + "px";
		btnTrab.style.left = tX + "px";
		btnTrab.disabled = false;
		btnTrab.style.visibility = "visible";

	trabAtivo = true;
}

function cliqueTrab()
{
	perderFoco();

	trabCliques++;
	var btnTrab = document.getElementById("btnTrabalho");

	if((df - 11)/10 < trabCliques)
	{
		btnTrab.disabled = true;
		btnTrab.style.visibility = "hidden";
		desbloquear();

		trabAtivo = false;
	}
	else
	{
		var tY = Math.floor(Math.random() * 350);
		var tX = Math.floor(Math.random() * 520);

		btnTrab.style.top = tY + "px";
		btnTrab.style.left = tX + "px";
	}
}

function nDP()
{
	var btn1 = document.getElementById("btnEstudar");
		btn1.style.visibility = "hidden";
	bloqueado++;

	dpCliques = 0;
	var tY = Math.floor(Math.random() * 380);
	var tX = Math.floor(Math.random() * 560);

	var btnDP = document.getElementById("btnDp");
		btnDP.style.top = tY + "px";
		btnDP.style.left = tX + "px";
		btnDP.disabled = false;
		btnDP.style.visibility = "visible";

	tY = Math.floor(Math.random() * 380);
	tX = Math.floor(Math.random() * 560);

	var btnDP2 = document.getElementById("btnDp2");
		btnDP2.style.top = tY + "px";
		btnDP2.style.left = tX + "px";
		btnDP2.disabled = false;
		btnDP2.style.visibility = "visible";

	tY = Math.floor(Math.random() * 380);
	tX = Math.floor(Math.random() * 560);

	var btnDP3 = document.getElementById("btnDp3");
		btnDP3.style.top = tY + "px";
		btnDP3.style.left = tX + "px";
		btnDP3.disabled = false;
		btnDP3.style.visibility = "visible";

	dpAtivo = true;
}

function cliqueFalsaDp(valor)
{
	perderFoco();

	var btnDP = document.getElementById("btnDp" + valor);
		btnDP.style.visibility = "hidden";
		btnDP.disabled = true;
}

function cliqueDp()
{
	perderFoco();

	dpCliques++;
	var btnDP = document.getElementById("btnDp");
	var btnDP2 = document.getElementById("btnDp2");
	var btnDP3 = document.getElementById("btnDp3");

	if((df - 11)/10 < dpCliques)
	{
		btnDP.disabled = true;
		btnDP.style.visibility = "hidden";
		btnDP2.disabled = true;
		btnDP2.style.visibility = "hidden";
		btnDP3.disabled = true;
		btnDP3.style.visibility = "hidden";
		desbloquear();

		dpAtivo = false;
	}
	else
	{
		var tY = Math.floor(Math.random() * 380);
		var tX = Math.floor(Math.random() * 560);

		btnDP.style.top = tY + "px";
		btnDP.style.left = tX + "px";

		tY = Math.floor(Math.random() * 380);
		tX = Math.floor(Math.random() * 560);

		btnDP2.style.top = tY + "px";
		btnDP2.style.left = tX + "px";
		btnDP2.style.visibility = "visible";
		btnDP2.disabled = false;


		tY = Math.floor(Math.random() * 380);
		tX = Math.floor(Math.random() * 560);

		btnDP3.style.top = tY + "px";
		btnDP3.style.left = tX + "px";
		btnDP3.style.visibility = "visible";
		btnDP3.disabled = false;
	}
}

function perderFoco()
{
	var btnf = document.getElementById("a");

	btnf.style.visibility = "visible";
	btnf.focus();
	btnf.style.visibility = "hidden";
}

function iniciar ()
{
	desabilitar(true);
	sumir(true);
	var v1 = document.getElementById("bordaJogo");
	v1.style.backgroundImage = "url('./img/jogos/cotuca-simulator/1.png')";
	v1 = document.getElementById("btnIniciar");
	v1.style.visibility = "visible";
	v1.disabled = false;
}

function perdeu ()
{
	desabilitar(true);
	sumir(true);
	var v1 = document.getElementById("btnReiniciar");
	v1.style.visibility = "visible";
	v1.disabled = false;
	v1 = document.getElementById("bordaJogo");
	v1.style.backgroundImage = "url('./img/jogos/cotuca-simulator/2.png')";
}

function cliqueIniciar()
{
	sumir(false);
	desabilitar(false);
	var v1 = document.getElementById("bordaJogo");
	v1.style.backgroundImage = "url('./img/jogos/cotuca-simulator/3.png')";
	v1 = document.getElementById("btnIniciar");
	v1.style.visibility = "hidden";
	v1.disabled = true;
	tickGlobal();
}