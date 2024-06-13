import { Business, User } from "prisma/generated/client";

export const userToReturnMapper = (user:User):Partial<User> =>{
    return {
        id: user.id,
        name: user.name,
        email: user.email
    }
}

export const businessToReturnMapper = (business:Business):Partial<Business> =>{
    return {
        id: business.id,
        company: business.company,
        email: business.email
    }
}