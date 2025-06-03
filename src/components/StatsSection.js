import React, { useState, useEffect } from 'react';
import { Calendar, Code, Server, Award } from 'lucide-react';
import { useInView } from '../hooks';

// Enhanced Stats Section with custom gradients
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
    <section ref={ref} className="py-20 bg-gradient-to-b from-[#0f0c29] to-[#302b63] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#517fa4]/5 to-[#243949]/5"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.key}
              className={`text-center group transition-all duration-500 ${
                isInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="w-20 h-20 bg-gradient-to-br from-[#517fa4]/20 to-[#243949]/20 backdrop-blur-sm border border-[#517fa4]/30 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-150 shadow-lg group-hover:shadow-xl">
                <stat.icon className="text-[#6a8fb5] group-hover:text-[#517fa4] transition-colors duration-150" size={28} />
              </div>
              <div className="text-4xl md:text-5xl font-black text-white mb-3 tabular-nums">
                {counts[stat.key]}{stat.suffix}
              </div>
              <div className="text-sm font-medium text-gray-300 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StatsSection;