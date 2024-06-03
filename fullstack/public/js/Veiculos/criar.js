document.addEventListener("DOMContentLoaded", function() {


    var btnGravar = document.getElementById("btnGravar");


    btnGravar.addEventListener("click", function() {
        gravar();
    })
})

function gravar() {

    limparErros();
    
    var modelo = document.getElementById("modelo").value;
    var marca = document.getElementById("marca").value;
    var ano = document.getElementById("ano").value;
    var km = document.getElementById("km").value;

    var listaErros = [];

    if(modelo.value == "") {
        listaErros.push("modelo");
    }
    if(marca.value == "") {
        listaErros.push("marca");
    }
    if(ano.value == "") {
        listaErros.push("ano");
    }
    if(km.value == "") {
        listaErros.push("km");
    }

    if(listaErros.length == 0){

        var data = {
            modelo: modelo,
            marca: marca,
            ano: ano,
            km: km
        };

        fetch('/veiculos/criar', { 
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
                modelo = "";
                marca = "";
                ano = "";
                km = "";

                document.getElementById("alertaSucesso").innerText = "Veículo gravado com sucesso!";
                document.getElementById("alertaSucesso").style = "display:block";
            }
            else{
                document.getElementById("erros").innerText = "Erro ao gravar veículo!";
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