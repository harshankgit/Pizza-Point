import React, { useContext, useEffect, useState } from "react";
import {
  FaShoppingCart,
  FaUserAlt,
  FaSignInAlt,
  FaClipboardList,
  FaSignOutAlt,
} from "react-icons/fa";
import Link from "next/link";
import { CartContext } from "../utils/ContextReducer";
import Image from "next/image";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { state } = useContext(CartContext);
  const [mounted, setMounted] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  return (
    <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <Link href="/">
            <Image
              src="https://assets.indolj.io/images/1726820931-Logo.webp?q=10"
              alt="Pizza Point Logo"
              className="h-12 w-12 rounded-full transition-transform duration-300 ease-in-out transform hover:scale-110"
              width={500}
              height={300}
            />
            <span className="text-white text-2xl font-bold hover:text-yellow-400 transition-colors duration-300">
              Pizza Point
            </span>
          </Link>
        </div>

        {/* Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/cart"
            className="flex items-center gap-1 hover:text-blue-400 transition-all duration-300"
          >
            <FaShoppingCart />
            Cart {state.length || 0}
          </Link>
          {localStorage.getItem("token") ? (
            <>
              <Link
                href="/myorder"
                className="flex items-center gap-1 hover:text-blue-400 transition-all duration-300"
              >
                <FaClipboardList />
                My Order
              </Link>
              <Link
                href="/login"
                className="flex items-center gap-1 hover:text-blue-400 transition-all duration-300"
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("useremail");
                }}
              >
                <FaSignOutAlt />
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="flex items-center gap-1 hover:text-blue-400 transition-all duration-300"
              >
                <FaUserAlt />
                Login
              </Link>
              <Link
                href="/signin"
                className="flex items-center gap-1 hover:text-blue-400 transition-all duration-300"
              >
                <FaSignInAlt />
                Sign In
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu Links */}
      {isMenuOpen && (
        <div className="md:hidden flex flex-col items-center mt-4 bg-gradient-to-r from-indigo-500 to-purple-600 py-4">
          <Link
            href="/cart"
            className="flex items-center gap-1 py-2 text-white hover:text-yellow-400 transition-all duration-300"
          >
            <FaShoppingCart />
            Cart {state.length}
          </Link>
          <Link
            href="/myorder"
            className="flex items-center gap-1 py-2 text-white hover:text-yellow-400 transition-all duration-300"
          >
            <FaClipboardList />
            My Order
          </Link>
          <Link
            href="/login"
            className="flex items-center gap-1 py-2 text-white hover:text-yellow-400 transition-all duration-300"
          >
            <FaUserAlt />
            Login
          </Link>
          <Link
            href="/signin"
            className="flex items-center gap-1 py-2 text-white hover:text-yellow-400 transition-all duration-300"
          >
            <FaSignInAlt />
            Sign In
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
