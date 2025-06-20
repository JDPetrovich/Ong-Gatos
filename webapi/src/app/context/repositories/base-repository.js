import prisma from "../../helpes/prisma.js"

export default class BaseRepository {
    get db() {
        return prisma
    }

    async executarTransacao(transacaoFn) {
        return await prisma.$transaction(async (tx) => {
            return await transacaoFn(tx)
        })
    }

    static async desconectar() {
        await prisma.$disconnect()
    }
}