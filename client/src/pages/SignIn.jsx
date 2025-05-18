import React, { useRef } from "react";
import bgPhoto from "../assets/images/login_photo.jpg";
import { Link, useNavigate } from "react-router-dom"
const BASE_URL = import.meta.env.VITE_API_URL;

function SignIn() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try{
      const res = await fetch(`${BASE_URL}/user/signin`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({email, password}),
      })

      const data = await res.json();
      const user = data.user;
      
      if (res.ok) {
        console.log(data.message); 
        navigate('/')
      } else {
        alert(data.error);
      }

    } catch(err){
      console.error("Error during login:", err);
      alert("Something went wrong.");
    }
  }

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
            Log In to your account
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
            <div className="flex flex-col">
              <label className="text-white mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                ref={emailRef}
                required
                className="p-3 rounded-lg bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-white mb-1">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                ref={passwordRef}
                required
                className="p-3 rounded-lg bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <button
              type="submit"
              className="bg-white text-gray-800 hover:bg-gray-800 hover:text-white font-semibold py-3 rounded-lg transition duration-300"
            >
              Log In
            </button>
          </form>

          <p className="mt-4 text-sm text-white/70 text-center">
            Don't have an account?{" "}
            <Link to="/user/signup" className="text-blue-400 hover:underline cursor-pointer">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
