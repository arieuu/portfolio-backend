import { Request, Response } from "express";
import { GetPostService } from "../services/GetPostService";


class GetPostController {

    async handle(request: Request, response: Response) {
        const postId = request.params.postId;

        const getPostService = new GetPostService();

        const result = await getPostService.execute(postId);

        return response.json(result);
    }

}

export { GetPostController };