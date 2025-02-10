import React from 'react'

const Card = ({children}) => {
  return (
    <div className="w-full h-full rounded-md p-10 bg-green-200 ">
        {children}
    </div>
  )
}

export default Card