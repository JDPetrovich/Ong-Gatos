export default class ModeloInterface {
    constructor() {
        if (new.target === ModeloInterface) {
            throw new Error("Essa classe não deve ser instânciada. É uma interface apenas!");
        }
    }

    async Popula() {
        throw new Error("O método 'Popula()' deve ser implementado.");
    }
}