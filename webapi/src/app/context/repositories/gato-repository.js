import BaseRepository from './base-repository.js';

export default class GatoRepository extends BaseRepository {
    async criarGato(dados, tx = this.db) {
        return await tx.gato.create({ data: dados });
    }

    async listarGatos(filtro = {}, tx = this.db) {
        return tx.gato.findMany({
            where: filtro,
            orderBy: { id_gato: 'asc' }
        });
    }

    async buscarPorId(id_gato, tx = this.db) {
        return await tx.gato.findUnique({ where: { id_gato: Number(id_gato) } });
    }

    async atualizarGato(id_gato, dados, tx = this.db) {
        return await tx.gato.update({
            where: { id_gato: Number(id_gato) },
            data: dados
        });
    }

    async removerGato(id_gato, tx = this.db) {
        return await tx.gato.delete({ where: { id_gato: Number(id_gato) } });
    }
}