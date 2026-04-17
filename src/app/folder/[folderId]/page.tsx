import React from 'react'

const page = async ({params} : {params : Promise<{folderId : string}>}) => {
    const {folderId} = await params;
  return (
    <div>This is folder {folderId}</div>
  )
}

export default page