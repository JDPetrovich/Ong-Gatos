export class InicialService {
    #representacao;
    #urlRecurso;

    constructor(urlRecurso) {
        this.#representacao = {
            content: "Bem-vindo a Web API - Template Web API NodeJs"
        };
        this.#urlRecurso = urlRecurso;
    }

    toJSON() {
        return this.#representacao;
    }
}