import {prisma} from "../../../lib/prisma"

export async function getUserFolders(userEmail: string){
    try {
        const user = await prisma.user.findUnique({
            where : {
                email : userEmail
            },
            include : {
                folders : true
            }
        })
        if(!user){
            throw new Error("User not found");
        }
        return user.folders;
    }catch(err){
        console.log(err)
        return [];

    }
}