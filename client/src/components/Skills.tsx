import React from 'react';
import { portfolioData } from '@/data/portfolio';

const Skills: React.FC = () => {
  const { skills } = portfolioData;

  return (
    <section id="skills" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 relative after:content-[''] after:absolute after:w-20 after:h-1 after:bg-[#2ecc71] after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:rounded pb-4">
          Professional Skills
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg shadow-lg p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="text-4xl text-[#515151] mb-4 flex justify-center">
                <i className={skill.icon}></i>
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">{skill.title}</h3>
              <p className="text-gray-600 text-center">{skill.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
