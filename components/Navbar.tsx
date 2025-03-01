import React from "react";
import Link from "next/link";
import Image from "next/image";
import LoginButton from "@/components/LoginButton";
import "@/app/styles/components/header.css"

const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      {/* Top Bar */}
      <div className="hidden lg:flex justify-between items-center bg-gray-100 py-2 px-6 text-sm">
        <div className="flex space-x-6">
          <span><i className="fa fa-map-marker-alt text-primary mr-2"></i>1858  Main Street, Toronto, Canada</span>
          <span><i className="fa fa-clock text-primary mr-2"></i>9.00 am - 9.00 pm</span>
        </div>
        <div className="flex space-x-6">
          <span><i className="fa fa-envelope text-primary mr-2"></i>capitawave@support.com</span>
          <span><i className="fa fa-phone-alt text-primary mr-2"></i>+1 012 345 6789</span>
        </div>
      </div>
      
      <nav className="bg-white border-gray-200">
        <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
          {/* Logo on the left */}
          <Link href="/" className="flex items-center space-x-3">
            <Image src="/assets/icons/logo-full.png" height={1200} width={1200} alt="logo" className="h-10 w-auto mb-5"  />
          </Link>

          {/* Centered Navigation Links */}
          <div className="flex items-center w-full justify-center">
            <ul className="font-medium flex space-x-8">
              <li>
                <Link href="/" className="text-blue-700">Home</Link>
              </li>
              <li>
                <Link href="/features" className="text-gray-900 hover:text-blue-700">Features</Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-900 hover:text-blue-700">Testimonials</Link>
              </li>
            </ul>
          </div>

          {/* Login Button on the Right */}
          <div className="ml-auto">
            <Link href="/login" className="text-gray-900 hover:text-blue-700">
              <LoginButton />
            </Link>
          </div>

          {/* Social Icons (Right Side) */}
          <div className="hidden lg:flex space-x-4">
            <a href="#" className="text-gray-600 hover:text-blue-700">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-700">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-700">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>

        </div>
      </nav>
    </div>
  );
};

export default Navbar;
