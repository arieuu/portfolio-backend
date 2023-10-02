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

// You need this or you'll get a metadata error for you model

sqliteDataSource.initialize();