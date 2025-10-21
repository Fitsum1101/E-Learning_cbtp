import { Search, Moon, Sun, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

import Button from "../common/Button/Button";

export default function Navbar({ isDark, toggleDarkMode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 ">
            <div className="flex items-center justify-center w-8 h-8 transition-shadow rounded-lg bg-primary group-hover:shadow-lg">
              <span className="px-1 py-1 text-lg font-bold text-white bg-blue-700 rounded-xl">
                LQ
              </span>
            </div>
            <span className="hidden text-xl font-bold sm:inline text-foreground">
              LearnQuest
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="items-center hidden gap-8 md:flex">
            <Link
              href="/courses"
              className="transition-colors text-foreground hover:text-primary"
            >
              Courses
            </Link>
            <Link
              href="#about"
              className="transition-colors text-foreground hover:text-primary"
            >
              About
            </Link>
            <Link
              href="#contact"
              className="transition-colors text-foreground hover:text-primary"
            >
              Contact
            </Link>
          </div>

          {/* Search Bar */}
          <div className="relative items-center flex-1 hidden max-w-xs gap-2 px-3 py-2 mx-4 rounded-lg md:flex lg:flex ">
            <Search size={18} className="absolute text-gray-400 left-5" />
            <input
              type="text"
              placeholder="Search courses..."
              className="w-full px-8 py-1 border border-gray-200 rounded-xl focus:outline-2 focus:outline-blue-600 outline-0"
            />
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 font-semibold text-gray-800 transition-colors rounded-lg hover:bg-muted"
              aria-label="Toggle dark mode"
            >
              {isDark ? (
                <Sun size={20} className="text-foreground" />
              ) : (
                <Moon size={20} className="text-foreground" />
              )}
            </button>

            {/* Auth Buttons - Desktop */}
            <div className="hidden gap-2 text-sm text-gray-700 sm:flex">
              <Button className="px-3 py-2 bg-transparent border border-gray-200 rounded-xl hover:bg-muted">
                Login
              </Button>
              <Button className="px-3 py-2 text-white bg-blue-700 border border-gray-200 rounded-xl hover:bg-blue-600">
                Sign Up
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 transition-colors rounded-lg md:hidden hover:bg-muted"
            >
              {isMenuOpen ? (
                <X size={20} className="text-foreground" />
              ) : (
                <Menu size={20} className="text-foreground" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="pb-4 border-t md:hidden border-border">
            <div className="flex flex-col gap-3 pt-4">
              <Link
                href="/courses"
                className="px-2 py-2 transition-colors text-foreground hover:text-primary"
              >
                Courses
              </Link>
              <Link
                href="#about"
                className="px-2 py-2 transition-colors text-foreground hover:text-primary"
              >
                About
              </Link>
              <Link
                href="#contact"
                className="px-2 py-2 transition-colors text-foreground hover:text-primary"
              >
                Contact
              </Link>
              <div className="flex gap-2 pt-2">
                <Button className="flex-1 bg-transparent rounded-lg">
                  Login
                </Button>
                <Button className="flex-1 text-white bg-blue-700 rounded-lg hover:bg-blue-600">
                  Sign Up
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
