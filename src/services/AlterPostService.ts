import { sqliteDataSource } from "../data-source";
import { Post } from "../model/Post";

interface IPost {
    postId: string;
    isFirstPage: boolean,
    isHidden: boolean,
}

class AlterPostService {

    async execute({postId, isFirstPage, isHidden }: IPost) {

        const postRepository = sqliteDataSource.getRepository(Post);

        // Edit and set all that data where that post id is matched

        const receivedPost = {
            postId: postId,
            isFirstPage: isFirstPage,
            isHidden: isHidden,
        }

        /**
         * Preload will get the provided object from the database and replace the data
         * with the fields we pass it, the rest will come as is
         */

        const updatedPost = await postRepository.preload(receivedPost);

        if (!updatedPost) throw new Error("No such post");

        const savedPost = await postRepository.save(updatedPost)

        // Only after everything is done we return the resulting object to the user

        return savedPost;

    }

}

export { AlterPostService };
