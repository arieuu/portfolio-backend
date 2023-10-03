import { Request, Response } from "express";
import { GetLooseDataService } from "../services/GetLooseDataService";


class GetLooseDataController {

    async handle(request: Request, response: Response) {
        const { type } = request.body;
        const getLooseDataService = new GetLooseDataService();        
        
        // We check if we have info before calling our service

        if(!type) throw new Error("Please choose a data type")

        const looseData = await getLooseDataService.execute(type);

        return response.json(looseData);
    }

}

export { GetLooseDataController };