import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import LoginPopup from "./LoginPopup";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false); 

  return (
    <>
      <header className="w-full bg-neutral-600 bg-opacity-40 backdrop-blur-md shadow-md text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold tracking-wide">
              <Link to="/">FusionFeast</Link>
            </h1>
          </div>

          <nav className="hidden md:flex items-center space-x-8 text-lg font-medium">
            {["Home", "Recipes", "About", "Contact"].map((item, index) => (
              <Link
                key={index}
                to={`/${item === "Home" ? "" : item.toLowerCase()}`}
                className="relative group"
              >
                <span className="transition-transform duration-300 group-hover:-translate-y-1">
                  {item}
                </span>
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-orange-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Sign Up button only */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => setShowLogin(true)}
              className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
            >
              Sign Up
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <nav className="md:hidden bg-black bg-opacity-90 px-6 pb-4 pt-2 text-lg space-y-4">
            <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/recipes" onClick={() => setIsOpen(false)}>Recipes</Link>
            <Link to="/about" onClick={() => setIsOpen(false)}>About</Link>
            <Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
            <button
              onClick={() => {
                setShowLogin(true);
                setIsOpen(false);
              }}
              className="text-left"
            >
              Sign Up
            </button>
          </nav>
        )}
      </header>

      {/* Show the popup modal when triggered */}
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
    </>
  );
}
