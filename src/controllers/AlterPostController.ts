import { Request, Response } from "express";
import { AlterPostService } from "../services/AlterPostService";

class AlterPostController {

    async handle(request: Request, response: Response) {
        const { postId, 
                isFirstPage,
                isHidden,
        } = request.body

        // Check for the required data before proceeding

        if (isFirstPage == null || isHidden == null) {
            
            // Delete the uploaded image

            throw new Error("Please insert required data");
        }
        
        const alterPostService = new AlterPostService();
        const editedPost = await alterPostService.execute({ postId,  isFirstPage: isFirstPage, isHidden: isHidden});

        return response.json(editedPost);
    }

}

export { AlterPostController };
