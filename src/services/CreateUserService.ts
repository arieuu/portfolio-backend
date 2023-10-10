import { sqliteDataSource } from "../data-source";
import { User } from "../model/User";
import { hash } from "bcryptjs";

interface IUser{
    username: string,
    password: string
}

class CreateUserService {

    async execute({ username, password }: IUser) {

        const userRepository = sqliteDataSource.getRepository(User);
        const users = await userRepository.find();

        // We check if there are any users in the database, if so we don't create any

        if (users.length > 0) throw new Error("Can't register any more users");

        // We hash the given password, create a new User instance and persist it to the DB

        const hashedPassword = await hash(password, 8);

        const user = new User(username, hashedPassword);
    
        await userRepository.save(user);

        return user;

    }

}

export { CreateUserService };