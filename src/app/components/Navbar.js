import React from 'react'
import NavbarButtons from './NavbarButtons'
import ThemeDropdown from './ThemeDropdown'

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 justify-between">
        <div className="flex items-center space-x-4 py-8 ">
          <img
            src="images/knightly-gazette.png"
            alt="Knightly Gazette logo"
            className="h-24 w-24 rounded-md"
          />
          <h1 className="text-4xl font-bold text-base-content">
            Knightly Gazette
          </h1>
        </div>
        <div>
          <NavbarButtons text="Home"/>
          <NavbarButtons text="New Post"/>
          <ThemeDropdown/>
        </div>
    </div>
  )
}

export default Navbar