/*
  Warnings:

  - The primary key for the `Agency` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `num_agency` on the `Agency` table. All the data in the column will be lost.
  - You are about to drop the column `num_direction` on the `Agency` table. All the data in the column will be lost.
  - The `code_agency` column on the `Agency` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Direction` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `num_direction` on the `Direction` table. All the data in the column will be lost.
  - The `code_direction` column on the `Direction` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `code_direction` to the `Agency` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Agency" DROP CONSTRAINT "Agency_num_direction_fkey";

-- DropIndex
DROP INDEX "Agency_code_agency_key";

-- DropIndex
DROP INDEX "Direction_code_direction_key";

-- AlterTable
ALTER TABLE "Agency" DROP CONSTRAINT "Agency_pkey",
DROP COLUMN "num_agency",
DROP COLUMN "num_direction",
ADD COLUMN     "code_direction" UUID NOT NULL,
DROP COLUMN "code_agency",
ADD COLUMN     "code_agency" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD CONSTRAINT "Agency_pkey" PRIMARY KEY ("code_agency");

-- AlterTable
ALTER TABLE "Direction" DROP CONSTRAINT "Direction_pkey",
DROP COLUMN "num_direction",
DROP COLUMN "code_direction",
ADD COLUMN     "code_direction" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD CONSTRAINT "Direction_pkey" PRIMARY KEY ("code_direction");

-- CreateTable
CREATE TABLE "Avenue" (
    "code_avenue" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "code_agency" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Avenue_pkey" PRIMARY KEY ("code_avenue")
);

-- CreateIndex
CREATE UNIQUE INDEX "Avenue_code_agency_key" ON "Avenue"("code_agency");

-- AddForeignKey
ALTER TABLE "Agency" ADD CONSTRAINT "Agency_code_direction_fkey" FOREIGN KEY ("code_direction") REFERENCES "Direction"("code_direction") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Avenue" ADD CONSTRAINT "Avenue_code_agency_fkey" FOREIGN KEY ("code_agency") REFERENCES "Agency"("code_agency") ON DELETE RESTRICT ON UPDATE CASCADE;
