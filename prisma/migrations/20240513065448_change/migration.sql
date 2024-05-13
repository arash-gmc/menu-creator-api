/*
  Warnings:

  - You are about to drop the column `publicId` on the `item` table. All the data in the column will be lost.
  - You are about to drop the column `displayName` on the `restaurant` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `Restaurant` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `username` to the `Restaurant` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Restaurant_name_key` ON `restaurant`;

-- AlterTable
ALTER TABLE `item` DROP COLUMN `publicId`,
    ADD COLUMN `photoPublicId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `restaurant` DROP COLUMN `displayName`,
    ADD COLUMN `logoPublicId` VARCHAR(191) NULL,
    ADD COLUMN `phoneNumber` INTEGER NULL,
    ADD COLUMN `username` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Restaurant_username_key` ON `Restaurant`(`username`);
