const ServicoModel = require("../models/servicoModel");
const ServicoPrestModel = require("../models/servicoPrestModel");
const VeiculoModel = require("../models/veiculoModel");

class ServicoPrestController {

    constructor() {

    }
    
    async listarView(req, res){
        var serv = new ServicoModel();
        var lista = await serv.listar();
        res.render('servicos/listar', { lista: lista  });
    }

    async listarServ (req, res){
        var serv = new ServicoModel();
        var lista = await serv.listar();
        res.render({lista: lista});
    }

    async criarView(req, res){
        res.render('servicos/criar');
    }

    async listagemCadView(req, res){
        var serv = new ServicoModel();
        var listaServ = await serv.listar();
        var vei = new VeiculoModel()
        var listaVei = await vei.listar();
        res.render('servicos/criar', { listaServ: listaServ, listaVei: listaVei });
    }

    async criar(req, res){
        var ok = false;
        if(req.body != null){
            let servico = new ServicoPrestModel(0, req.body.serv, req.body.vei);
            ok = await servico.gravar();
        }
        res.redirect('/servicos/criar');
    }


}
module.exports = ServicoPrestController;