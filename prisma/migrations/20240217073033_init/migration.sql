-- CreateTable
CREATE TABLE `quiz` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(16) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `short_description` MEDIUMTEXT NOT NULL,
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_by` VARCHAR(16) NOT NULL DEFAULT '0',
    `updated_at` DATETIME(3) NOT NULL,
    `updated_by` VARCHAR(16) NOT NULL DEFAULT '0',

    UNIQUE INDEX `quiz_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `question` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(16) NOT NULL,
    `text` MEDIUMTEXT NOT NULL,
    `hint` MEDIUMTEXT NULL,
    `quiz_id` INTEGER NOT NULL,
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_by` VARCHAR(16) NOT NULL DEFAULT '0',
    `updated_at` DATETIME(3) NOT NULL,
    `updated_by` VARCHAR(16) NOT NULL DEFAULT '0',

    UNIQUE INDEX `question_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `option` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(16) NOT NULL,
    `text` MEDIUMTEXT NOT NULL,
    `question_id` INTEGER NOT NULL,
    `match` BOOLEAN NOT NULL DEFAULT false,
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_by` VARCHAR(16) NOT NULL DEFAULT '0',
    `updated_at` DATETIME(3) NOT NULL,
    `updated_by` VARCHAR(16) NOT NULL DEFAULT '0',

    UNIQUE INDEX `option_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `question_result` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `quiz_id` INTEGER NOT NULL,
    `question_id` INTEGER NOT NULL,
    `option_id` INTEGER NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_by` VARCHAR(16) NOT NULL DEFAULT '0',
    `updated_at` DATETIME(3) NOT NULL,
    `updated_by` VARCHAR(16) NOT NULL DEFAULT '0',

    INDEX `question_result_quiz_id_question_id_option_id_user_id_idx`(`quiz_id`, `question_id`, `option_id`, `user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `question` ADD CONSTRAINT `question_quiz_id_fkey` FOREIGN KEY (`quiz_id`) REFERENCES `quiz`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `option` ADD CONSTRAINT `option_question_id_fkey` FOREIGN KEY (`question_id`) REFERENCES `question`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `question_result` ADD CONSTRAINT `question_result_quiz_id_fkey` FOREIGN KEY (`quiz_id`) REFERENCES `quiz`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `question_result` ADD CONSTRAINT `question_result_question_id_fkey` FOREIGN KEY (`question_id`) REFERENCES `question`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `question_result` ADD CONSTRAINT `question_result_option_id_fkey` FOREIGN KEY (`option_id`) REFERENCES `option`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
