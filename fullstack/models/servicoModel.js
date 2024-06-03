const Database = require('../utils/database');

const conexao = new Database();

class ServicoModel {

    #servId;
    #servDesc;
    #servValor;

    get servId(){
        return this.#servId;
    }

    set servId(servId) {
        this.#servId = servId;
    }

    get servDesc(){
        return this.#servDesc;
    }

    set servDesc(servDesc) {
        this.#servDesc = servDesc;
    } 
    
    get servValor(){
        return this.#servValor;
    }

    set servValor(servValor) {
        this.#servValor = servValor;
    } 
    
    constructor(servId, servDesc, servValor){
        this.#servId = servId;
        this.#servDesc = servDesc;
        this.#servValor = servValor;
    }

    async listar() {
        let sql = "select * from tb_servicos";
        let listaRetorno = [];
        let rows = await conexao.ExecutaComando(sql);

        for(var i= 0; i < rows.length; i++){
            let row = rows[i];
            listaRetorno.push(new ServicoModel(row["serv_id"], row["serv_descricao"], row["serv_valor"]));
        }
        console.log(rows)

        return listaRetorno;
    }

    async gravar(){
        if(this.servId == 0){
            let sql = "insert into tb_servicos(serv_descricao, serv_valor) values(?, ?)";
            let valores = [this.servDesc, this.servValor];
            let result = await conexao.ExecutaComandoNonQuery(sql, valores);
            return result;
        } else {
            let sql = "update tb_servicos set serv_descricao = ?, serv_valor = ? where serv_id = ?";
            let valores = [this.servDesc, this.servValor, this.servId];
            let result = await conexao.ExecutaComandoNonQuery(sql, valores);
            return result;
        }
    }

}

module.exports = ServicoModel;