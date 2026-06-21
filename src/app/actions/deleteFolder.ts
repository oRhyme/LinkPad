"use server"

import {prisma} from "../../../lib/prisma"

export const deleteFolder = async(folderID : number)=>{
    try{
        const deletedFolder = await prisma.folder.delete({
            where : {
                id: folderID
            }
        })
    }catch(err){
        console.log("Failed to delete folder ", err)
    }
}