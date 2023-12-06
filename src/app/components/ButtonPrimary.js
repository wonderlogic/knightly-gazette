import React from 'react'

const ButtonPrimary = ({text,className, id, onClick}) => {



  return (
    <button onClick={onClick} className={className}>{text}</button>
  )
}

export default ButtonPrimary