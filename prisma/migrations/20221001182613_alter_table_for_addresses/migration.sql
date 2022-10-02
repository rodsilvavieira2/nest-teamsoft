/*
  Warnings:

  - You are about to alter the column `cnpj` on the `clients` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(19)`.
  - You are about to alter the column `contactName` on the `clients` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(90)`.
  - You are about to alter the column `cellphone` on the `clients` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(18)`.
  - You are about to drop the `address` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `address` DROP FOREIGN KEY `address_clientId_fkey`;

-- AlterTable
ALTER TABLE `clients` MODIFY `cnpj` VARCHAR(19) NOT NULL,
    MODIFY `socialReason` VARCHAR(255) NOT NULL,
    MODIFY `contactName` VARCHAR(90) NOT NULL,
    MODIFY `cellphone` VARCHAR(18) NOT NULL;

-- DropTable
DROP TABLE `address`;

-- CreateTable
CREATE TABLE `addresses` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `publicSpace` VARCHAR(60) NOT NULL,
    `number` VARCHAR(10) NOT NULL,
    `district` VARCHAR(40) NOT NULL,
    `city` VARCHAR(15) NOT NULL,
    `state` VARCHAR(100) NOT NULL,
    `zipCode` VARCHAR(18) NOT NULL,
    `latitude` DOUBLE NULL,
    `longitude` DOUBLE NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `clientId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `addresses` ADD CONSTRAINT `addresses_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `clients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
