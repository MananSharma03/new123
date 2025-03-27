import React from 'react';
import { portfolioData } from '@/data/portfolio';

const Footer: React.FC = () => {
  const { name } = portfolioData;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1a1a1a] text-white py-6">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p>© {currentYear} {name}. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
