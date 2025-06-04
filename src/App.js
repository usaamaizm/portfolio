import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Menu, X, Eye, Send, ArrowRight, ChevronDown, Download, CheckCircle, Link, MapPin, Calendar, Building, Server, Database, Code, Globe, Mail, Phone, Github, Linkedin, MessageCircle } from 'lucide-react';

// Custom hooks
const useInView = (threshold = 0.1) => {
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
};

const useScroll = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { scrolled };
};

// Navigation Component
function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { scrolled } = useScroll();
  const [activeSection, setActiveSection] = useState('home');

  const handleScroll = useCallback(() => {
    const sections = ['home', 'about', 'experience', 'projects', 'skills', 'contact'];
    const scrollPosition = window.scrollY + 100;

    const currentSection = sections.find(section => {
      const element = document.getElementById(section);
      if (element) {
        const { offsetTop, offsetHeight } = element;
        return scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight;
      }
      return false;
    });

    if (currentSection) setActiveSection(currentSection);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const navHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsOpen(false);
    }
  };

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#experience', label: 'Experience' },
    { href: '#projects', label: 'Projects' },
    { href: '#skills', label: 'Skills' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a 
            href="#home" 
            onClick={(e) => handleNavClick(e, '#home')}
            className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors duration-200"
          >
            MU
          </a>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-sm font-medium transition-colors duration-200 ${
                  activeSection === link.href.substring(1)
                    ? 'text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-200"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`block text-base font-medium transition-colors duration-200 ${
                  activeSection === link.href.substring(1)
                    ? 'text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

// Hero Section
function HeroSection() {
  const [ref, isInView] = useInView();

  return (
    <section ref={ref} id="home" className="pt-20 pb-16 lg:pt-32 lg:pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-medium mb-8">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            Available for opportunities
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Hi, I'm <span className="text-blue-600">Muhammad Usama</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Software Engineer specializing in <strong>Java</strong> and <strong>Spring Boot</strong>. 
            Currently building fintech solutions at YAP Pakistan.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              onClick={() => document.querySelector('#projects').scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
            >
              <Eye size={18} />
              View My Work
            </button>
            
            <button 
              onClick={() => document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
            >
              <Send size={18} />
              Get In Touch
            </button>

            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
            >
              <Download size={18} />
              Resume
            </a>
          </div>
          
          <div className="animate-bounce">
            <ChevronDown size={24} className="text-gray-400 mx-auto" />
          </div>
        </div>
      </div>
    </section>
  );
}

// Stats Section
function StatsSection() {
  const [ref, isInView] = useInView();

  const stats = [
    { value: '2+', label: 'Years Experience', icon: Calendar },
    { value: '100+', label: 'APIs Built', icon: Code },
    { value: '5+', label: 'Projects Completed', icon: Server },
    { value: '3', label: 'Companies', icon: Building }
  ];

  return (
    <section ref={ref} className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <stat.icon className="text-blue-600" size={24} />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// About Section
function AboutSection() {
  const [ref, isInView] = useInView();

  const skills = [
    { icon: Server, title: 'Backend Development', desc: 'Building scalable APIs and microservices with Spring Boot' },
    { icon: Database, title: 'Database Design', desc: 'Designing efficient database schemas with SQL and JPA' },
    { icon: Code, title: 'API Development', desc: 'Creating RESTful services and integrating third-party APIs' },
    { icon: Globe, title: 'System Integration', desc: 'Integrating various systems and ensuring seamless data flow' }
  ];

  return (
    <section ref={ref} id="about" className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">About Me</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get to know me better
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-gray-50 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Full Stack Developer & Cloud Native Enthusiast
            </h3>
            <div className="space-y-6 text-gray-600 leading-relaxed">
              <p>
                Results-driven Java Developer with 2+ years of experience, specializing in microservices 
                architecture and cloud native applications. My expertise includes working with Java, 
                Spring Boot, and RESTful APIs.
              </p>
              <p>
                I succeed in agile environments, collaborating effectively with team members to achieve 
                project goals and continuously improve my technical skills.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 mt-8">
              <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                🏆 Achiever of the Month
              </span>
              <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                📚 Teaching Assistant
              </span>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-8">
            <h4 className="text-2xl font-bold text-gray-900 mb-6">What I Do</h4>
            
            <div className="space-y-6">
              {skills.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <item.icon className="text-white" size={20} />
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-1">{item.title}</h5>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
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

// Experience Section
function ExperienceSection() {
  const [ref, isInView] = useInView();
  
  const experiences = [
    {
      title: "Software Engineer",
      company: "YAP Pakistan",
      period: "Feb 2025 - Present",
      location: "Remote",
      description: [
        "Leading backend development for Pakistan's premier fintech platform",
        "Architecting scalable microservices for financial transactions and banking operations",
        "Implementing secure payment processing systems with high availability and performance",
        "Providing support to production environment and resolving critical issues",
        "Collaborating with cross-functional teams to deliver innovative financial solutions"
      ],
      technologies: ["Java", "Spring Boot", "Microservices", "Payment Systems", "Banking APIs", "Security"],
      status: "Current",
      icon: "🏦"
    },
    {
      title: "Associate Software Engineer",
      company: "Digitify",
      period: "Aug 2024 - Feb 2025",
      location: "Remote",
      description: [
        "Designed and built secure RESTful APIs to facilitate communication between different system components",
        "Streamlined TPIN management by automating expiration handling and enhancing security workflows within the YAP Pakistan platform",
        "Developed critical features for financial transaction processing and user authentication",
        "Involved in debugging complex issues and optimizing system performance"
      ],
      technologies: ["Java", "Spring Boot", "REST APIs", "Security", "Automation", "Financial Systems"],
      status: "Completed",
      icon: "💸"
    },
    {
      title: "Java Software Engineer",
      company: "Meganos",
      period: "Oct 2023 - July 2024",
      location: "Remote",
      description: [
        "Delivered critical upgrades and enhancements for the Makro Customer Service application, serving a substantial user base",
        "Enhanced API efficiency, significantly reducing response times and server load",
        "Led the transition of legacy applications to the latest Spring Boot version, improving security and operational efficiency"
      ],
      technologies: ["Java", "Spring Boot", "API Optimization", "Spring Migration", "AWS EC2"],
      status: "Completed",
      icon: "🏢"
    }
  ];

  return (
    <section ref={ref} id="experience" className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Professional Experience
          </h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Building robust enterprise solutions with modern Java technologies
          </p>
        </div>

        {/* Desktop Timeline */}
        <div className="hidden lg:block">
          <div className="relative">
            <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-gray-300"></div>
            
            <div className="space-y-12">
              {experiences.map((exp, idx) => (
                <div key={exp.title} className="relative flex items-start">
                  <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center z-10">
                    <span className="text-3xl">{exp.icon}</span>
                  </div>
                  
                  <div className="ml-8 flex-1 bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                    <div className="flex flex-wrap items-start justify-between mb-6">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{exp.title}</h3>
                        <div className="flex items-center gap-2 text-blue-600 font-medium text-lg mb-3">
                          {exp.company}
                          {exp.company === "YAP Pakistan" && (
                            <a href="https://yappakistan.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 transition-colors">
                              <Link size={16} />
                            </a>
                          )}
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                          <div className="flex items-center gap-1">
                            <Calendar size={14} />
                            <span>{exp.period}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin size={14} />
                            <span>{exp.location}</span>
                          </div>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        exp.status === 'Current' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {exp.status}
                      </span>
                    </div>

                    <div className="mb-6">
                      <ul className="space-y-2">
                        {exp.description.map((item, i) => (
                          <li key={i} className="flex items-start gap-3 text-gray-700">
                            <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map(tech => (
                        <span key={tech} className="px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-md border border-blue-200">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden space-y-8">
          {experiences.map((exp, idx) => (
            <div key={exp.title} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">{exp.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{exp.title}</h3>
                  <div className="flex items-center gap-2 text-blue-600 font-medium mb-2">
                    <span className="truncate">{exp.company}</span>
                    {exp.company === "YAP Pakistan" && (
                      <a href="https://yappakistan.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 transition-colors flex-shrink-0">
                        <Link size={14} />
                      </a>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar size={12} />
                      <span>{exp.period}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin size={12} />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  exp.status === 'Current' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  {exp.status}
                </span>
              </div>

              <div className="mb-5">
                <ul className="space-y-2">
                  {exp.description.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-700 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-2">
                {exp.technologies.map(tech => (
                  <span key={tech} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded border border-blue-200">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Projects Section
function ProjectsSection() {
  const [ref, isInView] = useInView();
  
  const projects = [
    {
      title: "YAP Pakistan",
      subtitle: "Pakistan's Premier Fintech Platform",
      description: "Leading backend development for Pakistan's premier fintech platform, architecting scalable microservices for financial transactions and banking operations.",
      detailedFeatures: [
        "Implementing secure payment processing systems with high availability and performance",
        "Providing support to production environment and resolving critical issues",
        "Collaborating with cross-functional teams to deliver innovative financial solutions",
        "Built scalable microservices architecture handling thousands of transactions daily"
      ],
      technologies: ["Java", "Spring Boot", "Microservices", "Payment Systems", "Banking APIs", "Security", "PostgreSQL", "Docker", "Kubernetes"],
      status: "Live Project",
      timeline: "Feb 2025 - Present",
      role: "Software Engineer",
      image: "/projects/yap.png",
      link: "https://yappakistan.com",
      icon: "🏦",
      metrics: {
        users: "100K+",
        transactions: "Daily",
        uptime: "99.9%"
      }
    },
    {
      title: "Digitify - YAP Integration",
      subtitle: "Financial Transaction Processing System",
      description: "Designed and built secure RESTful APIs to facilitate communication between different system components within the YAP Pakistan platform.",
      detailedFeatures: [
        "Streamlined TPIN management by automating expiration handling and enhancing security workflows",
        "Developed critical features for financial transaction processing and user authentication",
        "Enhanced system security through automated workflow improvements",
        "Optimized API performance for better user experience"
      ],
      technologies: ["Java", "Spring Boot", "REST APIs", "Security", "Automation", "Financial Systems", "TPIN Management", "Authentication"],
      status: "Completed",
      timeline: "Aug 2024 - Feb 2025",
      role: "Associate Software Engineer",
      image: "/projects/digitify.png",
      link: "#",
      icon: "💸",
      metrics: {
        apis: "50+",
        security: "Enhanced",
        automation: "100%"
      }
    },
    {
      title: "Makro Customer Service",
      subtitle: "Enterprise Customer Service Application",
      description: "Delivered critical upgrades and enhancements for the Makro Customer Service application, serving a substantial user base with improved performance.",
      detailedFeatures: [
        "Enhanced API efficiency, significantly reducing response times and server load",
        "Led the transition of legacy applications to the latest Spring Boot version",
        "Improved security and operational efficiency across the platform",
        "Optimized database queries and implemented caching strategies"
      ],
      technologies: ["Java", "Spring Boot", "API Optimization", "Spring Migration", "AWS EC2", "MySQL", "Performance Tuning"],
      status: "Completed",
      timeline: "Oct 2023 - July 2024",
      role: "Java Software Engineer",
      image: "/projects/makro.png",
      link: "https://makro.com",
      icon: "🏢",
      metrics: {
        performance: "+40%",
        users: "10K+",
        uptime: "99.8%"
      }
    }
  ];

  return (
    <section ref={ref} id="projects" className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Featured Projects
          </h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Real-world applications and enterprise solutions I've built
          </p>
        </div>

        <div className="space-y-12">
          {projects.map((project, index) => (
            <div 
              key={project.title} 
              className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 ${
                isInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Project Header */}
              <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-6 lg:px-8 py-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center text-3xl shadow-sm border border-gray-100">
                      {project.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-bold text-gray-900">{project.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          project.status === 'Live Project' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {project.status}
                        </span>
                      </div>
                      <p className="text-lg font-medium text-blue-600 mb-1">{project.subtitle}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {project.timeline}
                        </span>
                        <span className="flex items-center gap-1">
                          <Building size={14} />
                          {project.role}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Project Metrics */}
                  <div className="flex gap-6 lg:flex-col lg:items-end">
                    {Object.entries(project.metrics).map(([key, value]) => (
                      <div key={key} className="text-center lg:text-right">
                        <div className="text-lg font-bold text-gray-900">{value}</div>
                        <div className="text-xs text-gray-500 capitalize">{key}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6 lg:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Main Description */}
                  <div className="lg:col-span-2">
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">Project Overview</h4>
                      <p className="text-gray-600 leading-relaxed mb-4">{project.description}</p>
                    </div>

                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Key Features & Achievements</h4>
                      <ul className="space-y-3">
                        {project.detailedFeatures.map((feature, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700 leading-relaxed">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Technologies Used</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map(tech => (
                          <span key={tech} className="px-3 py-1.5 bg-blue-50 text-blue-700 text-sm font-medium rounded-lg border border-blue-100">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Project Image & Links */}
                  <div className="lg:col-span-1">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 text-center mb-6">
                      <div className="text-6xl mb-4">{project.icon}</div>
                      <p className="text-sm text-gray-600">Live Enterprise Application</p>
                    </div>

                    <div className="space-y-3">
                      {project.link !== "#" && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
                        >
                          <Globe size={18} />
                          View Live Project
                          <ArrowRight size={16} />
                        </a>
                      )}
                      
                      <button
                        onClick={() => document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' })}
                        className="w-full inline-flex items-center justify-center gap-2 bg-white text-gray-900 border border-gray-300 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
                      >
                        <MessageCircle size={18} />
                        Discuss This Project
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 lg:p-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Interested in My Work?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              These projects showcase my expertise in Java, Spring Boot, and enterprise application development. 
              Let's discuss how I can help bring your ideas to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
              >
                <Send size={18} />
                Start a Project
              </button>
              <a
                href="/resume.pdf"
                download
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-medium border border-blue-200 hover:bg-blue-50 transition-colors duration-200"
              >
                <Download size={18} />
                Download Resume
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Skills Section
function SkillsSection() {
  const [ref, isInView] = useInView();
  
  const skills = [
    {
      category: "Backend",
      items: [
        { name: "Java", level: 90 },
        { name: "Spring Boot", level: 85 },
        { name: "REST APIs", level: 90 },
        { name: "Microservices", level: 80 }
      ]
    },
    {
      category: "Database",
      items: [
        { name: "PostgreSQL", level: 85 },
        { name: "MySQL", level: 80 },
        { name: "MongoDB", level: 75 },
        { name: "Redis", level: 70 }
      ]
    },
    {
      category: "DevOps",
      items: [
        { name: "Docker", level: 80 },
        { name: "Kubernetes", level: 75 },
        { name: "AWS", level: 80 },
        { name: "CI/CD", level: 75 }
      ]
    }
  ];

  return (
    <section ref={ref} id="skills" className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Technical Skills
          </h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            My expertise and technologies I work with
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skills.map((category, index) => (
            <div key={category.category} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6">{category.category}</h3>
              <div className="space-y-4">
                {category.items.map(skill => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                      <span className="text-sm text-gray-500">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Contact Section
function ContactSection() {
  const [ref, isInView] = useInView();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 800));
    
    alert('Thank you for your message! I will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  const contactInfo = [
    { 
      icon: Mail, 
      label: 'Email', 
      value: 'usaamaizm@gmail.com', 
      href: 'mailto:usaamaizm@gmail.com',
      description: 'Drop me a line anytime'
    },
    { 
      icon: Phone, 
      label: 'Phone', 
      value: '(92) 301-6194648', 
      href: 'tel:+923016194648',
      description: 'Available during business hours'
    },
    { 
      icon: MapPin, 
      label: 'Location', 
      value: 'Sheikhupura, Pakistan', 
      href: '#',
      description: 'Remote work available globally'
    }
  ];

  const socialLinks = [
    { href: "https://github.com/usaamaizm", icon: Github, label: "GitHub" },
    { href: "https://linkedin.com/in/mianusama8748", icon: Linkedin, label: "LinkedIn" },
    { href: "mailto:usaamaizm@gmail.com", icon: Mail, label: "Email" }
  ];

  return (
    <section ref={ref} id="contact" className="py-16 lg:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Let's Work Together
          </h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ready to discuss your next project? I'm always open to new opportunities and interesting conversations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-2">
            <div className="bg-gray-50 rounded-xl p-8 h-full">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                  <MessageCircle className="text-white" size={20} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Get In Touch</h3>
              </div>
              
              <div className="space-y-6 mb-8">
                {contactInfo.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="block group hover:bg-white rounded-lg p-4 transition-all duration-200 border border-transparent hover:border-gray-200 hover:shadow-sm"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-200">
                        <item.icon className="text-blue-600 group-hover:text-white transition-colors duration-200" size={18} />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                          {item.value}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              <div className="pt-6 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-900 mb-4">Connect with me</h4>
                <div className="flex gap-3">
                  {socialLinks.map(({ href, icon: Icon, label }, index) => (
                    <a
                      key={href}
                      href={href}
                      className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-gray-600 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-all duration-200"
                      title={label}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon size={18} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                  <Send className="text-white" size={20} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Send Message</h3>
              </div>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    placeholder="Project collaboration, job opportunity..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 resize-none"
                    placeholder="Tell me about your project or how I can help you..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Additional CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 lg:p-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Start Your Project?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              I'm always excited to work on new challenges and help bring innovative ideas to life. 
              Let's discuss how we can work together to achieve your goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:usaamaizm@gmail.com"
                className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
              >
                <Mail size={18} />
                Email Me
              </a>
              <a
                href="https://linkedin.com/in/mianusama8748"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-medium border border-blue-200 hover:bg-blue-50 transition-colors duration-200"
              >
                <Linkedin size={18} />
                Connect on LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-gray-600">
              © {new Date().getFullYear()} Muhammad Usama. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-6">
            <a
              href="https://github.com/usaamaizm"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/mianusama8748"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="mailto:usaamaizm@gmail.com"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Main App Component
function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
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