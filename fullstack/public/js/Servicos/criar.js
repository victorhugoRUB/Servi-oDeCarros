document.addEventListener("DOMContentLoaded", function() {


    var btnGravar = document.getElementById("btnGravar");


    btnGravar.addEventListener("click", function() {
        gravar();
    })
})

function gravar() {

    limparErros();
    
    var vei = document.getElementById("vei").value;
    var serv = document.getElementById("serv").value;

    var listaErros = [];

    if(vei == "") {
        listaErros.push("vei");
    }
    if(serv == "") {
        listaErros.push("serv");
    }


    if(listaErros.length == 0){

        var data = {
            vei: vei,
            serv: serv,
        };

        fetch('/servicos/criar', { 
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
                vei = "";
                serv = "";

                document.getElementById("alertaSucesso").innerText = "Serviço gravado com sucesso!";
                document.getElementById("alertaSucesso").style = "display:block";
            }
            else{
                document.getElementById("erros").innerText = "Erro ao gravar serviço!";
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
    document.getElementById("vei").classList.remove("campoErro");
    document.getElementById("serv").classList.remove("campoErro");

    document.getElementById("erros").style = "display:none";
    document.getElementById("alertaSucesso").style = "display:none";
}