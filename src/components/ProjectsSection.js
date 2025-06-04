import React from 'react';
import { Link2, Zap, Users, CheckCircle, ShoppingCart, Link } from 'lucide-react';
import { useInView } from '../hooks';

function GlassCard({ icon, title, type, status, statusColor, description, stats, features, technologies }) {
  return (
    <div className="group relative bg-secondary-800/50 backdrop-blur-xl rounded-xl sm:rounded-3xl shadow-xl border border-primary-700/30 transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl p-6 sm:p-8 flex flex-col">
      {/* Status badge */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-2 z-10">
        <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${statusColor} shadow-md`}>
          {status}
        </span>
      </div>
      
      {/* Icon */}
      <div className="mb-4 sm:mb-6 flex items-center justify-center">
        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-primary-600/80 backdrop-blur-sm border border-white/20 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
          {icon}
        </div>
      </div>
      
      {/* Title & Type */}
      <div className="mb-3 sm:mb-4 text-center">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary-300">{type}</span>
        <h3 className="text-lg sm:text-xl font-bold text-white mt-1 mb-1 flex items-center justify-center gap-2">
          {title}
          {title === "YAP Pakistan" && (
             <a href="https://yappakistan.com/" target="_blank" rel="noopener noreferrer" className="text-primary-300 hover:text-white transition-colors duration-150">
                <Link size={14} />
             </a>
          )}
        </h3>
      </div>
      
      {/* Description */}
      <p className="text-secondary-200 text-center mb-4 sm:mb-6 text-sm leading-relaxed flex-grow">{description}</p>
      
      {/* Stats */}
      <div className="flex justify-center gap-4 sm:gap-6 mb-4 sm:mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="text-base sm:text-lg font-bold text-white flex items-center gap-1">{stat.icon}{stat.value}</div>
            <div className="text-xs text-secondary-400">{stat.label}</div>
          </div>
        ))}
      </div>
      
      {/* Features */}
      <ul className="mb-4 space-y-1.5 text-secondary-200 text-sm leading-relaxed">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2">
            <CheckCircle className="text-primary-400 mt-1 flex-shrink-0" size={14} />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      
      {/* Tech stack */}
      <div className="flex flex-wrap gap-1.5 mt-auto pt-4 border-t border-secondary-700/50">
        {technologies.map(tech => (
          <span key={tech} className="px-2 py-0.5 rounded-full bg-secondary-700 text-primary-300 text-xs font-semibold border border-secondary-600 shadow-sm">
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}

// Enhanced Projects Section with custom gradients
function ProjectsSection() {
  const [ref, isInView] = useInView();
  const projects = [
    {
      title: "YAP Pakistan",
      description: "YAP is an innovative financial application (Branchless Banking) designed to provide users with intelligent tools, empowering them to take complete control of their finances.",
      icon: <span style={{fontSize: '2rem', lineHeight: 1}}>🏦</span>,
      status: "In Production",
      statusColor: "bg-success",
      type: "Fintech Platform",
      stats: [
        { label: "APIs Built", value: "100+", icon: <Link2 size={16} /> },
        { label: "Performance Gain", value: "50%", icon: <Zap size={16} /> },
        { label: "Users Served", value: "10K+", icon: <Users size={16} /> }
      ],
      features: [
        "Developed 100+ secure REST APIs for Admin Portal and Mobile App",
        "Optimized card statement generation process, reducing database calls by 50%",
        "Developed and implemented secure TPIN management flows for financial Transactions",
        "Seamlessly integrated NADRA verification system with YAP platform"
      ],
      technologies: ["Java", "Spring Boot", "REST APIs", "Security", "Batch Processing", "NADRA Integration"]
    },
    {
      title: "Makro Customer Service", 
      description: "The Makro Customer Service application is an internal tool used by Makro, a leading retail company, to enhance and streamline its customer service operations.",
      icon: <span style={{fontSize: '2rem', lineHeight: 1}}>🛍️</span>,
      status: "Completed",
      statusColor: "bg-primary-600",
      type: "Enterprise Application", 
      stats: [
        { label: "APIs Developed", value: "40+", icon: <Link2 size={16} /> },
        { label: "Spring Upgrade", value: "1.5→2.7", icon: <Zap size={16} /> },
        { label: "Performance", value: "+25%", icon: <Users size={16} /> }
      ],
      features: [
        "Resolved complex dependency conflicts, ensuring smooth operation",
        "Deployed on AWS EC2 with optimal performance and reliability", 
        "Developed 40+ secure REST APIs for different modules",
        "Migrated from Spring Boot 1.5 to 2.7, improving performance"
      ],
      technologies: ["Java", "Spring Boot", "AWS EC2", "Spring Migration", "REST APIs"]
    }
  ];

  return (
    <section ref={ref} id="projects" className="py-16 sm:py-20 bg-secondary-900 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-10 left-1/4 w-40 h-40 bg-primary-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-1/4 w-40 h-40 bg-accent-purple rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 bg-clip-text text-transparent">
            <span className="text-white">Portfolio</span> <span className="bg-gradient-to-r from-[#517fa4] to-[#6a8fb5] bg-clip-text text-transparent">Showcase</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#517fa4] to-[#6a8fb5] mx-auto rounded-full mb-6"></div>
          <p className="text-base sm:text-lg text-secondary-300 max-w-3xl mx-auto">
            Real-world applications driving business impact
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
          {projects.map((project, idx) => (
            <GlassCard key={idx} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProjectsSection;