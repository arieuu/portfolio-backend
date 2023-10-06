import "reflect-metadata";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Post } from "./Post";


@Entity("extra_links")
class ExtraLink {

    @PrimaryColumn({name: "link_id"})
    readonly linkId: string;

    @ManyToOne(() => Post, (post) => post.postId, {

        // We need this or the update will go bad for this relation
        
        onDelete: "CASCADE",
        onUpdate: "RESTRICT",
        orphanedRowAction: "delete"
    })
    @JoinColumn({name: "post_id"})
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