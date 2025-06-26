/*
  Warnings:

  - You are about to drop the `VacinaVermifugo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "VacinaVermifugo";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "RecebimentoGato" (
    "id_recebimento" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome_responsavel" TEXT NOT NULL,
    "cpf_responsavel" TEXT NOT NULL,
    "contato_responsavel" TEXT NOT NULL,
    "origem" TEXT NOT NULL,
    "data_recebimento" DATETIME NOT NULL,
    "observacoes" TEXT,
    "fotos" JSONB,
    "status" TEXT NOT NULL DEFAULT 'RECEBIDO',
    "id_gato" INTEGER,
    CONSTRAINT "RecebimentoGato_id_gato_fkey" FOREIGN KEY ("id_gato") REFERENCES "Gato" ("id_gato") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Vacina" (
    "id_vacina" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "preco" REAL
);

-- CreateTable
CREATE TABLE "AplicacaoVacina" (
    "id_aplicacao" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_gato" INTEGER NOT NULL,
    "id_vacina" INTEGER NOT NULL,
    "data_aplicacao" DATETIME NOT NULL,
    "validade" DATETIME NOT NULL,
    "proxima_dose" DATETIME,
    "observacoes" TEXT,
    CONSTRAINT "AplicacaoVacina_id_gato_fkey" FOREIGN KEY ("id_gato") REFERENCES "Gato" ("id_gato") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "AplicacaoVacina_id_vacina_fkey" FOREIGN KEY ("id_vacina") REFERENCES "Vacina" ("id_vacina") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Castracao" (
    "id_castracao" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_gato" INTEGER NOT NULL,
    "data_castracao" DATETIME NOT NULL,
    "local" TEXT,
    "responsavel" TEXT,
    "observacoes" TEXT,
    CONSTRAINT "Castracao_id_gato_fkey" FOREIGN KEY ("id_gato") REFERENCES "Gato" ("id_gato") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FormularioAdocao" (
    "id_formulario" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_usuario" INTEGER NOT NULL,
    "id_gato" INTEGER NOT NULL,
    "respostas" JSONB NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDENTE',
    "data_envio" DATETIME NOT NULL,
    "data_avaliacao" DATETIME,
    "observacoes_admin" TEXT NOT NULL,
    CONSTRAINT "FormularioAdocao_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario" ("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "FormularioAdocao_id_gato_fkey" FOREIGN KEY ("id_gato") REFERENCES "Gato" ("id_gato") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_FormularioAdocao" ("data_avaliacao", "data_envio", "id_formulario", "id_gato", "id_usuario", "observacoes_admin", "respostas", "status") SELECT "data_avaliacao", "data_envio", "id_formulario", "id_gato", "id_usuario", "observacoes_admin", "respostas", "status" FROM "FormularioAdocao";
DROP TABLE "FormularioAdocao";
ALTER TABLE "new_FormularioAdocao" RENAME TO "FormularioAdocao";
CREATE TABLE "new_Gato" (
    "id_gato" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "idade" INTEGER NOT NULL,
    "sexo" TEXT NOT NULL,
    "cor" TEXT NOT NULL,
    "raca" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "fotos" JSONB NOT NULL,
    "sociavel" BOOLEAN NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'INDISPONIVEL',
    "data_casdastro" DATETIME NOT NULL
);
INSERT INTO "new_Gato" ("cor", "data_casdastro", "descricao", "fotos", "id_gato", "idade", "nome", "raca", "sexo", "sociavel", "status") SELECT "cor", "data_casdastro", "descricao", "fotos", "id_gato", "idade", "nome", "raca", "sexo", "sociavel", "status" FROM "Gato";
DROP TABLE "Gato";
ALTER TABLE "new_Gato" RENAME TO "Gato";
CREATE TABLE "new_Solicitacao" (
    "id_solicitacao" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_usuario" INTEGER NOT NULL,
    "id_gato" INTEGER NOT NULL,
    "tipo" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDENTE',
    "data_solicitacao" DATETIME NOT NULL,
    "data_resposta" DATETIME NOT NULL,
    CONSTRAINT "Solicitacao_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario" ("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Solicitacao_id_gato_fkey" FOREIGN KEY ("id_gato") REFERENCES "Gato" ("id_gato") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Solicitacao" ("data_resposta", "data_solicitacao", "id_gato", "id_solicitacao", "id_usuario", "status", "tipo") SELECT "data_resposta", "data_solicitacao", "id_gato", "id_solicitacao", "id_usuario", "status", "tipo" FROM "Solicitacao";
DROP TABLE "Solicitacao";
ALTER TABLE "new_Solicitacao" RENAME TO "Solicitacao";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Vacina_nome_key" ON "Vacina"("nome");
