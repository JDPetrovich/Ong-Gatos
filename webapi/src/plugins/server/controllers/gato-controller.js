import Servico from "../../../app/services/servicos.js";
import Constantes from '../constants/constantes.js';
import FalhaService from "../../../app/services/falha-service.js";

class GatoController {

    async CriaGato(req, res) {
        try {
            const gato = new Servico.GATO(Constantes.UrlRota.GATO);
            await gato.cadastrarGato(req.body);
            res.status(Constantes.CodigoHTTP.CRIADO).json(JSON.parse(gato.Json()));
        } catch (erro) {
            const codeHttp = erro?.codeHttp ?? Constantes.CodigoHTTP.ERRO_INTERNO_SERVIDOR;
            const falha = new FalhaService(Constantes.UrlRota.GATO, erro.message);
            res.status(codeHttp).json(JSON.parse(falha.Json()));
        }
    }

    async ConsultaGatos(req, res) {
        try {
            const gato = new Servico.GATO(Constantes.UrlRota.GATOS);
            await gato.listarGatos("DISPONIVEL");
            res.status(Constantes.CodigoHTTP.SUCESSO).json(JSON.parse(gato.Json()));
        } catch (erro) {
            const codeHttp = erro?.codeHttp ?? Constantes.CodigoHTTP.ERRO_INTERNO_SERVIDOR;
            const falha = new FalhaService(Constantes.UrlRota.GATOS, erro.message);
            res.status(codeHttp).json(JSON.parse(falha.Json()));
        }
    }

    async ConsultaGatosAdmin(req, res) {
        try {
            const gato = new Servico.GATO(Constantes.UrlRota.GATOS_ADMIN);
            await gato.listarGatos();
            res.status(Constantes.CodigoHTTP.SUCESSO).json(JSON.parse(gato.Json()));
        } catch (erro) {
            const codeHttp = erro?.codeHttp ?? Constantes.CodigoHTTP.ERRO_INTERNO_SERVIDOR;
            const falha = new FalhaService(Constantes.UrlRota.GATOS_ADMIN, erro.message);
            res.status(codeHttp).json(JSON.parse(falha.Json()));
        }
    }

    async DetalheGato(req, res) {
        try {
            const gato = new Servico.GATO(Constantes.UrlRota.GATO);
            const { id_gato } = req.query;
            await gato.buscarPorId(id_gato);
            res.status(Constantes.CodigoHTTP.SUCESSO).json(JSON.parse(gato.Json()));
        } catch (erro) {
            const codeHttp = erro?.codeHttp ?? Constantes.CodigoHTTP.ERRO_INTERNO_SERVIDOR;
            const falha = new FalhaService(Constantes.UrlRota.GATO, erro.message);
            res.status(codeHttp).json(JSON.parse(falha.Json()));
        }
    }

    async AtualizarGato(req, res) {
        try {
            const gato = new Servico.GATO(Constantes.UrlRota.GATO);
            const { id_gato, ...dados } = req.body;
            await gato.atualizarGato(id_gato, dados);
            res.status(Constantes.CodigoHTTP.SUCESSO).json(JSON.parse(gato.Json()));
        } catch (erro) {
            const codeHttp = erro?.codeHttp ?? Constantes.CodigoHTTP.ERRO_INTERNO_SERVIDOR;
            const falha = new FalhaService(Constantes.UrlRota.GATO, erro.message);
            res.status(codeHttp).json(JSON.parse(falha.Json()));
        }
    }

    async DeletarGato(req, res) {
        try {
            const gato = new Servico.GATO(Constantes.UrlRota.GATO);
            const { id_gato } = req.body;
            await gato.removerGato(id_gato);
            res.status(Constantes.CodigoHTTP.SUCESSO).json(JSON.parse(gato.Json()));
        } catch (erro) {
            const codeHttp = erro?.codeHttp ?? Constantes.CodigoHTTP.ERRO_INTERNO_SERVIDOR;
            const falha = new FalhaService(Constantes.UrlRota.GATO, erro.message);
            res.status(codeHttp).json(JSON.parse(falha.Json()));
        }
    }
}

export default GatoController;