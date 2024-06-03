const VeiculoModel = require("../models/veiculoModel");


class VeiculoController {

    constructor() {

    }
    
    async listarView(req, res){
        var vei = new VeiculoModel()
        var lista = await vei.listar();
        res.render('veiculos/listar', { lista: lista  });
    }

    async criarView(req, res){
        res.render('veiculos/criar');
    }

    async gravar(req, res){
        var ok = false;
        if(req.body != null){
            let veiculo = new VeiculoModel(0, req.body.modelo, req.body.marca, req.body.ano, req.body.km);
            ok = await veiculo.gravar();
        }
        res.send({ok: ok})
    }

    async deletar(req, res){
        var ok = false;
        if(req.body.id != null && req.body.id > 0){
            let veiculo = new VeiculoModel();
            ok = await veiculo.deletar(req.body.id);
        }
        res.send({ok: ok})
    }

    async alterarView(req, res){
        let veiculo = new VeiculoModel();
        if(req.params != null && req.params.id != null){
            veiculo = await veiculo.buscar(req.params.id);
        }
        res.render('veiculos/alterar', { veiAlteracao: veiculo });
    }

    async alterar(req, res){
        var ok = false;
        if(req.body != null){
            let veiculo = new VeiculoModel(req.body.id, req.body.modelo, req.body.marca, req.body.ano, req.body.km);
            ok = await veiculo.gravar();
        }
        res.send({ok: ok})
    }


}
module.exports = VeiculoController;