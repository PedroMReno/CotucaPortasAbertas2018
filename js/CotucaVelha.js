var turno = true;
var qtdeCliques = 0;

function desabilitar(verdade)
{
	var desa = "hidden";

	if(!verdade)
		desa = "visible";

	for(i = 1; i <= 9; i++)
	{
		var v1 = document.getElementById("btn" + i);
		v1.style.visibility = desa;
	}

	bloquear(verdade);

	var v1 = document.getElementById("fundo");
	v1.style.visibility = desa;
	v1 = document.getElementById("vez");
	v1.style.visibility = desa;
}

function bloquear(verdade)
{
	for(i = 1; i <= 9; i++)
	{
		var v1 = document.getElementById("btn" + i);
		v1.disabled = verdade;
	}
}

function atualizarLabel()
{
	if(turno)
		document.getElementById("vez").innerHTML = 'É a vez de "X"';
	else
		document.getElementById("vez").innerHTML = 'É a vez de "O"';
}

function cliqueBtn(id)
{
	var v1 = document.getElementById(id);

	if(v1.innerHTML == "")
	{
		qtdeCliques++;

		if(turno)
		{
			v1.innerHTML = "X";
			turno = false;
		}
		else
		{
			v1.innerHTML = "O";
			turno = true;
		}

		atualizarLabel();
		testar();
	}
}

function testar()
{
	var b1 = document.getElementById("btn1");
	var b2 = document.getElementById("btn2");
	var b3 = document.getElementById("btn3");
	var b4 = document.getElementById("btn4");
	var b5 = document.getElementById("btn5");
	var b6 = document.getElementById("btn6");
	var b7 = document.getElementById("btn7");
	var b8 = document.getElementById("btn8");
	var b9 = document.getElementById("btn9");

	if(	(b1.innerHTML == b2.innerHTML && b2.innerHTML == b3.innerHTML && b1.innerHTML != "") ||
		(b4.innerHTML == b5.innerHTML && b5.innerHTML == b6.innerHTML && b4.innerHTML != "") ||
		(b7.innerHTML == b8.innerHTML && b8.innerHTML == b9.innerHTML && b7.innerHTML != "") ||
		(b1.innerHTML == b4.innerHTML && b4.innerHTML == b7.innerHTML && b1.innerHTML != "") ||
		(b2.innerHTML == b5.innerHTML && b5.innerHTML == b8.innerHTML && b2.innerHTML != "") ||
		(b3.innerHTML == b6.innerHTML && b6.innerHTML == b9.innerHTML && b3.innerHTML != "") ||
		(b1.innerHTML == b5.innerHTML && b5.innerHTML == b9.innerHTML && b1.innerHTML != "") ||
		(b3.innerHTML == b5.innerHTML && b5.innerHTML == b7.innerHTML && b3.innerHTML != "")
	)
	{
		bloquear(true);

		var v1 = document.getElementById("btnReiniciar");
   	 	v1.style.visibility = "visible";
    	v1.disabled = false;

    	if(turno)
    		document.getElementById("vez").innerHTML = '"O" venceu!';
    	else
    		document.getElementById("vez").innerHTML = '"X" venceu!';
	}

	else
		if(qtdeCliques >= 9)
		{
			bloquear(true);

			var v1 = document.getElementById("btnReiniciar");
	   	 	v1.style.visibility = "visible";
	    	v1.disabled = false;

	    	document.getElementById("vez").innerHTML = 'Deu velha!';
		}

}

function iniciar()
{
	desabilitar(true);

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

    desabilitar(false);
}