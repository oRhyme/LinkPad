"use client"
import NewCard from '@/app/components/NewCard';
import { useParams } from 'next/navigation';
import React from 'react'
import {useState} from 'react'

const page = () => {
    const params = useParams();
    const folderId = params.folderId;
    const [hidden,setHidden] = useState<boolean>(true)
    
    const handleClick = ()=>{
      setHidden(false)
    }

  return (
    <>
    <div>This is folder {folderId}</div>
    <img src="/plus.svg" className="btn fixed size-10 bg-green-500 border-0 rounded-full p-0 left-1/2 bottom-5 z-4 -translate-x-1/2 opacity-40 cursor-pointer hover:opacity-100 transition-opacity duration-300 hover:scale-110 transition-scale duration-300" 
    onClick = {handleClick}/>
    {!hidden && <NewCard/>}
    </>
  )
}

export default page
