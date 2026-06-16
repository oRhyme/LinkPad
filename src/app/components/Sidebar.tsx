"use client"
//TODO: REMOVE ANY PRISMA USAGES
import React, { useState } from "react";
import ListItem from "./ListItem";
import { useEffect } from "react";
import { authClient } from "../../../lib/auth/client";
import { getUserFolders } from "../actions/getUserFolders"
import {getUserData} from "../actions/getUserData"

const Sidebar = () => {
  const [folderList, setFolderList] = useState<{ id: number; folderName: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [addMode, setAddMode] = useState(false);
  const [userEmail, setUserEmail] = useState("")
  const [userID,setUserID] = useState<number>()

  useEffect(() => {
    const fetchUserID = async ()=>{
      try{
        //get user email from neon auth client
        const { data } = await authClient.getSession();
        if (!data?.user?.email) {
          setLoading(false);
          return;
        }
        setUserEmail(data.user.email);

        //get user ID from prisma
        const tempUserID = await getUserData(data?.user?.email)
        setUserID(tempUserID?.id)
      }catch(err){
        console.log(err)
      }
    }
    
    const fetchFolders = async () => {
      try {

        const result:any = await getUserFolders(userEmail);
        setFolderList(result.folders);
      } catch (err) {
        console.error("Failed to load folders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFolders();
  }, []);

  const addNewFolder = () => {
    setAddMode(true);
  };

  const onEnter = (value: string) => {
    setAddMode(false);
    if (addMode && value.trim()) {
      setFolderList([...folderList, { id: Date.now(), folderName: value }]);
      // const addFolderToPrisma = async ()=>{
      //   await prisma.folder.create({
      //     data : {
      //       folderName : value,
      //       author : {
      //         connect : {
      //           email : userEmail,
      //         },
      //       },
      //     }, 
      //   })
      // }
    }
  };

  return (
    <div className="drawer absolute z-3">
      <input id="side-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-side top-16 h-[calc(100vh-3rem)]">
        <label
          htmlFor="side-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-5 w-80 bg-base-200 text-base-content min-h-[calc(100vh-3rem)] text-center">
          <div className="flex align-center justify-between my-3!">
            <h2 className="ml-1 font-bold text-lg font-serif">Folders</h2>
            <img
              src="./plus.svg"
              className="size-5 btn btn-primary mr-3!"
              onClick={addNewFolder}
            ></img>
          </div>

          {loading ? (
            <li className="p-4 text-sm opacity-50">Loading folders...</li>
          ) : folderList.length === 0 && !addMode ? (
            <li className="p-4 text-sm opacity-50">No folders yet</li>
          ) : (
            folderList.map((folder) => (
              <ListItem
                key={folder.id}
                folder={folder.folderName}
                inAddMode={false}
                onEnter={onEnter}
              />
            ))
          )}
          {addMode && (
            <ListItem folder={""} inAddMode={true} onEnter={onEnter} key={null} />
          )}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

