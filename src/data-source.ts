import "dotenv/config";
import "reflect-metadata"
import { DataSource } from "typeorm";
import { LooseData } from "./model/LooseData";
import { User } from "./model/User";
import { Post } from "./model/Post";
import { ExtraLink } from "./model/ExtraLink";

export const sqliteDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true,
    logging: false,
    entities: [LooseData, User, Post, ExtraLink],
    migrations: ["src/migrations/**/*{.ts,.js}"],
    subscribers: [],
});

// we need to initialize the datasource so we don't get a metadata error for our model

sqliteDataSource.initialize();