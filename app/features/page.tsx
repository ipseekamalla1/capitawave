'use client'

import Navbar from '@/components/Navbar';
import React, { useState } from 'react';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Feature from '@/components/Feature'

const Page = () => {
  const [openAccordion, setOpenAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  return (
    <div>
      <Navbar />

      {/* Hero Image Section */}
      <section className="relative">
  <Image
    src="/assets/featureHero.jpg" // Replace with your hero image URL
    alt="Hero image"
    width={1600}
    height={1000}
    className="w-full h-[800px] object-cover"
  />
  <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div className="text-center">
      <h1 className="text-white text-6xl font-extrabold leading-tight md:text-7xl">
        Customized Financial Solutions
      </h1>
      <p className="text-white text-3xl mt-4 font-medium">
        with Us
      </p>
    </div>
  </div>
</section>

      {/* Services Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-center items-center gap-x-16 gap-y-5 xl:gap-28 lg:flex-row lg:justify-between max-lg:max-w-2xl mx-auto max-w-full">
            
            {/* Left - Accordion Section */}
            <div className="w-full lg:w-1/2">
              <div className="lg:max-w-xl">
                <div className="mb-6 lg:mb-16">
                  <h6 className="text-lg text-center font-medium text-indigo-600 mb-2 lg:text-left">
                    Our Services
                  </h6>
                  <h2 className="text-4xl text-center font-bold text-gray-900 leading-[3.25rem] mb-5 lg:text-left">
                    Explore What We Offer
                  </h2>
                </div>

                <div className="accordion-group">
                  <div className="accordion py-8 border-b border-solid border-gray-200">
                    <button
                      className="accordion-toggle group inline-flex items-center justify-between text-xl font-normal leading-8 text-gray-600 w-full transition duration-500 hover:text-indigo-600"
                      onClick={() => toggleAccordion(1)}
                    >
                      <h5>Open an Account</h5>
                      <svg
                        className={`text-gray-900 transition duration-500 group-hover:text-indigo-600 ${openAccordion === 1 ? 'rotate-180' : ''}`}
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16.5 8.25L12.4142 12.3358C11.7475 13.0025 11.4142 13.3358 11 13.3358C10.5858 13.3358 10.2525 13.0025 9.58579 12.3358L5.5 8.25"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    {openAccordion === 1 && (
                      <div className="accordion-content w-full px-0 overflow-hidden pr-4">
                        <p className="text-base font-normal text-gray-600">
                          To open a new account, fill out the registration form with your personal information. Once your application is processed, you’ll receive a confirmation email, and you can start using your account immediately.
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="accordion py-8 border-b border-solid border-gray-200">
                    <button
                      className="accordion-toggle group inline-flex items-center justify-between text-xl font-normal leading-8 text-gray-600 w-full transition duration-500 hover:text-indigo-600"
                      onClick={() => toggleAccordion(2)}
                    >
                      <h5>Apply for Loan</h5>
                      <svg
                        className={`text-gray-900 transition duration-500 group-hover:text-indigo-600 ${openAccordion === 2 ? 'rotate-180' : ''}`}
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16.5 8.25L12.4142 12.3358C11.7475 13.0025 11.4142 13.3358 11 13.3358C10.5858 13.3358 10.2525 13.0025 9.58579 12.3358L5.5 8.25"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    {openAccordion === 2 && (
                      <div className="accordion-content w-full px-0 overflow-hidden pr-4">
                        <p className="text-base text-gray-500 font-normal">
                          Apply for a loan by filling out the loan application form. You can apply for personal, home, or business loans. Our team will review your application and get back to you shortly.
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="accordion py-8 border-b border-solid border-gray-200">
                    <button
                      className="accordion-toggle group inline-flex items-center justify-between text-xl font-normal leading-8 text-gray-600 w-full transition duration-500 hover:text-indigo-600"
                      onClick={() => toggleAccordion(3)}
                    >
                      <h5>Customer Support</h5>
                      <svg
                        className={`text-gray-900 transition duration-500 group-hover:text-indigo-600 ${openAccordion === 3 ? 'rotate-180' : ''}`}
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16.5 8.25L12.4142 12.3358C11.7475 13.0025 11.4142 13.3358 11 13.3358C10.5858 13.3358 10.2525 13.0025 9.58579 12.3358L5.5 8.25"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    {openAccordion === 3 && (
                      <div className="accordion-content w-full px-0 overflow-hidden pr-4">
                        <p className="text-base text-gray-500 font-normal">
                          If you need assistance, our customer support team is here to help. Reach out to us via phone, email, or live chat for any inquiries.
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="accordion py-8">
                    <button
                      className="accordion-toggle group inline-flex items-center justify-between text-xl font-normal leading-8 text-gray-600 w-full transition duration-500 hover:text-indigo-600"
                      onClick={() => toggleAccordion(4)}
                    >
                      <h5>Online Banking</h5>
                      <svg
                        className={`text-gray-900 transition duration-500 group-hover:text-indigo-600 ${openAccordion === 4 ? 'rotate-180' : ''}`}
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16.5 8.25L12.4142 12.3358C11.7475 13.0025 11.4142 13.3358 11 13.3358C10.5858 13.3358 10.2525 13.0025 9.58579 12.3358L5.5 8.25"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    {openAccordion === 4 && (
                      <div className="accordion-content w-full px-0 overflow-hidden pr-4">
                        <p className="text-base text-gray-500 font-normal">
                          Enjoy the convenience of managing your finances online through our secure and easy-to-use online banking portal.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Image Section */}
            <div className="w-full lg:w-1/2">
              <Image
                src="/assets/card2.jpg" // Replace with the image you want beside the accordion
                alt="Bank services"
                width={800}
                height={600}
                className="w-full h-auto rounded-xl object-cover"
              />
            </div>

          </div>
        </div>
      </section>
     <Feature></Feature>

      <Footer />
    </div>
  );
};

export default Page;
