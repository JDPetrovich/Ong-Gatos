import ModeloInterface from "../interfaces/modelo-interface.js";

export default class UsuarioModel extends ModeloInterface {
    id_usuario;
    nome;
    email;
    senha;
    tipo;
    cfp;
    telefone;
    endereco;
    conta_confirmada;
    data_cadastro;

    constructor() {
        super();
    }

    async Popula({
        id_usuario,
        nome,
        email,
        senha,
        tipo = "USUARIO",
        cfp,
        telefone,
        endereco,
        conta_confirmada = false,
        data_cadastro = new Date()
    }) {
        this.id_usuario = id_usuario;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.tipo = tipo;
        this.cfp = cfp;
        this.telefone = telefone;
        this.endereco = endereco;
        this.conta_confirmada = conta_confirmada;
        this.data_cadastro = data_cadastro;
    }

    validarCadastro() {
        if (!this.nome || !this.email) {
            throw new Error('Nome e email são obrigatórios.');
        }

        if (this.tipo === 'USUARIO') {
            if (!this.cfp || !this.telefone || !this.endereco) {
                throw new Error('CPF, telefone e endereço são obrigatórios para usuário comum.');
            }
        }

        if (this.tipo === 'ADMIN' && !this.senha) {
            throw new Error('Senha é obrigatória para administradores.');
        }
    }
}