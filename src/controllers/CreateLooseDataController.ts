import { Request, Response } from "express";
import { CreateLooseDataService } from "../services/CreateLooseDataService";


class CreateLooseDataController {

    async handle(request: Request, response: Response) {

        const createLooseDataService  = new CreateLooseDataService();

        const { type,
                title,
                content,
                extraContent } = request.body

        const looseData = await createLooseDataService.execute({
            type,
            title,
            content,
            extraContent
        });
        
        return response.json(looseData);
    }

}

export { CreateLooseDataController };