/*
  Warnings:

  - Added the required column `Identified` to the `Patient` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Identified" AS ENUM ('YES', 'NO');

-- AlterTable
ALTER TABLE "Patient" ADD COLUMN     "Identified" "Identified" NOT NULL;
