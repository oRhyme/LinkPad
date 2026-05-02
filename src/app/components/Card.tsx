'use client'
import React from 'react'
import {useState} from 'react'

const Card = ({t,d,i,c}:{t:string, d:string,i:string,c?:string}) => {

  const [title,setTitle] = useState<string>(t)
  const [description,setDescription] = useState<string>(d)
  const [image,setImage] = useState<string>(i)

  return (
    <div className= {`card bg-base-100 card-border z-1 p-3 h-fit min-h-64 w-full break-inside-avoid gap-4! mb-5! ${c}`}>
      <figure className="w-full shrink-0"><img src="mock.jpg" alt="" /></figure>
      <div className="card-body">
        <textarea maxLength={80} rows={1} style={{ resize: 'none' }} className="card-title h-fit overflow-y-hidden p-2 text-2xl! text-base-content! font-bold font-serif!" placeholder="Title" value={title} onChange={(e) => setTitle(e.currentTarget.value)}></textarea>
        <textarea maxLength={200} rows={1} style={{ resize: 'none' }} className="min-h-5 overflow-y-hidden p-2 mb-7! text-base-content! text-lg!" placeholder="Description" value={description} onChange={(e) => setDescription(e.currentTarget.value)}></textarea>
        
        <div className="card-actions">
         <img src="delete.svg" alt="" className = "absolute bottom-[4px] right-5 btn size-7 m-0 p-0 bg-transparent"/>
        </div>
      </div>
    </div>)
  
}

export default Card