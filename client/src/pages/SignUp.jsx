import React from 'react'
import bgPhoto from "../assets/images/login_photo.jpg";
import { Link } from "react-router-dom"



function SignUp() {
  return (
      <div className="min-h-screen w-full flex font-sans">
        <div className="w-1/2">
          <img
            src={bgPhoto}
            alt="Background theme"
            className="w-full h-full object-cover"
          />
        </div>
  
        <div className="w-1/2 flex items-center justify-center bg-slate-900 px-4">
          <div className="w-full max-w-md backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8">
            <h2 className="text-white text-2xl font-bold mb-6 text-center">
              Create new account
            </h2>
  
            <form className="flex flex-col space-y-5">
              <div className="flex flex-col">
                <label className="text-white mb-1">Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="p-3 rounded-lg bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-white mb-1">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="p-3 rounded-lg bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
  
              <div className="flex flex-col">
                <label className="text-white mb-1">Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="p-3 rounded-lg bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
  
              <button
                type="submit"
                className="bg-white text-gray-800 hover:bg-gray-800 hover:text-white font-semibold py-3 rounded-lg transition duration-300"
              >
                Create Account
              </button>
            </form>
  
            <p className="mt-4 text-sm text-white/70 text-center">
              Already have an account?{" "}
              <Link to="/users/signin" className="text-blue-400 hover:underline cursor-pointer">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    );
}

export default SignUp
