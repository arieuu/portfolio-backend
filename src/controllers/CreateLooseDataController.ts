import { Request, Response } from "express";
import { CreateLooseDataService } from "../services/CreateLooseDataService";


class CreateLooseDataController {

    async handle(request: Request, response: Response) {

        const createLooseDataService  = new CreateLooseDataService();

        const { type,
                title,
                content,
                extraContent } = request.body

        // Checking if we have all the data necessary

        if (!type) throw new Error("Please choose a data title")
        if (!title) throw new Error("Please insert a title")
        if (!content) throw new Error("Please insert the content")

        // We pass the data we have to our service and it will now what to do with it

        const looseData = await createLooseDataService.execute({
            type,
            title,
            content,
            extraContent
        });
        
        // Then set response status to Ok and return everything to the client

        response.status(200); // Ok

        return response.json(looseData);
    }

}

export { CreateLooseDataController };