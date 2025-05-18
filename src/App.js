import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './Components/Header';
import About from './Contents/About';
import Project from './Contents/Project';
import Skill from './Contents/Skill';
import Home from './Contents/Home';
import Contact from './Contents/Contact';
import Footer from './Components/Footer';
import Loader from './utility/Loading';

function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Simulate fetching data or any async operation
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after a delay
    }, 2000); // Adjust the delay as needed

    return () => clearTimeout(timer); // Clean up the timer
  }, []);

  // Scroll to the appropriate section when the hash changes
  useEffect(() => {
    if (!loading) {
      const hash = location.hash;
      if (hash) {
        // Remove the # character
        const id = hash.substring(1);
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        // Scroll to top if no hash
        window.scrollTo(0, 0);
      }
    }
  }, [location, loading]);

  return (
    <div className="App bg-gray-900 min-h-screen">
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <Routes>
            <Route 
              path="/" 
              element={
                <>
                  <Home id="home" />
                  <About id="about" />
                  <Project id="project" />
                  <Skill id="skill" />
                  <Contact id="contact" />
                </>
              } 
            />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Project />} />
            <Route path="/skills" element={<Skill />} />
            <Route path="/contact" element={<Contact />} />
            {/* Add a catch-all route for 404 pages */}
            <Route 
              path="*" 
              element={
                <div className="flex items-center justify-center h-screen">
                  <div className="text-center">
                    <h1 className="text-6xl font-bold text-blue-500 mb-4">404</h1>
                    <p className="text-2xl text-white mb-8">Page not found</p>
                    <a 
                      href="/" 
                      className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                      Go Home
                    </a>
                  </div>
                </div>
              } 
            />
          </Routes>
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;