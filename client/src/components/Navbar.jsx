import React from 'react'
import avatar from '../assets/images/default_user.jpg'


function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gray-800 text-white p-4 flex justify-between items-center shadow-md">

      <div className="text-2xl font-bold">
        <p>BookSpot</p>
      </div>

      <div className="flex items-center space-x-6 ">
        <ul className="flex space-x-4 font-semibold text-xl">
          <li className="cursor-pointer hover:text-blue-400">Home</li>
          <li className="cursor-pointer hover:text-blue-400">Favourites</li>
        </ul>

        <div className="relative" >
          <button>
            <img 
              src={avatar} 
              className="w-10 h-10 rounded-full cursor-pointer"
            />
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
