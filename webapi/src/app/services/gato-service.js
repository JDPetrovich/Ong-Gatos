import { Gato } from '../context/models/modelos.js';
import { GatoRepo } from '../context/repositories/repositorios.js';
import { ErroRequisicao } from '../../plugins/exceptions/user-exception.js';

export default class GatoService {
    #representacao = { content: "" };

    Json() {
        return JSON.stringify(this.#representacao)
    }

    async cadastrarGato(dados) {
        let repo;
        try {
            const gato = new Gato();
            await gato.Popula(dados);
            gato.validarCadastro();

            repo = new GatoRepo();
            let novoGato;
            await repo.executarTransacao(async (tx) => {
                novoGato = await repo.criarGato(gato, tx);
            });
            this.#representacao.content = { mensagem: "Gato cadastrado com sucesso!", gato };
            return novoGato;
        } catch (erro) {
            throw new ErroRequisicao(erro.message || 'Erro ao cadastrar gato.');
        }
    }

    async listarGatos(statusFiltro) {
        let repo;
        try {
            repo = new GatoRepo();
            let gatos;
            if (statusFiltro) {
                gatos = await repo.listarGatos({ status: statusFiltro });
            } else {
                gatos = await repo.listarGatos();
            }
            this.#representacao.content = gatos;
        } catch (erro) {
            throw new ErroRequisicao(erro.message || 'Erro ao listar gatos.');
        }
    }

    async buscarPorId(id_gato) {
        let repo;
        try {
            repo = new GatoRepo();
            const gato = await repo.buscarPorId(id_gato);
            if (!gato) throw new ErroRequisicao("Gato não encontrado.");
            this.#representacao.content = gato;
            return gato;
        } catch (erro) {
            throw new ErroRequisicao(erro.message || 'Erro ao buscar gato.');
        }
    }

    async atualizarGato(id_gato, dados) {
        let repo;
        try {
            repo = new GatoRepo();
            const gatoDB = await repo.buscarPorId(id_gato);
            if (!gatoDB) throw new ErroRequisicao("Gato não encontrado.");

            const gato = new Gato();
            await gato.Popula({ ...gatoDB, ...dados });
            gato.validarCadastro();

            await repo.executarTransacao(async (tx) => {
                await repo.atualizarGato(id_gato, gato, tx);
            });
            this.#representacao.content = { mensagem: "Gato atualizado com sucesso!", gato };
        } catch (erro) {
            throw new ErroRequisicao(erro.message || 'Erro ao atualizar gato.');
        }
    }

    async removerGato(id_gato) {
        let repo;
        try {
            repo = new GatoRepo();
            await repo.executarTransacao(async (tx) => {
                await repo.removerGato(id_gato, tx);
            });
            this.#representacao.content = { mensagem: "Gato removido com sucesso." };
        } catch (erro) {
            throw new ErroRequisicao(erro.message || 'Erro ao remover gato.');
        }
    }
}