import React from 'react';
import { ArrowRight, Server, Database, Code, Globe } from 'lucide-react';
import { useInView } from '../hooks';

// Streamlined About Section with two horizontal glassmorphic cards (matching provided image layout)
function AboutSection() {
  const [ref, isInView] = useInView();

  // Content for the summary section
  const summary = {
    title: "Full Stack Developer & Cloud Native Enthusiast",
    paragraphs: [
      "Results-driven Java Developer with 2+ years of experience, specializing in microservices architecture and cloud native applications. My expertise includes working with Java, Spring Boot, and RESTful APIs.",
      "I succeed in agile environments, collaborating effectively with team members to achieve project goals and continuously improve my technical skills."
    ]
  };

  // Content for the "What I Do" section
  const whatIDoFeatures = [
    { icon: Server, title: 'Backend Development', desc: 'Building scalable APIs and microservices with Spring Boot', color: 'from-blue-500 to-blue-600' },
    { icon: Database, title: 'Database Design', desc: 'Designing efficient database schemas with SQL and JPA', color: 'from-green-500 to-green-600' },
    { icon: Code, title: 'API Development', desc: 'Creating RESTful services and integrating third-party APIs', color: 'from-purple-500 to-purple-600' },
    { icon: Globe, title: 'System Integration', desc: 'Integrating various systems and ensuring seamless data flow', color: 'from-orange-500 to-orange-600' }
  ];

  // Content for Achievements (as badges, matching image)
  const achievementBadges = [
    { label: '🏆 Achiever of the Month', color: 'from-green-700 to-green-800', textColor: 'text-white' },
    { label: '📚 Teaching Assistant', color: 'from-blue-700 to-blue-800', textColor: 'text-white' }
  ];

  return (
    <section ref={ref} id="about" className="py-20 section-gradient relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-150 ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-4">
            About <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
        </div>

        {/* Two-column layout for cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Card: Summary and Achievement Badges */}
          <div className={`card-gradient backdrop-blur-sm rounded-2xl p-8 shadow-xl transition-all duration-500 ${isInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
               {summary.title}
            </h3>
            <div className="space-y-6 text-gray-200 leading-relaxed mb-8">
              {summary.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Achievement Badges */}
            <div className="flex flex-wrap gap-4 mt-8">
              {achievementBadges.map((badge, index) => (
                 <span key={index} className={`bg-gradient-to-r ${badge.color} ${badge.textColor} px-6 py-3 rounded-full text-sm font-semibold`}>
                    {badge.label}
                 </span>
              ))}
            </div>
          </div>

          {/* Right Card: What I Do */}
          <div className={`card-gradient backdrop-blur-sm rounded-2xl p-8 shadow-xl transition-all duration-500 delay-150 ${isInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h4 className="text-2xl md:text-3xl font-bold text-white mb-6">
              What I Do
            </h4>
            
            {/* Vertical list of What I Do items */} 
            <div className="space-y-6"> {/* Changed to space-y for vertical layout */} 
              {whatIDoFeatures.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-5 group p-4 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20 shadow-lg transition-all duration-300 ${ /* Glassmorphic styling for each item */
                    isInView ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 100 + 250}ms` }} /* Adjusted delay */
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-xl transition-all duration-300`}> {/* Icon Container */} 
                     {/* Use your 3D icon component or image here */} 
                     {/* For now, using Lucide icon placeholder */} 
                    <item.icon className="text-white" size={24} /> 
                  </div>
                  <div>
                    <h5 className="font-bold text-lg text-white mb-1">
                      {item.title}
                    </h5>
                    <p className="text-gray-300 leading-relaxed text-sm">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Removed old sections */}

      </div>
    </section>
  );
}

export default AboutSection;