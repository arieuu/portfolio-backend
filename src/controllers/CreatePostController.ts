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

        // We go through each individual extra link and check if we have everything we need

        if(extraLinks) {
            for(let i = 0; i < extraLinks.length; i++) {
                if(!extraLinks[i].link) throw new Error("Poorly formatted extralink, no link")
                if(!extraLinks[i].linkText) throw new Error("Poorly formatted extralink, no link text")
            }
        }

        const createPostService = new CreatePostService();

        const createdPost = await createPostService.execute({title, year, description, more, link, tools, extraLinks});

        return response.json(createdPost);
    }

}

export { CreatePostController };