"use client";

import React, { useState } from "react";
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
}

const LoginForm = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [emailForOtp, setEmailForOtp] = useState("");
  const [otp, setOtp] = useState("");

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Main login submit handler
  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setErrorMessage(null);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Login failed.");
        setErrorMessage(data.message || "Login failed.");
        return;
      }

      if (data.otpSent) {
        // Step 1 complete: OTP sent to user
        toast.success("OTP sent to your email.");
        setShowOtpInput(true);
        setEmailForOtp(values.email);
      } else {
        // Fallback for direct login without OTP
        handleLoginSuccess(data);
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("Something went wrong. Please try again.");
    }
  }

  // OTP submission handler
  const handleOtpSubmit = async () => {
    if (!otp || !emailForOtp) {
      toast.error("Please enter the OTP.");
      return;
    }

    try {
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailForOtp, otp }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "OTP verification failed.");
        setErrorMessage(data.message || "OTP verification failed.");
        return;
      }

      handleLoginSuccess(data);
    } catch (error) {
      console.error("OTP error:", error);
      toast.error("OTP verification failed. Please try again.");
    }
  };

  // Final step: store token & redirect
  const handleLoginSuccess = (data: any) => {
    toast.success(data.message || "Login successful!");
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
            {/* Email Field */}
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="email"
              label="Email Address"
              placeholder="Enter your email address"
              className="border border-gray-300 p-3 rounded-md w-full"
            />

            {/* Password Field */}
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="password"
              label="Password"
              placeholder="Enter your password"
              type="password"
              className="border border-gray-300 p-3 rounded-md w-full"
            />

            {/* Show OTP Input If Needed */}
            {showOtpInput && (
              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                  Enter OTP
                </label>
                <input
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="border border-gray-300 p-3 rounded-md w-full mt-1"
                  placeholder="Enter the OTP"
                />
                <Button
                  type="button"
                  onClick={handleOtpSubmit}
                  className="mt-4 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Verify OTP
                </Button>
              </div>
            )}

            {/* Submit Button */}
            {!showOtpInput && (
              <div className="flex justify-center">
                <Button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Login
                </Button>
              </div>
            )}

            {/* Sign Up Link */}
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
      </div>
    </section>
  );
};

export default LoginForm;
