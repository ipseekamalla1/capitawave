import React from 'react';
import SignupForm from '@/components/forms/SignupForm';
import Link from "next/link";
import Image from "next/image";

const SignUp = () => {
  return (
    <div className="flex min-h-screen">
      {/* Left Side - Image */}
      <div className="w-1/2">
        <Image
          src="/assets/register-img.jpg"
          height={1000}
          width={1000}
          alt="patient"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Right Side - Form */}
      <section className="w-1/2 flex flex-col justify-center p-8 bg-white">
        {/* Logo */}
        <div className="flex justify-center mb-5">
          <Link href="/">
            <Image
              src="/assets/icons/logo-full.png"
              alt="Logo"
              width={150}
              height={40} 
              className="object-contain"
            />
          </Link>
        </div>

        <SignupForm />

        
      </section>
    </div>
  );
};

export default SignUp;
