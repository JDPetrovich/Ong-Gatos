import { Router } from "express";
import Constantes from "../constants/constantes.js";
import { autenticarAdmin } from "../../../app/helpes/autenticacao.js";
import RecebimentoGatoController from "../controllers/recebimento-gato-controller.js";

class RotaRecebimentoGato {
    #router;

    constructor() {
        this.#router = Router();
        this.#CriaRotas();
    }

    #CriaRotas() {
        this.#router.get(
            Constantes.UrlRota.RECEBIMENTO_GATOS,
            autenticarAdmin,
            new RecebimentoGatoController().ListarRecebimentos
        );

        this.#router.get(
            Constantes.UrlRota.RECEBIMENTO_GATO,
            autenticarAdmin,
            new RecebimentoGatoController().DetalheRecebimento
        );

        this.#router.post(
            Constantes.UrlRota.RECEBIMENTO_GATO,
            autenticarAdmin,
            new RecebimentoGatoController().CriarRecebimento
        );

        this.#router.put(
            Constantes.UrlRota.RECEBIMENTO_GATO,
            autenticarAdmin,
            new RecebimentoGatoController().AtualizarRecebimento
        );

        this.#router.delete(
            Constantes.UrlRota.RECEBIMENTO_GATO,
            autenticarAdmin,
            new RecebimentoGatoController().DeletarRecebimento
        );
    }

    GetRotas() {
        return this.#router;
    }
}

export default RotaRecebimentoGato;