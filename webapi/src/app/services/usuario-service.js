import { Usuario } from '../context/models/modelos.js';
import { UsuarioRepo } from '../context/repositories/repositorios.js';
import { ErroRequisicao } from '../../plugins/exceptions/user-exception.js';
import { enviarEmail } from '../helpes/email-util.js';
import bcrypt from 'bcrypt';
import RecuperacaoSenha from '../context/models/recuperacao-senha-model.js';

export default class UsuarioService {
    #representacao = { content: "" };

    Json() {
        return JSON.stringify(this.#representacao)
    }

    async cadastrarOuAtualizarUsuario(dados) {
        let repo;
        try {
            repo = new UsuarioRepo()
            let usuarioExistente = await repo.buscarPorEmailOuCpf(dados.email, dados.cpf)
            let usuario

            if (usuarioExistente) {
                await repo.atualizarUsuario(usuarioExistente.id_usuario, {
                    nome: dados.nome,
                    email: dados.email,
                    cfp: dados.cfp,
                    telefone: dados.telefone,
                    endereco: dados.endereco
                });
                usuario = { ...usuarioExistente, ...dados };
                this.#representacao.content = { mensagem: "Usuário atualizado com sucesso!", usuario };
            } else {
                usuario = new Usuario();
                await usuario.Popula({ ...dados, tipo: 'USUARIO' });
                usuario.validarCadastro();

                await repo.executarTransacao(async (tx) => {
                    await repo.criarUsuario(usuario, tx);
                });
                this.#representacao.content = { mensagem: "Usuário cadastrado com sucesso!", usuario };
            }
            return usuario
        } catch (erro) {
            throw new ErroRequisicao(erro.message || 'Erro ao cadastrar usuário.');
        }
    }

    async cadastrarAdmin(dados) {
        let repo;
        try {
            if (!dados.senha) throw new ErroRequisicao('Senha obrigatória para admin!');
            const usuario = new Usuario();
            await usuario.Popula({ ...dados, tipo: 'ADMIN' });
            usuario.validarCadastro();
            usuario.senha = await this._hashSenha(usuario.senha);

            repo = new UsuarioRepo();
            await repo.executarTransacao(async (tx) => {
                await repo.criarUsuario(usuario, tx);
            });

            this.#representacao.content = { mensagem: "Administrador cadastrado com sucesso!" };
        } catch (erro) {
            throw new ErroRequisicao(erro.message || 'Erro ao cadastrar admin.');
        }
    }

    async loginAdmin({ email, senha }) {
        try {
            if (!email || !senha) throw new ErroRequisicao('Email e senha são obrigatórios para login!');
            const repo = new UsuarioRepo();
            const usuario = await repo.buscarPorEmail(email);

            if (!usuario || usuario.tipo !== 'ADMIN') {
                throw new ErroRequisicao('Usuário administrador não encontrado.');
            }

            const senhaConfere = await bcrypt.compare(senha, usuario.senha);
            if (!senhaConfere) {
                throw new ErroRequisicao('Senha inválida.');
            }

            const { senha: _, ...usuarioSemSenha } = usuario;
            this.#representacao.content = {
                mensagem: "Login realizado com sucesso!",
                usuario: usuarioSemSenha
            };
        } catch (erro) {
            throw new ErroRequisicao(erro.message || 'Erro ao realizar login.');
        }
    }

    async buscarUsuarios() {
        let repo;
        try {
            repo = new UsuarioRepo();
            const usuarios = await repo.buscarUsuarios();

            const usuariosSemSenha = usuarios.map(({ senha, ...rest }) => rest);
            this.#representacao.content = usuariosSemSenha;
        } catch (erro) {
            throw new ErroRequisicao(erro.message || 'Erro ao buscar usuários.');
        }
    }

    async atualizarAdmin(id, dados) {
        let repo;
        try {
            if (!id) throw new ErroRequisicao('ID do usuário é obrigatório.');
            if (!dados.senhaAtual) throw new ErroRequisicao('A senha atual é obrigatória.');

            repo = new UsuarioRepo();
            const usuarioDB = await repo.buscarPorId(id);

            if (!usuarioDB || usuarioDB.tipo !== 'ADMIN') {
                throw new ErroRequisicao('Usuário administrador não encontrado.');
            }

            const senhaConfere = await bcrypt.compare(dados.senhaAtual, usuarioDB.senha);
            if (!senhaConfere) {
                throw new ErroRequisicao('Senha atual incorreta.');
            }

            const camposAtualizar = {};
            if (dados.nome && dados.nome !== usuarioDB.nome) camposAtualizar.nome = dados.nome;
            if (dados.email && dados.email !== usuarioDB.email) camposAtualizar.email = dados.email;
            if (dados.novaSenha) {
                camposAtualizar.senha = await this._hashSenha(dados.novaSenha);
            }

            if (Object.keys(camposAtualizar).length === 0) {
                throw new ErroRequisicao('Nada para atualizar.');
            }

            const adminAtualizado = new Usuario();
            await adminAtualizado.Popula({
                ...usuarioDB,
                ...camposAtualizar,
                tipo: 'ADMIN'
            });
            adminAtualizado.validarCadastro();

            await repo.executarTransacao(async (tx) => {
                await repo.atualizarUsuario(id, adminAtualizado, tx);
            });

            this.#representacao.content = { mensagem: 'Administrador atualizado com sucesso.' };

        } catch (erro) {
            throw new ErroRequisicao(erro.message || 'Erro ao atualizar usuário.');
        }
    }

    async removerUsuario(id) {
        let repo;
        try {
            if (!id) throw new ErroRequisicao('ID do usuário é obrigatório.');
            repo = new UsuarioRepo();
            await repo.executarTransacao(async (tx) => {
                await repo.removerUsuario(id, tx);
            });
            this.#representacao.content = { mensagem: 'Usuário removido com sucesso.' };
        } catch (erro) {
            throw new ErroRequisicao(erro.message || 'Erro ao remover usuário.');
        }
    }

    async enviarCodigo(email, dados) {
        let repo;
        try {
            if (!email) throw new ErroRequisicao("O campo 'email' é obrigatório!");

            repo = new UsuarioRepo();
            const usuarioDB = await repo.buscarPorEmail(email);
            if (!usuarioDB) throw new ErroRequisicao("Usuário não encontrado para o e-mail informado!");

            const codigo = Math.floor(100000 + Math.random() * 900000).toString();
            const validadeMinutos = 15;
            const expira_em = new Date(Date.now() + validadeMinutos * 60 * 1000);

            const recu = new RecuperacaoSenha();
            await recu.Popula({ ...dados, email, codigo, expira_em });

            await repo.salvarCodigo(recu);

            await enviarEmail(
                email,
                "Recuperação de Senha",
                `Seu código de recuperação de senha é: ${codigo}\n\nEste código é válido por 15 minutos.\nSe não foi você, ignore este e-mail.`
            )

            this.#representacao.content = { mensagem: "Código de recuperação enviado para o e-mail informado!" };
        } catch (erro) {
            throw new ErroRequisicao(erro.message);
        }
    }

    async validarCodigo({ email, codigo, novaSenha }) {
        try {
            if (!email || !codigo || !novaSenha)
                throw new ErroRequisicao("Campos obrigatórios: email, codigo e novaSenha");

            const repo = new UsuarioRepo();
            const valido = await repo.validarCodigo({ email, codigo });
            if (!valido) throw new ErroRequisicao("Código de recuperação inválido ou expirado!");

            const usuario = await repo.buscarPorEmail(email);
            if (!usuario) throw new ErroRequisicao("Usuário não encontrado para o e-mail informado!");

            const senhaHash = await this._hashSenha(novaSenha);
            await repo.atualizarUsuario(usuario.id_usuario, { senha: senhaHash });

            await repo.invalidarCodigo({ email, codigo });

            this.#representacao.content = { mensagem: "Senha redefinida com sucesso!" };
        } catch (erro) {
            throw new ErroRequisicao(erro.message);
        }
    }

    async _hashSenha(senha) {
        const saltRounds = 10;
        return await bcrypt.hash(senha, saltRounds);
    }
}