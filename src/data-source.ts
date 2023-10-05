import "reflect-metadata"
import { DataSource } from "typeorm";
import { LooseData } from "./model/LooseData";
import { User } from "./model/User";
import { Post } from "./model/Post";
import { ExtraLink } from "./model/ExtraLink";
// import { } from "./migrations/*.ts"

export const sqliteDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true,
    logging: false,
    entities: [LooseData, User, Post, ExtraLink],
    migrations: ["src/migrations/**/*{.ts,.js}"],
    subscribers: [],
});

// This is needed so we don't get a metadata error for our model

sqliteDataSource.initialize();