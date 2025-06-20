import Servico from "../../../app/services/servicos.js";
import Constantes from '../constants/constantes.js';
import FalhaService from "../../../app/services/falha-service.js";

class UsuarioController {

    async IncluiUsuario(req, res) {
        try {
            const usuario = new Servico.USUARIO(Constantes.UrlRota.USUARIO);
            await usuario.cadastrarOuAtualizarUsuario(req.body);
            res.status(Constantes.CodigoHTTP.CRIADO).json(JSON.parse(usuario.Json()));
        } catch (erro) {
            const codeHttp = erro?.codeHttp ?? Constantes.CodigoHTTP.ERRO_INTERNO_SERVIDOR;
            const falha = new FalhaService(Constantes.UrlRota.USUARIO, erro.message);
            res.status(codeHttp).json(JSON.parse(falha.Json()));
        }
    }

    async IncluiAdmin(req, res) {
        try {
            const usuario = new Servico.USUARIO(Constantes.UrlRota.USUARIO);
            await usuario.cadastrarAdmin(req.body);
            res.status(Constantes.CodigoHTTP.CRIADO).json(JSON.parse(usuario.Json()));
        } catch (erro) {
            const codeHttp = erro?.codeHttp ?? Constantes.CodigoHTTP.ERRO_INTERNO_SERVIDOR;
            const falha = new FalhaService(Constantes.UrlRota.USUARIO, erro.message);
            res.status(codeHttp).json(JSON.parse(falha.Json()));
        }
    }

    async LoginAdmin(req, res) {
        try {
            const usuario = new Servico.USUARIO(Constantes.UrlRota.LOGIN_ADMIN);
            await usuario.loginAdmin(req.body);
            res.status(Constantes.CodigoHTTP.SUCESSO).json(JSON.parse(usuario.Json()));
        } catch (erro) {
            const codeHttp = erro?.codeHttp ?? Constantes.CodigoHTTP.ERRO_INTERNO_SERVIDOR;
            const falha = new FalhaService(Constantes.UrlRota.LOGIN_ADMIN, erro.message);
            res.status(codeHttp).json(JSON.parse(falha.Json()));
        }
    }

    async ConsultaUsuarios(req, res) {
        try {
            const usuario = new Servico.USUARIO(Constantes.UrlRota.USUARIO);
            await usuario.buscarUsuarios();
            res.status(Constantes.CodigoHTTP.SUCESSO).json(JSON.parse(usuario.Json()));
        } catch (erro) {
            const codeHttp = erro?.codeHttp ?? Constantes.CodigoHTTP.ERRO_INTERNO_SERVIDOR;
            const falha = new FalhaService(Constantes.UrlRota.USUARIO, erro.message);
            res.status(codeHttp).json(JSON.parse(falha.Json()));
        }
    }

    async AtualizaAdmin(req, res) {
        try {
            const usuario = new Servico.USUARIO(Constantes.UrlRota.ADMIN);
            const { id } = req.body;
            await usuario.atualizarAdmin(id, req.body);
            res.status(Constantes.CodigoHTTP.SUCESSO).json(JSON.parse(usuario.Json()));
        } catch (erro) {
            const codeHttp = erro?.codeHttp ?? Constantes.CodigoHTTP.ERRO_INTERNO_SERVIDOR;
            const falha = new FalhaService(Constantes.UrlRota.ADMIN, erro.message);
            res.status(codeHttp).json(JSON.parse(falha.Json()));
        }
    }

    async RemoveUsuario(req, res) {
        try {
            const usuario = new Servico.USUARIO(Constantes.UrlRota.USUARIO);
            const { id } = req.body;
            await usuario.removerUsuario(id);
            res.status(Constantes.CodigoHTTP.SUCESSO).json(JSON.parse(usuario.Json()));
        } catch (erro) {
            const codeHttp = erro?.codeHttp ?? Constantes.CodigoHTTP.ERRO_INTERNO_SERVIDOR;
            const falha = new FalhaService(Constantes.UrlRota.USUARIO, erro.message);
            res.status(codeHttp).json(JSON.parse(falha.Json()));
        }
    }

    async RecuperarSenha(req, res) {
        try {
            const usuario = new Servico.USUARIO(Constantes.UrlRota.RECUPERAR_SENHA)
            const { email } = req.body;
            await usuario.enviarCodigo(email, req.body)
            res.status(Constantes.CodigoHTTP.SUCESSO).json(JSON.parse(usuario.Json()));
        } catch (erro) {
            const codeHttp = erro?.codeHttp ?? Constantes.CodigoHTTP.ERRO_INTERNO_SERVIDOR;
            const falha = new FalhaService(Constantes.UrlRota.RECUPERAR_SENHA, erro.message);
            res.status(codeHttp).json(JSON.parse(falha.Json()));
        }
    }

    async RedefinirSenha(req, res) {
        try {
            const usuario = new Servico.USUARIO(Constantes.UrlRota.REDEFINIR_SENHA);
            await usuario.validarCodigo(req.body);
            res.status(Constantes.CodigoHTTP.SUCESSO).json(JSON.parse(usuario.Json()));
        } catch (erro) {
            const codeHttp = erro?.codeHttp ?? Constantes.CodigoHTTP.ERRO_INTERNO_SERVIDOR;
            const falha = new FalhaService(Constantes.UrlRota.REDEFINIR_SENHA, erro.message);
            res.status(codeHttp).json(JSON.parse(falha.Json()));
        }
    }
}

export default UsuarioController;