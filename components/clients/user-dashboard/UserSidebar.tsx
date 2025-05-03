import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';


import {
  HomeIcon,
  ArrowRightIcon,
  UserCircleIcon,
  CogIcon,
  DocumentTextIcon
} from "@heroicons/react/solid";

export default function Sidebar() {
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

  const handleLogout = () => {
    // Clear session storage/local storage if you use it
    sessionStorage.clear();
    localStorage.clear();
    // Redirect to login page
    router.push('/login');
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user?.id) {
      setUserId(user.id);
    }
  }, []);

  return (
    <div className="bg-gray-100 text-blue-600 p-5 flex flex-col border-2">
      {/* Logo */}
      <div className="flex items-center space-x-4 mb-7">
        <Link href="/" legacyBehavior>
          <a className="flex items-center space-x-2">
            <Image src="/assets/icons/logo-full.png" alt="Logo" width={200} height={40} />
          </a>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col justify-center space-y-6 text-lg p-8">
        <Link href={userId ? `/client/user-dashboard/${userId}` : '/client/user-dashboard'} legacyBehavior>
          <a className="flex items-center space-x-2 hover:text-blue-700">
            <HomeIcon className="h-6 w-6" />
            <span>Dashboard</span>
          </a>
        </Link>
        <Link href="/client/accounts" legacyBehavior>
          <a className="flex items-center space-x-2 hover:text-blue-700">
            <UserCircleIcon className="h-6 w-6" />
            <span>Account</span>
          </a>
        </Link>

        <Link href="/client/transfer" legacyBehavior>
          <a className="flex items-center space-x-2 hover:text-blue-700">
            <ArrowRightIcon className="h-6 w-6" />
            <span>Transfer</span>
          </a>
        </Link>
        <Link href="/client/transfer" legacyBehavior>
          <a className="flex items-center space-x-2 hover:text-blue-700">
            <DocumentTextIcon className="h-6 w-6" />
            <span>Transactions</span>
          </a>
        </Link>
      </nav>

      {/* Settings & Logout */}
      <div className="space-y-4 p-8 mt-9">
        <Link href="/client/settings" legacyBehavior>
          <a className="flex items-center space-x-2 hover:text-blue-700">
            <CogIcon className="h-6 w-6" />
            <span>Settings</span>
          </a>
        </Link>

        {/* Logout Button (no Link wrapper around button) */}
        <button 
          className="flex items-center space-x-2 hover:text-blue-700"
          onClick={handleLogout}
        >
          <UserCircleIcon className="h-6 w-6" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
