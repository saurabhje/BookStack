import React, { useState, useRef, useEffect } from 'react'
import avatar from '../assets/images/avatar.png'
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from '../store/userSlice';


const BASE_URL = import.meta.env.VITE_API_URL;

function Navbar() {
  const user = useSelector((state) => state.user.user)
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


  const handleSignOut = async () => {
    try{
      const res = await fetch(`${BASE_URL}/user/signout`, {
        method: 'POST',
        credentials: 'include'
      })
      const data = await res.json();
      if(res.ok){
        dispatch(clearUser())
        setIsOpen(false);
        alert(data.message || "Signed out successfully.");
        navigate('/user/signin');
      } else{
        alert(data.error || "Failed to sign out.");
      }
    } catch(error){
      console.error("Sign out error:", error);
      alert("Something went wrong during sign out.");
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-red-100  text-white p-4 flex justify-between items-center shadow-md">

      <div className="text-2xl font-bold text-rose-700 font-mono">
        <p>BookStack</p>
      </div>

      <div className="flex items-center space-x-4">
        <ul className="flex space-x-4 font-semibold text-xl">
          <li 
          onClick={() => navigate('/')}
          className="cursor-pointer font-mono text-black hover:text-rose-500 transition">Home</li>
          <li className="cursor-pointer font-mono text-black hover:text-rose-500 transition">Favourites</li>
        </ul>

        {!user 
          ? <label 
            onClick={() => navigate('/user/signin')}
            className='mr-2 font-mono text-black hover:text-black/50 transition cursor-pointer'
            >SignIn</label>
            
          : <div className="relative" ref={dropdownRef}>
              <button onClick={() => setIsOpen(!isOpen)}>
                <img 
                  src={avatar} 
                  alt="Profile"
                  className="w-8 h-8 rounded-full border border-black/30 cursor-pointer hover:opacity-80 transition"
                />
              </button>

              {isOpen && (
                <div className="absolute right-0 mt-3 w-40 bg-white rounded-md shadow-lg ring-1 ring-black/10 z-50">
                  <button
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer rounded-t-md"
                  >
                    Your Profile
                  </button>
                  {user.role==='ADMIN' &&
                    <button
                      onClick={() => navigate('/book/add-book')}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer rounded-b-md"
                    >
                      Add Book
                    </button>
                  }
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer rounded-b-md"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
        }

        
      </div>
    </nav>
  );
}

export default Navbar;
