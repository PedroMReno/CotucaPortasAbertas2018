function sleep(ms) 
{
	return new Promise(resolve => setTimeout(resolve,ms));
}

var tempoPassado = 0;

async function iniciar() 
{
    while(true)
    {
    	await sleep(1000);

		var barra = document.getElementById("barra");

    	tempoPassado += 3;

    	barra.style.width = tempoPassado + '%';
    }
}

function tick() 
{
    alert("Olá");
}