import { Request, Response } from "express";
import { DeletePostService } from "../services/DeletePostService";


class DeletePostController {

    async handle(request: Request, response: Response) {

        // Using param for DELETE verb because sending data in request body caused issues

        const postId = (request.params.postId);

        if (!postId) throw new Error("Please provide a post id");

        const deletePostService = new DeletePostService();

        const deletedPost = await deletePostService.execute(postId);

        response.status(200); // Ok

        return response.json(deletedPost);

    }
}

export { DeletePostController };