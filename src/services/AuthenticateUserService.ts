import { compare } from "bcryptjs";
import { sqliteDataSource } from "../data-source";
import { User } from "../model/User";
import { sign } from "jsonwebtoken";

interface IUserLogin {
    username: string,
    password: string
}

class AuthenticateUserService {

    async execute({ username, password }: IUserLogin) {

        const userRepository = sqliteDataSource.getRepository(User);
        const user = await userRepository.findOneBy({username});

        if(!user) throw new Error("Username/password incorrect");

        const passwordMatch = await compare(password, user.password);

        if(!passwordMatch) throw new Error("Username/password incorrect");

        // Past here it means the user has succesfully authenticated
        // We will now give them a unique token (using jsonwebtoken)

        const token = sign(
           {
            login: user.username
           }, "0cf0607937013cb58d79a7d3c59d4e11", // Private key, a secretword. Here I hashed it
           {
            subject: user.username,
            expiresIn: "1d" // This token will expire in 1 day
           }
        );

        return token;

    }

}

export { AuthenticateUserService };