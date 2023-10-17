import prismaClient from "../../prisma"

interface UserRequest {
    name: string
    email: string
    password: string 
}

class CreateUserService {
    async execute({name, email, password}: UserRequest){

        //verificar informações
        if(!email){
            throw new Error("Email incorretct")
        }

        //verificar se email já está cadastrado
        const userAlreadyExists = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })

        if(userAlreadyExists){
            throw new Error("User already exists")
        }

        //cadastrar usuário
        const user = await prismaClient.user.create({
            data: {
                name: name,
                email: email,
                password: password
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        })

        console.log(user)
        return { user }
    }
}

export { CreateUserService }