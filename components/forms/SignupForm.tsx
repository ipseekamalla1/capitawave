"use client";


import { useRouter } from "next/navigation"; // Import useRouter hook

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomFormField from "../CustomFormField";



export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT = "select",
}

import { SelectItem } from "@/components/ui/select";


const formSchema = z.object({
  fname: z.string().min(1, { message: "First Name is required." }),
  lname: z.string().min(1, { message: "Last Name is required." }),
  username: z.string().min(2, { message: "Username must be at least 2 characters." }),
  email: z.string().email("Invalid email address."),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  repassword: z.string().min(6, { message: "Re-entered password must be at least 6 characters." }),
  street: z.string().min(1, { message: "Street address is required." }),
  state: z.string().min(1, { message: "State is required." }),
  zip: z.string().min(1, { message: "Zip Code is required." }),
  city: z.string().min(1, { message: "City is required." }),
  country: z.string().min(1, { message: "Country is required." }),
  phone: z.string().min(1, { message: "Phone number is required." }),
})
.refine((data) => data.password === data.repassword, {
  message: "Passwords must match.",
  path: ["repassword"],
});

const SignupForm = () => {
  const router =useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fname: "",
      lname: "",
      username: "",
      email: "",
      password: "",
      repassword: "",
      street: "",
      state: "",
      zip: "",
      city: "",
      country: "",
      phone: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
  
    
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to create user");
      }

      const responseData = await response.json();
      console.log("User created successfully", responseData);
      router.push("/login");
    } catch (error) {
      console.error("Error:", error);
    }
    
  }

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-xl my-5">
         
    <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
      Be a member of Capita Wave
    </h2>

    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Row 1: First Name, Last Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="fname"
            label="First Name"
            placeholder="Enter your first name"
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="lname"
            label="Last Name"
            placeholder="Enter your last name"
          />
        </div>

        {/* Row 2: Username */}
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="username"
          label="Username"
          placeholder="Choose a username"
        />

        {/* Row 3: Email */}
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="email"
          label="Email"
          placeholder="Enter your email address"
        />

        {/* Row 4: Gender */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="male"
            label="Male"
          />
          <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="female"
            label="Female"
          />
        </div>

        {/* Row 5: Password, Re-enter Password */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="password"
            label="Password"
            placeholder="Enter your password"
            type="password"

           
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="repassword"
            label="Re-enter Password"
            placeholder="Re-enter your password"
            type="password"
            
          />
        </div>

        {/* Row 6: Street Address */}
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="street"
          label="Street Address"
          placeholder="Enter your street address"
        />

        {/* Row 7: State, Zip Code */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="state"
            label="State"
            placeholder="Enter your state"
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="zip"
            label="Zip Code"
            placeholder="Enter your zip code"
          />
        </div>

        {/* Row 8: City */}
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="city"
          label="City"
          placeholder="Enter your city"
        />

        {/* Row 9: Country Selection */}
        <CustomFormField
  fieldType={FormFieldType.SELECT}
  control={form.control}
  name="country"
  label="Country"
  placeholder="Select your country"
>
  {["US", "CA", "UK", "AU"].map((type, i) => (
    <SelectItem key={type + i} value={type}>
      {type}
    </SelectItem>
  ))}
</CustomFormField>


        {/* Row 10: Phone Number */}
        <CustomFormField
          fieldType={FormFieldType.PHONE_INPUT}
          control={form.control}
          name="phone"
          label="Phone Number"
          placeholder="(416) 123-4567"
        />

        {/* Submit Button */}
        <div className="flex justify-center">
          <Button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            Submit
          </Button>
        </div>
      </form>
    </Form>
  </div>
</section>

  );
};

export default SignupForm;
