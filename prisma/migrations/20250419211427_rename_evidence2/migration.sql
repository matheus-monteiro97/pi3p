/*
  Warnings:

  - You are about to drop the column `datecollection` on the `Evidence` table. All the data in the column will be lost.
  - Added the required column `dateCollection` to the `Evidence` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Evidence" DROP COLUMN "datecollection",
ADD COLUMN     "dateCollection" TIMESTAMP(3) NOT NULL;
