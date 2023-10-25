import { Request, Response } from "express"
import { ListOrderService } from "../../services/order/ListOrderService"

class ListOrdersController {
    async handle(req: Request, res: Response){
        const listOrdersSevice = new ListOrderService()
        const orders = await listOrdersSevice.execute()

        return res.json(orders)
    }
}

export { ListOrdersController }