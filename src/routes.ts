import { Router, Request, Response } from 'express'
import { CreateUserController } from './controllers/user/createUserController'

const router = Router()

// ROUTES USER
router.post('/users', new CreateUserController().handle)


// ROUTES TEST
router.get('/test', (req: Request, res: Response) => {
    return res.json({name: "loreju-backend-ok"})
})

router.get('/error', (req: Request, res: Response) => {
    throw new Error('[ALARM 01202]')
})

export { router }