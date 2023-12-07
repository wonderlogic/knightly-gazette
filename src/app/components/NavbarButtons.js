import React from 'react'

const NavbarButtons = ({text, onCLick}) => {
  return (
    <div>
        <a className="btn btn-ghost text-xl">{text}</a>
    </div>
  )
}

export default NavbarButtons