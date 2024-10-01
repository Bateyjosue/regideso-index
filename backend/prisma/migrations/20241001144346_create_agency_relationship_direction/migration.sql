/*
  Warnings:

  - Added the required column `updatedAt` to the `Direction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Direction" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "Agency" (
    "num_agency" UUID NOT NULL DEFAULT gen_random_uuid(),
    "code_agency" TEXT NOT NULL,
    "num_direction" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Agency_pkey" PRIMARY KEY ("num_agency")
);

-- CreateIndex
CREATE UNIQUE INDEX "Agency_code_agency_key" ON "Agency"("code_agency");

-- AddForeignKey
ALTER TABLE "Agency" ADD CONSTRAINT "Agency_num_direction_fkey" FOREIGN KEY ("num_direction") REFERENCES "Direction"("num_direction") ON DELETE RESTRICT ON UPDATE CASCADE;
