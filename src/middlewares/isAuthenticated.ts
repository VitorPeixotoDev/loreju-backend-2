import { NextFunction, Request, Response } from "express"
import { verify } from 'jsonwebtoken'

interface Payload {
    sub: string

}

export function isAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
){
    // receber token
    const authToken = req.headers.authorization

    if(!authToken){
        return res.status(401).end()
    }

    const [, token] = authToken.split(' ')
    
    try {
        const { sub } = verify(
            token, 
            process.env.JWT_SECRET
        ) as Payload
    // recupera id do token e insere no req através da variável user_id
        req.user_id = sub

        return next()
    } catch (error) {
        return res.status(400).end()        
    }
}