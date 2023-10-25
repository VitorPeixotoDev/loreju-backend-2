import prismaClient from "../../prisma"

interface ProductRequest {
    name: string
    price: string
    description: string
    category_id: string
}

class CreateProductService {
    async execute({name, price, description, category_id}: ProductRequest){
        return { ok: true}
    }
}

export { CreateProductService }