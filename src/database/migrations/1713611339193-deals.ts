import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Deals1713611339193 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "deals",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: "userOwner_id",
                    type: "int",
                    isNullable: false,
                },
                {
                    name: "userUser_id",
                    type: "int",
                    isNullable: false,
                },
                {
                    name: "product_id",
                    type: "int",
                    isNullable: false,
                },
                {
                    name: "user_confirm",
                    type: "boolean",
                    default: false,
                },
                {
                    name: "product_confirm",
                    type: "boolean",
                    default: false,
                },
                {
                    name: "deal_date",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP",
                }
            ],
            foreignKeys: [
                {
                    columnNames: ["userOwner_id"],
                    referencedColumnNames: ["id"],
                    referencedTableName: "users",
                    onDelete: "CASCADE"
                },
                {
                    columnNames: ["userUser_id"],
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
                    name: "user_deal_unique",
                    columnNames: ["userUser_id", "product_id", "deal_date"],
                    isUnique: true
                }
            ]
        }), true)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("deals");
    }

}