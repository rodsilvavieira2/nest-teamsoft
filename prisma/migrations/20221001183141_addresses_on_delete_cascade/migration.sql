-- DropForeignKey
ALTER TABLE `addresses` DROP FOREIGN KEY `addresses_clientId_fkey`;

-- AddForeignKey
ALTER TABLE `addresses` ADD CONSTRAINT `addresses_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `clients`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
