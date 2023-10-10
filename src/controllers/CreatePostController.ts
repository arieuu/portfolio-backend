import { Request, Response } from "express";
import { CreatePostService } from "../services/CreatePostService";
import { unlink } from "fs/promises";

class CreatePostController {

    async handle(request: Request, response: Response) {
        const { title,
                year,
                description,
                more,
                link,
                tools,
                isFirstPage,
                isHidden,
                extraLinks
        } = request.body
        
        // Convert the values from string to boolean

        const booleanConvert = isFirstPage === "true";
        const booleanHidden = isHidden == "true";
        
        const projectImage = request.file;
        const imageUrl = projectImage.path;

        // Check for the required data before proceeding

        if (!title || !year || !description || !link || !isFirstPage || !isHidden || !projectImage) {
            
            // If something goes wrong, delete the uploaded image

            try {
            
                await unlink(imageUrl);

            } catch(Err) {
                // If the image can't be deleted just move on
            }

            throw new Error("Please insert required data");
        }

        // We go through each individual extra link and check if we have everything we need

        const parsedExtraLinks = JSON.parse(extraLinks); // Parse the object from string coming from the multipart to json

        if (extraLinks) {

            for(let i = 0; i < parsedExtraLinks.length; i++) {

                if (!parsedExtraLinks[i].link) {
                    
                    // Delete uploaded image

                    try {
            
                        await unlink(imageUrl);

                    } catch(Err) {
                        // If the image can't be deleted just move on
                    }

                    throw new Error("Poorly formatted extralink, no link")
                }

                if (!parsedExtraLinks[i].linkText) {
                    
                    // Delete the uploaded image

                    try {
            
                        await unlink(imageUrl);

                    } catch(Err) {
                        // If the image can't be deleted just move on
                    }

                    throw new Error("Poorly formatted extralink, no link text")
                }
            }
        }

        const createPostService = new CreatePostService();

        const createdPost = await createPostService.execute({title, year, description, more, link, tools, isFirstPage: booleanConvert, isHidden: booleanHidden, imageUrl, extraLinks: parsedExtraLinks});

        return response.json(createdPost);
    }

}

export { CreatePostController };