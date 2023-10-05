import { sqliteDataSource } from "../data-source";
import { ExtraLink } from "../model/ExtraLink";
import { Post } from "../model/Post";


interface IPost {
    title: string,
    year: string,
    description: string,
    more: string,
    link: string,
    tools: string,
    extraLinks?: ExtraLink[]
}


class CreatePostService {

    async execute({ title, year, description, more, link, tools, extraLinks }: IPost) {

        const postRepository = sqliteDataSource.getRepository(Post);

        const post = new Post(title, year, description, more, link, tools, extraLinks);

        await postRepository.save(post);

        return post;

    }

}

export { CreatePostService };