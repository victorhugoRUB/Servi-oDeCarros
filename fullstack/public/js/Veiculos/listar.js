document.addEventListener("DOMContentLoaded", function() {
    
    //carregarUsuarios();

    let btnExcluir = document.querySelectorAll(".btnExcluir");

    for(let i = 0; i< btnExcluir.length; i++){
        btnExcluir[i].addEventListener("click", excluir);
    }
})

function excluir() {

    if(confirm("Tem certeza que deseja excluir esse veículo?")){
        //recuperar id pelo dataset
        let id = this.dataset.id;
        var data = {
            id: id
        }
        fetch("/veiculos/excluir", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(function(r) {
            return r.json();
        }).then(function(r) {
            if(r.ok){
                window.location.reload();
            }
        }).catch(function(e) {
            console.log(e);
        })

    }
    else{

    }
}

function carregar() {
    fetch('/veiculos/listar')
    .then(r => {
        return r.json();
    })
    .then(r => {
        console.log(r);
        if(r.lista.length > 0){
            let html = "";
            for(var i = 0; i<r.lista.length; i++) {
                html += `<tr>
                            <td>${r.lista[i].id}</td>
                            <td>${r.lista[i].modelo}</td>                           
                            <td>${r.lista[i].marca}</td>
                            <td>${r.lista[i].ano}</td>
                            <td>${r.lista[i].km}</td>
                        </tr>`
            }

            document.getElementById("corpoTabela").innerHTML += html;
        }
    })
    .catch(e => {
        console.log(e);
    })

    console.log("Fim da função");
}