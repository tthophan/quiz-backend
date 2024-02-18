-- CreateTable
CREATE TABLE "quiz" (
    "id" SERIAL NOT NULL,
    "code" VARCHAR(16) NOT NULL,
    "coin_bonus" INTEGER NOT NULL DEFAULT 1000,
    "title" VARCHAR(255) NOT NULL,
    "short_description" TEXT NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" VARCHAR(16) NOT NULL DEFAULT '0',
    "updated_at" TIMESTAMP NOT NULL,
    "updated_by" VARCHAR(16) NOT NULL DEFAULT '0',

    CONSTRAINT "quiz_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "question" (
    "id" SERIAL NOT NULL,
    "code" VARCHAR(16) NOT NULL,
    "text" TEXT NOT NULL,
    "hint" TEXT,
    "quiz_id" INTEGER NOT NULL,
    "max_option_can_selected" INTEGER NOT NULL DEFAULT 1,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" VARCHAR(16) NOT NULL DEFAULT '0',
    "updated_at" TIMESTAMP NOT NULL,
    "updated_by" VARCHAR(16) NOT NULL DEFAULT '0',

    CONSTRAINT "question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "option" (
    "id" SERIAL NOT NULL,
    "code" VARCHAR(16) NOT NULL,
    "text" TEXT NOT NULL,
    "question_id" INTEGER NOT NULL,
    "match" BOOLEAN NOT NULL DEFAULT false,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" VARCHAR(16) NOT NULL DEFAULT '0',
    "updated_at" TIMESTAMP NOT NULL,
    "updated_by" VARCHAR(16) NOT NULL DEFAULT '0',

    CONSTRAINT "option_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "question_result" (
    "id" SERIAL NOT NULL,
    "quiz_id" INTEGER NOT NULL,
    "question_id" INTEGER NOT NULL,
    "option_id" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,
    "result" BOOLEAN NOT NULL DEFAULT false,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" VARCHAR(16) NOT NULL DEFAULT '0',
    "updated_at" TIMESTAMP NOT NULL,
    "updated_by" VARCHAR(16) NOT NULL DEFAULT '0',

    CONSTRAINT "question_result_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "phone" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "password_secure" TEXT NOT NULL,
    "latest_signed_time" TIMESTAMP(3),
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" VARCHAR(16) NOT NULL DEFAULT '0',
    "updated_at" TIMESTAMP NOT NULL,
    "updated_by" VARCHAR(16) NOT NULL DEFAULT '0',

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "quiz_code_key" ON "quiz"("code");

-- CreateIndex
CREATE UNIQUE INDEX "question_code_key" ON "question"("code");

-- CreateIndex
CREATE UNIQUE INDEX "option_code_key" ON "option"("code");

-- CreateIndex
CREATE INDEX "question_result_quiz_id_question_id_option_id_user_id_idx" ON "question_result"("quiz_id", "question_id", "option_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_phone_key" ON "user"("phone");

-- CreateIndex
CREATE INDEX "user_phone_idx" ON "user"("phone");

-- AddForeignKey
ALTER TABLE "question" ADD CONSTRAINT "question_quiz_id_fkey" FOREIGN KEY ("quiz_id") REFERENCES "quiz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "option" ADD CONSTRAINT "option_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question_result" ADD CONSTRAINT "question_result_quiz_id_fkey" FOREIGN KEY ("quiz_id") REFERENCES "quiz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question_result" ADD CONSTRAINT "question_result_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question_result" ADD CONSTRAINT "question_result_option_id_fkey" FOREIGN KEY ("option_id") REFERENCES "option"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
