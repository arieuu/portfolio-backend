import { sqliteDataSource } from "../data-source";
import { Post } from "../model/Post";


class GetPostService {

    async execute(postId?:string) {

        const postRepository = sqliteDataSource.getRepository(Post);

        if(!postId) {
            const posts = await postRepository.find();
            return posts;
        }

        const post = postRepository.findOneBy({ postId });

        return post; 
    }

}

export { GetPostService };