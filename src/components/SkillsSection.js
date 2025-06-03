import React, { useState } from 'react';
import { Server, Database, Globe, Code } from 'lucide-react';
import { useInView } from '../hooks';

// Enhanced Skills Section with custom gradients
function SkillsSection() {
  const [ref, isInView] = useInView();
  const [activeCategory, setActiveCategory] = useState(0);
  const skillCategories = [
    {
      title: "Backend Technologies",
      icon: <Server size={32} className="text-[#517fa4]" />,
      color: "from-[#517fa4] to-[#6a8fb5]",
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
      icon: <Database size={32} className="text-green-500" />,
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
      icon: <Globe size={32} className="text-purple-500" />,
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
      icon: <Code size={32} className="text-orange-500" />,
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
    <section ref={ref} id="skills" className="py-20 section-gradient relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-[#517fa4]/10 to-[#243949]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-[#243949]/10 to-[#517fa4]/10 rounded-full blur-3xl animate-pulse"></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-[#517fa4] via-[#6a8fb5] to-[#517fa4] bg-clip-text text-transparent mb-6">
            Skills & <span className="text-white">Technologies</span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-[#517fa4] to-[#243949] mx-auto rounded-full mb-8 animate-pulse"></div>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Technologies and tools I work with
          </p>
        </div>
        
        {/* Category Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {skillCategories.map((category, index) => (
            <button
              key={index}
              onClick={() => setActiveCategory(index)}
              className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-semibold transition-all duration-150 hover:scale-105 ${
                activeCategory === index
                  ? `bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg`
                  : 'card-gradient text-gray-200 hover:text-white border border-[#517fa4]/30'
              }`}
            >
              {category.icon}
              <span className="hidden sm:inline">{category.title}</span>
            </button>
          ))}
        </div>
        
        {/* Skills Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {skillCategories[activeCategory].skills.map((skill, index) => (
            <div
              key={skill.name}
              className="card-gradient backdrop-blur-xl rounded-2xl shadow-lg border border-[#517fa4]/30 p-3 flex flex-col items-center text-center transition-all duration-150 hover:scale-105 hover:shadow-2xl hover:border-[#517fa4]/50"
            >
              <div className="text-2xl mb-2">{skill.icon}</div>
              <div className="font-bold text-white mb-1">{skill.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SkillsSection;