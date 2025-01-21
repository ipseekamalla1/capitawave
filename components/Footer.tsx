import React from 'react';
import Link from "next/link";


import "../app/styles/components/footer.css"
export default function Footer() {
  return (
    <footer className="custom-footer">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link href="/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
            <h1>CapitaWave</h1>
          </Link>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-300 sm:mb-0">
            <li>
              <Link href="#" className="hover:underline me-4 md:me-6">About</Link>
            </li>
            <li>
              <Link href="#" className="hover:underline me-4 md:me-6">Privacy Policy</Link>
            </li>
            <li>
              <Link href="#" className="hover:underline me-4 md:me-6">Licensing</Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">Contact</Link>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-700 sm:mx-auto lg:my-8" />
        <span className="block text-sm text-gray-400 sm:text-center">© 2023 <Link href="/" className="hover:underline">CapitaWave™</Link>. All Rights Reserved.</span>
      </div>
    </footer>
  );
}
