import React from 'react';
import { Link2, Zap, Users, CheckCircle, ShoppingCart, Link } from 'lucide-react';
import { useInView } from '../hooks';

function GlassCard({ icon, title, type, status, statusColor, description, stats, features, technologies }) {
  return (
    <div className="group relative card-gradient backdrop-blur-xl rounded-3xl shadow-2xl border border-[#517fa4]/30 transition-all duration-150 hover:scale-105 hover:shadow-3xl hover:border-[#517fa4]/50 hover:-rotate-1 p-8 flex flex-col">
      {/* Gradient top border */}
      <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-[#517fa4] via-[#6a8fb5] to-[#517fa4] rounded-t-3xl blur-sm opacity-80"></div>
      
      {/* Status badge */}
      <div className="absolute top-6 right-6 flex items-center gap-2">
        <span className={`px-4 py-1 rounded-full text-xs font-bold text-white ${statusColor} shadow-lg`}>
          {status}
        </span>
      </div>
      
      {/* Icon */}
      <div className="mb-6 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#517fa4]/60 to-[#243949]/60 backdrop-blur-sm border border-[#517fa4]/40 flex items-center justify-center shadow-lg group-hover:shadow-[#517fa4]/30 transition-all duration-150">
          {icon}
        </div>
      </div>
      
      {/* Title & Type */}
      <div className="mb-2 text-center">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#6a8fb5]">{type}</span>
        <h3 className="text-2xl font-bold text-white mt-1 mb-2 flex items-center justify-center gap-2">
          {title}
          {title === "YAP Pakistan" && (
             <a href="https://yappakistan.com/" target="_blank" rel="noopener noreferrer" className="text-[#6a8fb5] hover:text-white transition-colors duration-150">
                <Link size={20} />
             </a>
          )}
        </h3>
      </div>
      
      {/* Description */}
      <p className="text-gray-200 text-center mb-6">{description}</p>
      
      {/* Stats */}
      <div className="flex justify-center gap-6 mb-6">
        {stats.map(stat => (
          <div key={stat.label} className="flex flex-col items-center">
            <div className="text-lg font-bold text-white flex items-center gap-1">{stat.icon}{stat.value}</div>
            <div className="text-xs text-gray-400">{stat.label}</div>
          </div>
        ))}
      </div>
      
      {/* Features */}
      <ul className="mb-6 space-y-2">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2 text-gray-200 text-sm">
            <CheckCircle className="text-[#517fa4] mt-0.5" size={16} />
            {feature}
          </li>
        ))}
      </ul>
      
      {/* Tech stack */}
      <div className="flex flex-wrap gap-2 mt-auto">
        {technologies.map(tech => (
          <span key={tech} className="px-3 py-1 rounded-full bg-gradient-to-r from-[#517fa4]/40 to-[#243949]/40 text-white text-xs font-semibold border border-[#517fa4]/40 shadow-sm">
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
      icon: <span style={{fontSize: '2.2rem', lineHeight: 1}}>🏦</span>,
      status: "In Production",
      statusColor: "bg-gradient-to-r from-green-500 to-green-600",
      type: "Fintech Platform",
      stats: [
        { label: "APIs Built", value: "100+", icon: <Link2 size={18} /> },
        { label: "Performance Gain", value: "50%", icon: <Zap size={18} /> },
        { label: "Users Served", value: "10K+", icon: <Users size={18} /> }
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
      icon: <span style={{fontSize: '2.2rem', lineHeight: 1}}>🛍️</span>,
      status: "Completed",
      statusColor: "bg-gradient-to-r from-[#517fa4] to-[#6a8fb5]",
      type: "Enterprise Application", 
      stats: [
        { label: "APIs Developed", value: "40+", icon: <Link2 size={18} /> },
        { label: "Spring Upgrade", value: "1.5→2.7", icon: <Zap size={18} /> },
        { label: "Performance", value: "+25%", icon: <Users size={18} /> }
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
    <section ref={ref} id="projects" className="py-24 section-gradient relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 w-2/3 h-96 bg-gradient-to-tr from-[#517fa4]/20 via-[#6a8fb5]/20 to-[#243949]/10 rounded-full blur-3xl -translate-x-1/2"></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-[#517fa4] via-[#6a8fb5] to-[#517fa4] bg-clip-text text-transparent mb-4">
            Portfolio <span className="text-white">Showcase</span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-[#517fa4] to-[#243949] mx-auto rounded-full mb-6 animate-pulse"></div>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Real-world applications driving business impact
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {projects.map((project, idx) => (
            <GlassCard key={project.title} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProjectsSection;