import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Users1713610285564 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "users",
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
                    name: "lastName",
                    type: "varchar",
                    length: "50",
                    isNullable: false,
                },
                {
                    name: "email",
                    type: "varchar",
                    length: "100",
                    isNullable: false,
                    isUnique: true,
                },
                {
                    name: "image",
                    type: "varchar",
                    length: "255",
                    default: "'userProfile.png'",
                },
                {
                    name: "city",
                    type: "varchar",
                    length: "50",
                    isNullable: false,
                },
                {
                    name: "passwordHash",
                    type: "varchar",
                    length: "255",
                    isNullable: false,
                },
                {
                    name: "is_active",
                    type: "boolean",
                    default: true,
                },
                {
                    name: "role_id",
                    type: "int",
                    isNullable: false,
                    default: 1,
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
                    columnNames: ["role_id"],
                    referencedColumnNames: ["id"],
                    referencedTableName: "roles",
                    onDelete: "CASCADE"
                }
            ]
        }), true)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users");
    }

}