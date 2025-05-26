import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import AddBook from './pages/AddBook';





function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/signin" element={<SignIn />} />
        <Route path="/user/signup" element={<SignUp />} />
        <Route path='/book/add-book' element={<AddBook/>} />
      </Routes>
    </BrowserRouter>

    
    // <>
    //   <Navbar/>
    //   <RouterProvider router={router} />
    // </>
  )
}

export default App
