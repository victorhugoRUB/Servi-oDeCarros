const express = require('express');
const Autenticacao = require('../middlewares/autenticacao');
const ServicoController = require('../controllers/servicoController');
const ServicoPrestController = require('../controllers/servicoPrestController');

class ServicosRoute {

    #router;

    get router() {
        return this.#router;
    }
    set router(router) {
        this.#router = router;
    }
    constructor() {

        this.#router = express.Router();
        let ctrl = new ServicoController();
        let ctrlPrest = new ServicoPrestController();
        let auth = new Autenticacao();
        this.#router.get('/listar', auth.usuarioEstaLogado,ctrl.listarView);
        this.#router.get('/criar', auth.usuarioIsAdmin, ctrl.listagemCadView, ctrl.criarView);
        this.#router.post('/criar', auth.usuarioIsAdmin, ctrlPrest.criar);
    }
}

module.exports = ServicosRoute;