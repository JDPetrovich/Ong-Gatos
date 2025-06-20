-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Usuario" (
    "id_usuario" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT,
    "tipo" TEXT NOT NULL DEFAULT 'USUARIO',
    "cfp" TEXT,
    "telefone" TEXT,
    "endereco" JSONB,
    "conta_confirmada" BOOLEAN NOT NULL,
    "data_cadastro" DATETIME NOT NULL
);
INSERT INTO "new_Usuario" ("cfp", "conta_confirmada", "data_cadastro", "email", "endereco", "id_usuario", "nome", "senha", "telefone") SELECT "cfp", "conta_confirmada", "data_cadastro", "email", "endereco", "id_usuario", "nome", "senha", "telefone" FROM "Usuario";
DROP TABLE "Usuario";
ALTER TABLE "new_Usuario" RENAME TO "Usuario";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
