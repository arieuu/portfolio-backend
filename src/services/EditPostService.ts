import { sqliteDataSource } from "../data-source";
import { ExtraLink } from "../model/ExtraLink";
import { Post } from "../model/Post";

interface IPost {
    postId: string;
    title: string,
    year: string,
    description: string,
    more: string,
    link: string,
    tools: string,
    extraLinks?: ExtraLink[]
}

class EditPostService {

    async execute({postId, title, year, description, more, link, tools, extraLinks }: IPost) {

        const postRepository = sqliteDataSource.getRepository(Post);
        const extraLinksRepository = sqliteDataSource.getRepository(ExtraLink);

        // Edit and set all that data where that post id is matched

        const receivedPost = {
            postId: postId,
            title: title,
            year: year,
            description: description,
            more: more,
            link: link,
            tools: tools,

            /* one to many relation, we use eager in Post class to go deeper
            * We don't set a value for it so it doesn't get replaced by preload
            * we just aknowlodge it */

            extraLinks
            
        }

        /**
         * Preload will get the provided object from the database and replace the data
         * with the fields we pass it, the rest will come as is
         */

        const updatedPost = await postRepository.preload(receivedPost);

        const savedPost = await postRepository.save(updatedPost)

        /*
        * Preload will edit the fields but will leave the old ones with a null value for the foreign key,
        * to fix it we need to do some extra cleaning up!
        * 
        * We gather all the broken entries in the "extra_links" table after the update and then remove them
        * one by one. Kinda hacky, but we're going with that for now 
        */

        const deadLinks = await extraLinksRepository.find({
                where: {
                    postId: null,
                }
        });

        for(let i = 0; i < deadLinks.length; i++) {
            await extraLinksRepository.delete(deadLinks[i]);
            console.log("DELETED")
        }

        // Only after everything is done we return the resulting object to the user

        return savedPost;

    }

}

export { EditPostService };