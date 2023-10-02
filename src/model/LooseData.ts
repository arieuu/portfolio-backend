import "reflect-metadata"
import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid"


@Entity("loose_data")
class LooseData {

    @PrimaryColumn({name: "data_id"})
    readonly dataId: string;

    @Column()
    type: string;

    @Column()
    title: string;

    @Column()
    content: string;

    @Column({name: "extra_content"})
    extraContent: string;

    @CreateDateColumn({name: "create_at"})
    createdAt: Date;

    @UpdateDateColumn({name: "update_at"})
    updatedAt: Date;

    constructor(type: string, title: string, content: string, extraContent: string) {
        this.dataId = uuid();
        this.type = type;
        this.title = title;
        this.content = content;
        this.extraContent = extraContent;
    }

}

export { LooseData };