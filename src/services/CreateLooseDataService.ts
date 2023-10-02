import { sqliteDataSource } from "../data-source";
import { LooseData } from "../model/LooseData";


interface ILooseData {
    type: string,
    title: string,
    content: string,
    extraContent: string
}

class CreateLooseDataService {

    async execute({ type, title, content, extraContent }: ILooseData) {
        
        const looseDataRepository = sqliteDataSource.getRepository(LooseData);
        
        // Create new data instance with the provided data

        const looseData = new LooseData(type, title, content, extraContent);

        // Persist instance to database

        await looseDataRepository.save(looseData);

        // Return created instance so that it can be displayed to client as response

        return looseData;

    }

}

export { CreateLooseDataService };