-- AlterTable
ALTER TABLE `question_result` ADD COLUMN `result` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `quiz` ADD COLUMN `coin_bonus` INTEGER NOT NULL DEFAULT 1000;
