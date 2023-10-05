import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";

Entity("posts")
class Post {

    @PrimaryColumn({name: "post_id"})
    readonly postId: string;

    @Column()
    title: string;

    @Column()
    year: string;

    @Column()
    description: string;

    @Column()
    more: string;

    @Column()
    link: string;

    @Column()
    tools: string;

    @CreateDateColumn({name: "created_at"})
    createdAt: Date;

    @UpdateDateColumn({name: "updated_at"})
    updatedAt: Date;

    constructor(title: string, year: string, description: string, more: string, link: string, tools: string) {
        this.postId = uuid();
        this.title = title;
        this.year = year;
        this.description = description;
        this.more = more;
        this.link = link;
        this.tools = tools;
    }

}

export { Post };