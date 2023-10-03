import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateUser1696350944080 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "user",
                columns: [
                    {
                        name: "user_id",
                        type: "uuid",
                        isNullable: false,
                    },

                    {
                        name: "username",
                        type: "varchar",
                        isPrimary: true,
                        isNullable: false
                    },

                    {
                        name: "password",
                        type: "varchar",
                        isNullable: false
                    },

                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
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
        await queryRunner.dropTable("user");
    }

}
