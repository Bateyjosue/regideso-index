/*
  Warnings:

  - Added the required column `code_subscriber` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "code_subscriber" UUID NOT NULL;

-- CreateTable
CREATE TABLE "Subscriber" (
    "code_subscriber" UUID NOT NULL DEFAULT gen_random_uuid(),
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "sur_name" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "code_avenue" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subscriber_pkey" PRIMARY KEY ("code_subscriber")
);

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_code_subscriber_fkey" FOREIGN KEY ("code_subscriber") REFERENCES "Subscriber"("code_subscriber") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscriber" ADD CONSTRAINT "Subscriber_code_avenue_fkey" FOREIGN KEY ("code_avenue") REFERENCES "Avenue"("code_avenue") ON DELETE RESTRICT ON UPDATE CASCADE;
