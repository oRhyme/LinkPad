"use server"
import {prisma} from "../../../lib/prisma"

export async function saveCardAction(title: string, description: string, url: string, folderId: string | number){
    if(!title){
        return { success: false, error: "Title cannot be empty" }
    }

    const folderIdNum = Number(folderId)
    if(isNaN(folderIdNum)){
        return { success: false, error: "Invalid folder ID" }
    }

    try{
        await prisma.pad.create({
            data : {
                title: title,
                url: url || null,
                description: description || null,
                folderId: folderIdNum
            }
        })
        return { success: true }
    }catch(err: any){
        console.error("Error in saving cards ",err)
        return { success: false, error: err.message ?? "Failed to save card" }
    }
}