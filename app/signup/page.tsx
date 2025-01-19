
import React from 'react'
import SignupForm from '@/components/forms/SignupForm'
import Navbar from '@/components/Navbar'
const SignUp= () => {
  return (
   <div>
    <Navbar></Navbar>
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
    <SignupForm/>
    </div>
   </div>
   
  )
}

export default SignUp
