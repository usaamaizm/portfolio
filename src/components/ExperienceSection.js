import React from 'react';
import { CheckCircle, Link } from 'lucide-react';
import { useInView } from '../hooks';

// Enhanced Experience Section with custom gradients
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
        "Providing support to production environment and resolving critical issues",
        "Collaborating with cross-functional teams to deliver innovative financial solutions"
      ],
      technologies: ["Java", "Spring Boot", "Microservices", "Payment Systems", "Banking APIs", "Security"],
      status: "Current",
      statusColor: "bg-success",
      icon: <span style={{fontSize: '1.5rem'}}>🏦</span>,
      type: "Fintech Platform"
    },
    {
      title: "Associate Software Engineer",
      company: "Digitify",
      period: "Aug 2024 - Feb 2025",
      location: "On-site",
      description: [
        "Designed and built secure RESTful APIs to facilitate communication between different system components",
        "Streamlined TPIN management by automating expiration handling and enhancing security workflows within the YAP Pakistan platform",
        "Developed critical features for financial transaction processing and user authentication",
        "Involved in debugging complex issues and optimizing system performance"
      ],
      technologies: ["Java", "Spring Boot", "REST APIs", "Security", "Automation", "Financial Systems"],
      status: "Completed",
      statusColor: "bg-primary-600",
      icon: <span style={{fontSize: '1.5rem'}}>💸</span>,
      type: "Enterprise Application"
    },
    {
      title: "Java Software Engineer",
      company: "Meganos",
      period: "Oct 2023 - July 2024",
      location: "Hybrid",
      description: [
        "Delivered critical upgrades and enhancements for the Makro Customer Service application, serving a substantial user base",
        "Enhanced API efficiency, significantly reducing response times and server load",
        "Led the transition of legacy applications to the latest Spring Boot version, improving security and operational efficiency"
      ],
      technologies: ["Java", "Spring Boot", "API Optimization", "Spring Migration", "AWS EC2"],
      status: "Completed",
      statusColor: "bg-primary-600",
      icon: <span style={{fontSize: '1.5rem'}}>🏢</span>,
      type: "Enterprise Application"
    }
  ];

  return (
    <section ref={ref} id="experience" className="py-16 sm:py-20 bg-secondary-900 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-10 left-1/4 w-40 h-40 bg-primary-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-1/4 w-40 h-40 bg-accent-purple rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
      </div>
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 bg-clip-text text-transparent">
            Career <span className="bg-gradient-to-r from-[#517fa4] to-[#6a8fb5] bg-clip-text text-transparent">Journey</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#517fa4] to-[#6a8fb5] mx-auto rounded-full mb-6"></div>
          <p className="text-base sm:text-lg text-secondary-300 max-w-3xl mx-auto">
            Building enterprise solutions with cutting-edge technology
          </p>
        </div>
        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-primary-500 opacity-50 rounded-full"></div>
          <div className="space-y-10 sm:space-y-12 pl-8 sm:pl-0">
            {experiences.map((exp, idx) => (
              <div key={idx} className="relative flex items-start">
                {/* Timeline Node */}
                <div className="relative flex flex-col items-center z-10 -ml-10 sm:-ml-12">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary-600/80 backdrop-blur-sm border-2 sm:border-4 border-white/20 flex items-center justify-center shadow-lg text-white text-lg sm:text-xl">
                    {exp.icon}
                  </div>
                  {idx !== experiences.length - 1 && (
                    <div className="flex-1 w-0.5 bg-primary-500 opacity-30 mt-4"></div>
                  )}
                </div>
                {/* Content */}
                <div className="flex-1 bg-secondary-800/50 backdrop-blur-xl rounded-xl sm:rounded-3xl shadow-xl border border-primary-700/30 p-4 sm:p-6 ml-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                    <div className="flex-1 mb-2 sm:mb-0 sm:mr-4">
                      <h3 className="text-base sm:text-lg font-bold text-white mb-0.5">{exp.title}</h3>
                      <div className="text-sm text-primary-300 font-semibold flex items-center gap-2">
                        {exp.company}
                        {exp.company === "YAP Pakistan" && (
                          <a href="https://yappakistan.com/" target="_blank" rel="noopener noreferrer" className="text-primary-300 hover:text-white transition-colors duration-150">
                            <Link size={12} />
                          </a>
                        )}
                      </div>
                      <div className="text-xs text-secondary-400 mt-1">{exp.period} &bull; {exp.location}</div>
                    </div>
                    {/* Status Badge */}
                    <div className="flex-shrink-0">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold text-white ${exp.statusColor} shadow-lg inline-block`}>
                        {exp.status}
                      </span>
                    </div>
                  </div>
                  <ul className="mb-4 space-y-1.5 text-secondary-200 text-sm leading-relaxed">
                    {exp.description.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="text-primary-400 mt-1 flex-shrink-0" size={14} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {exp.technologies.map(tech => (
                      <span key={tech} className="px-2 py-0.5 rounded-full bg-secondary-700 text-primary-300 text-xs font-semibold border border-secondary-600 shadow-sm">
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
    </section>
  );
}

export default ExperienceSection;