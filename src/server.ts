import express, { Request, Response } from "express";
import { router } from "./routes";
import bodyParser from "body-parser";

const app = express();

app.get("/", (request: Request, response: Response) => {
    response.send("portfolio");
});

// Using this package so we can read the request body

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(router) // The router that was exported in routes.ts

app.listen(3000, () => {
    console.log("Listening on port 3000");
});