const Database = require('../utils/database');

const conexao = new Database();

class VeiculoModel {

    #veiId;
    #veiModelo;
    #veiMarca;
    #veiAno;
    #veiKilometragem

    get veiId(){
        return this.#veiId;
    }

    set veiId(veiId) {
        this.#veiId = veiId;
    }

    get veiModelo(){
        return this.#veiModelo;
    }

    set veiModelo(veiModelo) {
        this.#veiModelo = veiModelo;
    } 
    
    get veiMarca(){
        return this.#veiMarca;
    }

    set veiMarca(veiMarca) {
        this.#veiMarca = veiMarca;
    } 
    get veiAno(){
        return this.#veiAno;
    }

    set veiAno(veiAno) {
        this.#veiAno = veiAno;
    } 
    get veiKilometragem(){
        return this.#veiKilometragem;
    }

    set veiKilometragem(veiKilometragem) {
        this.#veiKilometragem = veiKilometragem;
    } 
    
    constructor(veiId, veiModelo, veiMarca, veiAno, veiKilometragem){
        this.#veiId = veiId;
        this.#veiModelo = veiModelo;
        this.#veiMarca = veiMarca;
        this.#veiAno = veiAno;
        this.#veiKilometragem = veiKilometragem;
    }

    async listar() {
        let sql = "select * from tb_veiculos";
        let listaRetorno = [];
        let rows = await conexao.ExecutaComando(sql);

        for(var i= 0; i < rows.length; i++){
            let row = rows[i];
            listaRetorno.push(new VeiculoModel(row["vei_id"], row["vei_modelo"], row["vei_marca"], row["vei_ano"], row["vei_kilometragem"]));
        }
        console.log(rows)

        return listaRetorno;
    }

    async gravar() {
        if(this.#veiId == 0){
            let sql = "insert into tb_veiculos (vei_modelo, vei_marca, vei_ano, vei_kilometragem) values (?, ?, ?, ?)";
            let valores = [this.#veiModelo, this.#veiMarca, this.#veiAno, this.#veiKilometragem];
            let ok = await conexao.ExecutaComandoNonQuery(sql, valores);
            return ok;
        }else{
            let sql = "update tb_veiculos set vei_modelo = ?, vei_marca = ?, vei_ano = ?, vei_kilometragem = ? where vei_id = ?";
            let valores = [this.#veiModelo, this.#veiMarca, this.#veiAno, this.#veiKilometragem, this.#veiId];
            let ok = await conexao.ExecutaComandoNonQuery(sql, valores);
            return ok;
        }
    }

    async deletar(id) {
        let sql = "delete from tb_veiculos where vei_id = ?";
        let valores = [id];
        let ok = await conexao.ExecutaComandoNonQuery(sql, valores);
        return ok;
    }

    async buscar(id) {
        let sql = "select * from tb_veiculos where vei_id = ?";
        let valores = [id];
        let rows = await conexao.ExecutaComando(sql, valores);
        if(rows.length > 0){
            let row = rows[0];
            return new VeiculoModel(row["vei_id"], row["vei_modelo"], row["vei_marca"], row["vei_ano"], row["vei_kilometragem"]);
        }
        return null;
    }
    


}

module.exports = VeiculoModel;