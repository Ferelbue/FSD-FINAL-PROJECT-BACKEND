import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class FavoriteProducts1713611479717 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "favorite_products",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: "user_id",
                    type: "int",
                    isNullable: false,
                },
                {
                    name: "product_id",
                    type: "int",
                    isNullable: false,
                }
            ],
            foreignKeys: [
                {
                    columnNames: ["user_id"],
                    referencedColumnNames: ["id"],
                    referencedTableName: "users",
                    onDelete: "CASCADE"
                },
                {
                    columnNames: ["product_id"],
                    referencedColumnNames: ["id"],
                    referencedTableName: "products",
                    onDelete: "CASCADE"
                }
            ],
            indices: [
                {
                    name: "user_favourite_unique",
                    columnNames: ["user_id", "product_id"],
                    isUnique: true
                }
            ]
        }), true)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("favorite_products");
    }

}