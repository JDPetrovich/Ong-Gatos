-- CreateTable
CREATE TABLE "Recuperacaosenha" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "expira_em" DATETIME NOT NULL,
    "usado" BOOLEAN NOT NULL DEFAULT false,
    "criado_em" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
