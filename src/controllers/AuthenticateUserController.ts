import { Request, Response } from "express";
import { AuthenticateUserService } from "../services/AuthenticateUserService";


class AuthenticateUserController {

    async handle(request: Request, response: Response) {
        const { username, password } = request.body;
        const authenticateUseService = new AuthenticateUserService();

        // Checking if we got the data

        if(!username || !password) throw new Error("Please provide all necessary login data");

        authenticateUseService.execute({ username, password })

        return response.json({username, password});
    }

}

export { AuthenticateUserController };