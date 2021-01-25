import { MigrationInterface, QueryRunner } from 'typeorm';
import { csvImporter } from '../helpers/importer';
import { ProductDTO } from '../modules/product/dto/product.dto';
import { ProductEntity } from '../modules/product/product.entity';
import path from 'path';

export class createProducts1611600003232 implements MigrationInterface {
    name = 'createProducts1611600003232';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'CREATE TABLE `products` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `price` float NOT NULL, `quantity` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
        );

        // insert all products from CSV file
        const file = path.resolve(__dirname, '..', '..', 'products.csv');
        const importedProducts: ProductDTO[] = await csvImporter(file);
        const repository = queryRunner.connection.getRepository(ProductEntity);
        await repository.insert(importedProducts);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE `products`');
    }
}
