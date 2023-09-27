import express, { Request, Response } from "express";

const app = express()

app.get("/", (request: Request, response: Response) => {
    response.send("portfolio")
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
})