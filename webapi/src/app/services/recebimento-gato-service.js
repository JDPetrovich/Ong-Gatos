import { RecebimentoGato } from '../context/models/modelos.js';
import { RecebimentoGatoRepo } from '../context/repositories/repositorios.js';
import { ErroRequisicao } from '../../plugins/exceptions/user-exception.js';
import Servico from "./servicos.js";
import Constantes from '../../plugins/server/constants/constantes.js';

export default class RecebimentoService {
    #representacao = { content: "" };

    Json() {
        return JSON.stringify(this.#representacao)
    }

    async cadastrarRecebimento(dados) {
        let repo;
        try {
            const recebimento = new RecebimentoGato();
            await recebimento.Popula(dados);
            recebimento.validarCadastro();

            repo = new RecebimentoGatoRepo();
            await repo.executarTransacao(async (tx) => {
                await repo.criarRecebimento(recebimento, tx);
            });
            this.#representacao.content = { mensagem: "Recebimento cadastrado com sucesso!", recebimento };
            return recebimento;
        } catch (erro) {
            throw new ErroRequisicao(erro.message || 'Erro ao cadastrar recebimento.');
        }
    }

    async listarRecebimentos(statusFiltro) {
        let repo;
        try {
            repo = new RecebimentoGatoRepo();
            let recebimentos;
            if (statusFiltro) {
                recebimentos = await repo.listarRecebimentos({ status: statusFiltro });
            } else {
                recebimentos = await repo.listarRecebimentos();
            }
            this.#representacao.content = recebimentos;
        } catch (erro) {
            throw new ErroRequisicao(erro.message || 'Erro ao listar recebimentos.');
        }
    }

    async buscarPorId(id_recebimento) {
        let repo;
        try {
            repo = new RecebimentoGatoRepo();
            const recebimento = await repo.buscarPorId(id_recebimento);
            if (!recebimento) throw new ErroRequisicao("Recebimento não encontrado.");
            this.#representacao.content = recebimento;
            return recebimento;
        } catch (erro) {
            throw new ErroRequisicao(erro.message || 'Erro ao buscar recebimento.');
        }
    }

    async atualizarRecebimento(id_recebimento, dados, dadosGato = null) {
        let repo;
        try {
            repo = new RecebimentoGatoRepo();
            const recebimentoDB = await repo.buscarPorId(id_recebimento);
            if (!recebimentoDB) throw new ErroRequisicao("Recebimento não encontrado.");

            const recebimento = new RecebimentoGato();
            await recebimento.Popula({ ...recebimentoDB, ...dados });
            recebimento.validarCadastro();

            if (dados.status === "FINALIZADO" && !recebimentoDB.id_gato) {
                const gatoService = new Servico.GATO(Constantes.UrlRota.GATO);
                const novoGato = await gatoService.cadastrarGato({
                    ...dadosGato,
                    status: "INDISPONIVEL"
                });
                recebimento.id_gato = novoGato.id_gato;
            }

            await repo.executarTransacao(async (tx) => {
                await repo.atualizarRecebimento(id_recebimento, recebimento, tx);
            });
            this.#representacao.content = { mensagem: "Recebimento atualizado com sucesso!", recebimento };
        } catch (erro) {
            throw new ErroRequisicao(erro.message || 'Erro ao atualizar recebimento.');
        }
    }

    async removerRecebimento(id_recebimento) {
        let repo;
        try {
            repo = new RecebimentoGatoRepo();
            await repo.executarTransacao(async (tx) => {
                await repo.removerRecebimento(id_recebimento, tx);
            });
            this.#representacao.content = { mensagem: "Recebimento removido com sucesso." };
        } catch (erro) {
            throw new ErroRequisicao(erro.message || 'Erro ao remover recebimento.');
        }
    }
}