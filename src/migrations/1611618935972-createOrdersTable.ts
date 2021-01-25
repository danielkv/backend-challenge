import {MigrationInterface, QueryRunner} from "typeorm";

export class createOrdersTable1611618935972 implements MigrationInterface {
    name = 'createOrdersTable1611618935972'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `orders` (`id` int NOT NULL AUTO_INCREMENT, `total` float NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `order_products` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `price` float NOT NULL, `quantity` int NOT NULL, `referenceProductId` int NULL, `orderId` int NOT NULL, UNIQUE INDEX `REL_4362a241129e9f7f5e46551393` (`referenceProductId`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `order_products` ADD CONSTRAINT `FK_28b66449cf7cd76444378ad4e92` FOREIGN KEY (`orderId`) REFERENCES `orders`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `order_products` ADD CONSTRAINT `FK_4362a241129e9f7f5e46551393f` FOREIGN KEY (`referenceProductId`) REFERENCES `products`(`id`) ON DELETE SET NULL ON UPDATE CASCADE");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `order_products` DROP FOREIGN KEY `FK_4362a241129e9f7f5e46551393f`");
        await queryRunner.query("ALTER TABLE `order_products` DROP FOREIGN KEY `FK_28b66449cf7cd76444378ad4e92`");
        await queryRunner.query("DROP INDEX `REL_4362a241129e9f7f5e46551393` ON `order_products`");
        await queryRunner.query("DROP TABLE `order_products`");
        await queryRunner.query("DROP TABLE `orders`");
    }

}
