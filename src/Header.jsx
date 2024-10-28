// import React from "react";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <header className="bg-white text-black  font-mono">
      <div className="container mx-auto px-4 py-1 flex flex-col sm:flex-row justify-between items-center">
        <div className="flex-shrink-0 mb-4 sm:mb-0">
          <img
            src="https://img.freepik.com/premium-vector/creative-elegant-minimalistic-logo-design-vector-technology-software-company_1287271-43622.jpg"
            alt="Logo"
            className="w-16 h-16 object-contain"
          />
        </div>

        <nav className="flex flex-col sm:flex-row sm:space-x-8 mb-4 sm:mb-0">
          <a
            href="#subscribe"
            className="text-black hover:text-gray-400 no-underline mb-2 sm:mb-0"
          >
            Subscribe
          </a>
          <Link to={"./aboutus"}>
            <a
              href="#about-us"
              className="text-black hover:text-gray-400 no-underline mb-2 sm:mb-0"
            >
              About Us
            </a>
          </Link>

          <a
            href="#contact-us"
            className="text-black hover:text-gray-400 no-underline"
          >
            Contact Us
          </a>
        </nav>

        <div className="flex-shrink-0">
          <Link to={"./login"}>
            <button className="bg-black text-white py-1 px-4 rounded-full">
              Login
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
