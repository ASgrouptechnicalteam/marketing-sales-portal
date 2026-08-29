-- DropForeignKey
ALTER TABLE `Booking` DROP FOREIGN KEY `Booking_associateId_fkey`;

-- DropForeignKey
ALTER TABLE `CommissionPolicy` DROP FOREIGN KEY `CommissionPolicy_associateId_fkey`;

-- DropForeignKey
ALTER TABLE `CommissionTransaction` DROP FOREIGN KEY `CommissionTransaction_associateId_fkey`;

-- Ignored layout foreign keys to prevent shadow DB failure

-- DropForeignKey
ALTER TABLE `ReviewRequest` DROP FOREIGN KEY `ReviewRequest_associateId_fkey`;

-- DropForeignKey
ALTER TABLE `SiteVisit` DROP FOREIGN KEY `SiteVisit_associateId_fkey`;

-- Ignored other foreign keys to prevent shadow DB failure

-- DropIndex
DROP INDEX `CommissionPolicy_associateId_projectId_key` ON `CommissionPolicy`;

-- DropIndex
DROP INDEX `User_associateId_key` ON `User`;

-- AlterTable
ALTER TABLE `Booking` CHANGE COLUMN `associateId` `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `CommissionPolicy` CHANGE COLUMN `associateId` `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `CommissionTransaction` CHANGE COLUMN `associateId` `userId` VARCHAR(191) NOT NULL;

-- Ignored layoutType drop

-- AlterTable
ALTER TABLE `ReviewRequest` CHANGE COLUMN `associateId` `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `SiteVisit` CHANGE COLUMN `associateId` `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `TeamRequest` CHANGE COLUMN `targetAssociateId` `targetUserId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `User` CHANGE COLUMN `associateId` `userIdentifier` VARCHAR(191) NULL;
ALTER TABLE `User` ADD COLUMN `designation` VARCHAR(191) NULL,
    ADD COLUMN `parentId` VARCHAR(191) NULL,
    ADD COLUMN `teamId` VARCHAR(191) NULL;

-- Data Migration: ASSOC-RS-XXXX to RS-XXXX
UPDATE `User` SET `userIdentifier` = REPLACE(`userIdentifier`, 'ASSOC-', '') WHERE `userIdentifier` LIKE 'ASSOC-%';


-- DropTable
DROP TABLE IF EXISTS `layoutbuilding`;

-- DropTable
DROP TABLE IF EXISTS `layoutfloor`;

-- DropTable
DROP TABLE IF EXISTS `layoutlayer`;

-- DropTable
DROP TABLE IF EXISTS `layoutobject`;

-- DropTable
DROP TABLE IF EXISTS `layoutunit`;

-- DropTable
DROP TABLE IF EXISTS `teamrelationship`;

-- DropTable
DROP TABLE IF EXISTS `travelrequest`;

-- CreateTable
CREATE TABLE `team` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `headUserId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `CommissionPolicy_userId_projectId_key` ON `CommissionPolicy`(`userId`, `projectId`);

-- CreateIndex
CREATE INDEX `ReviewRequest_userId_idx` ON `ReviewRequest`(`userId`);

-- CreateIndex
CREATE INDEX `SiteVisit_userId_idx` ON `SiteVisit`(`userId`);

-- CreateIndex
CREATE UNIQUE INDEX `User_userIdentifier_key` ON `User`(`userIdentifier`);

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_teamId_fkey` FOREIGN KEY (`teamId`) REFERENCES `team`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TeamRequest` ADD CONSTRAINT `TeamRequest_targetUserId_fkey` FOREIGN KEY (`targetUserId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CommissionPolicy` ADD CONSTRAINT `CommissionPolicy_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CommissionTransaction` ADD CONSTRAINT `CommissionTransaction_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SiteVisit` ADD CONSTRAINT `SiteVisit_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReviewRequest` ADD CONSTRAINT `ReviewRequest_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
