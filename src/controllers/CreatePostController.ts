import { Request, Response } from "express";
import { CreatePostService } from "../services/CreatePostService";



class CreatePostController {

    async handle(request: Request, response: Response) {
        const { title,
                year,
                description,
                more,
                link,
                tools,
                extraLinks
        } = request.body

        // Check for the required data before proceeding

        if(!title || !year || !description || !link) throw new Error("Please insert required data");

        const createPostService = new CreatePostService();

        const createdPost = await createPostService.execute({title, year, description, more, link, tools, extraLinks});

        return response.json(createdPost);
    }

}

export { CreatePostController };