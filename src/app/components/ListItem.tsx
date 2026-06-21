"use client";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "../../../lib/auth/client";
import {changeFolderName} from "../actions/changeFolderName"
import {deleteFolder} from "../actions/deleteFolder"

const ListItem = ({
  ID,
  folder,
  inAddMode,
  onEnter,
}: {
  ID: number;
  folder: string;
  inAddMode: boolean;
  onEnter(value: string): void;
}) => {
  const router = useRouter();
  const [text, setText] = useState(folder);
  const [isEditing, setIsEditing] = useState(inAddMode);
  const [hidden,setHidden] = useState(false)
  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter" && !isEditing) {
      // setIsEditing(false);
      onEnter(text);
    }else if(e.key == "Enter" && isEditing){
      await changeFolderName(ID,text);
      setIsEditing(false);
      onEnter(text);
    }
  };
  const itemClicked = async (e: React.MouseEvent) => {
    router.push(`/folder/${ID}`); 
    const{data,error} = await authClient.getSession();
    console.log(data)
  };

  const deleteF = async()=>{
    await deleteFolder(ID)
    router.refresh()
    setHidden(true)
  }


  return (
    <li className="p-1 text-center flex justify-between flex-row" onClick = {itemClicked}>
      {isEditing?(
        <input
          type="text"
          value={text}
          autoFocus
          className="max-w-[90%] h-6 overflow-hidden"
          onBlur={() => {
            setIsEditing(false);
            onEnter(text);
          }}
          onKeyDown={handleKeyDown}
          onChange={(k) => setText(k.target.value)}
        />
      ) : (
        !hidden && 
        <div className="flex flex-row w-80 ">
          <a className="flex-2 hover:bg-base-300! max-w-[80%] h-6">{text}</a>
          <img src="/delete.svg" className = "size-4 btn btn-primary bg-base-200" onClick={deleteF}/>
          <img
            src="/edit.svg"
            className = "size-4 hover:size-5 btn btn-primary bg-base-200"
            onClick={() => {
              setIsEditing(true);
            } }
          ></img>
        </div>
      )}
      {/* {!isEditing ? (
        <div className="size-4 p-0 m-0 flex absolute  ">
          <img src="/delete.svg" />
          <img
            src="/edit.svg"
            onClick={() => {
              setIsEditing(true);
            }}
          ></img>
        </div>
      ) : (
        <p className="hidden"></p>
      )} */}
      <hr className="w-full opacity-10"></hr>
    </li>
  );
};

export default ListItem;
