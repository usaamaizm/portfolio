import React from 'react';
import { Award, Zap, CheckCircle, Link, Code, Settings } from 'lucide-react';
import { useInView } from '../hooks';

// Enhanced Experience Section with custom gradients
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
      statusColor: "bg-gradient-to-r from-green-500 to-green-600",
      icon: <span style={{fontSize: '2rem'}}>🏦</span>,
      type: "Fintech Platform"
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
      statusColor: "bg-gradient-to-r from-[#517fa4] to-[#6a8fb5]",
      icon: <span style={{fontSize: '2rem'}}>💸</span>,
      type: "Enterprise Application"
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
      statusColor: "bg-gradient-to-r from-[#517fa4] to-[#6a8fb5]",
      icon: <span style={{fontSize: '2rem'}}>🏢</span>,
      type: "Enterprise Application"
    }
  ];

  return (
    <section ref={ref} id="experience" className="py-20 section-gradient relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-1/4 w-72 h-72 bg-gradient-to-r from-[#517fa4]/10 to-[#243949]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-1/4 w-72 h-72 bg-gradient-to-r from-[#243949]/10 to-[#517fa4]/10 rounded-full blur-3xl"></div>
      </div>
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-[#517fa4] via-[#6a8fb5] to-[#517fa4] bg-clip-text text-transparent mb-4">
            Career <span className="text-white">Journey</span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-[#517fa4] to-[#243949] mx-auto rounded-full mb-6 animate-pulse"></div>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Building enterprise solutions with cutting-edge technology
          </p>
        </div>
        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-[#517fa4] via-[#6a8fb5] to-[#243949] rounded-full opacity-60"></div>
          <div className="space-y-12">
            {experiences.map((exp, idx) => (
              <div key={exp.title} className="relative flex gap-8 items-start">
                {/* Timeline Node */}
                <div className="flex flex-col items-center z-10">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#517fa4]/80 to-[#243949]/80 backdrop-blur-sm border-4 border-white/20 flex items-center justify-center shadow-lg">
                    {exp.icon}
                  </div>
                  {idx !== experiences.length - 1 && (
                    <div className="flex-1 w-1 bg-gradient-to-b from-[#517fa4] to-[#243949] opacity-30 mt-4"></div>
                  )}
                </div>
                {/* Content */}
                <div className="flex-1 card-gradient backdrop-blur-xl rounded-3xl shadow-xl border border-[#517fa4]/30 p-8">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{exp.title}</h3>
                      <div className="text-sm text-[#6a8fb5] font-semibold mb-1 flex items-center gap-2">
                        {exp.company}
                        {exp.company === "YAP Pakistan" && (
                          <a href="https://yappakistan.com/" target="_blank" rel="noopener noreferrer" className="text-[#6a8fb5] hover:text-white transition-colors duration-150">
                            <Link size={16} />
                          </a>
                        )}
                      </div>
                      <div className="text-xs text-gray-400 mb-2">{exp.period} &bull; {exp.location}</div>
                    </div>
                    <span className={`px-4 py-1 rounded-full text-xs font-bold text-white ${exp.statusColor} shadow-lg mt-2 sm:mt-0`}>
                      {exp.status}
                    </span>
                  </div>
                  <ul className="mb-4 space-y-2">
                    {exp.description.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-200 text-sm">
                        <CheckCircle className="text-[#517fa4] mt-0.5" size={16} />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {exp.technologies.map(tech => (
                      <span key={tech} className="px-3 py-1 rounded-full bg-gradient-to-r from-[#517fa4]/40 to-[#243949]/40 text-white text-xs font-semibold border border-[#517fa4]/40 shadow-sm">
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