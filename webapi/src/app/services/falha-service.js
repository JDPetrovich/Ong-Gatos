export default class FalhaService {
    #representacao;

    constructor(rota, mensagem) {
        this.#representacao = { content: mensagem, rota: rota };
    }

    Json() {
        return JSON.stringify(this.#representacao);
    }
}