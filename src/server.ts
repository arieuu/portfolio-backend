import "express-async-errors"; // Library that returns errors as json responses, needed to import first
import express, { NextFunction, Request, Response } from "express";
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

// Return all errors to the API as a bad request instead of the console
app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if(err instanceof Error) {
        return response.status(400).json({Error: err.message});
    }

    // In case something else goes terribly wrong return an internal server error
    return response.status(500).json({
        status: "Server error",
        message: "Internal server Error"
    });

});


app.listen(3000, () => {
    console.log("Listening on port 3000");
});