import React from 'react';
import Hero from '../components/Hero';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import SkillsShowcase from '../components/SkillsShowcase';

const Home = () => {
  return (
    <>
      <Hero />
      <Experience />
      <Projects />
      <SkillsShowcase />
    </>
  );
};

export default Home;

