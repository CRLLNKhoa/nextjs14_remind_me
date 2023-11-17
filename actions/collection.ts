"use server"
import { prisma } from "@/lib/prisma";
import { wait } from "@/lib/wait";
import { createCollectionSchemaType } from "@/schemas/createCollection";
import { currentUser } from "@clerk/nextjs";

export async function createCollection(form:createCollectionSchemaType) {
    const user = await currentUser()

    if(!user){
        throw new Error("Người dùng không tồn tại!")
    }

    return await prisma.collection.create({
        data: {
            userId: user.id,
            color: form.color,
            name: form.name
        }
    })
}


export async function deleteCollection(id:number) {
    const user = await currentUser()

    if(!user){
        throw new Error("Người dùng không tồn tại!")
    }

    return await prisma.collection.delete({
        where: {
            userId: user.id,
            id: id
        }
    })
}