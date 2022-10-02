/*
  Warnings:

  - Made the column `latitude` on table `addresses` required. This step will fail if there are existing NULL values in that column.
  - Made the column `longitude` on table `addresses` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `addresses` ADD COLUMN `complement` VARCHAR(100) NULL,
    MODIFY `latitude` DECIMAL(9, 6) NOT NULL,
    MODIFY `longitude` DECIMAL(9, 6) NOT NULL;
