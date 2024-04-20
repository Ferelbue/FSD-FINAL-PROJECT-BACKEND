import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Products1713611005530 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "products",
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
                    length: "50",
                    isNullable: false,
                },
                {
                    name: "description",
                    type: "varchar",
                    length: "50",
                    isNullable: false,
                },
                {
                    name: "image",
                    type: "varchar",
                    length: "255",
                    isNullable: false,
                },
                {
                    name: "starts",
                    type: "int",
                    isNullable: false,
                },
                {
                    name: "hourPrice",
                    type: "decimal",
                    precision: 10,
                    scale: 2,
                    isNullable: false,
                },
                {
                    name: "dayPrice",
                    type: "decimal",
                    precision: 10,
                    scale: 2,
                    isNullable: false,
                },
                {
                    name: "depositPrice",
                    type: "decimal",
                    precision: 10,
                    scale: 2,
                    isNullable: false,
                },
                {
                    name: "available",
                    type: "boolean",
                    default: true,
                },
                {
                    name: "category_id",
                    type: "int",
                    isNullable: false,
                },
                {
                    name: "owner_id",
                    type: "int",
                    isNullable: false,
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP",
                },
                {
                    name: "updated_at",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP",
                    onUpdate: "CURRENT_TIMESTAMP",
                }
            ],
            foreignKeys: [
                {
                    columnNames: ["owner_id"],
                    referencedColumnNames: ["id"],
                    referencedTableName: "users",
                    onDelete: "CASCADE"
                },
                {
                    columnNames: ["category_id"],
                    referencedColumnNames: ["id"],
                    referencedTableName: "categories",
                    onDelete: "CASCADE"
                }
            ]
        }), true)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("products");
    }

}