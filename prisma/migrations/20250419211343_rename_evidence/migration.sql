/*
  Warnings:

  - You are about to drop the column `dataAbertura` on the `Case` table. All the data in the column will be lost.
  - You are about to drop the column `dataFechamento` on the `Case` table. All the data in the column will be lost.
  - You are about to drop the column `descricao` on the `Case` table. All the data in the column will be lost.
  - You are about to drop the column `gerenteId` on the `Case` table. All the data in the column will be lost.
  - You are about to drop the column `titulo` on the `Case` table. All the data in the column will be lost.
  - You are about to drop the column `analisadoPorId` on the `ComparisonResult` table. All the data in the column will be lost.
  - You are about to drop the column `dataAnalise` on the `ComparisonResult` table. All the data in the column will be lost.
  - You are about to drop the column `precisao` on the `ComparisonResult` table. All the data in the column will be lost.
  - You are about to drop the column `resultado` on the `ComparisonResult` table. All the data in the column will be lost.
  - You are about to drop the column `casoId` on the `Evidence` table. All the data in the column will be lost.
  - You are about to drop the column `coletadoPorId` on the `Evidence` table. All the data in the column will be lost.
  - You are about to drop the column `dataColeta` on the `Evidence` table. All the data in the column will be lost.
  - You are about to drop the column `tipo` on the `Evidence` table. All the data in the column will be lost.
  - You are about to drop the column `imagemURL` on the `ImageEvidence` table. All the data in the column will be lost.
  - You are about to drop the column `casoId` on the `Report` table. All the data in the column will be lost.
  - You are about to drop the column `conteudo` on the `Report` table. All the data in the column will be lost.
  - You are about to drop the column `dataCriacao` on the `Report` table. All the data in the column will be lost.
  - You are about to drop the column `peritoResponsavelId` on the `Report` table. All the data in the column will be lost.
  - You are about to drop the column `titulo` on the `Report` table. All the data in the column will be lost.
  - You are about to drop the column `conteudo` on the `TextEvidence` table. All the data in the column will be lost.
  - You are about to drop the column `nome` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `senha` on the `User` table. All the data in the column will be lost.
  - Added the required column `classification` to the `Case` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Case` table without a default value. This is not possible if the table is not empty.
  - Added the required column `managerId` to the `Case` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Case` table without a default value. This is not possible if the table is not empty.
  - Added the required column `analyzedById` to the `ComparisonResult` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateAnalysis` to the `ComparisonResult` table without a default value. This is not possible if the table is not empty.
  - Added the required column `precision` to the `ComparisonResult` table without a default value. This is not possible if the table is not empty.
  - Added the required column `result` to the `ComparisonResult` table without a default value. This is not possible if the table is not empty.
  - Added the required column `caseId` to the `Evidence` table without a default value. This is not possible if the table is not empty.
  - Added the required column `collectedById` to the `Evidence` table without a default value. This is not possible if the table is not empty.
  - Added the required column `datecollection` to the `Evidence` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Evidence` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageURL` to the `ImageEvidence` table without a default value. This is not possible if the table is not empty.
  - Added the required column `caseId` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateCreate` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `responsibleExpertId` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content` to the `TextEvidence` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Classification" AS ENUM ('CRIMINAL', 'ACIDENTE', 'IDENTIFICACAO');

-- CreateEnum
CREATE TYPE "TypeEvidence" AS ENUM ('TEXT', 'IMAGE');

-- DropForeignKey
ALTER TABLE "Case" DROP CONSTRAINT "Case_gerenteId_fkey";

-- DropForeignKey
ALTER TABLE "ComparisonResult" DROP CONSTRAINT "ComparisonResult_analisadoPorId_fkey";

-- DropForeignKey
ALTER TABLE "Evidence" DROP CONSTRAINT "Evidence_casoId_fkey";

-- DropForeignKey
ALTER TABLE "Evidence" DROP CONSTRAINT "Evidence_coletadoPorId_fkey";

-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_casoId_fkey";

-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_peritoResponsavelId_fkey";

-- AlterTable
ALTER TABLE "Case" DROP COLUMN "dataAbertura",
DROP COLUMN "dataFechamento",
DROP COLUMN "descricao",
DROP COLUMN "gerenteId",
DROP COLUMN "titulo",
ADD COLUMN     "classification" "Classification" NOT NULL,
ADD COLUMN     "dataFinished" TIMESTAMP(3),
ADD COLUMN     "dateOpened" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "managerId" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ComparisonResult" DROP COLUMN "analisadoPorId",
DROP COLUMN "dataAnalise",
DROP COLUMN "precisao",
DROP COLUMN "resultado",
ADD COLUMN     "analyzedById" TEXT NOT NULL,
ADD COLUMN     "dateAnalysis" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "precision" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "result" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Evidence" DROP COLUMN "casoId",
DROP COLUMN "coletadoPorId",
DROP COLUMN "dataColeta",
DROP COLUMN "tipo",
ADD COLUMN     "caseId" TEXT NOT NULL,
ADD COLUMN     "collectedById" TEXT NOT NULL,
ADD COLUMN     "datecollection" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "type" "TypeEvidence" NOT NULL;

-- AlterTable
ALTER TABLE "ImageEvidence" DROP COLUMN "imagemURL",
ADD COLUMN     "imageURL" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Report" DROP COLUMN "casoId",
DROP COLUMN "conteudo",
DROP COLUMN "dataCriacao",
DROP COLUMN "peritoResponsavelId",
DROP COLUMN "titulo",
ADD COLUMN     "caseId" TEXT NOT NULL,
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "dateCreate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "responsibleExpertId" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TextEvidence" DROP COLUMN "conteudo",
ADD COLUMN     "content" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "nome",
DROP COLUMN "senha",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Case" ADD CONSTRAINT "Case_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evidence" ADD CONSTRAINT "Evidence_collectedById_fkey" FOREIGN KEY ("collectedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evidence" ADD CONSTRAINT "Evidence_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComparisonResult" ADD CONSTRAINT "ComparisonResult_analyzedById_fkey" FOREIGN KEY ("analyzedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_responsibleExpertId_fkey" FOREIGN KEY ("responsibleExpertId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
