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
        
        // Checking if there's already data so we can just edit

        const looseDataAlreadyExists = await looseDataRepository.findOneBy({type});

        // If this type of loose data is already present in the database we just edit the
        // existing data and return the result to the client right away

        if (looseDataAlreadyExists) {
            await looseDataRepository.update({ type: type}, {type: type, title: title, content: content, extraContent: content});
            const resultEditedData = looseDataRepository.findOneBy({type});

            return resultEditedData;
        }

        // Create new data instance with the provided data if it doesn't yet exist

        const looseData = new LooseData(type, title, content, extraContent);

        // Persist instance to database

        await looseDataRepository.save(looseData);

        // Return created instance so that it can be displayed to client as response

        return looseData;

    }

}

export { CreateLooseDataService };