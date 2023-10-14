import { response } from "express";
import { sqliteDataSource } from "../data-source";
import { LooseData } from "../model/LooseData";


class GetLooseDataService {

    async execute(type: string) {

        const looseDataRepository = sqliteDataSource.getRepository(LooseData);

        /** 
         * If the client doesn't specify a type for the loose data we return everything in the db
         * We locate the resource or resources and return it to the controller
         */

        if (!type) {
            const looseData = await looseDataRepository.find()
            return looseData
        }

        const looseData = await looseDataRepository.findOneBy({ type });

        if(!looseData) return response.status(404)

        return looseData;
    }

}

export { GetLooseDataService };