import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("user")
class User {

    @Column({name: "user_id"})
    readonly userId: string;

    @PrimaryColumn()
    username: string;

    @Column()
    password: string;

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;

        if (!this.userId) this.userId = uuid();
    }

}

export { User };