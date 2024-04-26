import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Reviews1713611748816 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "reviews",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: "name",
                    type: "varchar",
                    length: "20",
                    isNullable: false,
                },
                {
                    name: "description",
                    type: "varchar",
                    length: "50",
                    isNullable: false,
                },
                {
                    name: "starts",
                    type: "int",
                    isNullable: false,
                },
                {
                    name: "product_id",
                    type: "int",
                    isNullable: false,
                },
                {
                    name: "reviewer_id",
                    type: "int",
                    isNullable: false,
                }
            ],
            foreignKeys: [
                {
                    columnNames: ["product_id"],
                    referencedColumnNames: ["id"],
                    referencedTableName: "products",
                    onDelete: "CASCADE"
                },
                {
                    columnNames: ["reviewer_id"],
                    referencedColumnNames: ["id"],
                    referencedTableName: "users",
                    onDelete: "CASCADE"
                }
            ]
        }), true)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("reviews");
    }

}