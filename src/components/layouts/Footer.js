import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-6">
      <div className="container mx-auto flex flex-col items-center">
        {/* Logo Section */}
        <Link href="/">
          <div className="flex items-center gap-2 mb-4">
            <Image
              src="https://assets.indolj.io/images/1726820931-Logo.webp?q=10"
              alt="Pizza Point Logo"
              className="h-12 w-12 rounded-full transition-transform duration-300 ease-in-out transform hover:scale-110"
              width={48} // Specify width in pixels
              height={48} // Specify height in pixels
            />
            <span className="text-white text-2xl font-bold hover:text-yellow-400 transition-colors duration-300">
              Pizza Point
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="flex space-x-6 mb-4">
          <Link
            href="#about"
            className="hover:text-yellow-400 transition-all duration-300"
          >
            About Us
          </Link>
          <Link
            href="#services"
            className="hover:text-yellow-400 transition-all duration-300"
          >
            Services
          </Link>
          <Link
            href="#contact"
            className="hover:text-yellow-400 transition-all duration-300"
          >
            Contact
          </Link>
          <Link
            href="#privacy"
            className="hover:text-yellow-400 transition-all duration-300"
          >
            Privacy Policy
          </Link>
        </nav>

        {/* Social Media Links */}
        <div className="flex space-x-6 text-2xl">
          <Link
            href="https://facebook.com"
            target="_blank"
            className="hover:text-blue-500 transition-all duration-300"
          >
            <FaFacebook />
          </Link>
          <Link
            href="https://twitter.com"
            target="_blank"
            className="hover:text-blue-400 transition-all duration-300"
          >
            <FaTwitter />
          </Link>
          <Link
            href="https://instagram.com"
            target="_blank"
            className="hover:text-pink-500 transition-all duration-300"
          >
            <FaInstagram />
          </Link>
          <Link
            href="https://linkedin.com"
            target="_blank"
            className="hover:text-blue-700 transition-all duration-300"
          >
            <FaLinkedin />
          </Link>
        </div>

        {/* Copyright */}
        <p className="text-center mt-6 text-sm">
          &copy; 2024 Pizza Point. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
