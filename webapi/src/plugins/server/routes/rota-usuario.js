import { Router } from "express";
import Constantes from "../constants/constantes.js";
import UsuarioController from "../controllers/usuario-controller.js";

class RotaUsuario {
    #router;

    constructor() {
        this.#router = Router();
        this.#CriaRotas();
    }

    #CriaRotas() {
        this.#router.get(
            Constantes.UrlRota.USUARIO,
            new UsuarioController().ConsultaUsuarios
        );

        this.#router.post(
            Constantes.UrlRota.USUARIO,
            new UsuarioController().IncluiUsuario
        );

        this.#router.post(
            Constantes.UrlRota.ADMIN,
            new UsuarioController().IncluiAdmin
        );

        this.#router.post(
            Constantes.UrlRota.LOGIN_ADMIN,
            new UsuarioController().LoginAdmin
        );

        this.#router.post(
            Constantes.UrlRota.RECUPERAR_SENHA,
            new UsuarioController().RecuperarSenha
        );

        this.#router.post(
            Constantes.UrlRota.REDEFINIR_SENHA,
            new UsuarioController().RedefinirSenha
        );

        this.#router.put(
            Constantes.UrlRota.ADMIN,
            new UsuarioController().AtualizaAdmin
        );

        this.#router.delete(
            Constantes.UrlRota.USUARIO,
            new UsuarioController().RemoveUsuario
        );
    }

    GetRotas() {
        return this.#router;
    }
}

export default RotaUsuario;