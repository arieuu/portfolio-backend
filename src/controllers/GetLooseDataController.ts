import { Request, Response } from "express";
import { GetLooseDataService } from "../services/GetLooseDataService";


class GetLooseDataController {

    async handle(request: Request, response: Response) {
        const type = request.params.type;

        const getLooseDataService = new GetLooseDataService();        
        
        // We check if we have info before calling our service

        const looseData = await getLooseDataService.execute(type);

        response.status(200); // Ok

        return response.json(looseData);
    }

}

export { GetLooseDataController };