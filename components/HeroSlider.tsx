'use client'
import { useState, useEffect } from "react";

const slides = [
  {
    image: "/assets/hero2.jpg",
    illustration: "/assets/illustration1.png", // Add illustration image
    heading: "Track Your Finances with Ease",
    text: "Effortlessly manage your expenses and stay on top of your budget with our finance tracker.",
    button: "Start Tracking",
    link: "/finance-tracker",
  },
  {
    image: "/assets/hero3.jpg",
    illustration: "/assets/illustration2.png", // Add illustration image
    heading: "Bank Anywhere, Anytime",
    text: "Experience hassle-free online banking on the go.",
    button: "Get Started",
    link: "/services",
  },
  {
    image: "/assets/hero4.jpg",
    illustration: "/assets/illustration3.png", // Add illustration image
    heading: "Your Security is Our Priority",
    text: "Advanced security features for your peace of mind.",
    button: "Contact Us",
    link: "/contact",
  },
];

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full h-[100vh] overflow-hidden hero-slider">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          style={{
            backgroundImage: `url(${slide.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: "scale(1.1)", // Makes the image a bit bigger
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white px-4">
            {/* Left Side Content */}
            <div className="flex flex-col items-start max-w-2xl ml-4 z-10">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">{slide.heading}</h1>
              <p className="text-lg md:text-xl mb-6">{slide.text}</p>
              <a
                href={slide.link}
                className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-white text-lg font-medium"
              >
                {slide.button}
              </a>
            </div>

            {/* Right Side Illustration */}
            {index === 0 && (
              <div className="absolute right-4 bottom-0 transform translate-y-1/4">
                <img
                  src={slide.illustration}
                  alt="Illustration"
                  className="w-48 md:w-64 lg:w-80 transform transition-all duration-500 ease-in-out"
                />
              </div>
            )}
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
      >
        &lt;
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
      >
        &gt;
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              index === currentIndex ? "bg-blue-500" : "bg-gray-300"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}
