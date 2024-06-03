const Database = require('../utils/database');

const conexao = new Database();

class ServicoPrestModel {

    #seprId;
    #servId;
    #veiId;
    

    get seprId(){
        return this.#seprId;
    }

    set seprId(seprId) {
        this.#seprId = seprId;
    }

    get servId(){
        return this.#servId;
    }

    set servId(servId) {
        this.#servId = servId;
    } 
    
    get veiId(){
        return this.#veiId;
    }

    set veiId(veiId) {
        this.#veiId = veiId;
    } 
    
    constructor(seprId, servId, veiId){
        this.#seprId = seprId;
        this.#servId = servId;
        this.#veiId = veiId;
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
        if(this.seprId == 0){
            let sql = "insert into tb_servicosprestados(serv_id, vei_id) values(?, ?)";
            let valores = [this.#servId, this.#veiId];
            let result = await conexao.ExecutaComandoNonQuery(sql, valores);
            console.log(result);
            return result;
        } else {
            let sql = "update tb_servicosprestados set serv_id = ?, vei_id = ? where sepr_id = ?";
            let valores = [this.#servId, this.#veiId, this.seprId];
            let result = await conexao.ExecutaComandoNonQuery(sql, valores);
            return result;
        }
    }

}

module.exports = ServicoPrestModel;