/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Usuario" (
    "id_usuario" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "cfp" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "endereco" JSONB NOT NULL,
    "senha" TEXT NOT NULL,
    "conta_confirmada" BOOLEAN NOT NULL,
    "data_cadastro" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "AvaliacaoUsuario" (
    "id_avaliacao" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_usuario" INTEGER NOT NULL,
    "nota" INTEGER NOT NULL,
    "comentario" TEXT NOT NULL,
    "data_avaliacao" DATETIME NOT NULL,
    CONSTRAINT "AvaliacaoUsuario_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario" ("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Gato" (
    "id_gato" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "idade" INTEGER NOT NULL,
    "sexo" TEXT NOT NULL,
    "cor" TEXT NOT NULL,
    "raca" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "fotos" JSONB NOT NULL,
    "sociavel" BOOLEAN NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'DISPONIVEL',
    "data_casdastro" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "VacinaVermifugo" (
    "id_vv" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_gato" INTEGER NOT NULL,
    "tipo" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "data_aplicacao" DATETIME NOT NULL,
    "validade" DATETIME NOT NULL,
    "observacoes" TEXT NOT NULL,
    CONSTRAINT "VacinaVermifugo_id_gato_fkey" FOREIGN KEY ("id_gato") REFERENCES "Gato" ("id_gato") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Solicitacao" (
    "id_solicitacao" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_usuario" INTEGER NOT NULL,
    "id_gato" INTEGER NOT NULL,
    "tipo" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PEDENTE',
    "data_solicitacao" DATETIME NOT NULL,
    "data_resposta" DATETIME NOT NULL,
    CONSTRAINT "Solicitacao_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario" ("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Solicitacao_id_gato_fkey" FOREIGN KEY ("id_gato") REFERENCES "Gato" ("id_gato") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TermoDisponibilidade" (
    "id_termo" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_usuario" INTEGER NOT NULL,
    "id_gato" INTEGER NOT NULL,
    "tipo" TEXT NOT NULL,
    "data_assinatura" DATETIME NOT NULL,
    CONSTRAINT "TermoDisponibilidade_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario" ("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TermoDisponibilidade_id_gato_fkey" FOREIGN KEY ("id_gato") REFERENCES "Gato" ("id_gato") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "FeedbackLarTemporario" (
    "id_feedback" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_solicitacao" INTEGER NOT NULL,
    "descricao" TEXT NOT NULL,
    "fotos" JSONB NOT NULL,
    "data_feedback" DATETIME NOT NULL,
    CONSTRAINT "FeedbackLarTemporario_id_solicitacao_fkey" FOREIGN KEY ("id_solicitacao") REFERENCES "Solicitacao" ("id_solicitacao") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "FormularioAdocao" (
    "id_formulario" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_usuario" INTEGER NOT NULL,
    "id_gato" INTEGER NOT NULL,
    "respostas" JSONB NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PEDENTE',
    "data_envio" DATETIME NOT NULL,
    "data_avaliacao" DATETIME,
    "observacoes_admin" TEXT NOT NULL,
    CONSTRAINT "FormularioAdocao_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario" ("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "FormularioAdocao_id_gato_fkey" FOREIGN KEY ("id_gato") REFERENCES "Gato" ("id_gato") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "FeedbackLarTemporario_id_solicitacao_key" ON "FeedbackLarTemporario"("id_solicitacao");
