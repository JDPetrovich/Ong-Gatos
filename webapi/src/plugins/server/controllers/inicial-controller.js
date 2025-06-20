import Servico from "../../../app/services/servicos.js";
import Constantes from '../constants/constantes.js';

class InicialController {

    /**
     * Responde a solicitação com a página inicial
     * @param {import('express').Request} req - Objeto Requisição.
     * @param {import('express').Response} res - Objeto Resposta.
     */
    RetornaPaginaInicialAPI(req, res) {
        const objetoResposta = new Servico.INICIAL(Constantes.UrlRota.API);
        res.json(objetoResposta);
    };

    RetornaHealthCheckAPI(req, res) {
        const objetoResposta = new Servico.HEALTH_CHECK(Constantes.UrlRota.API);
        res.json(objetoResposta);
    };
}

export default InicialController;