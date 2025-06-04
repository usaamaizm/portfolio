import React, { useState, useEffect } from 'react';
import { Eye, Send, ArrowRight, ChevronDown, Download } from 'lucide-react';
import { useInView } from '../hooks';
import ParticlesBackground from './ParticlesBackground';

// Enhanced Hero Section with custom gradients
function HeroSection() {
  const [ref, isInView] = useInView();
  const [typedName, setTypedName] = useState('');
  const namePart = "Hi, I'm ";
  const fullTitle = namePart + "Muhammad Usama";
  const subtitle = "Software Engineer";

  useEffect(() => {
    if (isInView) {
      let index = 0;
      const timer = setInterval(() => {
        setTypedName(namePart.slice(0, index));
        index++;
        if (index > namePart.length) clearInterval(timer);
      }, 100);
      return () => clearInterval(timer);
    }
  }, [isInView]);

  return (
    <section 
      ref={ref} 
      id="home" 
      className="relative min-h-[calc(100vh-4rem)] bg-gradient-to-br from-secondary-900 to-secondary-800 flex items-center pt-20 pb-12 px-4 overflow-hidden"
    >
      <ParticlesBackground />
      
      {/* Subtle background patterns */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute top-20 left-10 w-24 sm:w-32 h-24 sm:h-32 bg-primary-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 sm:w-40 h-32 sm:h-40 bg-accent-purple rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/4 w-20 sm:w-24 h-20 sm:h-24 bg-accent-blue rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
      </div>
      
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="max-w-3xl mx-auto text-center space-y-6 sm:space-y-8">
          {/* Status Badge */}
          <div 
            className={`inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 shadow-lg transition-all duration-300 hover:scale-105 ${
              isInView ? 'animate-fade-in' : 'opacity-0'
            }`}
          >
            <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-xs sm:text-sm font-medium text-white">Available for opportunities</span>
          </div>

          {/* Main Title Area */}
          <div className={`space-y-4 ${isInView ? 'animate-fade-in' : 'opacity-0'}`}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-4 bg-clip-text text-transparent">
              {typedName} <span className="bg-gradient-to-r from-[#517fa4] to-[#6a8fb5] bg-clip-text text-transparent">Muhammad Usama</span>
              <span className="inline-block w-0.5 sm:w-1 h-8 sm:h-12 bg-primary-500 ml-1 sm:ml-2 animate-pulse"></span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-[#517fa4] to-[#6a8fb5] mx-auto rounded-full mb-6"></div>
            <p className="text-base sm:text-lg text-secondary-300 max-w-3xl mx-auto">
              {subtitle}
            </p>
          </div>
          
          {/* Description */}
          <div className={`max-w-2xl mx-auto px-4 sm:px-0 ${isInView ? 'animate-fade-in' : 'opacity-0'}`}>
            <p className="text-base sm:text-lg text-secondary-200 leading-relaxed">
              Passionate about building scalable solutions with{' '}
              <span className="inline-block px-2 sm:px-3 py-0.5 sm:py-1 bg-primary-600/20 text-primary-300 rounded-md font-medium mx-0.5 sm:mx-1 border border-primary-500/20 text-sm sm:text-base">
                Java
              </span>
              {' '}and{' '}
              <span className="inline-block px-2 sm:px-3 py-0.5 sm:py-1 bg-primary-600/20 text-primary-300 rounded-md font-medium mx-0.5 sm:mx-1 border border-primary-500/20 text-sm sm:text-base">
                Spring Boot
              </span>
              . Currently architecting fintech solutions at YAP Pakistan.
            </p>
          </div>
          
          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0 ${isInView ? 'animate-fade-in' : 'opacity-0'}`}>
            <button
              onClick={() => document.querySelector('#projects').scrollIntoView({ behavior: 'smooth' })}
              className="group flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base"
            >
              <Eye size={18} className="transition-transform duration-300 group-hover:scale-110" />
              View My Work
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            
            <button 
              onClick={() => document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' })}
              className="group flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-all duration-300 border border-white/10 shadow-lg hover:shadow-xl text-sm sm:text-base"
            >
              <Send size={18} className="transition-transform duration-300 group-hover:scale-110" />
              Get In Touch
            </button>

            <a
              href="/resume.pdf"
              download
              className="group flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-all duration-300 border border-white/10 shadow-lg hover:shadow-xl text-sm sm:text-base"
            >
              <Download size={16} className="transition-transform duration-300 group-hover:scale-110" />
              Resume
            </a>
          </div>
          
          {/* Scroll Indicator */}
          <div className={`mt-8 sm:mt-12 ${isInView ? 'animate-fade-in' : 'opacity-0'}`}>
            <div className="animate-bounce">
              <ChevronDown size={20} className="text-secondary-400" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;