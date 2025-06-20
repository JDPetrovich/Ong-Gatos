import { Router } from "express";
import Constantes from "../constants/constantes.js";
import InicialController from "../controllers/inicial-controller.js";

class RotaInicial {
    #router;

    constructor() {
        this.#router = Router();
        this.#CriaRotas();
    }

    #CriaRotas() {
        this.#router.get(
            Constantes.UrlRota.RAIZ,
            new InicialController().RetornaPaginaInicialAPI
        );

        this.#router.get(
            Constantes.UrlRota.HEALTH_CHECK,
            new InicialController().RetornaHealthCheckAPI
        );
    }

    GetRotas() {
        return this.#router;
    }
}

export default RotaInicial;
