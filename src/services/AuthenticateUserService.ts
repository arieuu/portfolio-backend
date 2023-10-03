
interface IUserLogin {
    username: string,
    password: string
}

class AuthenticateUserService {

    async execute({ username, password }: IUserLogin) {
        // Authenticate user here

        console.log(username)
    }

}

export { AuthenticateUserService };