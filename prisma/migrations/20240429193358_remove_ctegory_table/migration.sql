/*
  Warnings:

  - You are about to drop the column `categoryId` on the `item` table. All the data in the column will be lost.
  - You are about to drop the `category` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `category` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `restaurantId` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `category` DROP FOREIGN KEY `Category_restaurantId_fkey`;

-- DropForeignKey
ALTER TABLE `item` DROP FOREIGN KEY `Item_categoryId_fkey`;

-- AlterTable
ALTER TABLE `item` DROP COLUMN `categoryId`,
    ADD COLUMN `category` VARCHAR(191) NOT NULL,
    ADD COLUMN `restaurantId` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `category`;

-- AddForeignKey
ALTER TABLE `Item` ADD CONSTRAINT `Item_restaurantId_fkey` FOREIGN KEY (`restaurantId`) REFERENCES `Restaurant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
