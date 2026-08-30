ALTER TABLE `User` DROP COLUMN `deletedAt`, DROP COLUMN `deletedById`;
ALTER TABLE `Team` DROP COLUMN `deletedAt`, DROP COLUMN `deletedById`;
ALTER TABLE `InventoryUnit` DROP COLUMN `deletedAt`, DROP COLUMN `deletedById`;
ALTER TABLE `SiteVisit` DROP COLUMN `deletedAt`, DROP COLUMN `deletedById`;
ALTER TABLE `DemoBooking` DROP COLUMN `deletedAt`, DROP COLUMN `deletedById`;
ALTER TABLE `Offer` DROP COLUMN `deletedAt`, DROP COLUMN `deletedById`;
