-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'PERITO', 'ASSISTENTE');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Case" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "dataAbertura" TIMESTAMP(3) NOT NULL,
    "dataFechamento" TIMESTAMP(3),
    "gerenteId" TEXT NOT NULL,

    CONSTRAINT "Case_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Evidence" (
    "id" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "dataColeta" TIMESTAMP(3) NOT NULL,
    "coletadoPorId" TEXT NOT NULL,
    "casoId" TEXT NOT NULL,

    CONSTRAINT "Evidence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ImageEvidence" (
    "id" TEXT NOT NULL,
    "imagemURL" TEXT NOT NULL,

    CONSTRAINT "ImageEvidence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TextEvidence" (
    "id" TEXT NOT NULL,
    "conteudo" TEXT NOT NULL,

    CONSTRAINT "TextEvidence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ComparisonResult" (
    "id" TEXT NOT NULL,
    "resultado" TEXT NOT NULL,
    "precisao" DOUBLE PRECISION NOT NULL,
    "dataAnalise" TIMESTAMP(3) NOT NULL,
    "analisadoPorId" TEXT NOT NULL,
    "evidenceId" TEXT NOT NULL,

    CONSTRAINT "ComparisonResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Report" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "conteudo" TEXT NOT NULL,
    "peritoResponsavelId" TEXT NOT NULL,
    "dataCriacao" TIMESTAMP(3) NOT NULL,
    "casoId" TEXT NOT NULL,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ComparisonResult_evidenceId_key" ON "ComparisonResult"("evidenceId");

-- AddForeignKey
ALTER TABLE "Case" ADD CONSTRAINT "Case_gerenteId_fkey" FOREIGN KEY ("gerenteId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evidence" ADD CONSTRAINT "Evidence_coletadoPorId_fkey" FOREIGN KEY ("coletadoPorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evidence" ADD CONSTRAINT "Evidence_casoId_fkey" FOREIGN KEY ("casoId") REFERENCES "Case"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImageEvidence" ADD CONSTRAINT "ImageEvidence_id_fkey" FOREIGN KEY ("id") REFERENCES "Evidence"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TextEvidence" ADD CONSTRAINT "TextEvidence_id_fkey" FOREIGN KEY ("id") REFERENCES "Evidence"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComparisonResult" ADD CONSTRAINT "ComparisonResult_analisadoPorId_fkey" FOREIGN KEY ("analisadoPorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComparisonResult" ADD CONSTRAINT "ComparisonResult_evidenceId_fkey" FOREIGN KEY ("evidenceId") REFERENCES "Evidence"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_peritoResponsavelId_fkey" FOREIGN KEY ("peritoResponsavelId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_casoId_fkey" FOREIGN KEY ("casoId") REFERENCES "Case"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
