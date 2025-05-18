import React from 'react';
import { createBrowserRouter} from 'react-router-dom'
import Home from '../pages/Home'
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/user/signin',
    element: <SignIn/>
  },
  {
    path: '/user/signup',
    element: <SignUp/>
  },
])

export default router