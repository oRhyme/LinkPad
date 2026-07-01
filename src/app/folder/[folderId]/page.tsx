"use client"
import NewCard from '@/app/components/NewCard';
import { useParams } from 'next/navigation';
import React from 'react'
import {useState} from 'react'
import { useEffect } from 'react';
import { getAllPads } from '../../actions/getAllPads';
import Card from '@/app/components/Card'


const page = () => {
    const params = useParams<{folderId: string}>();
    const folderId = Number(params?.folderId) || 0;
    const [hidden,setHidden] = useState<boolean>(true)
    const [pads,setPads] = useState<any[]>([])
    const handleClick = ()=>{
      setHidden(false)
    }

    const handleAddOptimistic = (newPad: any) => {
      setPads(prev => [newPad, ...prev])
    }

    const handleSaveSuccess = (tempId: number, realPad: any) => {
      setPads(prev => prev.map(p => p.id === tempId ? realPad : p))
    }

    const handleSaveError = (tempId: number) => {
      setPads(prev => prev.filter(p => p.id !== tempId))
    }

    const handleDeleteOptimistic = (CardId: number)=>{
      setPads(prev=>prev.filter(p=>p.id!==CardId))
    }

    useEffect(()=>{
      async function fetchPads(){
        const data = await getAllPads(folderId)
        setPads(data as any)
        console.log(data)
      }
      fetchPads()
    }, [folderId])

  return (
    <>
    <div className = "flex justify-center w-full">
    <div className="min-h-screen cardList w-[98vw]">
    {pads?.map((pad:any)=>{
     return <Card key = {pad.id} t = {pad.title} d = {pad.description} i = {pad.image} url = {pad.url} CardId = {pad.id} onDelete = {handleDeleteOptimistic}/>
    })}
    </div>  
    </div>
    <img src="/plus.svg" className="btn fixed size-10 bg-green-500 border-0 rounded-full p-0 left-1/2 bottom-5 z-4 -translate-x-1/2 opacity-40 cursor-pointer hover:opacity-100 transition-opacity duration-300 hover:scale-110 transition-scale duration-300" 
    onClick = {handleClick}/>
    {!hidden && <><div className = "fixed w-full h-full bg-black top-0 left-0 z-5 opacity-30"  onClick={()=>{setHidden(true)}} ></div>
    <NewCard 
      folderId={folderId} 
      onAddOptimistic={handleAddOptimistic} 
      onSaveSuccess={handleSaveSuccess} 
      onSaveError={handleSaveError} 
      onClose={() => setHidden(true)} 
    /></>}
    </>
  )
}

export default page
