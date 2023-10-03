import { sqliteDataSource } from "../data-source";
import { LooseData } from "../model/LooseData";


class GetLooseDataService {

    async execute(type: string) {

        // We locate the resource in the database and return it to the controller

        const looseDataRepository = sqliteDataSource.getRepository(LooseData);
        const looseData = looseDataRepository.findOneBy({ type });

        return looseData;
    }

}

export { GetLooseDataService };