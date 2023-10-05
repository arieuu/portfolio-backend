import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateExtraLinks1696518109005 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "extra_links",
                columns: [
                    {
                        name: "link_id",
                        type: "uuid",
                        isPrimary: true,
                        isNullable: false
                    },
                    {
                        name: "post_id",
                        type: "uuid",
                        isNullable: false
                    },
                    {
                        name: "link",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "link_text",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "udated_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ],
                
                foreignKeys: [
                    {
                        name: "fk_extralinks",
                        referencedTableName: "posts",
                        referencedColumnNames: ["link_owner"],
                        columnNames: ["post_id"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("extra_links");
    }

}
