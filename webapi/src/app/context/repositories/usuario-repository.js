import BaseRepository from './base-repository.js';

export default class UsuarioRepository extends BaseRepository {
    async criarUsuario(dados, tx = this.db) {
        return await tx.usuario.create({ data: dados });
    }

    async buscarPorId(id_usuario, tx = this.db) {
        return await tx.usuario.findUnique({ where: { id_usuario } });
    }

    async buscarPorEmail(email, tx = this.db) {
        return await tx.usuario.findFirst({ where: { email } });
    }

    async buscarPorEmailOuCpf(email, cfp, tx = this.db) {
        return await tx.usuario.findFirst({
            where: {
                OR: [
                    { email: email },
                    { cfp: cfp }
                ]
            }
        });
    }

    async buscarUsuarios(tx = this.db) {
        return await tx.usuario.findMany({ where: { tipo: 'USUARIO' } });
    }

    async atualizarUsuario(id, dados, tx = this.db) {
        return await tx.usuario.update({
            where: { id_usuario: id },
            data: dados
        });
    }

    async removerUsuario(id, tx = this.db) {
        return await tx.usuario.delete({ where: { id_usuario: id } });
    }

    async salvarCodigo(dados, tx = this.db) {
        return await tx.recuperacaosenha.create({ data: dados });
    }

    async validarCodigo({ email, codigo }, tx = this.db) {
        const result = await tx.recuperacaosenha.findFirst({
            where: {
                email,
                codigo,
                expira_em: { gte: new Date() },
                usado: false
            },
            orderBy: { criado_em: 'desc' }
        });
        return !!result;
    }

    async invalidarCodigo({ email, codigo }, tx = this.db) {
        await tx.recuperacaosenha.updateMany({
            where: { email, codigo, usado: false },
            data: { usado: true }
        });
    }
}