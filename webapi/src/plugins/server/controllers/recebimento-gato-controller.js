import Servico from "../../../app/services/servicos.js";
import Constantes from '../constants/constantes.js';
import FalhaService from "../../../app/services/falha-service.js";

class RecebimentoGatoController {
    async CriarRecebimento(req, res) {
        try {
            const recebimento = new Servico.RECEBIMENTOGATO(Constantes.UrlRota.RECEBIMENTO_GATO);
            await recebimento.cadastrarRecebimento(req.body);
            res.status(Constantes.CodigoHTTP.CRIADO).json(JSON.parse(recebimento.Json()));
        } catch (erro) {
            const codeHttp = erro?.codeHttp ?? Constantes.CodigoHTTP.ERRO_INTERNO_SERVIDOR;
            const falha = new FalhaService(Constantes.UrlRota.RECEBIMENTO_GATO, erro.message);
            res.status(codeHttp).json(JSON.parse(falha.Json()));
        }
    }

    async ListarRecebimentos(req, res) {
        try {
            const recebimento = new Servico.RECEBIMENTOGATO(Constantes.UrlRota.RECEBIMENTOS_GATOS);
            await recebimento.listarRecebimentos(req.query.status);
            res.status(Constantes.CodigoHTTP.SUCESSO).json(JSON.parse(recebimento.Json()));
        } catch (erro) {
            const codeHttp = erro?.codeHttp ?? Constantes.CodigoHTTP.ERRO_INTERNO_SERVIDOR;
            const falha = new FalhaService(Constantes.UrlRota.RECEBIMENTOS_GATOS, erro.message);
            res.status(codeHttp).json(JSON.parse(falha.Json()));
        }
    }

    async DetalheRecebimento(req, res) {
        try {
            const recebimento = new Servico.RECEBIMENTOGATO(Constantes.UrlRota.RECEBIMENTO_GATO);
            const { id_recebimento } = req.query;
            await recebimento.buscarPorId(id_recebimento);
            res.status(Constantes.CodigoHTTP.SUCESSO).json(JSON.parse(recebimento.Json()));
        } catch (erro) {
            const codeHttp = erro?.codeHttp ?? Constantes.CodigoHTTP.ERRO_INTERNO_SERVIDOR;
            const falha = new FalhaService(Constantes.UrlRota.RECEBIMENTO_GATO, erro.message);
            res.status(codeHttp).json(JSON.parse(falha.Json()));
        }
    }

    async AtualizarRecebimento(req, res) {
        try {
            const recebimento = new Servico.RECEBIMENTOGATO(Constantes.UrlRota.RECEBIMENTO_GATO);
            const { id_recebimento, ...dados } = req.body;
            const dadosGato = req.body.dadosGato || null;
            await recebimento.atualizarRecebimento(id_recebimento, dados, dadosGato);
            res.status(Constantes.CodigoHTTP.SUCESSO).json(JSON.parse(recebimento.Json()));
        } catch (erro) {
            const codeHttp = erro?.codeHttp ?? Constantes.CodigoHTTP.ERRO_INTERNO_SERVIDOR;
            const falha = new FalhaService(Constantes.UrlRota.RECEBIMENTO_GATO, erro.message);
            res.status(codeHttp).json(JSON.parse(falha.Json()));
        }
    }

    async DeletarRecebimento(req, res) {
        try {
            const recebimento = new Servico.RECEBIMENTOGATO(Constantes.UrlRota.RECEBIMENTO_GATO);
            const { id_recebimento } = req.body;
            await recebimento.removerRecebimento(id_recebimento);
            res.status(Constantes.CodigoHTTP.SUCESSO).json(JSON.parse(recebimento.Json()));
        } catch (erro) {
            const codeHttp = erro?.codeHttp ?? Constantes.CodigoHTTP.ERRO_INTERNO_SERVIDOR;
            const falha = new FalhaService(Constantes.UrlRota.RECEBIMENTO_GATO, erro.message);
            res.status(codeHttp).json(JSON.parse(falha.Json()));
        }
    }
}

export default RecebimentoGatoController;