import prismaClient from "../../prisma"

interface ProductRequest {
    name: string
    price: string
    banner: string
    description: string
    category_id: string
}

class CreateProductService {
    async execute({name, price, banner, description, category_id}: ProductRequest){
        const product = await prismaClient.product.create({
            data: {
                name: name,
                price: price,
                description: description,
                banner: banner,
                category_id: category_id
            }
        })
        return product
    }
}

export { CreateProductService }