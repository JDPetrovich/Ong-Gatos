import { UsuarioRepo } from '../context/repositories/repositorios.js';

export async function autenticarAdmin(req, res, next) {
    try {
        const id_usuario = req.query.id_usuario;
        if (!id_usuario) {
            return res.status(401).json({ erro: "ID do usuário não informado na query" });
        }

        const repo = new UsuarioRepo();
        const usuario = await repo.buscarPorId(Number(id_usuario));

        if (!usuario || usuario.tipo !== 'ADMIN') {
            return res.status(403).json({ erro: "Acesso restrito a administradores" });
        }

        req.usuario = usuario;
        next();
    } catch (e) {
        return res.status(500).json({ erro: "Erro ao autenticar usuário administrador" });
    }
}