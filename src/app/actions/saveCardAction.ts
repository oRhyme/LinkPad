"use server"
import {prisma} from "../../../lib/prisma"
import {foo} from "../actions/getImage"

export async function saveCardAction(title: string, description: string, url: string, folderId: string | number){
    if(!title){
        return { success: false, error: "Title cannot be empty" }
    }

    const folderIdNum = Number(folderId)
    if(isNaN(folderIdNum)){
        return { success: false, error: "Invalid folder ID" }
    }
    try{
        const image = await foo(url);

        const newPad = await prisma.pad.create({
            data : {
                title: title,
                url: url || null,
                image: image || null,
                description: description || null,
                folderId: folderIdNum
            }
        })
        return { success: true, pad: newPad }
    }catch(err: any){
        console.error("Error in saving cards ",err)
        return { success: false, error: err.message ?? "Failed to save card" }
    }
}