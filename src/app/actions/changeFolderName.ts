"use server"
import {prisma} from "../../../lib/prisma"

export const changeFolderName = async(folderID:number,newName:string)=>{
    try{
        const result = await prisma.folder.update({
            where : {id: folderID},
            data : {folderName : newName}  
    })
    }catch(err){
        console.error(err, "Unable to change folder name")
    }
}
