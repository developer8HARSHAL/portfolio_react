import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import About from './Contents/About';
import Project from './Contents/Project';
import Skill from './Contents/Skill';
import Home from './Contents/Home';
import Contact from './Contents/Contact';
import Footer from './Components/Footer';
import Loader from './utility/Loading';
import ReactDOM from 'react-dom/client';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data or any async operation
    setTimeout(() => {
      setLoading(false); // Set loading to false after a delay
    }, 2000); // Adjust the delay as needed
  }, []);

  return (
    <div className='App'>
      {loading ? <Loader /> : (
        <>
          <Header />
          <Home id="home" />
          <About id="about" />
          <Project id="project" />
          <Skill id="skill" />
          <Contact id="contact" />
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;