import "reflect-metadata";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { ExtraLink } from "./ExtraLink";

@Entity("posts")
class Post {

    @PrimaryColumn({name: "post_id"})
    @JoinColumn()
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

    /** This propriety is not defined in the database, only in this class.
        It will hold the relation instances */

    @OneToMany(() => ExtraLink, (extraLink) => extraLink.postId, { cascade: true })
    extraLinks: ExtraLink[];

    @CreateDateColumn({name: "created_at"})
    createdAt: Date;

    @UpdateDateColumn({name: "updated_at"})
    updatedAt: Date;

    constructor(title: string, year: string, description: string, more: string, link: string, tools: string, extraLinks?: ExtraLink[]) {
        this.postId = uuid();
        this.title = title;
        this.year = year;
        this.description = description;
        this.more = more;
        this.link = link;
        this.tools = tools;

        if(extraLinks) {
            this.extraLinks = [];
            for (let i = 0; i < extraLinks.length; i++) {
                this.extraLinks.push(new ExtraLink(this.postId, extraLinks[i].link, extraLinks[i].linkText));
            }
        }
    }

}

export { Post };