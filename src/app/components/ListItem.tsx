'use client'
import React from 'react'
import { useState } from 'react'

const ListItem = ({folder,inAddMode, onEnter} :  {folder : string, inAddMode : boolean,onEnter(value : string) : void}) => {
  const [text,setText] = useState(folder)
  const [isEditing, setIsEditing] = useState(inAddMode)
  const handleKeyDown = (e : React.KeyboardEvent<HTMLInputElement>)=>{
    if(e.key == "Enter"){
        setIsEditing(false)
        onEnter(text)
    }
  }
  return (
    <li className = "p-1 text-center flex justify-between flex-row">
        {isEditing ? <input type = "text" value = {text} autoFocus className = "max-w-[90%] h-6 overflow-hidden" onBlur = {()=>{setIsEditing(false)}} onKeyDown={handleKeyDown} onChange={(k)=>setText(k.target.value)}/>:<a className = "flex-1 hover:bg-base-300! max-w-[80%] h-6">{text}</a>}
        {!isEditing ? <img src = "/edit.svg" className = "size-4 p-0 m-0 btn btn-primary bg-base-200 block" onClick={()=>{
            setIsEditing(true)
        }}></img> : <p className = "hidden"></p>}
        <hr className = "w-full opacity-10"></hr></li>
  )
}

export default ListItem