import { response } from "express";
import { sqliteDataSource } from "../data-source";
import { Post } from "../model/Post";


class GetPostService {

    async execute(postId?:string) {

        const postRepository = sqliteDataSource.getRepository(Post);

        if (!postId) {
            const posts = await postRepository.find();
            return posts;
        }

        const post = await postRepository.findOneBy({ postId });

        if(!post || post == null) return response.status(404);

        return post; 
    }

}

export { GetPostService };