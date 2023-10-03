import { Request, Response } from "express";
import { CreateUserService } from "../services/CreateUserService";


class CreateUserController {

    async handle(request: Request, response: Response) {
        const { username, password } = request.body;
        const createUserService = new CreateUserService();

        // Checking values

        if(!username || !password) throw new Error("Please provide necessary user information");

        const createdUser = await createUserService.execute({ username, password });

        return response.json(createdUser);
    }

}

export { CreateUserController };