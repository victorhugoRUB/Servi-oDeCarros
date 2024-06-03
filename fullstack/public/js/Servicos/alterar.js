document.addEventListener("DOMContentLoaded", function() {


    var btnAlterar = document.getElementById("btnAlterar");


    btnAlterar.addEventListener("click", function() {
        alterar();
    })
})

function alterar() {

    limparErros();
    
    var id = document.getElementById("id").value;
    var modelo = document.getElementById("modelo").value;
    var marca = document.getElementById("marca").value;
    var ano = document.getElementById("ano").value;
    var km = document.getElementById("km").value;

    var listaErros = [];

    if(modelo == "") {
        listaErros.push("modelo");
    }
    if(marca == "") {
        listaErros.push("marca");
    }
    if(ano == "") {
        listaErros.push("ano");
    }
    if(km == "") {
        listaErros.push("km");
    }

    if(listaErros.length == 0){

        var data = {
            id: id,
            modelo: modelo,
            marca: marca,
            ano: ano,
            km: km
        };

        fetch('/veiculos/alterar', { 
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(r=> {
            return r.json();
        })
        .then(r=> {          
            if(r.ok) {

                document.getElementById("alertaSucesso").innerText = "Veículo alterado com sucesso!";
                document.getElementById("alertaSucesso").style = "display:block";
            }
            else{
                document.getElementById("erros").innerText = "Erro ao alterar veículo!";
                document.getElementById("erros").style = "display:block";
            }
        })
        .catch(e=> {
            console.log(e);
        })

    }
    else{
        mostrarErros(listaErros)
    }
}

function mostrarErros(lista) {
    for(var i = 0; i<lista.length; i++){
        let id = lista[i];

        document.getElementById(id).classList.add("campoErro");

        document.getElementById("erros").innerText = "Preencha corretamente os campos destacados abaixo:";

        document.getElementById("erros").style= "display:block";
    }
}

function limparErros() {
    document.getElementById("modelo").classList.remove("campoErro");
    document.getElementById("marca").classList.remove("campoErro");
    document.getElementById("ano").classList.remove("campoErro");
    document.getElementById("km").classList.remove("campoErro");

    document.getElementById("erros").style = "display:none";
    document.getElementById("alertaSucesso").style = "display:none";
}