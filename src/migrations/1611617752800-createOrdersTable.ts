import {MigrationInterface, QueryRunner} from "typeorm";

export class createOrdersTable1611617752800 implements MigrationInterface {
    name = 'createOrdersTable1611617752800'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `orders` (`id` int NOT NULL AUTO_INCREMENT, `total` float NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `order_products` (`orderId` int NOT NULL, `productId` int NOT NULL, INDEX `IDX_28b66449cf7cd76444378ad4e9` (`orderId`), INDEX `IDX_27ca18f2453639a1cafb7404ec` (`productId`), PRIMARY KEY (`orderId`, `productId`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `order_products` ADD CONSTRAINT `FK_28b66449cf7cd76444378ad4e92` FOREIGN KEY (`orderId`) REFERENCES `orders`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `order_products` ADD CONSTRAINT `FK_27ca18f2453639a1cafb7404ece` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `order_products` DROP FOREIGN KEY `FK_27ca18f2453639a1cafb7404ece`");
        await queryRunner.query("ALTER TABLE `order_products` DROP FOREIGN KEY `FK_28b66449cf7cd76444378ad4e92`");
        await queryRunner.query("DROP INDEX `IDX_27ca18f2453639a1cafb7404ec` ON `order_products`");
        await queryRunner.query("DROP INDEX `IDX_28b66449cf7cd76444378ad4e9` ON `order_products`");
        await queryRunner.query("DROP TABLE `order_products`");
        await queryRunner.query("DROP TABLE `orders`");
    }

}
