import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Roles1713610169289 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "roles",
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
                        length: "40",
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
            }),
            true
        );

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("roles");
    }

}