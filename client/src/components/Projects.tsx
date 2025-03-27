import React from 'react';
import { portfolioData } from '@/data/portfolio';

const Projects: React.FC = () => {
  const { projects } = portfolioData;

  return (
    <section id="projects" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 relative after:content-[''] after:absolute after:w-20 after:h-1 after:bg-[#2ecc71] after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:rounded pb-4">
          Featured Projects
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="h-40 bg-gradient-to-r from-[#515151] to-gray-700 flex items-center justify-center">
                <i className={`${project.icon} text-6xl text-white opacity-75`}></i>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="px-2 py-1 bg-gray-200 text-sm rounded">{tech}</span>
                  ))}
                </div>
                <a 
                  href={project.url} 
                  className="inline-block px-4 py-2 bg-[#515151] text-white rounded hover:bg-[#2ecc71] transition-colors duration-300"
                >
                  View Project
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
