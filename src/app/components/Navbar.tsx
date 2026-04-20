"use client";
import React, { useState, useEffect } from 'react'
import { UserButton } from '@neondatabase/auth/react';
import '@neondatabase/neon-js/ui/css'

const Navbar = () => {
  const [theme, setTheme] = useState('bumblebee');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'bumblebee' : 'dark');
  };

  return (
    <div className="navbar-center bg-base-100 w-full justify-center h-16 mb-5! text-base-content!">
        <div className="flex flex-row items-center justify-start flex-1 gap-1 pl-2 z-2">
        <label htmlFor="side-drawer" className="btn btn-sm btn-ghost bg-base-300 hover:bg-primary p-1 drawer-button">
          <img src="/menu.svg" alt="menu" className="w-8 h-8" />
        </label>
        <h2 className="text-center font-serif text-3xl!">LinkBoard</h2>
        </div>
        <div className="flex flex-1 flex-row justify-end gap-5 items-center pr-3">
        <UserButton className="bg-base-100 text-primary-content hover:bg-base-300!" />
        <img 
          src="/moon.svg" 
          className="btn btn-primary rounded-full size-10 p-2 bg-white hover:bg-base-300 cursor-pointer"
          onClick={toggleTheme}
          alt="toggle theme"
        />
        </div>
    </div>
  )
}

export default Navbar