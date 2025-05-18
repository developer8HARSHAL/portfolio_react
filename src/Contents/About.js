import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

function About() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section id="about" className="py-20 relative bg-gray-900">
      {/* Section heading with animated underline */}
      <div className="container mx-auto px-4 mb-16" data-aos="fade-up">
       <h1 className="text-3xl md:text-5xl font-semibold mb-4 ml-36 md:mb-8 md:text-justify text-gray-400 relative">About me
          <div className="absolute bottom--2 left-12 w-full md:left-[calc(50% - 12rem)] md:w-[44rem] h-1 bg-cyan-800 mt-2"></div>
        </h1>
      </div>

      {/* Main content area */}
      <div className="container mx-auto px-4 md:px-0">
        <div className="flex flex-col  items-center md:space-x-12">
          
        
          
          {/* Right side - Bio information */}
          <div className="w-full md:w-1/2">
            <div className="bg-gray-800 bg-opacity-50 p-8 rounded-lg shadow-lg border border-gray-700" data-aos="fade-left">
              <div className="space-y-6">
               
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                  </div>
                  <p className="ml-4 text-xl text-gray-300 leading-relaxed">
                    I am pursuing my Bachelor of Engineering in Computer Engineering from <span className="text-blue-500 font-medium">Pune University (SPPU)</span>, and I am currently in my fourth-year of studies.
                  </p>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                  </div>
                  <p className="ml-4 text-xl text-gray-300 leading-relaxed">
                    I've developed strong skills in <span className="text-blue-500 font-medium">Data Structures & Algorithms</span> and <span className="text-blue-500 font-medium">C++</span>, regularly practicing on platforms like <span className="text-blue-500 font-medium">LeetCode</span> to sharpen my problem-solving abilities.
                  </p>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                  </div>
                  <p className="ml-4 text-xl text-gray-300 leading-relaxed">
                    During my academic journey, I was introduced to <span className="text-blue-500 font-medium">cloud computing</span> in my third year, and I have developed a strong passion for it as well.
                  </p>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                  </div>
                  <p className="ml-4 text-xl text-gray-300 leading-relaxed">
                    Alongside my studies, I have also earned several certifications in JavaScript, <span className="text-blue-500 font-medium">full-stack development</span>, and recently, I completed the <span className="text-blue-500 font-medium">Cloud Jam GCP certification</span>. I am excited about the opportunities that lie ahead in both <span className="text-blue-500 font-medium">full-stack development</span> and <span className="text-blue-500 font-medium">cloud computing</span>.
                  </p>
                </div>
              </div>
              
           
           
            </div>
          </div>
        </div>
      </div>
      
      {/* Custom CSS for animation */}
      <style jsx>{`
        @keyframes expand {
          0% { width: 0; }
          100% { width: 100%; }
        }
        .animate-expand {
          animation: expand 2s ease-out forwards;
        }
      `}</style>
    </section>
  );
}

export default About;