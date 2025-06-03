"use client";

import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomFormField from "../CustomFormField";

import toast from "react-hot-toast";

const loginSchema = z.object({
  email: z.string().email("Invalid email address."),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT = "select",
};


// Define types for API response
interface User {
  id: string;
  role: string;
  // add other user properties if needed
}

interface LoginResponse {
  token: string;
  user: User;
  otpSent?: boolean;
  message?: string;
}

const LoginForm = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [emailForOtp, setEmailForOtp] = useState("");
  const [otpDigits, setOtpDigits] = useState<string[]>(Array(6).fill(""));

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setErrorMessage(null);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data: LoginResponse = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Login failed.");
        setErrorMessage(data.message || "Login failed.");
        return;
      }

      if (data.otpSent) {
        toast.success("OTP sent to your email.");
        setEmailForOtp(values.email);
        setShowOtpModal(true); // Show modal instead of inline OTP input
        setOtpDigits(Array(6).fill("")); // Reset OTP inputs
        setTimeout(() => inputRefs.current[0]?.focus(), 100); // Focus first input
      } else {
        handleLoginSuccess(data);
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("Something went wrong. Please try again.");
    }
  }

  // Handle change in each OTP input box
  const handleOtpChange = (index: number, value: string) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otpDigits];
      newOtp[index] = value;
      setOtpDigits(newOtp);

      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  // Handle keydown for backspace and arrow navigation
  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      const newOtp = [...otpDigits];
      newOtp[index - 1] = "";
      setOtpDigits(newOtp);
      inputRefs.current[index - 1]?.focus();
      e.preventDefault();
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
      e.preventDefault();
    } else if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
      e.preventDefault();
    }
  };

  const handleOtpSubmit = async () => {
    const otp = otpDigits.join("");
    if (otp.length !== 6 || otpDigits.some((digit) => digit === "")) {
      toast.error("Please enter the 6-digit OTP.");
      return;
    }

    try {
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailForOtp, otp }),
      });

      const data: LoginResponse = await response.json();

      if (!response.ok) {
        toast.error(data.message || "OTP verification failed.");
        setErrorMessage(data.message || "OTP verification failed.");
        return;
      }

      toast.success(data.message || "Login successful!");
      setShowOtpModal(false); // Close modal on success
      handleLoginSuccess(data);
    } catch (error) {
      console.error("OTP error:", error);
      toast.error("OTP verification failed. Please try again.");
    }
  };

  const handleLoginSuccess = (data: LoginResponse) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("userId", data.user.id);
    localStorage.setItem("userRole", data.user.role);

    if (data.user.role === "ADMIN") {
      router.push("/admin");
    } else if (data.user.role === "USER") {
      router.push(`/client/user-dashboard/${data.user.id}`);
    } else {
      setErrorMessage("Unknown role. Please contact support.");
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-xl">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Login</h2>

        {errorMessage && (
          <div className="text-red-600 text-center mb-4">{errorMessage}</div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="email"
              label="Email Address"
              placeholder="Enter your email address"
              className="border border-gray-300 p-3 rounded-md w-full"
            />

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="password"
              label="Password"
              placeholder="Enter your password"
              type="password"
              className="border border-gray-300 p-3 rounded-md w-full"
            />

            <div className="flex justify-center">
              <Button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Login
              </Button>
            </div>

            <div className="text-center mt-4">
              <p className="text-gray-600">
                Don’t have an account?{" "}
                <a href="/signup" className="text-blue-600 hover:underline">
                  Sign up
                </a>
              </p>
            </div>
          </form>
        </Form>

        {/* OTP Modal */}
        {showOtpModal && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            role="dialog"
            aria-modal="true"
          >
            <div className="bg-white rounded-lg p-6 w-80 max-w-full shadow-lg text-center">
              <h3 className="text-xl font-semibold mb-4">Enter OTP</h3>
              <div className="flex justify-center space-x-2 mb-4">
                {otpDigits.map((digit, idx) => (
                  <input
                    key={idx}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    className="w-10 h-12 text-center border-2 border-gray-300 rounded-md text-xl focus:border-blue-600 focus:outline-none"
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                    ref={(el) => (inputRefs.current[idx] = el)}
                    autoComplete="one-time-code"
                  />
                ))}
              </div>
              <div className="flex justify-between">
                <Button
                  onClick={() => setShowOtpModal(false)}
                  className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleOtpSubmit}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
                >
                  Verify OTP
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default LoginForm;
