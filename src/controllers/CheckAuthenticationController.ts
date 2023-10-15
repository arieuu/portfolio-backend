import { Request, Response } from "express";


class CheckAuthenticationController {

    async handle(request: Request, response: Response) {

        // If the request makes it here then the user is authenticated

        return response.status(200).end();
    }

}

export default CheckAuthenticationController;