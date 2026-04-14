import React from 'react'

const Sidebar = () => {
  return (
    <div className="drawer absolute z-10">
      <input id="side-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-side top-12 h-[calc(100vh-3rem)]">
        <label htmlFor="side-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 bg-base-200 text-base-content min-h-[calc(100vh-3rem)] ">
          <li ><a>Hello</a></li>
          <li ><a>World</a></li>
          <li ><a>This</a></li>
          <li ><a>This</a></li>
          <li ><a>This</a></li>
          <li ><a>This</a></li>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar