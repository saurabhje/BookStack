import React, { useRef, useState } from 'react'
import bgPhoto from "../assets/images/login_photo.jpg";
import default_img from "../assets/images/default_user.jpg";
import { Link } from "react-router-dom"
const BASE_URL = import.meta.env.VITE_API_URL;


function SignUp() {
  const[previewImage, setPreviewImage] = useState(default_img);
  const [profileImageFile, setProfileImageFile] = useState(null);
  const fileInputRef = useRef(null);
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleImageClick = (e) => {
    fileInputRef.current.click();
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImageFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', nameRef.current.value);
    formData.append('email', emailRef.current.value);
    formData.append('password', passwordRef.current.value);
    formData.append('profileImageFile', profileImageFile);

    // console.log(nameRef.current.value ,emailRef.current.value,passwordRef.current.value,profileImg)

    try{
      console.log(BASE_URL);
      const res = await fetch(`${BASE_URL}/user/signup`, {
        method: "POST",
        body: formData
      })

      const data = await res.json();
      if (res.ok) {
        alert(data.message); 
      } else {
        alert(data.error || "Signup failed.");
      }
    } catch(err){
        console.error(err);
        alert("An error occurred while signing up.");
    }
  }


  return (
      <div className="min-h-screen w-full flex font-sans">
        {/*Left Side */}
        <div className="w-1/2">
          <img
            src={bgPhoto}
            alt="Background theme"
            className="w-full h-full object-cover"
          />
        </div>

        {/*Right Side */}
        <div className="w-1/2 flex items-center justify-center bg-slate-900 px-4">
          <div className="w-full max-w-md backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8">
            <h2 className="text-white text-2xl font-bold mb-6 text-center">
              Create a new account
            </h2>
  
            <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
              <div className="flex flex-col items-center ">
                <img
                  src={previewImage}
                  alt="Preview"
                  className="mb-2 w-20 h-20 object-cover rounded-full border border-white/30 cursor-pointer hover:opacity-80 transition"
                  onClick={handleImageClick}
                />
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  className="hidden"
                />
                <label className="text-white text-xs">Click to change</label>
              </div>

              <div className="flex flex-col">
                <label className="text-white mb-1">Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  ref={nameRef}
                  required
                  className="p-3 rounded-lg bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

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
                Create Account
              </button>
            </form>
  
            <p className="mt-4 text-sm text-white/70 text-center">
              Already have an account?{" "}
              <Link to="/user/signin" className="text-blue-400 hover:underline cursor-pointer">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    );
}

export default SignUp
