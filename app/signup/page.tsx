import React from 'react';
import SignupForm from '@/components/forms/SignupForm';
import Link from "next/link";
import Image from "next/image";

const SignUp = () => {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Left Side - Image (40% width) */}
      <div className="w-2/5 flex">
        <Image
          src="/assets/register-img.jpg"
          height={0} // Setting height to 0 to use aspect ratio
          width={1000}
          alt="patient"
          className="w-full h-128 object-cover" // Ensures the image fills the space
        />
      </div>

      {/* Right Side - Form (60% width) */}
      <section className="w-3/5 flex flex-col justify-center p-5 bg-white">
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

        {/* Sign Up Form */}
        <div>
          <SignupForm />
        </div>
      </section>
    </div>
  );
};

export default SignUp;
