import BaseRepository from './base-repository.js';

export default class RecebimentoRepository extends BaseRepository {
    async criarRecebimento(dados, tx = this.db) {
        return await tx.recebimentoGato.create({ data: dados });
    }

    async listarRecebimentos(filtro = {}, tx = this.db) {
        return tx.recebimentoGato.findMany({
            where: filtro,
            orderBy: { id_recebimento: 'asc' }
        });
    }

    async buscarPorId(id_recebimento, tx = this.db) {
        return await tx.recebimentoGato.findUnique({ where: { id_recebimento: Number(id_recebimento) } });
    }

    async atualizarRecebimento(id_recebimento, dados, tx = this.db) {
        return await tx.recebimentoGato.update({
            where: { id_recebimento: Number(id_recebimento) },
            data: dados
        });
    }

    async removerRecebimento(id_recebimento, tx = this.db) {
        return await tx.recebimentoGato.delete({ where: { id_recebimento: Number(id_recebimento) } });
    }
}