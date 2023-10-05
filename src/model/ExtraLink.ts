import { Column, CreateDateColumn, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";


class ExtraLink {

    @PrimaryColumn({name: "link_id"})
    readonly linkId: string;

    @Column({name: "post_id"})
    postId: string;

    @Column()
    link: string;

    @Column({name: "link_text"})
    linkText: string

    @CreateDateColumn({name: "created_at"})
    createdAt: Date;

    @UpdateDateColumn({name: "updated_at"})
    updateAt: Date;

    constructor(postId: string, link: string, linkText: string) {
        this.linkId = uuid();
        this.postId = postId;
        this.link = link;
        this.linkText = linkText;
    }

}

export { ExtraLink };