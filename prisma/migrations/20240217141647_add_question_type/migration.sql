-- AlterTable
ALTER TABLE `question` ADD COLUMN `type` ENUM('Single', 'Multiple') NOT NULL DEFAULT 'Single';
