"use server"
import {prisma} from "../../../lib/prisma"

export const getAllPads = async(FId : number|string)=>{

    try{
        const pads = await prisma.pad.findMany({
            where : {
                folderId: Number(FId)
            },
            orderBy:{
                id : 'desc'
            }
        })
        return pads

    }
    catch(error){
        console.log(error)
        return null
    }
}

    