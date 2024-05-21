'use client'
import Link from "next/link";
import React, { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-gray-50">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-1 md:flex md:items-center md:gap-12">
            <Link className="block text-xl text-blue-600 font-bold" href="#">
              <span className="sr-only">Home</span>
              <span>AntuanLabs</span>
            </Link>
          </div>

          <div className="md:flex md:items-center md:gap-12">
            <nav aria-label="Global" className="hidden md:block">
              <ul className="flex items-center gap-6 text-md">
                <li>
                  <Link className="font-semibold text-gray-500 transition hover:text-blue-700" href="#features"> Features </Link>
                </li>
                <li>
                  <Link className="font-semibold text-gray-500 transition hover:text-blue-700" href="#api"> API </Link>
                </li>
                <li>
                  <a className="font-semibold text-gray-500 transition hover:text-blue-700" href="https://antuan01.com/" target="_blank" rel="noopener noreferrer" > AntuanCV </a>
                </li>
              </ul>
            </nav>

            <div className="flex items-center gap-4">
              <div className="block md:hidden">
                <button aria-label="Open Menu" onClick={toggleMenu} className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    {isOpen ? (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="flex flex-col bg-gray-50 px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="#features" className="text-gray-500 hover:text-gray-500/75">About</Link>
            <Link href="#api" className="text-gray-500 hover:text-gray-500/75">API</Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;