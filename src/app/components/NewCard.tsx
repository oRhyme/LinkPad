import React from 'react'
import Card from './Card'
const NewCard = () => {
  return (
    <>
    <div className = "fixed w-full h-full bg-black top-0 left-0 z-5 opacity-30"></div>
    <div className = "card h-[90vh]! w-[30vw]! p-0! fixed! top-1/2 left-1/2! z-10 -translate-x-1/2 -translate-y-1/2 bg-gray-100">
        <div className = "card-body flex flex-col top-1/12 gap-3 p-2! h-[80%]!">
            <input type="text" className = "bg-gray-200! w-full h-10! font-bold text-2xl! font-serif! p-2!" placeholder="Title" />
            <input type="text" className = "bg-gray-200! w-full p-2!" placeholder = "url"/>
            <textarea maxLength = {200} className = "bg-gray-200! w-full max-h-[60%]! min-h-[60%]!   p-2" placeholder = "Description"></textarea>
        </div>
        <div className = "card-actions justify-end p-3! w-full! h-[20%]!">
          <input type="button" className = "btn btn-primary bg-green-400! font-bold w-12! h-6! text-sm text-gray-100! " value="SAVE" />
          <input type="button" className = "btn btn-primary bg-red-400! font-bold w-18! h-6! text-sm text-gray-100! " value="DISCARD" />

        </div>
    </div>
    </> 
  )
}

export default NewCard