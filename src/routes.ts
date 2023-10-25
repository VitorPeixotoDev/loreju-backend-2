import { Router, Request, Response } from 'express'
import multer from 'multer'
import { CreateUserController } from './controllers/user/createUserController'
import { AuthUserController } from './controllers/user/AuthUserController'
import { DetailUserController} from './controllers/user/DetailUserController'
import { CreateCategoryController } from './controllers/category/CreateCategoryController'
import { ListCategoryController } from './controllers/category/ListCategoryController'
import { CreateProductController } from './controllers/product/CreateProductController'
import uploadConfig from './config/multer'

import { isAuthenticated } from './middlewares/isAuthenticated'

const router = Router()
const upload = multer(uploadConfig.upload("./tmp"))

// ROUTES USER
router.post('/users', new CreateUserController().handle)
router.post('/session', new AuthUserController().handle)
router.get('/me', isAuthenticated, new DetailUserController().handle)

// ROUTES CATEGORY
router.post('/category', isAuthenticated, new CreateCategoryController().handle)
router.get('/list_category', isAuthenticated, new ListCategoryController().handle)


// ROUTES PRODUCTS
router.post('/product', isAuthenticated, upload.single('file'), new CreateProductController().handle)


// ROUTES TEST
router.get('/test', (req: Request, res: Response) => {
    return res.json({name: "loreju-backend-ok"})
})

router.get('/error', (req: Request, res: Response) => {
    throw new Error('[ALARM 01202]')
})

export { router }