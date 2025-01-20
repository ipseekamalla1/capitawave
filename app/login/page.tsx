import React from "react";
import Navbar from "@/components/Navbar";
import LoginForm from "@/components/forms/LoginForm";

const Login = () => {
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
       <LoginForm/>
      </div>
    </div>
  );
};

export default Login;
