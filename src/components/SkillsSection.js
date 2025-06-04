import React, { useState } from 'react';
import { useInView } from '../hooks';

// Enhanced Skills Section with custom gradients
function SkillsSection() {
  const [ref, isInView] = useInView();
  const [activeCategory, setActiveCategory] = useState(0);
  const skillCategories = [
    {
      title: "Backend Technologies",
      skills: [
        { name: "Java", level: 95 },
        { name: "Spring Boot", level: 90 },
        { name: "Spring Security", level: 85 },
        { name: "Hibernate", level: 80 },
        { name: "JPA", level: 85 },
        { name: "Microservices", level: 80 }
      ]
    },
    {
      title: "Databases & Storage",
      skills: [
        { name: "PostgreSQL", level: 85 },
        { name: "MySQL", level: 90 },
        { name: "SQL Server", level: 80 },
        { name: "Redis", level: 75 },
        { name: "MongoDB", level: 70 }
      ]
    },
    {
      title: "Tools & DevOps",
      skills: [
        { name: "Docker", level: 80 },
        { name: "Git", level: 95 },
        { name: "GitHub", level: 90 },
        { name: "GitLab", level: 85 },
        { name: "AWS EC2", level: 75 },
        { name: "Maven", level: 85 }
      ]
    },
    {
      title: "Frontend & Others",
      skills: [
        { name: "TypeScript", level: 80 },
        { name: "Angular", level: 75 },
        { name: "HTML/CSS", level: 85 },
        { name: "REST APIs", level: 95 },
        { name: "Swagger", level: 80 }
      ]
    }
  ];

  return (
    <section ref={ref} id="skills" className="py-16 sm:py-20 bg-secondary-900 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-accent-blue rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
      </div>
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4">
            Skills & <span className="text-primary-300">Technologies</span>
          </h2>
          <div className="w-20 h-1 bg-primary-500 mx-auto rounded-full mb-6"></div>
          <p className="text-base sm:text-lg text-secondary-300 max-w-3xl mx-auto">
            Technologies and tools I work with
          </p>
        </div>
        
        {/* Category Buttons */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12">
          {skillCategories.map((category, index) => (
            <button
              key={index}
              onClick={() => setActiveCategory(index)}
              className={`px-5 py-2 rounded-full font-semibold text-sm transition-all duration-300 border ${
                activeCategory === index
                  ? 'bg-primary-600 text-white border-primary-600 shadow-md'
                  : 'bg-secondary-800 text-secondary-300 border-secondary-700 hover:bg-secondary-700 hover:border-secondary-600 hover:text-white'
              }`}
            >
              <span>{category.title}</span>
            </button>
          ))}
        </div>
        
        {/* Skills Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {skillCategories[activeCategory].skills.map((skill, index) => (
            <div
              key={skill.name}
              className="bg-secondary-800/50 backdrop-blur-xl rounded-lg shadow-lg border border-secondary-700/50 p-4 flex flex-col items-center text-center transition-all duration-300 hover:scale-[1.03] hover:shadow-xl"
            >
              <div className="font-semibold text-white text-base sm:text-lg mb-1">{skill.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SkillsSection;