'use client'
import React from 'react'
import { useState } from 'react'

const ListItem = ({folder} :  {folder : string}) => {
  const [text,setText] = useState(folder)
  const [isEditing, setIsEditing] = useState(false)
  const handleKeyDown = (e : React.KeyboardEvent<HTMLTextAreaElement>)=>{
    if(e.key == "Enter"){
        setIsEditing(false)
    }
  }
  return (
    <li className = "p-1 text-center flex justify-between flex-row">
        {isEditing ? <textarea maxLength={30} value = {text} autoFocus className = "max-w-[90%] h-6" onBlur = {()=>{setIsEditing(false)}} onKeyDown={handleKeyDown} onChange={(k)=>setText(k.target.value)}/>:<a className = "flex-1 hover:bg-base-300! max-w-[80%]">{text}</a>}
        {!isEditing ? <img src = "/edit.svg" className = "size-4 p-0 m-0 btn btn-primary bg-base-200 block" onClick={()=>{
            setIsEditing(true)
        }}></img> : <p className = "hidden"></p>}
        <hr className = "w-full opacity-10"></hr></li>
  )
}

export default ListItem