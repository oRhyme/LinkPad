import React from 'react'
import { authClient } from '../../../lib/auth/client';

const page = async ({params} : {params : Promise<{folder : string}>}) => {
    const {folder} = await params;
    const{data,error} = await authClient.getSession()
    if(data){
      console.log(data)
    }
    if(error){
      console.log(error)
    }
  return (
    <>
    <div>This is folder {folder}</div>
    <img src="/plus.svg" className="btn fixed size-10 bg-green-500 border-0 rounded-full p-0 left-1/2 bottom-5 z-4 -translate-x-1/2 opacity-40 cursor-pointer hover:opacity-100 transition-opacity duration-300 hover:scale-110 transition-scale duration-300" />
    </>
  )

} 

export default page