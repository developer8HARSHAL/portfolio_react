import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Home() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section id="home" className="text-white py-12" data-aos="fade-up">
      <div className="container mx-auto px-4 md:px-0 flex items-center justify-center">
        <div className="flex flex-col md:flex-row items-start max-w-7xl w-full">
          {/* Profile image with hover effect */}
          <div className="w-full md:w-1/3 flex justify-center mb-16 md:mb-0">
            <div className="relative group">
              <img
                src="/assets/portfolio.jpg"
                alt="Profile"
                className="w-[300px] h-[300px] rounded-lg object-cover shadow-lg transition-all duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-20 rounded-lg transition-opacity duration-300"></div>
            </div>
          </div>
          
          {/* Content container with improved spacing */}
          <div className="w-full md:w-2/3 md:pl-16 flex items-start">
            {/* Vertical line separator */}
            <div className="flex-none mr-6 md:mr-8 hidden md:block">
              <div className="h-full border-r-2 border-blue-500"></div>
            </div>
            
            {/* Text content with improved typography */}
            <div className="flex-grow">
              <h1 className="text-5xl md:text-6xl font-bold text-blue-500 md:text-left">
                Hello World!<br />
                <span className="typing-animation text-4xl md:text-7xl text-white">I'm Harshal </span>
              </h1>
              
              <p className="mt-6 text-xl md:text-2xl font-medium leading-8 text-gray-300">
                I'm a passionate <span className="text-blue-500 font-semibold">fullstack developer</span> with expertise in 
                <span className="text-blue-500 font-semibold"> React.js, Next.js</span>, <span className="text-blue-500 font-semibold"> Node.js, Express.js</span>, and 
                <span className="text-blue-500 font-semibold"> cloud computing</span>.
              </p>
              
              <div className="mt-4 flex flex-wrap items-center">
                <div className="flex items-center mr-6 mb-4">
                  <img src="/assets/c++.png" alt="C++" className="w-8 h-8 mr-2" />
                  <span className="text-xl font-medium text-gray-300">Strong <span className="text-blue-500 font-semibold">C++</span> skills</span>
                </div>
               
              </div>
              
              <p className="mt-4 text-xl md:text-2xl font-medium leading-8 text-gray-300">
                Currently pursuing my <span className="text-blue-500 font-semibold">Undergraduate degree</span> from SPPU in my fourth year,
                I've solved <span className="text-blue-500 font-semibold">100+ problems</span> on LeetCode, enhancing my algorithmic thinking and problem-solving abilities.
              </p>
              
              <p className="mt-4 text-xl md:text-2xl font-medium leading-8 text-gray-300">
                Beyond coding, I express my creativity through <span className="text-blue-500 font-semibold">painting</span> and
                <span className="text-blue-500 font-semibold"> sketching</span>. I'm also passionate about sharing technical insights and my learning journey on social media.
              </p>
              
              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/Contact">
                  <button className="px-6 py-4 bg-yellow-400 text-blue-900 font-bold rounded-lg hover:bg-yellow-500 transition duration-300 ease-in-out text-xl md:text-2xl flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Contact me
                  </button>
                </Link>
              
                <a 
                  href="/assets/harshalpinge1.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="px-6 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out text-xl md:text-2xl flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download Resume
                </a>
              </div>
              
           
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;