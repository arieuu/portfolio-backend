import "reflect-metadata"
import { DataSource } from "typeorm";
import { LooseData } from "./model/LooseData";

export const sqliteDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true,
    entities: [LooseData],
    migrations: ["./migrations/**/*{.ts,js}"],
    
});

// This is needed so we don't get a metadata error for our model

sqliteDataSource.initialize();