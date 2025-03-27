import React, { useState, useEffect } from 'react';
import { Sun, Moon, Code } from 'lucide-react';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Theme toggle effect
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.body.style.backgroundColor = '#121212';
      document.body.style.color = '#f4f4f4';
    } else {
      document.documentElement.classList.remove('dark');
      document.body.style.backgroundColor = '#f4f4f4';
      document.body.style.color = '#333';
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <nav 
      id="navbar" 
      className={`navbar-fixed fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? darkMode 
            ? 'bg-gray-900' 
            : 'bg-[#515151]'
          : darkMode 
            ? 'bg-gray-900/90 backdrop-blur-md' 
            : 'bg-[#515151]/90 backdrop-blur-md'
      } shadow-md`}
    >
      <div className="container mx-auto px-4 py-3 flex flex-wrap items-center justify-between">
        <div className="flex items-center space-x-2 text-white">
          <Code className="h-6 w-6" />
          <div className="text-xl font-bold bg-gradient-to-r from-white to-[#2ecc71] bg-clip-text text-transparent">
            Manan Sharma
          </div>
        </div>
        
        <div className="hidden md:flex space-x-6 text-white">
          <a href="#home" className="hover:text-[#2ecc71] transition-colors duration-300 font-medium">Home</a>
          <a href="#skills" className="hover:text-[#2ecc71] transition-colors duration-300 font-medium">Skills</a>
          <a href="#projects" className="hover:text-[#2ecc71] transition-colors duration-300 font-medium">Projects</a>
          <a href="#resume" className="hover:text-[#2ecc71] transition-colors duration-300 font-medium">Resume</a>
          <a href="#contact" className="hover:text-[#2ecc71] transition-colors duration-300 font-medium">Contact</a>
        </div>
        
        <div className="flex items-center">
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-700/50 transition-colors duration-300 text-white"
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          
          {/* Mobile menu button - can be expanded later */}
          <button className="md:hidden ml-4 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
