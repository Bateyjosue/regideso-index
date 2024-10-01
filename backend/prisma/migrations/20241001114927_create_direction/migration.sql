/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "Direction" (
    "num_direction" UUID NOT NULL DEFAULT gen_random_uuid(),
    "code_direction" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Direction_pkey" PRIMARY KEY ("num_direction")
);

-- CreateIndex
CREATE UNIQUE INDEX "Direction_code_direction_key" ON "Direction"("code_direction");
