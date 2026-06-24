"use server"
import {prisma} from "../../../lib/prisma"

export async function deleteCardAction(CardId: number){
    await prisma.pad.delete({
        where : {
            id: CardId
        }
    })
}