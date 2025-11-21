import React from 'react';
import Home from '../Contents/Home';
import About from '../Contents/About';
import Experience from '../Contents/Experience';  
import Project from '../Contents/Project';
import Skill from '../Contents/Skill';
import Contact from '../Contents/Contact';

function Multi() {
  return (
    <div className="relative">
      <Home />      
      <About />
      <Experience />   
      <Project />  
      <Skill />    
      <Contact />  
    </div>
  );
}

export default Multi;