/*
  Warnings:

  - You are about to drop the column `type` on the `question` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `question` DROP COLUMN `type`,
    ADD COLUMN `max_option_can_selected` INTEGER NOT NULL DEFAULT 1;
