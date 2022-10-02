/*
  Warnings:

  - You are about to alter the column `complement` on the `addresses` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `VarChar(60)`.

*/
-- AlterTable
ALTER TABLE `addresses` MODIFY `district` VARCHAR(60) NOT NULL,
    MODIFY `city` VARCHAR(60) NOT NULL,
    MODIFY `latitude` DOUBLE NOT NULL DEFAULT 0.0,
    MODIFY `longitude` DOUBLE NOT NULL DEFAULT 0.0,
    MODIFY `complement` VARCHAR(60) NULL;
