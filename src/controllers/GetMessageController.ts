import { Request, Response } from "express";


class GetMessageController {

    async handle(request: Request, response: Response) {
        return response.send("This is the message");
    }

}

export { GetMessageController };