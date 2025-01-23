import Image from "next/image";
import Link from "next/link";

export default function Sidebar() {
  return (
    <div>
      {/* Sidebar */}
      <div className="w-1/5 bg-gray-100 text-blue-600 p-5 flex flex-col justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold mb-6">
          <Link href="/" className="flex items-center space-x-2">
            
              <Image
              src="/assets/icons/logo-full.png"  
                alt="Logo"
                width={40}
                height={40}
              />
             
         
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-4 text-lg">
          <Link href="/dashboard"  className="flex items-center space-x-2 hover:text-blue-700">
           
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 10h11M9 21V3M21 21V10m0 11H9"
                />
              </svg>
              <span>Dashboard</span>
            </Link>
       
          <Link href="/transfer" className="flex items-center space-x-2 hover:text-blue-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 19l-7-7 7-7m8 14l-7-7 7-7"
                />
              </svg>
              <span>Transfer</span>
            </Link>
       
          <Link href="/account" className="flex items-center space-x-2 hover:text-blue-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5.121 17.804A9.953 9.953 0 0112 15a9.953 9.953 0 016.879 2.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span>Account</span>
           
          </Link>
          <Link href="/cards" className="flex items-center space-x-2 hover:text-blue-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 9V7a4 4 0 10-8 0v2m-3 5a9 9 0 0118 0v1a9 9 0 01-18 0v-1z"
                />
              </svg>
              <span>Cards</span>
            </Link>
         
        </nav>

        {/* Settings and Logout */}
        <div className="space-y-4 mt-10">
          <Link href="/settings" className="flex items-center space-x-2 hover:text-blue-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 15v6m0-6v6m9-12h-6m6 0H9m9 0H9"
                />
              </svg>
              <span>Settings</span>
            </Link>
         
          <Link href="/logout" className="flex items-center space-x-2 hover:text-blue-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 15l-4-4m0 0l4-4m-4 4h12"
                />
              </svg>
              <span>Logout</span>
            </Link>
        
        </div>
      </div>

     
    </div>
  );
}
