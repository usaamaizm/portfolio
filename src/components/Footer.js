import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { useInView } from '../hooks';

// Enhanced Footer with custom gradients
function Footer() {
  const [ref, isInView] = useInView();

  return (
    <footer ref={ref} className="bg-gradient-to-b from-[#24243e] to-[#0f0c29] text-white py-16 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-[#517fa4]/10 to-[#243949]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-[#243949]/10 to-[#517fa4]/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center transition-all duration-500 ${
          isInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="mb-8">
            <h3 className="text-3xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[#517fa4] to-[#6a8fb5] bg-clip-text text-transparent">
                Muhammad Usama
              </span>
            </h3>
            <p className="text-gray-300 text-lg">Software Engineer & Java Developer</p>
            <p className="text-gray-400 text-sm mt-2">Building the future, one line of code at a time</p>
          </div>
          
          <div className="flex justify-center gap-6 mb-10">
            {[
              { href: "https://github.com/usaamaizm", icon: Github, label: "GitHub" },
              { href: "https://linkedin.com/in/mianusama8748", icon: Linkedin, label: "LinkedIn" },
              { href: "mailto:usaamaizm@gmail.com", icon: Mail, label: "Email" }
            ].map(({ href, icon: Icon, label }, index) => (
              <a
                key={href}
                href={href}
                className="w-14 h-14 card-gradient backdrop-blur-sm border border-[#517fa4]/30 rounded-2xl flex items-center justify-center text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-[#517fa4] hover:to-[#243949] transition-all duration-150 hover:scale-110 hover:shadow-lg hover:-translate-y-1 group"
                title={label}
              >
                <Icon size={22} className="group-hover:scale-110 transition-transform duration-150" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;