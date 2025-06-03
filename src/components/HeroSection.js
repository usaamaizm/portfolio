import React, { useState, useEffect } from 'react';
import { Eye, Send, ArrowRight, ChevronDown, Github, Linkedin, Mail, Download } from 'lucide-react';
import { useInView } from '../hooks';
import ParticlesBackground from './ParticlesBackground';

// Enhanced Hero Section with custom gradients
function HeroSection() {
  const [ref, isInView] = useInView();
  const [text, setText] = useState('');
  const fullText = "Hi, I'm Muhammad Usama";

  useEffect(() => {
    if (isInView) {
      let index = 0;
      const timer = setInterval(() => {
        setText(fullText.slice(0, index));
        index++;
        if (index > fullText.length) clearInterval(timer);
      }, 100);
      return () => clearInterval(timer);
    }
  }, [isInView]);

  return (
    <section ref={ref} id="home" className="relative min-h-screen section-gradient flex items-center pt-16 overflow-hidden">
      <ParticlesBackground />
      
      {/* Animated background shapes with gradient colors */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-[#517fa4]/20 to-[#243949]/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-[#243949]/20 to-[#517fa4]/20 rounded-full animate-ping"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-r from-[#517fa4]/30 to-[#243949]/30 rounded-full animate-bounce"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          {/* Status Badge */}
          <div className={`inline-flex items-center gap-3 px-6 py-3 card-gradient rounded-full shadow-2xl hover:shadow-3xl backdrop-blur-sm border border-white/20 transition-all duration-500 hover:scale-105 ${
            isInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50"></div>
            <span className="text-sm font-medium text-white">Available for opportunities</span>
          </div>

          {/* Main Heading with Typewriter Effect */}
          <div className={`transition-all duration-700 delay-200 ${
            isInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <h1 className="text-5xl md:text-7xl font-black text-white leading-tight">
              {text}
              <span className="inline-block w-1 h-16 bg-gradient-to-b from-[#517fa4] to-[#243949] ml-2 animate-pulse"></span>
            </h1>
          </div>
          
          {/* Subtitle */}
          <div className={`transition-all duration-700 delay-400 ${
            isInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <h2 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-[#517fa4] via-[#6a8fb5] to-[#517fa4] bg-clip-text text-transparent leading-loose">
              Software Engineer
            </h2>
          </div>
          
          {/* Description */}
          <div className={`transition-all duration-700 delay-600 ${
            isInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <p className="text-lg md:text-xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
              Passionate about building scalable solutions with{' '}
              <span className="inline-block px-3 py-1 bg-gradient-to-r from-orange-700 to-orange-800 text-white rounded-md font-semibold mx-1">
                Java
              </span>,{' '}
              <span className="inline-block px-3 py-1 bg-gradient-to-r from-green-700 to-green-800 text-white rounded-md font-semibold mx-1">
                Spring Boot
              </span>, and modern technologies. 
              Currently architecting fintech solutions at YAP Pakistan.
            </p>
          </div>
          
          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row gap-6 justify-center transition-all duration-700 delay-800 ${
            isInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <button
              onClick={() => document.querySelector('#projects').scrollIntoView({ behavior: 'smooth' })}
              className="group flex items-center justify-center gap-3 transition-all duration-300 px-8 py-4 rounded-xl text-white card-gradient backdrop-blur-sm bg-white/10 border border-white/20 shadow-lg hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Eye size={20} className="transition-transform duration-150 group-hover:scale-110" />
              View My Work
              <ArrowRight size={16} className="transition-transform duration-150 group-hover:translate-x-1" />
            </button>
            <button 
              onClick={() => document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' })}
              className="group flex items-center justify-center gap-3 transition-all duration-300 px-8 py-4 rounded-xl text-white card-gradient backdrop-blur-sm bg-white/10 border border-white/20 shadow-lg hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Send size={20} className="transition-transform duration-150 group-hover:scale-110" />
              Get In Touch
            </button>

            {/* Resume Button (Moved from Navigation) */}
            <a
              href="/resume.pdf"
              download
              className="group flex items-center justify-center gap-3 transition-all duration-300 px-8 py-4 rounded-xl text-white card-gradient backdrop-blur-sm bg-white/10 border border-white/20 shadow-lg hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Download size={16} />
              Resume
            </a>
          </div>
          
          {/* Scroll Indicator */}
          <div className={`flex justify-center mt-10 transition-all duration-500 delay-900 ${
            isInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <div className="animate-bounce">
              <ChevronDown size={32} className="text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;