/*
  Warnings:

  - You are about to drop the column `responsibleId` on the `Patient` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Patient" DROP CONSTRAINT "Patient_responsibleId_fkey";

-- AlterTable
ALTER TABLE "Patient" DROP COLUMN "responsibleId";
