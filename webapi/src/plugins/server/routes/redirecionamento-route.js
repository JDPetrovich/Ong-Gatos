import { Router } from "express";
import Constantes from "../constants/constantes.js";

class Redirecionamento {
    #router;

    constructor() {
        this.#router = Router();
        this.#CriaRedirecionamentos();
    }

    #CriaRedirecionamentos() {
        this.#router.get(
            Constantes.UrlRota.RAIZ, 
            (req, res) => {
                res.redirect(
                    Constantes.CodigoHTTP.MOVIDO_PERMANENTEMENTE,
                    Constantes.UrlRota.API
                );
        });
    }

    GetRedirecionamentos() {
        return this.#router;
    }
}

export default Redirecionamento;