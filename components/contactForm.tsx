import React from 'react';
import Image from 'next/image';

const ContactForm = () => {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 grid-cols-1">
          <div className="lg:mb-0 mb-10">
            <div className="group w-full h-full relative">
              <Image
                src="/assets/card1.jpg"
                alt="Contact Us"
                className="w-full h-full lg:rounded-l-2xl rounded-2xl object-cover"
                fill
                priority
              />
              <h1 className="text-white text-4xl font-bold absolute top-11 left-11">
                Contact us
              </h1>
              <div className="absolute bottom-0 w-full p-5 lg:p-11">
                <div className="bg-white rounded-lg p-6">
                  <div className="mb-6 flex items-center">
                  <svg className="w-6 h-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
</svg>
                 


                    <p className="ml-3 text-gray-800">123-456-7891</p>
                  </div>
                  <div className="mb-6 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-600">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
</svg>


                    <p className="ml-3 text-gray-800">capitawave@support.com</p>
                  </div>
                  <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-600">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
</svg>

                    <p className="ml-3 text-gray-800">1010 Main Street, Toronto, Canada</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 p-5 lg:p-11 lg:rounded-r-2xl rounded-2xl">
            <h2 className="text-blue-600 text-4xl font-semibold mb-11">Send Us A Message</h2>
            <input type="text" className="w-full h-12 text-gray-600 placeholder-gray-400 shadow-sm bg-transparent text-lg rounded-full border border-gray-200 focus:outline-none pl-4 mb-10" placeholder="Name" />
            <input type="email" className="w-full h-12 text-gray-600 placeholder-gray-400 shadow-sm bg-transparent text-lg rounded-full border border-gray-200 focus:outline-none pl-4 mb-10" placeholder="Email" />
            <input type="text" className="w-full h-12 text-gray-600 placeholder-gray-400 shadow-sm bg-transparent text-lg rounded-full border border-gray-200 focus:outline-none pl-4 mb-10" placeholder="Phone" />
            <div className="mb-10">
              <h4 className="text-gray-500 text-lg mb-4">Preferred method of communication</h4>
              <div className="flex">
                <label className="flex items-center mr-11 cursor-pointer text-gray-500">
                  <input type="radio" name="contact-method" className="hidden" />
                  <span className="border border-gray-300 rounded-full w-4 h-4 mr-2"></span>
                  Email
                </label>
                <label className="flex items-center cursor-pointer text-gray-500">
                  <input type="radio" name="contact-method" className="hidden" />
                  <span className="border border-gray-300 rounded-full w-4 h-4 mr-2"></span>
                  Phone
                </label>
              </div>
            </div>
            <textarea className="w-full h-24 text-gray-600 placeholder-gray-400 shadow-sm bg-transparent text-lg rounded-lg border border-gray-200 focus:outline-none p-4 mb-10" placeholder="Message"></textarea>
            <button className="w-full h-12 text-white font-semibold rounded-full transition-all duration-700 hover:bg-blue-800 bg-blue-600 shadow-sm">
              Send
            </button>
          </div>
        </div>
       

      </div>
    </section>
  );
};

export default ContactForm;