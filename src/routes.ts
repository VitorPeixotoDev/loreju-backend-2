import { Router, Request, Response } from 'express'
import multer from 'multer'
import { CreateUserController } from './controllers/user/createUserController'
import { AuthUserController } from './controllers/user/AuthUserController'
import { DetailUserController} from './controllers/user/DetailUserController'
import { CreateCategoryController } from './controllers/category/CreateCategoryController'
import { ListCategoryController } from './controllers/category/ListCategoryController'
import { CreateProductController } from './controllers/product/CreateProductController'
import { ListByCategoryControllers } from './controllers/product/ListByCategoryController'
import { CreateOrderController } from './controllers/order/CreateOrderController'
import { RemoveOrderCotroller } from './controllers/order/RemoveOrderController'
import { AddItemController } from './controllers/order/AddItemController'
import { RemoveItemController } from './controllers/order/RemoveItemController'
import { SendOrderController } from './controllers/order/SendOrderController'
import { ListOrdersController } from './controllers/order/ListOrdersController'
import { DetailOrderController } from './controllers/order/DetailOrderController'
import { FinishOrderController } from './controllers/order/FinishOrderController'
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
router.get('/category/product', isAuthenticated, new ListByCategoryControllers().handle)

// ROUTES ORDER
router.post('/order', isAuthenticated, new CreateOrderController().handle)
router.delete('/order', isAuthenticated, new RemoveOrderCotroller().handle)
router.post('/order/add', isAuthenticated, new AddItemController().handle)
router.delete('/order/remove', isAuthenticated, new RemoveItemController().handle)
router.put('/order/send', isAuthenticated, new SendOrderController().handle)
router.get('/orders', isAuthenticated, new ListOrdersController().handle)
router.get('/order/detail', isAuthenticated, new DetailOrderController().handle)
router.put('/order/finish', isAuthenticated, new FinishOrderController().handle)


// ROUTES TEST
router.get('/test', (req: Request, res: Response) => {
    return res.json({name: "loreju-backend-ok"})
})

router.get('/error', (req: Request, res: Response) => {
    throw new Error('[ALARM 01202]')
})

export { router }