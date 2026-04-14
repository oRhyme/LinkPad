'use client'
import React, { useEffect } from 'react'
import {useState, useRef} from 'react'

const Card = ({t,d,i}:{t:string, d:string,i:string}) => {

  const titleRef = useRef<HTMLTextAreaElement>(null)
  const descRef = useRef<HTMLTextAreaElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  const [title,setTitle] = useState<string>(t)
  const [description,setDescription] = useState<string>(d)
  const [image,setImage] = useState<string>(i)
  
  useEffect(()=>{
    if(titleRef.current){
      titleRef.current.style.height = "auto";
      titleRef.current.style.height = titleRef.current.scrollHeight + "px"
    }
    if(descRef.current){
      descRef.current.style.height = "auto";
      descRef.current.style.height = descRef.current.scrollHeight + "px"
    }
    if(cardRef.current){
      cardRef.current.style.height = "auto";
      cardRef.current.style.height = cardRef.current.scrollHeight + "px"
    }
  },[title,description])

  const handleInput = (e:React.FormEvent<HTMLTextAreaElement>)=>{
    
    const el = e.currentTarget;
    el.style.border = "none";
    el.style.height = "auto";
    el.style.height = el.scrollHeight + 'px';
    el.classList.contains("card-title")?setTitle(e.currentTarget.value):setDescription(e.currentTarget.value)
  }

  return (
    <div className = "card bg-base-300 card-border w-64 h-auto z-1" ref = {cardRef}>
      <figure className = "w-full shrink-0"><img src="mock.jpg" alt="" /></figure>
      <div className="card-body">
        <textarea maxLength = {80} rows= {1} className = "card-title min-h-10 overflow-y-hidden resize-none p-2" placeholder="Title" value = {title} onChange={handleInput} ref = {titleRef}></textarea>
        <textarea maxLength = {200} rows= {1} className = "min-h-5 overflow-y-hidden resize-none p-2" placeholder="Description" value = {description} onChange={handleInput} ref = {descRef}></textarea>
        
        <div className="card-actions">
         <img src="delete.svg" alt="" className = "absolute bottom-[4px] right-5 btn size-7 m-0 p-0 bg-transparent"/>
        </div>
      </div>
    </div>)
  
}

export default Card