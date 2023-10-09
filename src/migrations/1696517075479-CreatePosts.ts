import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreatePosts1696517075479 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "posts",
                columns: [
                    {
                        name: "post_id",
                        type: "uuid",
                        isNullable: false,
                        isPrimary: true
                    },
                    {
                        name: "table",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "year",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "description",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "more",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "link",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "tools",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "image_url",
                        type: "varchar"
                    },
                    {
                        name: "is_first_page",
                        type: "boolean"
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
        await queryRunner.dropTable("posts");
    }

}
