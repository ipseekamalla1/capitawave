import React from "react";

import LoginForm from "@/components/forms/LoginForm";
import Link from "next/link"
import Image from "next/image"
const Login = () => {
  return (
    <div >

      
      <div className="flex h-screen max-h-screen">
       <section className="remove-scrollbar container my-auto">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Link href='/'>
          <Image
            src="/assets/icons/logo-full.png" 
            alt="Logo"
            width={150} // Adjust width as needed
            height={50} // Adjust height as needed
            className="object-contain"
          />
          </Link>

        </div>
      <LoginForm/>
        <div className="text-14-regular mt-20 flex justify-between">
          <p className="justify-items-end text-dark-600 xl:text-left">
            © 2025 CapitaWave
          </p>
        
        
      </div>
    </section>

    <Image
      src="/assets/login-img.jpg"
      height={1000}
      width={1000}
      alt="patient"
      className="side-img max-w-[400px]"
    />
    </div>
    
   </div>
  );
};

export default Login;
