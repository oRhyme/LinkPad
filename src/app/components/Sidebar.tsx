'use client'
import React, {useState} from 'react'
import ListItem from './ListItem'
const Sidebar = () => {
  const [folderList,setFolderList] = useState(["hello","world","this","is","test","hi"])
  const [addMode,setAddMode] = useState(false)
  const addNewFolder = ()=>{
    setAddMode(true)
  }
  const onEnter = (value : string)=>{
    setAddMode(false)
    if (addMode){
      setFolderList([...folderList,value])
    }
  }

  return (
    <div className="drawer absolute z-3">
      <input id="side-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-side top-16 h-[calc(100vh-3rem)] w-80">
        <label htmlFor="side-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className=" absolute my-5 menu p-5 w-full bg-base-200 text-base-content min-h-[calc(100vh-3rem)] text-center">
        <div className="flex align-center justify-between my-3!">
          <h2 className = "ml-1 font-bold text-lg font-serif">Folders</h2>
          <img src = "./plus.svg" className = "size-5 btn btn-primary mr-3!" onClick = {addNewFolder}></img>
        </div>
          {folderList.map((folder)=>(
            <ListItem folder = {folder} inAddMode = {false} onEnter = {onEnter}/>
          ))}
          {addMode && <ListItem folder = {""} inAddMode = {true} onEnter = {onEnter}/>}
        </ul>
      </div>
    </div>
  )
}

export default Sidebar