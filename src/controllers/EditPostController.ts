import { Request, Response } from "express";
import { EditPostService } from "../services/EditPostService";
import { unlink } from "fs/promises";

class EditPostController {

    async handle(request: Request, response: Response) {
        const { postId, 
                title,
                year,
                description,
                more,
                link,
                tools,
                isFirstPage,
                isHidden,
                extraLinks
        } = request.body

        // Convert values from string to boolean

        const booleanConvert = isFirstPage === "true";
        const booleanHidden = isHidden === "true";
        
        const projectImage = request.file;
        const imageUrl = projectImage.path;

        // Check for the required data before proceeding

        if (!title || !year || !description || !link || !isHidden) {
            
            // Delete the uploaded image

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

                    // Delete the uploaded image

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


        const editPostService = new EditPostService();
        const editedPost = await editPostService.execute({ postId, title, year, description, more, link, tools, isFirstPage: booleanConvert, isHidden: booleanHidden, imageUrl, extraLinks: parsedExtraLinks });

        return response.json(editedPost);
    }

}

export { EditPostController };