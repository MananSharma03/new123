import React from 'react';

const Resume: React.FC = () => {
  return (
    <section id="resume" className="py-16 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8">Professional Resume</h2>
        <a 
          href="resume.pdf" 
          download 
          className="inline-flex items-center px-6 py-3 bg-[#515151] text-white rounded-lg hover:bg-[#2ecc71] transition-colors duration-300 shadow-md"
        >
          <i className="fas fa-download mr-2"></i> Download Resume
        </a>
      </div>
    </section>
  );
};

export default Resume;
