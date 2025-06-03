import React, { useEffect } from 'react';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import StatsSection from './components/StatsSection';
import AboutSection from './components/AboutSection';
import ExperienceSection from './components/ExperienceSection';
import ProjectsSection from './components/ProjectsSection';
import SkillsSection from './components/SkillsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

// Main App Component with custom gradients
function App() {
  // Add custom CSS with your gradient colors
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      :root {
        --primary-gradient: linear-gradient(to right, #517fa4 0%, #243949 51%, #517fa4 100%);
        --bg-gradient: linear-gradient(135deg, #0f0c29 0%, #302b63 35%, #24243e 100%);
        --animate-duration: 0.15s;
        --animate-delay: 0s;
      }
      
      * {
        will-change: auto;
      }
      
      body {
        background: var(--bg-gradient);
        background-attachment: fixed;
        min-height: 100vh;
      }
      
      /* Custom Button Gradient */
      .btn-grad {
        background-image: linear-gradient(to right, #517fa4 0%, #243949 51%, #517fa4 100%);
        margin: 10px;
        padding: 15px 45px;
        text-align: center;
        text-transform: uppercase;
        transition: 0.5s;
        background-size: 200% auto;
        color: white;
        box-shadow: 0 0 20px rgba(81, 127, 164, 0.3);
        border-radius: 10px;
        display: inline-block;
        border: none;
        cursor: pointer;
        font-weight: 600;
        text-decoration: none;
      }
      
      .btn-grad:hover {
        background-position: right center;
        color: #fff;
        text-decoration: none;
        transform: translateY(-2px);
        box-shadow: 0 5px 25px rgba(81, 127, 164, 0.4);
      }
      
      /* Card gradient backgrounds */
      .card-gradient {
        background: linear-gradient(145deg, rgba(81, 127, 164, 0.1), rgba(36, 57, 73, 0.1));
        backdrop-filter: blur(10px);
        border: 1px solid rgba(81, 127, 164, 0.2);
      }
      
      /* Section backgrounds with gradient */
      .section-gradient {
        background: linear-gradient(135deg, rgba(15, 12, 41, 0.95) 0%, rgba(48, 43, 99, 0.95) 35%, rgba(36, 36, 62, 0.95) 100%);
      }
      
      .transform-gpu {
        transform: translateZ(0);
        backface-visibility: hidden;
        perspective: 1000px;
      }
      
      /* Ultra-fast animations */
      .animate-float {
        animation: float 3s ease-in-out infinite;
      }
      
      @keyframes float {
        0%, 100% { transform: translateY(0px) translateZ(0); }
        50% { transform: translateY(-10px) translateZ(0); }
      }
      
      .animate-glow {
        animation: glow 1s ease-in-out infinite alternate;
      }
      
      @keyframes glow {
        from { box-shadow: 0 0 10px rgba(81, 127, 164, 0.3); }
        to { box-shadow: 0 0 20px rgba(81, 127, 164, 0.6); }
      }
      
      .animate-gradient {
        background-size: 200% 200%;
        animation: gradient 8s ease infinite;
      }
      
      @keyframes gradient {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      
      /* Instant transitions */
      .transition-fast {
        transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      /* Scroll behavior */
      html {
        scroll-behavior: smooth;
      }
      
      /* Custom scrollbar with gradient */
      ::-webkit-scrollbar {
        width: 8px;
      }
      
      ::-webkit-scrollbar-track {
        background: rgba(36, 57, 73, 0.3);
      }
      
      ::-webkit-scrollbar-thumb {
        background: linear-gradient(180deg, #517fa4, #243949);
        border-radius: 6px;
      }
      
      ::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(180deg, #6a8fb5, #2d4756);
      }
      
      /* Performance optimizations */
      .no-select {
        user-select: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
      }
      
      .pointer-events-none {
        pointer-events: none;
      }
      
      /* Reduce motion for accessibility */
      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  return (
    <div className="min-h-screen text-white">
      <Navigation />
      <main className="relative">
        <HeroSection />
        <StatsSection />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;