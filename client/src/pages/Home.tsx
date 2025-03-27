import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Resume from '@/components/Resume';
import Contact from '@/components/Contact';
import Chatbot from '@/components/Chatbot';
import Footer from '@/components/Footer';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <Skills />
      <Projects />
      <Resume />
      <Contact />
      <Chatbot />
      <Footer />
    </div>
  );
};

export default Home;
