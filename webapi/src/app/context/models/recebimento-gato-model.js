import ModeloInterface from "../interfaces/modelo-interface.js";

export default class RecebimentoGatoModel extends ModeloInterface {
    id_recebimento;
    nome_responsavel;
    cpf_responsavel;
    contato_responsavel;
    origem;
    data_recebimento;
    observacoes;
    fotos;
    status;
    id_gato;

    constructor() {
        super();
    }

    async Popula({
        id_recebimento,
        nome_responsavel,
        cpf_responsavel,
        contato_responsavel,
        origem,
        data_recebimento = new Date(),
        observacoes,
        fotos,
        status = "RECEBIDO",
        id_gato
    }) {
        this.id_recebimento = id_recebimento;
        this.nome_responsavel = nome_responsavel;
        this.cpf_responsavel = cpf_responsavel;
        this.contato_responsavel = contato_responsavel;
        this.origem = origem;
        this.data_recebimento = data_recebimento;
        this.observacoes = observacoes;
        this.fotos = fotos;
        this.status = status;
        this.id_gato = id_gato;
    }

    validarCadastro() {
        if (!this.nome_responsavel || !this.cpf_responsavel || !this.contato_responsavel || !this.origem) {
            throw new Error('Campos obrigatórios para cadastro de recebimento não preenchidos.');
        }
    }
}