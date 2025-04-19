-- CreateEnum
CREATE TYPE "StatusCase" AS ENUM ('ARQUIVADO', 'ANDAMENTO', 'FINALIZADO');

-- AlterTable
ALTER TABLE "Case" ADD COLUMN     "statusCase" "StatusCase" NOT NULL DEFAULT 'ANDAMENTO';
