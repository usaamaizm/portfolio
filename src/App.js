import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Mail, Phone, MapPin, Github, Linkedin, Menu, X, 
  Code, Database, Server, Globe, Calendar, 
  Award, Send, Download, Eye, Sun, Moon, ArrowRight,
  ChevronDown, Star, Zap, Target, Users
} from 'lucide-react';

// Performance-optimized dark mode hook
function useDarkMode() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('darkMode');
      return saved ? JSON.parse(saved) : false;
    }
    return false;
  });

  useEffect(() => {
    const html = document.documentElement;
    html.classList.toggle('dark', isDark);
    localStorage.setItem('darkMode', JSON.stringify(isDark));
  }, [isDark]);

  return [isDark, () => setIsDark(prev => !prev)];
}

// Intersection Observer hook for animations
function useInView(threshold = 0.1) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold, rootMargin: '50px' }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isInView];
}

// Scroll hook with throttling
function useScroll() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const y = window.scrollY;
          setScrolled(y > 50);
          setScrollY(y);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { scrolled, scrollY };
}

// Floating particles background
function ParticlesBackground() {
  const canvasRef = useRef();
  const [isDark] = useDarkMode();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: 30 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 1
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? 'rgba(148, 163, 184, 0.1)' : 'rgba(71, 85, 105, 0.1)';
        ctx.fill();
      });
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
}

// Enhanced Navigation with scroll effects
function Navigation({ isDark, toggleDark }) {
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
    <nav className={`fixed w-full z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-2xl transform-gpu' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className={`font-bold text-xl transition-all duration-300 transform-gpu ${
            scrolled ? 'scale-95' : 'scale-100'
          } text-slate-900 dark:text-white`}>
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Muhammad Usama
            </span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item, index) => (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className="relative px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-xl transition-all duration-300 group transform-gpu hover:scale-105"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {item.label}
                <span className="absolute inset-0 rounded-xl bg-slate-100 dark:bg-slate-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></span>
              </button>
            ))}
            
            <button
              onClick={toggleDark}
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 transform-gpu hover:scale-110 hover:rotate-12"
            >
              <div className="relative">
                <Sun className={`absolute transition-all duration-500 ${isDark ? 'opacity-0 rotate-180 scale-0' : 'opacity-100 rotate-0 scale-100'}`} size={20} />
                <Moon className={`transition-all duration-500 ${isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-180 scale-0'}`} size={20} />
              </div>
            </button>
            
            <a
              href="/resume.pdf"
              download
              className="bg-gradient-to-r from-slate-700 to-slate-800 dark:from-slate-600 dark:to-slate-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:from-slate-800 hover:to-slate-900 dark:hover:from-slate-700 dark:hover:to-slate-800 transition-all duration-300 flex items-center gap-2 transform-gpu hover:scale-105 hover:shadow-lg"
            >
              <Download size={16} className="transition-transform duration-300 group-hover:translate-y-0.5" />
              Resume
            </a>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleDark}
              className="p-2 text-slate-600 dark:text-slate-300 rounded-xl transition-all duration-300 transform-gpu hover:scale-110"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-600 dark:text-slate-300 rounded-xl transition-all duration-300 transform-gpu hover:scale-110"
            >
              <div className="relative w-6 h-6">
                <Menu className={`absolute transition-all duration-300 ${isOpen ? 'opacity-0 rotate-180 scale-0' : 'opacity-100 rotate-0 scale-100'}`} size={24} />
                <X className={`absolute transition-all duration-300 ${isOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-180 scale-0'}`} size={24} />
              </div>
            </button>
          </div>
        </div>
        
        {/* Mobile Menu Dropdown */}
        <div className={`md:hidden overflow-hidden transition-all duration-500 ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="py-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 mt-2">
            {navItems.map((item, index) => (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className="block w-full text-left px-6 py-3 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 transform-gpu"
                style={{ 
                  animationDelay: `${index * 50}ms`,
                  transform: isOpen ? 'translateY(0)' : 'translateY(-10px)'
                }}
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

// Enhanced Hero Section with advanced animations
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
    <section ref={ref} id="home" className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-purple-900 flex items-center pt-16 overflow-hidden">
      <ParticlesBackground />
      
      {/* Animated background shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-500/10 rounded-full animate-ping"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-green-500/10 rounded-full animate-bounce"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          {/* Status Badge */}
          <div className={`inline-flex items-center gap-3 px-6 py-3 bg-white/90 dark:bg-slate-800/90 rounded-full shadow-xl backdrop-blur-sm transition-all duration-1000 transform-gpu ${
            isInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50"></div>
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Available for opportunities</span>
          </div>

          {/* Main Heading with Typewriter Effect */}
          <div className={`transition-all duration-1000 delay-300 transform-gpu ${
            isInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white leading-tight">
              {text}
              <span className="inline-block w-1 h-16 bg-blue-600 ml-2 animate-pulse"></span>
            </h1>
          </div>
          
          {/* Subtitle */}
          <div className={`transition-all duration-1000 delay-500 transform-gpu ${
            isInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <h2 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
              Software Engineer & Java Developer
            </h2>
          </div>
          
          {/* Description */}
          <div className={`transition-all duration-1000 delay-700 transform-gpu ${
            isInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed">
              Passionate about building scalable solutions with{' '}
              <span className="inline-block px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full font-semibold mx-1 transform hover:scale-110 transition-transform duration-300">
                Java
              </span>,{' '}
              <span className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full font-semibold mx-1 transform hover:scale-110 transition-transform duration-300">
                Spring Boot
              </span>, and modern technologies. 
              Currently architecting fintech solutions at YAP Pakistan.
            </p>
          </div>
          
          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row gap-6 justify-center transition-all duration-1000 delay-900 transform-gpu ${
            isInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <button
              onClick={() => document.querySelector('#projects').scrollIntoView({ behavior: 'smooth' })}
              className="group bg-gradient-to-r from-slate-700 to-slate-800 dark:from-slate-600 dark:to-slate-700 text-white px-8 py-4 rounded-2xl font-semibold hover:from-slate-800 hover:to-slate-900 dark:hover:from-slate-700 dark:hover:to-slate-800 transition-all duration-300 flex items-center justify-center gap-3 transform-gpu hover:scale-105 hover:shadow-2xl"
            >
              <Eye size={20} className="transition-transform duration-300 group-hover:scale-110" />
              View My Work
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <button 
              onClick={() => document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' })}
              className="group border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 px-8 py-4 rounded-2xl font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 hover:border-slate-400 dark:hover:border-slate-500 transition-all duration-300 flex items-center justify-center gap-3 transform-gpu hover:scale-105 backdrop-blur-sm"
            >
              <Send size={20} className="transition-transform duration-300 group-hover:scale-110" />
              Get In Touch
            </button>
          </div>
          
          {/* Social Links */}
          <div className={`flex justify-center space-x-6 transition-all duration-1000 delay-1100 transform-gpu ${
            isInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            {[
              { href: "https://github.com/usaamaizm", icon: Github, color: "hover:text-gray-900 dark:hover:text-gray-100" },
              { href: "https://linkedin.com/in/mianusama8748", icon: Linkedin, color: "hover:text-blue-600" },
              { href: "mailto:usaamaizm@gmail.com", icon: Mail, color: "hover:text-red-500" }
            ].map(({ href, icon: Icon, color }, index) => (
              <a
                key={href}
                href={href}
                className={`w-14 h-14 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl flex items-center justify-center text-slate-600 dark:text-slate-300 ${color} transition-all duration-300 transform-gpu hover:scale-110 hover:shadow-lg hover:-translate-y-1`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Icon size={22} />
              </a>
            ))}
          </div>
          
          {/* Scroll Indicator */}
          <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-1300 ${
            isInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <div className="animate-bounce">
              <ChevronDown size={32} className="text-slate-400 dark:text-slate-500" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Enhanced Stats Section with counter animations
function StatsSection() {
  const [ref, isInView] = useInView();
  const [counts, setCounts] = useState({ exp: 0, apis: 0, projects: 0, companies: 0 });

  const stats = [
    { key: 'exp', target: 2, label: 'Years Experience', icon: Calendar, suffix: '+' },
    { key: 'apis', target: 100, label: 'APIs Built', icon: Code, suffix: '+' },
    { key: 'projects', target: 5, label: 'Projects Completed', icon: Server, suffix: '+' },
    { key: 'companies', target: 3, label: 'Companies', icon: Award, suffix: '' }
  ];

  useEffect(() => {
    if (isInView) {
      stats.forEach(({ key, target }) => {
        let start = 0;
        const duration = 2000;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
          start += increment;
          if (start >= target) {
            setCounts(prev => ({ ...prev, [key]: target }));
            clearInterval(timer);
          } else {
            setCounts(prev => ({ ...prev, [key]: Math.floor(start) }));
          }
        }, 16);
      });
    }
  }, [isInView]);

  return (
    <section ref={ref} className="py-20 bg-white dark:bg-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 dark:from-blue-500/10 dark:to-purple-500/10"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.key}
              className={`text-center group transition-all duration-1000 transform-gpu ${
                isInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="w-20 h-20 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 transform-gpu shadow-lg group-hover:shadow-xl">
                <stat.icon className="text-slate-600 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300" size={28} />
              </div>
              <div className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-3 tabular-nums">
                {counts[stat.key]}{stat.suffix}
              </div>
              <div className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Enhanced About Section
function AboutSection() {
  const [ref, isInView] = useInView();

  const features = [
    { icon: Server, title: 'Backend Development', desc: 'Building scalable APIs and microservices with Spring Boot', color: 'from-blue-500 to-blue-600' },
    { icon: Database, title: 'Database Design', desc: 'Designing efficient database schemas with SQL and JPA', color: 'from-green-500 to-green-600' },
    { icon: Code, title: 'API Development', desc: 'Creating RESTful services and integrating third-party APIs', color: 'from-purple-500 to-purple-600' },
    { icon: Globe, title: 'System Integration', desc: 'Integrating various systems and ensuring seamless data flow', color: 'from-orange-500 to-orange-600' }
  ];

  return (
    <section ref={ref} id="about" className="py-20 bg-slate-50 dark:bg-slate-800 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-10 right-10 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-1000 transform-gpu ${
          isInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6">
            About <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Me</span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-8"></div>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Passionate about creating elegant solutions to complex problems
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column */}
          <div className={`bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-10 rounded-3xl shadow-xl transition-all duration-1000 transform-gpu hover:scale-105 hover:shadow-2xl ${
            isInView ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
          }`}>
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
              Full Stack Developer & <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Cloud Native Enthusiast</span>
            </h3>
            <div className="space-y-6 text-slate-600 dark:text-slate-300 leading-relaxed">
              <p>
                Results-driven Java Developer with 2+ years of experience, specializing in microservices architecture 
                and cloud native applications. My expertise includes working with Java, Spring Boot, and RESTful APIs.
              </p>
              <p>
                I succeed in agile environments, collaborating effectively with team members to achieve project goals 
                and continuously improve my technical skills.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4 mt-8">
              <span className="group bg-gradient-to-r from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 text-green-700 dark:text-green-300 px-6 py-3 rounded-full text-sm font-semibold hover:scale-105 transition-transform duration-300 cursor-default">
                🏆 Achiever of the Month
              </span>
              <span className="group bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 text-blue-700 dark:text-blue-300 px-6 py-3 rounded-full text-sm font-semibold hover:scale-105 transition-transform duration-300 cursor-default">
                📚 Teaching Assistant
              </span>
            </div>
          </div>

          {/* Right Column */}
          <div className={`bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-10 rounded-3xl shadow-xl transition-all duration-1000 transform-gpu ${
            isInView ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
          }`}>
            <h4 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">What I Do</h4>
            
            <div className="space-y-6">
              {features.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-5 group transition-all duration-500 transform-gpu hover:translate-x-2 ${
                    isInView ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 200 + 500}ms` }}
                >
                  <div className={`w-14 h-14 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}>
                    <item.icon className="text-white" size={24} />
                  </div>
                  <div>
                    <h5 className="font-bold text-lg text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      {item.title}
                    </h5>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Enhanced Experience Section with ultra-modern timeline
function ExperienceSection() {
  const [ref, isInView] = useInView();

  const experiences = [
    {
      title: "Software Engineer",
      company: "YAP Pakistan",
      period: "Feb 2025 - Present",
      location: "On-site",
      description: [
        "Leading backend development for Pakistan's premier fintech platform",
        "Architecting scalable microservices for financial transactions and banking operations",
        "Implementing secure payment processing systems with high availability and performance",
        "Collaborating with cross-functional teams to deliver innovative financial solutions",
        "Providing support to production environment and resolving critical issues"
      ],
      technologies: ["Java", "Spring Boot", "Microservices", "Payment Systems", "Banking APIs", "Security"],
      status: "current",
      icon: "🏦",
      color: "from-emerald-500 to-green-500",
      bgColor: "from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20"
    },
    {
      title: "Associate Software Engineer",
      company: "Digitify",
      period: "Aug 2024 - Feb 2025",
      location: "Hybrid",
      description: [
        "Designed and built secure RESTful APIs to facilitate communication between different system components",
        "Streamlined TPIN management by automating expiration handling and enhancing security workflows within the YAP Pakistan platform",
        "Developed critical features for financial transaction processing and user authentication",
        "Involved in debugging complex issues and optimizing system performance"
      ],
      technologies: ["Java", "Spring Boot", "REST APIs", "Security", "Automation", "Financial Systems"],
      status: "completed",
      icon: "🔧",
      color: "from-blue-500 to-indigo-500",
      bgColor: "from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20"
    },
    {
      title: "Java Software Engineer",
      company: "Meganos",
      period: "Sep 2023 - July 2024",
      location: "Hybrid",
      description: [
        "Delivered critical upgrades and enhancements for the Makro Customer Service application, serving a substantial user base",
        "Enhanced API efficiency, significantly reducing response times and server load",
        "Led the transition of legacy applications to the latest Spring Boot version, improving security and operational efficiency"
      ],
      technologies: ["Java", "Spring Boot", "API Optimization", "Spring Migration", "AWS EC2"],
      status: "completed",
      icon: "⚡",
      color: "from-purple-500 to-violet-500",
      bgColor: "from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20"
    }
  ];

  return (
    <section ref={ref} id="experience" className="py-16 bg-white dark:bg-slate-900 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-10 left-1/4 w-72 h-72 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-1/4 w-72 h-72 bg-gradient-to-r from-green-500/5 to-blue-500/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-12 transition-all duration-300 transform-gpu ${
          isInView ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
        }`}>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-4">
            Career <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Journey</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Building enterprise solutions with cutting-edge technology
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Modern Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500 via-blue-500 to-purple-500 rounded-full opacity-30"></div>
          
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`relative transition-all duration-200 transform-gpu ${
                  isInView ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Timeline Node */}
                <div className="absolute left-6 w-4 h-4 rounded-full bg-white dark:bg-slate-900 border-2 border-current shadow-lg z-10"
                     style={{ 
                       color: exp.status === 'current' ? 'rgb(34 197 94)' : 'rgb(59 130 246)',
                       top: '1.5rem'
                     }}>
                  <div className="absolute inset-0.5 rounded-full bg-current opacity-60"></div>
                  {exp.status === 'current' && (
                    <div className="absolute -inset-1 rounded-full bg-current opacity-20 animate-ping"></div>
                  )}
                </div>
                
                {/* Content Card */}
                <div className="ml-16">
                  <div className={`bg-gradient-to-br ${exp.bgColor} backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 transform-gpu hover:scale-[1.01] group border border-white/20 dark:border-slate-700/20`}>
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 bg-gradient-to-r ${exp.color} rounded-xl flex items-center justify-center shadow-lg flex-shrink-0`}>
                          <span className="text-xl">{exp.icon}</span>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                            {exp.title}
                          </h3>
                          <p className={`text-base font-semibold bg-gradient-to-r ${exp.color} bg-clip-text text-transparent`}>
                            {exp.company}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2 sm:mt-0 sm:text-right">
                        <div className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                          exp.status === 'current' 
                            ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300' 
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                        }`}>
                          {exp.status === 'current' ? 'Current Position' : 'Completed'}
                        </div>
                        <div className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
                          <p className="font-medium">{exp.period}</p>
                          <p>{exp.location}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-3 text-sm flex items-center gap-2">
                          <Target size={14} className="text-blue-500" />
                          Key Responsibilities:
                        </h4>
                        <ul className="space-y-2">
                          {exp.description.map((item, i) => (
                            <li key={i} className="text-xs text-slate-600 dark:text-slate-300 flex items-start gap-2 group/item">
                              <div className="w-1.5 h-1.5 bg-current rounded-full mt-1.5 flex-shrink-0 opacity-60 group-hover/item:scale-125 transition-transform duration-200"
                                   style={{ color: exp.status === 'current' ? 'rgb(34 197 94)' : 'rgb(59 130 246)' }}></div>
                              <span className="leading-relaxed">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-3 text-sm flex items-center gap-2">
                          <Zap size={14} className="text-orange-500" />
                          Technologies Used:
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {exp.technologies.map((tech, i) => (
                            <span
                              key={i}
                              className="bg-white/60 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 px-2 py-1 rounded-lg text-xs font-medium hover:bg-white dark:hover:bg-slate-700 transition-all duration-200 cursor-default transform hover:scale-105 backdrop-blur-sm"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Enhanced Projects Section with equal height cards
function ProjectsSection() {
  const [ref, isInView] = useInView();

  const projects = [
    {
      title: "YAP Pakistan",
      description: "YAP is an innovative financial application (Branchless Banking) designed to provide users with intelligent tools, empowering them to take complete control of their finances.",
      image: "🏦",
      gradient: "from-blue-600 to-purple-600",
      technologies: ["Java", "Spring Boot", "REST APIs", "Security", "Batch Processing", "NADRA Integration"],
      features: [
        "Developed 100+ secure REST APIs for Admin Portal and Mobile App",
        "Optimized card statement generation process, reducing database calls by 50%",
        "Developed and implemented secure TPIN management flows for financial Transactions",
        "Seamlessly integrated NADRA verification system with YAP platform"
      ],
      stats: [
        { label: "APIs Built", value: "100+" },
        { label: "Performance Gain", value: "50%" },
        { label: "Users Served", value: "10K+" }
      ],
      status: "In Production",
      type: "Fintech Platform"
    },
    {
      title: "Makro Customer Service",
      description: "The Makro Customer Service application is an internal tool used by Makro, a leading retail company, to enhance and streamline its customer service operations.",
      image: "🛒",
      gradient: "from-green-600 to-blue-600",
      technologies: ["Java", "Spring Boot", "AWS EC2", "Spring Migration", "REST APIs"],
      features: [
        "Resolved complex dependency conflicts, ensuring smooth operation",
        "Deployed on AWS EC2 with optimal performance and reliability",
        "Developed 40+ secure REST APIs for different modules",
        "Migrated from Spring Boot 1.5 to 2.7, improving performance"
      ],
      stats: [
        { label: "APIs Developed", value: "40+" },
        { label: "Spring Upgrade", value: "1.5→2.7" },
        { label: "Performance", value: "+25%" }
      ],
      status: "Completed",
      type: "Enterprise Application"
    }
  ];

  return (
    <section ref={ref} id="projects" className="py-16 bg-slate-50 dark:bg-slate-800 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-green-500/5"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-12 transition-all duration-300 transform-gpu ${
          isInView ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
        }`}>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-4">
            Portfolio <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Showcase</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Real-world applications driving business impact
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`group relative transition-all duration-200 transform-gpu ${
                isInView ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
              }`}
              style={{ 
                transitionDelay: `${index * 50}ms`
              }}
            >
              <div className="h-full flex flex-col bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden transition-all duration-200 transform-gpu group-hover:scale-[1.02] group-hover:shadow-xl border border-slate-200/50 dark:border-slate-700/50">
                {/* Gradient Header */}
                <div className={`h-24 bg-gradient-to-r ${project.gradient} relative overflow-hidden flex-shrink-0`}>
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="absolute top-3 right-3">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      project.status === 'In Production' 
                        ? 'bg-green-500/20 text-green-100 border border-green-400/30' 
                        : 'bg-blue-500/20 text-blue-100 border border-blue-400/30'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-4">
                    <div className="text-3xl">{project.image}</div>
                  </div>
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <div className="mb-3">
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      {project.type}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                      {project.title}
                    </h3>
                  </div>
                  
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4 text-sm">
                    {project.description}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {project.stats.map((stat, i) => (
                      <div key={i} className="text-center p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
                        <div className="text-sm font-bold text-slate-900 dark:text-white">{stat.value}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  <h4 className="font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2 text-sm">
                    <Code size={14} className="text-blue-500" />
                    Technical Achievements:
                  </h4>
                  <ul className="space-y-2 mb-4 flex-1">
                    {project.features.map((feature, i) => (
                      <li key={i} className="text-xs text-slate-600 dark:text-slate-300 flex items-start gap-2 group/feature">
                        <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-1.5 flex-shrink-0 group-hover/feature:scale-125 transition-transform duration-200"></div>
                        <span className="leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-2 py-1 rounded-lg text-xs font-medium hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-700 dark:hover:text-blue-300 transition-all duration-200 cursor-default transform hover:scale-105"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Enhanced Skills Section with interactive elements
function SkillsSection() {
  const [ref, isInView] = useInView();
  const [activeCategory, setActiveCategory] = useState(0);

  const skillCategories = [
    {
      title: "Backend Technologies",
      icon: Server,
      color: "from-blue-500 to-blue-600",
      skills: [
        { name: "Java", level: 95, icon: "☕" },
        { name: "Spring Boot", level: 90, icon: "🍃" },
        { name: "Spring Security", level: 85, icon: "🔒" },
        { name: "Hibernate", level: 80, icon: "🗄️" },
        { name: "JPA", level: 85, icon: "📊" },
        { name: "Microservices", level: 80, icon: "🔧" }
      ]
    },
    {
      title: "Databases & Storage",
      icon: Database,
      color: "from-green-500 to-green-600",
      skills: [
        { name: "PostgreSQL", level: 85, icon: "🐘" },
        { name: "MySQL", level: 90, icon: "🗃️" },
        { name: "SQL Server", level: 80, icon: "💾" },
        { name: "Redis", level: 75, icon: "🔴" },
        { name: "MongoDB", level: 70, icon: "🍃" }
      ]
    },
    {
      title: "Tools & DevOps",
      icon: Globe,
      color: "from-purple-500 to-purple-600",
      skills: [
        { name: "Docker", level: 80, icon: "🐋" },
        { name: "Git", level: 95, icon: "📝" },
        { name: "GitHub", level: 90, icon: "🐙" },
        { name: "GitLab", level: 85, icon: "🦊" },
        { name: "AWS EC2", level: 75, icon: "☁️" },
        { name: "Maven", level: 85, icon: "📦" }
      ]
    },
    {
      title: "Frontend & Others",
      icon: Code,
      color: "from-orange-500 to-orange-600",
      skills: [
        { name: "TypeScript", level: 80, icon: "🔷" },
        { name: "Angular", level: 75, icon: "🅰️" },
        { name: "HTML/CSS", level: 85, icon: "🎨" },
        { name: "REST APIs", level: 95, icon: "🔗" },
        { name: "Swagger", level: 80, icon: "📋" }
      ]
    }
  ];

  return (
    <section ref={ref} id="skills" className="py-20 bg-white dark:bg-slate-900 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-green-500/5 to-orange-500/5 rounded-full blur-3xl animate-pulse"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-1000 transform-gpu ${
          isInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6">
            Skills & <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Technologies</span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-8"></div>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Technologies and tools I work with
          </p>
        </div>

        {/* Category Tabs */}
        <div className={`flex flex-wrap justify-center gap-4 mb-12 transition-all duration-1000 transform-gpu ${
          isInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          {skillCategories.map((category, index) => (
            <button
              key={index}
              onClick={() => setActiveCategory(index)}
              className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 transform-gpu hover:scale-105 ${
                activeCategory === index
                  ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <category.icon size={20} />
              <span className="hidden sm:inline">{category.title}</span>
            </button>
          ))}
        </div>

        {/* Skills Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories[activeCategory].skills.map((skill, index) => (
            <div
              key={skill.name}
              className={`bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform-gpu hover:scale-105 border border-slate-200/50 dark:border-slate-700/50 ${
                isInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="text-2xl">{skill.icon}</div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900 dark:text-white">{skill.name}</h3>
                  <div className="text-sm text-slate-500 dark:text-slate-400">{skill.level}% Proficiency</div>
                </div>
              </div>
              
              <div className="relative">
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${skillCategories[activeCategory].color} rounded-full transition-all duration-1000 ease-out`}
                    style={{
                      width: isInView ? `${skill.level}%` : '0%',
                      transitionDelay: `${index * 100 + 500}ms`
                    }}
                  ></div>
                </div>
                <div className="absolute right-0 top-0 h-full flex items-center">
                  <Zap size={12} className="text-yellow-500" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Enhanced Contact Section with equal height cards
function ContactSection() {
  const [ref, isInView] = useInView();
  const [formData, setFormData] = useState({
    name: '', email: '', subject: '', message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 800));
    
    alert('Thank you for your message! I will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'usaamaizm@gmail.com', href: 'mailto:usaamaizm@gmail.com', color: 'from-red-500 to-pink-500' },
    { icon: Phone, label: 'Phone', value: '(92) 301-6194648', href: 'tel:+923016194648', color: 'from-green-500 to-emerald-500' },
    { icon: MapPin, label: 'Location', value: 'Sheikhupura, Pakistan', href: '#', color: 'from-blue-500 to-indigo-500' }
  ];

  const socialLinks = [
    { href: "https://github.com/usaamaizm", icon: Github, label: "GitHub", color: "hover:text-gray-900 dark:hover:text-gray-100" },
    { href: "https://linkedin.com/in/mianusama8748", icon: Linkedin, label: "LinkedIn", color: "hover:text-blue-600" },
    { href: "mailto:usaamaizm@gmail.com", icon: Mail, label: "Email", color: "hover:text-red-500" }
  ];

  return (
    <section ref={ref} id="contact" className="py-16 bg-slate-50 dark:bg-slate-800 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-green-500/5"></div>
        <div className="absolute top-10 right-10 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-12 transition-all duration-300 transform-gpu ${
          isInView ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
        }`}>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-4">
            Start a <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Conversation</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Ready to discuss your next project or opportunity
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className={`transition-all duration-300 transform-gpu ${
            isInView ? 'translate-x-0 opacity-100' : '-translate-x-5 opacity-0'
          }`}>
            <div className="h-full flex flex-col bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-slate-200/50 dark:border-slate-700/50">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                <Target className="text-blue-600" size={28} />
                Contact Information
              </h3>
              
              <div className="space-y-4 mb-6 flex-1">
                {contactInfo.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-200 group transform-gpu hover:scale-[1.02]"
                  >
                    <div className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-200`}>
                      <item.icon className="text-white" size={20} />
                    </div>
                    <div>
                      <p className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wide">{item.label}</p>
                      <p className="text-slate-900 dark:text-white font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 text-sm">
                        {item.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                <h4 className="text-base font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <Users size={18} />
                  Social Networks
                </h4>
                <div className="flex gap-3">
                  {socialLinks.map(({ href, icon: Icon, label, color }, index) => (
                    <a
                      key={href}
                      href={href}
                      className={`w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center text-slate-600 dark:text-slate-300 ${color} transition-all duration-200 transform-gpu hover:scale-110 hover:shadow-lg hover:-translate-y-0.5 group`}
                      title={label}
                    >
                      <Icon size={20} className="group-hover:scale-110 transition-transform duration-200" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`transition-all duration-300 transform-gpu ${
            isInView ? 'translate-x-0 opacity-100' : 'translate-x-5 opacity-0'
          }`}>
            <div className="h-full flex flex-col bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-slate-200/50 dark:border-slate-700/50">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                <Send className="text-purple-600" size={28} />
                Quick Message
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4 flex-1 flex flex-col">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="group">
                    <label className="block text-slate-700 dark:text-slate-300 font-medium mb-2 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400 transition-colors duration-200 text-sm">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2.5 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-white transition-all duration-200 placeholder-slate-400 dark:placeholder-slate-500 text-sm"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="group">
                    <label className="block text-slate-700 dark:text-slate-300 font-medium mb-2 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400 transition-colors duration-200 text-sm">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2.5 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-white transition-all duration-200 placeholder-slate-400 dark:placeholder-slate-500 text-sm"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                <div className="group">
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-2 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400 transition-colors duration-200 text-sm">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2.5 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-white transition-all duration-200 placeholder-slate-400 dark:placeholder-slate-500 text-sm"
                    placeholder="Project collaboration, job opportunity..."
                  />
                </div>
                
                <div className="group flex-1 flex flex-col">
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-2 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400 transition-colors duration-200 text-sm">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    required
                    className="w-full px-3 py-2.5 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-white transition-all duration-200 resize-none placeholder-slate-400 dark:placeholder-slate-500 text-sm flex-1"
                    placeholder="Tell me about your project..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 transform-gpu hover:scale-[1.02] hover:shadow-lg group text-sm"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} className="group-hover:translate-x-0.5 transition-transform duration-200" />
                      Send Message
                      <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-200" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Enhanced Footer
function Footer() {
  const [ref, isInView] = useInView();

  return (
    <footer ref={ref} className="bg-slate-900 dark:bg-black text-white py-16 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-green-500/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center transition-all duration-1000 transform-gpu ${
          isInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="mb-8">
            <h3 className="text-3xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Muhammad Usama
              </span>
            </h3>
            <p className="text-slate-400 text-lg">Software Engineer & Java Developer</p>
            <p className="text-slate-500 text-sm mt-2">Building the future, one line of code at a time</p>
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
                className="w-14 h-14 bg-slate-800/80 backdrop-blur-sm rounded-2xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-all duration-300 transform-gpu hover:scale-110 hover:shadow-lg hover:-translate-y-1 group"
                title={label}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Icon size={22} className="group-hover:scale-110 transition-transform duration-300" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// Main App Component - Fixed
function App() {
  const [isDark, toggleDark] = useDarkMode();
  
  return (
    <div className={`min-h-screen transition-all duration-300 ${
      isDark 
        ? 'bg-slate-900 text-white' 
        : 'bg-white text-slate-900'
    }`}>
      <Navigation isDark={isDark} toggleDark={toggleDark} />
      <main>
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