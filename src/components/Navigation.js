import React, { useState, useCallback } from 'react';
import { Menu, X, Download } from 'lucide-react';
import { useScroll } from '../hooks';

// Enhanced Navigation with custom gradients
function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { scrolled } = useScroll();

  const navItems = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#experience', label: 'Experience' },
    { href: '#projects', label: 'Projects' },
    { href: '#skills', label: 'Skills' },
    { href: '#contact', label: 'Contact' }
  ];

  const scrollTo = useCallback((href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'card-gradient backdrop-blur-md shadow-2xl' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className={`font-bold text-xl transition-all duration-200 ${
            scrolled ? 'scale-95' : 'scale-100'
          } text-white`}>
            <span className="bg-gradient-to-r from-[#517fa4] to-[#6a8fb5] bg-clip-text text-transparent">
              Muhammad Usama
            </span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item, index) => (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className="relative px-4 py-2 text-sm font-medium text-gray-300 hover:text-white rounded-xl transition-all duration-150 group hover:scale-105"
              >
                {item.label}
                <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#517fa4]/20 to-[#243949]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-150 -z-10"></span>
              </button>
            ))}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-300 rounded-xl transition-all duration-150 hover:scale-110"
            >
              <div className="relative w-6 h-6">
                <Menu className={`absolute transition-all duration-150 ${isOpen ? 'opacity-0 rotate-180 scale-0' : 'opacity-100 rotate-0 scale-100'}`} size={24} />
                <X className={`absolute transition-all duration-150 ${isOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-180 scale-0'}`} size={24} />
              </div>
            </button>
          </div>
        </div>
        
        {/* Mobile Menu Dropdown */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="py-4 card-gradient backdrop-blur-md rounded-2xl shadow-xl border border-[#517fa4]/30 mt-2">
            {navItems.map((item, index) => (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className="block w-full text-left px-6 py-3 text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-[#517fa4]/20 hover:to-[#243949]/20 transition-all duration-150"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;