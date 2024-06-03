const express = require('express');
const Autenticacao = require('../middlewares/autenticacao');
const VeiculoController = require('../controllers/veiculoController');

class VeiculosRoute {

    #router;

    get router() {
        return this.#router;
    }
    set router(router) {
        this.#router = router;
    }
    constructor() {

        this.#router = express.Router();
        let ctrl = new VeiculoController
        let auth = new Autenticacao();
        this.#router.get('/listar', auth.usuarioEstaLogado, ctrl.listarView);
        this.#router.get('/criar', auth.usuarioIsAdmin, ctrl.criarView);
        this.#router.post('/criar', auth.usuarioIsAdmin, ctrl.gravar);
        this.#router.post('/excluir', auth.usuarioIsAdmin, ctrl.deletar);
        this.#router.get('/alterar/:id', auth.usuarioIsAdmin, ctrl.alterarView);
        this.#router.post('/alterar', auth.usuarioIsAdmin, ctrl.alterar);
    }
}

module.exports = VeiculosRoute;