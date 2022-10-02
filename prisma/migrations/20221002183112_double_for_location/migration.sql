/*
  Warnings:

  - You are about to alter the column `latitude` on the `addresses` table. The data in that column could be lost. The data in that column will be cast from `Decimal(9,6)` to `Double`.
  - You are about to alter the column `longitude` on the `addresses` table. The data in that column could be lost. The data in that column will be cast from `Decimal(9,6)` to `Double`.

*/
-- AlterTable
ALTER TABLE `addresses` MODIFY `latitude` DOUBLE NOT NULL,
    MODIFY `longitude` DOUBLE NOT NULL;
