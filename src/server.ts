import express, { Request, Response } from "express";
import { router } from "./routes";

const app = express();

app.get("/", (request: Request, response: Response) => {
    response.send("portfolio");
});

app.use(router) // The router that was exported in routes.ts

app.listen(3000, () => {
    console.log("Listening on port 3000");
});