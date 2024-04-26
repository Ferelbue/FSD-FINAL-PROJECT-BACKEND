import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Messages1713611636636 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "messages",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: "message",
                    type: "varchar",
                    length: "255",
                    isNullable: false,
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
                    name: "userOwner_notification",
                    type: "boolean",
                    default: false,
                },
                {
                    name: "userUser_notification",
                    type: "boolean",
                    default: false,
                },
                {
                    name: "userOwner_author",
                    type: "boolean",
                    default: false,
                },
                {
                    name: "userUser_author",
                    type: "boolean",
                    default: false,
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
            ]
        }), true)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("messages");
    }

}