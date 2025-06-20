import Constantes from "../server/constants/constantes.js";

export class ErroRequisicao extends Error {
    constructor(mensagem) {
        super(mensagem);
        this.codeHttp = Constantes.CodigoHTTP.REQUISICAO_RUIM;
    }
}
  