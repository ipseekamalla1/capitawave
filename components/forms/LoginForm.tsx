"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomFormField from "../CustomFormField";
import Image from 'next/image'
// Define the schema for form validation
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
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // State for error message

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setErrorMessage(null); // Reset the error message on each submission attempt

    try {
      // Call the login API
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Login failed:", errorData.message);
        setErrorMessage(errorData.message || "Login failed. Please try again.");
        return;
      }

      const data = await response.json();
      console.log("Login successful:", data);

      // Optionally store the token in localStorage or cookies
      localStorage.setItem("token", data.token);

      // Redirect to user dashboard
      router.push("/client/user-dashboard");
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("An error occurred. Please try again.");
    }
  }

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-xl">
         
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Login</h2>

        {/* Error Message */}
        {errorMessage && (
          <div className="text-red-600 text-center mb-4">
            {errorMessage}
          </div>
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

            {/* Submit Button */}
            <div className="flex justify-center">
              <Button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
              >
                Login
              </Button>
            </div>

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
