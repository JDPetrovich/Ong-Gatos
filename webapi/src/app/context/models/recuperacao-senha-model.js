import ModeloInterface from "../interfaces/modelo-interface"

export default class RecuperacaoSenha extends ModeloInterface {
    id;
    email;
    codigo;
    expira_em;
    usado;
    criado_em;

    constructor() {
        super();
    }

    async Popula({
        id = undefined,
        email,
        codigo,
        expira_em,
        usado = false,
        criado_em = new Date()
    }) {
        this.id = id;
        this.email = email;
        this.codigo = codigo;
        this.expira_em = expira_em;
        this.usado = usado;
        this.criado_em = criado_em;
    }
    
    validarCampos() {
        if (!this.email || !this.codigo || !this.expira_em) {
            throw new Error('Email, código e expiração são obrigatórios.');
        }
    }
}