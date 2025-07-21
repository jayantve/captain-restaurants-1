'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-amber-600 cursor-pointer" style={{ fontFamily: 'var(--font-pacifico)' }}>
            Captain Restaurant
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-amber-600 transition-colors cursor-pointer">
              Home
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-amber-600 transition-colors cursor-pointer">
              About
            </Link>
            <Link href="/menu" className="text-gray-700 hover:text-amber-600 transition-colors cursor-pointer">
              Menu
            </Link>
            <Link href="/search" className="text-gray-700 hover:text-amber-600 transition-colors cursor-pointer">
              Search
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-amber-600 transition-colors cursor-pointer">
              Contact
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <div className="w-6 h-6 flex items-center justify-center">
              {isMenuOpen ? (
                <i className="ri-close-line text-xl text-gray-700"></i>
              ) : (
                <i className="ri-menu-line text-xl text-gray-700"></i>
              )}
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className="text-gray-700 hover:text-amber-600 transition-colors cursor-pointer"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/about" 
                className="text-gray-700 hover:text-amber-600 transition-colors cursor-pointer"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/menu" 
                className="text-gray-700 hover:text-amber-600 transition-colors cursor-pointer"
                onClick={() => setIsMenuOpen(false)}
              >
                Menu
              </Link>
              <Link 
                href="/search" 
                className="text-gray-700 hover:text-amber-600 transition-colors cursor-pointer"
                onClick={() => setIsMenuOpen(false)}
              >
                Search
              </Link>
              <Link 
                href="/contact" 
                className="text-gray-700 hover:text-amber-600 transition-colors cursor-pointer"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
