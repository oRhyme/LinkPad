"use server";
import {prisma} from "../../../lib/prisma"

export async function getUserData(userEmail : string){

    try{
        const userID = await prisma.user.findUnique({
          where : {
            email : userEmail
          },
          select : {
            id : true
          }
        })
        if(userID){
            return userID
        }else{
            throw new Error("User not found")
        }
        
    }catch(error){
        console.log(error);
        return null;
    }

}