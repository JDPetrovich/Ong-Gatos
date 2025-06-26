import { Router } from "express";
import Constantes from "../constants/constantes.js";
import GatoController from "../controllers/gato-controller.js";
import { autenticarAdmin } from "../../../app/helpes/autenticacao.js";

class RotaGato {
    #router;

    constructor() {
        this.#router = Router();
        this.#CriaRotas();
    }

    #CriaRotas() {
        this.#router.get(
            Constantes.UrlRota.GATOS,
            new GatoController().ConsultaGatos
        );

        this.#router.get(
            Constantes.UrlRota.GATOS_ADMIN,
            autenticarAdmin,
            new GatoController().ConsultaGatosAdmin
        );

        this.#router.get(
            Constantes.UrlRota.GATO,
            new GatoController().DetalheGato
        );

        this.#router.post(
            Constantes.UrlRota.GATO,
            autenticarAdmin,
            new GatoController().CriaGato
        );

        this.#router.put(
            Constantes.UrlRota.GATO,
            autenticarAdmin,
            new GatoController().AtualizarGato
        );

        this.#router.delete(
            Constantes.UrlRota.GATO,
            autenticarAdmin,
            new GatoController().DeletarGato
        );
    }

    GetRotas() {
        return this.#router;
    }
}

export default RotaGato;