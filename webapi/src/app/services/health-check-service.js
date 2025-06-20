import Constantes from '../../plugins/server/constants/constantes.js';

export class HealthCheckService {
    #dadosWebApi;
    #dadosBD;
    #dadosExternalApi;
    #urlRecurso;

    constructor(urlRecurso) {
        this.#dadosWebApi = {
            content: "Template Web API NodeJs - HEALTH CHECK!",
            status: Constantes.HealthStatus.UP,
            timestamp: Date.now()
        };
        this.#dadosBD = {
            status: Constantes.HealthStatus.NO,
            latencyMs: -1
        };
        this.#dadosExternalApi = {
            status: Constantes.HealthStatus.NO,
            latencyMs: -1
        };
        this.#urlRecurso = urlRecurso;
    }

    toJSON() {
        return {
            ...this.#dadosWebApi,
            database: this.#dadosBD,
            externalapi: this.#dadosExternalApi
        };
    }
}