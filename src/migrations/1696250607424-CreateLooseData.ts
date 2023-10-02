import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateLooseData1696250607424 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "loose_data",
                columns: [
                    {
                        name: "data_id",
                        type: "uuid",
                        isNullable: false,
                        isPrimary: true,
                    },
                    {
                        name: "type",
                        type: "varchar",
                    },
                    {
                        name: "title",
                        type: "varchar",
                    },
                    {
                        name: "content",
                        type: "varchar"
                    },
                    {
                        name: "extra_content",
                        type: "varchar"
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("loose_data")
    }

}
