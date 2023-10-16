import { Router, Request, Response } from 'express'

const router = Router()

router.get('/test', (req: Request, res: Response) => {
    return res.json({name: "loreju-backend-ok"})
})

router.get('/error', (req: Request, res: Response) => {
    throw new Error('[ALARM 01202]')
})

export { router }