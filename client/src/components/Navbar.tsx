import React, { useState, useEffect } from 'react';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

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

  return (
    <nav 
      id="navbar" 
      className={`navbar-fixed fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#515151]' : 'bg-[#515151]/90 backdrop-blur-md'
      } shadow-md`}
    >
      <div className="container mx-auto px-4 py-3 flex flex-wrap items-center justify-between">
        <div className="text-white text-xl font-bold">Manan Sharma</div>
        <ul className="flex space-x-6 text-white">
          <li><a href="#home" className="hover:text-[#2ecc71] transition-colors duration-300">Home</a></li>
          <li><a href="#skills" className="hover:text-[#2ecc71] transition-colors duration-300">Skills</a></li>
          <li><a href="#projects" className="hover:text-[#2ecc71] transition-colors duration-300">Projects</a></li>
          <li><a href="#contact" className="hover:text-[#2ecc71] transition-colors duration-300">Contact</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
