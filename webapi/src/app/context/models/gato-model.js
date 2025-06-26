import ModeloInterface from "../interfaces/modelo-interface.js";

export default class Gato extends ModeloInterface {
    id_gato;
    nome;
    idade;
    sexo;
    cor;
    raca;
    descricao;
    fotos;
    sociavel;
    status;
    data_casdastro;

    constructor() {
        super();
    }

    async Popula({
        id_gato,
        nome,
        idade,
        sexo,
        cor,
        raca,
        descricao,
        fotos,
        sociavel,
        status = "DISPONIVEL",
        data_casdastro = new Date()
    }) {
        this.id_gato = id_gato;
        this.nome = nome;
        this.idade = idade;
        this.sexo = sexo;
        this.cor = cor;
        this.raca = raca;
        this.descricao = descricao;
        this.fotos = fotos;
        this.sociavel = sociavel;
        this.status = status;
        this.data_casdastro = data_casdastro;
    }

    validarCadastro() {
        if (!this.nome || !this.sexo || !this.cor || !this.raca || !this.descricao || !this.fotos || this.sociavel === undefined || this.idade === undefined) {
            throw new Error('Campos obrigatórios para cadastro do gato não preenchidos.');
        }
    }
}