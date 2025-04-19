/*
  Warnings:

  - The `status` column on the `Case` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ATIVADO', 'DESATIVADO');

-- AlterTable
ALTER TABLE "Case" DROP COLUMN "status",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'ATIVADO';

-- AlterTable
ALTER TABLE "ComparisonResult" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'ATIVADO';

-- AlterTable
ALTER TABLE "Evidence" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'ATIVADO';

-- AlterTable
ALTER TABLE "Report" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'ATIVADO';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'ATIVADO';
