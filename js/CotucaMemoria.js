var posicao = [1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8];
var pontuacao = 0;
var acertosTotais = 0;
            
posicao.sort(function() {return (Math.round(Math.random()) -0.5);})

function TrocaImagem(img)
{
    if(img.name == "")
    {
        bloquear(true);
        //Verifica se é a primeira imagem clicada
        if(document.getElementById("nomeImagem").innerHTML == "VAZIO")
        {
            //Mudando a imagem
            img.src = "img/jogos/memoria/" + posicao[img.id]  + ".png";
            
            //Guardando o nome e o ID da imagem que foi clicado
            document.getElementById("nomeImagem").innerHTML = img.src;
            document.getElementById("idImagem").innerHTML = img.id;
        }
        
        else if(img.src != document.getElementById("nomeImagem").innerHTML)
        {
            img.src = "img/jogos/memoria/" + posicao[img.id]  + ".png";
            
            setTimeout(function()
            {
                if(document.getElementById("nomeImagem").innerHTML == img.src)
                {
                    var primeiraImagem = document.getElementById("idImagem").innerHTML
                    var v1 = document.getElementById(primeiraImagem);

                    if(v1.name == "" && img.name == "")
                    {
                        pontuacao = pontuacao + 3;
                        v1.name = "acertou";
                        img.name = "acertou";
                        acertosTotais++;
                    }
                }
                else
                {
                    pontuacao--;

                    if(pontuacao < 0)
                        pontuacao = 0;

                    img.src = "img/jogos/memoria/verso.png";
                    var primeiraImagem = document.getElementById("idImagem").innerHTML
                    document.getElementById(primeiraImagem).src = "img/jogos/memoria/verso.png";

                }

                document.getElementById("nomeImagem").innerHTML = "VAZIO";
                document.getElementById("idImagem").innerHTML = "VAZIO";

                atualizarLabel();
            }, 300);

            if(acertosTotais >= 7)
                perdeu();
        }

        bloquear(false);
    }
}

function atualizarLabel()
{
    var v1 = document.getElementById("pontos");
    v1.innerHTML = "Pontuação: " + pontuacao;
}

function desabilitar(verdade)
{
    var desa = "hidden";

    if(!verdade)
        desa = "visible";

    for(i = 0; i < 16; i++)
    {
        var v1 = document.getElementById(i + "");
        v1.style.visibility = desa;
    }

    bloquear(verdade);

    var v1 = document.getElementById("pontos");
    v1.style.visibility = desa;
    v1.disabled = verdade;
}


function bloquear(verdade)
{
    for(i = 0; i < 16; i++)
    {
        var v1 = document.getElementById(i + "");
        v1.disabled = verdade;
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

function perdeu()
{
    setTimeout(function()
    {
        desabilitar(true);

        var v1 = document.getElementById("bordaJogo");
        v1.style.backgroundImage = "url('./img/jogos/geral/game-over.png')";
        v1 = document.getElementById("btnReiniciar");
        v1.style.visibility = "visible";
        v1.disabled = false;
    }, 700);
}