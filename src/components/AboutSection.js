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
    <section ref={ref} id="about" className="py-16 sm:py-20 bg-secondary-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className={`text-center mb-12 sm:mb-16 transition-all duration-150 ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 bg-clip-text text-transparent">
            <span className="text-white">About</span> <span className="bg-gradient-to-r from-[#517fa4] to-[#6a8fb5] bg-clip-text text-transparent">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#517fa4] to-[#6a8fb5] mx-auto rounded-full mb-6"></div>
          <p className="text-base sm:text-lg text-secondary-300 max-w-3xl mx-auto">
            Get to know me better
          </p>
        </div>

        {/* Two-column layout for cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
          {/* Left Card: Summary and Achievement Badges */}
          <div className={`bg-secondary-800/50 backdrop-blur-xl rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-xl transition-all duration-500 ${isInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">
               {summary.title}
            </h3>
            <div className="space-y-4 sm:space-y-6 text-secondary-200 leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base">
              {summary.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Achievement Badges */}
            <div className="flex flex-wrap gap-3 sm:gap-4 mt-6 sm:mt-8">
              {achievementBadges.map((badge, index) => (
                 <span key={index} className={`bg-gradient-to-r ${badge.color} ${badge.textColor} px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold shadow-md`}>
                    {badge.label}
                 </span>
              ))}
            </div>
          </div>

          {/* Right Card: What I Do */}
          <div className={`bg-secondary-800/50 backdrop-blur-xl rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-xl transition-all duration-500 delay-150 ${isInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h4 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">
              What I Do
            </h4>
            
            {/* Vertical list of What I Do items */} 
            <div className="space-y-4 sm:space-y-6"> 
              {whatIDoFeatures.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-4 group p-3 sm:p-4 rounded-lg backdrop-blur-sm bg-white/5 border border-white/10 shadow-lg transition-all duration-300 ${ 
                    isInView ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 100 + 250}ms` }}
                >
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${item.color} rounded-lg flex items-center justify-center flex-shrink-0 shadow-md group-hover:shadow-lg transition-all duration-300`}> 
                    <item.icon className="text-white" size={20} /> 
                  </div>
                  <div>
                    <h5 className="font-semibold text-base sm:text-lg text-white mb-0.5">
                      {item.title}
                    </h5>
                    <p className="text-secondary-300 leading-relaxed text-sm sm:text-base">
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