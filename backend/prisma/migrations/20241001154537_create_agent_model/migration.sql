/*
  Warnings:

  - Added the required column `code_agent` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code_agent` to the `Level` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "code_agent" UUID NOT NULL;

-- AlterTable
ALTER TABLE "Level" ADD COLUMN     "code_agent" UUID NOT NULL;

-- CreateTable
CREATE TABLE "Agent" (
    "code_agent" UUID NOT NULL DEFAULT gen_random_uuid(),
    "matricule_agent" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "sur_name" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "code_agency" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Agent_pkey" PRIMARY KEY ("code_agent")
);

-- CreateIndex
CREATE UNIQUE INDEX "Agent_matricule_agent_key" ON "Agent"("matricule_agent");

-- AddForeignKey
ALTER TABLE "Level" ADD CONSTRAINT "Level_code_agent_fkey" FOREIGN KEY ("code_agent") REFERENCES "Agent"("code_agent") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_code_agent_fkey" FOREIGN KEY ("code_agent") REFERENCES "Agent"("code_agent") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Agent" ADD CONSTRAINT "Agent_code_agency_fkey" FOREIGN KEY ("code_agency") REFERENCES "Agency"("code_agency") ON DELETE RESTRICT ON UPDATE CASCADE;
