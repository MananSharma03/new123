import React from 'react';
import { portfolioData } from '@/data/portfolio';

const Hero: React.FC = () => {
  const { name, title, intro, social } = portfolioData;

  return (
    <section id="home" className="pt-24 pb-16 fade-in">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="w-full md:w-1/3 flex justify-center">
            <div className="relative w-64 h-64 rounded-full border-4 border-[#515151] overflow-hidden shadow-lg">
              {/* Using a placeholder profile image */}
              <img
                src="https://res.cloudinary.com/jerrick/image/upload/d_642250b563292b35f27461a7.png,f_jpg,q_auto,w_720/67344c856c473c001d68c10b.png"
                alt={name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="w-full md:w-2/3 space-y-4 text-center md:text-left">
            <h1 className="text-4xl font-bold text-[#515151]">Hi, I'm {name}</h1>
            <p className="text-xl text-gray-600">{title}</p>
            <p className="text-lg leading-relaxed">{intro}</p>
            <div className="flex space-x-6 mt-6 justify-center md:justify-start">
              {social.map((item, index) => (
                <a
                  key={index}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#515151] hover:text-[#2ecc71] text-2xl transition-all duration-300 hover:scale-110"
                >
                  <i className={item.icon}></i>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
