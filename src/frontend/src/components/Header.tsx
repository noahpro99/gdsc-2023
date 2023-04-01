import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className="flex flex-row items-center justify-start w-full bg-gray-600">
      <Link to="/app">
        <div className="text-3xl font-bold
                bg-gradient-to-r bg-clip-text  text-transparent
                from-orange-500 via-orange-600 to-orange-500
                animate-text p-2 m-2
                ">
          ParkSpot
        </div>
      </Link>
    </div>
  )
}

export default Header