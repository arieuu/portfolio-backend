import { Request, Response } from "express";
import { GetLooseDataService } from "../services/GetLooseDataService";


class GetLooseDataController {

    async handle(request: Request, response: Response) {
        const type = request.params.type.split(":")[1];
        const getLooseDataService = new GetLooseDataService();        
        
        // We check if we have info before calling our service

        const looseData = await getLooseDataService.execute(type);

        return response.json(looseData);
    }

}

export { GetLooseDataController };