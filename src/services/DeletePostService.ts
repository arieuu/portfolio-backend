import { sqliteDataSource } from "../data-source";
import { Post } from "../model/Post";
import { unlink } from "node:fs/promises"

class DeletePostService {

    async execute(postId: string) {

        const postRepository = sqliteDataSource.getRepository(Post);

        /**
         * We look up the required post first to see if it exists and also to have
         * something to return when deletion is complete.
         * If the post doesn't exist we throw an error, if it does we delete it and
         * return the post object we fetched earlier
         */

        const post = await postRepository.findOne({where: {postId: postId}});

        if(!post) throw new Error("This required post does not exist");

        await postRepository.delete({ postId: postId });

        try {
         
        await unlink(post.imageUrl);

        } catch(Err) {
            // If the image can't be deleted just move on
        }

        return post;
    }

}

export { DeletePostService };