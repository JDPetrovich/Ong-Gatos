import express from 'express'
import Rota from './routes/rotas'
import Constantes from './constants/constantes';

class Servidor {
    static #portaPadrao = 0
    #porta;
    #appExpress;

    constructor() {
        this.#porta = process.env.PORTA_SERVIDOR || Servidor.#portaPadrao;
        this.#appExpress = express()
        this.#appExpress.use(express.json())
        this.#AdicionarRedirecionamentos()
        this.#AdicionarRotas()
    }

    #AdicionarRedirecionamentos() {
        this.#appExpress.use(
            Constantes.UrlRota.RAIZ,
            new Rota.REDIRECIONAMENTO().GetRedirecionamentos()
        )
    }

    #AdicionarRotas() {
        this.#appExpress.use(
            Constantes.UrlRota.API,
            new Rota.INICIAL().GetRotas()
        );
        this.#appExpress.use(
            Constantes.UrlRota.API,
            new Rota.USUARIO().GetRotas()
        );
        this.#appExpress.use(
            Constantes.UrlRota.API,
            new Rota.GATO().GetRotas()
        );
          this.#appExpress.use(
            Constantes.UrlRota.API,
            new Rota.RECEBIMENTO().GetRotas()
        );
    }

    Rodar() {
        this.#appExpress.listen(this.#porta, () => {
            console.log(`O servidor está rodando na URI http://localhost:${this.#porta}`);
        });
    }

}

export default Servidor