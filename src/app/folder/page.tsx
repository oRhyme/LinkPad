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
    <div>This is folder {folder}</div>
  )

}

export default page