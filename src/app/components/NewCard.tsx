"use client"
import React from 'react'
import Card from './Card'
import {useState} from 'react'
import { saveCardAction } from '../actions/saveCardAction'
interface NewCardProps {
  folderId: number;
  onAddOptimistic?: (pad: any) => void;
  onSaveSuccess?: (tempId: number, realPad: any) => void;
  onSaveError?: (tempId: number) => void;
  onClose?: () => void;
}

const NewCard = ({ folderId, onAddOptimistic, onSaveSuccess, onSaveError, onClose }: NewCardProps) => {

  const [title,setTitle] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [url, setUrl] = useState<string>("")
  
  const saveCard = async ()=>{
    const tempId = Date.now()
    const optimisticPad = {
      id: tempId,
      title,
      description,
      url,
      folderId
    }

    if (onAddOptimistic) {
      onAddOptimistic(optimisticPad)
    }

    if (onClose) {
      onClose()
    }

    try {
      const result = await saveCardAction(title,description,url,folderId)
      if(result?.success){
        setTitle("")
        setDescription("")
        setUrl("")
        if (onSaveSuccess && result.pad) {
          onSaveSuccess(tempId, result.pad)
        }
      } else {
        console.error("Save failed:", result?.error)
        if (onSaveError) {
          onSaveError(tempId)
        }
      }
    } catch(err) {
      console.error("Error calling saveCardAction:", err)
      if (onSaveError) {
        onSaveError(tempId)
      }
    }
  }

  return (
    <>
    
    <div className = "card h-[90vh]! w-[30vw]! p-0! fixed! top-1/2 left-1/2! z-10 -translate-x-1/2 -translate-y-1/2 bg-gray-100">
        <div className = "card-body flex flex-col top-1/12 gap-3 p-2! h-[80%]!">
            <input type="text" className = "bg-gray-200! w-full h-10! font-bold text-2xl! font-serif! p-2!" placeholder="Title" value = {title} onChange={(e)=>{setTitle(e.target.value)}}/>
            <input type="text" className = "bg-gray-200! w-full p-2!" placeholder = "url" value = {url} onChange={(e)=>{setUrl(e.target.value)}}/>
            <textarea maxLength = {200} className = "bg-gray-200! w-full max-h-[60%]! min-h-[60%]!   p-2" placeholder = "Description" value = {description} onChange={(e)=>{setDescription(e.target.value)}}></textarea>
        </div>
        <div className = "card-actions justify-end p-3! w-full! h-[20%]!">
          <input type="button" className = "btn btn-primary bg-green-400! font-bold w-12! h-6! text-sm text-gray-100! " value="SAVE" onClick={saveCard}/>
          <input type="button" className = "btn btn-primary bg-red-400! font-bold w-18! h-6! text-sm text-gray-100! " value="DISCARD" onClick={onClose} />

        </div>
    </div>
    </> 
  )
}

export default NewCard