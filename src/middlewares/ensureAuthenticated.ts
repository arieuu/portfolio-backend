import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { sqliteDataSource } from "../data-source";
import { User } from "../model/User";


interface IPayload {
    sub: string;
}

function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    const token = request.headers.authorization;

    if(!token) return response.status(401).end() // Forbidden

    const [bearer, tokenString] = token.split(" "); // Removing bearer from the token string

    try {
        
        const decoded = verify(tokenString, "0cf0607937013cb58d79a7d3c59d4e11") as IPayload;

        // We retrieve the userId that we saved on subject uppon authentication

        const subject = decoded.sub;

        /* 
         * Saving the content of subject(the user id) to the body of every request this user does while authenticated
         * This is a custom field I created by using declaration merging. (see src/@types/express) 
        */

        request.authUserId = subject; // Authenticated user id

    } catch(err) {
        return response.status(401).end();
    }

    // Check if the authenticated user exists in the database

    const tokenUserId = request.authUserId;
    const userRepository = sqliteDataSource.getRepository(User);

    const user = userRepository.findOne({
        where: {
            username: tokenUserId
        }
    });

    if (!user) {

        // if there is no user for that id we stop the process

        return response.status(401).end(); // forbidden
    }

    return next(); // give client permission to proceed by moving execution forward

}

export { ensureAuthenticated };