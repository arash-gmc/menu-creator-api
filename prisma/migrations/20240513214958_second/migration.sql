/*
  Warnings:

  - You are about to drop the column `name` on the `restaurant` table. All the data in the column will be lost.
  - Added the required column `title` to the `Restaurant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `restaurant` DROP COLUMN `name`,
    ADD COLUMN `title` VARCHAR(191) NOT NULL;
