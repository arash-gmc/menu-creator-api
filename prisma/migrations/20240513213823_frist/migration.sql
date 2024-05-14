-- CreateTable
CREATE TABLE `Restaurant` (
    `id` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `password` VARCHAR(191) NOT NULL,
    `logoPublicId` VARCHAR(191) NULL,
    `instagramId` VARCHAR(191) NULL,
    `phoneNumber` INTEGER NULL,

    UNIQUE INDEX `Restaurant_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Item` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `photoPublicId` VARCHAR(191) NULL,
    `price` INTEGER NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `restaurantId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Item` ADD CONSTRAINT `Item_restaurantId_fkey` FOREIGN KEY (`restaurantId`) REFERENCES `Restaurant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
