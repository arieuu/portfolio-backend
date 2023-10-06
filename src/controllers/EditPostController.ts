import { Request, Response } from "express";
import { EditPostService } from "../services/EditPostService";


class EditPostController {

    async handle(request: Request, response: Response) {
        const { postId, 
                title,
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

                extraLinks[i].postId = postId
            }
        }

        const editPostService = new EditPostService();

        const editedPost = await editPostService.execute({ postId, title, year, description, more, link, tools, extraLinks });

        return response.json(editedPost);
    }

}

export { EditPostController };