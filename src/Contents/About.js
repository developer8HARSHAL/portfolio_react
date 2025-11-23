import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

function About() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section id="about" className="min-h-screen py-32 lg:py-40 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"></div>

      <div className="w-[90%] lg:w-[85%] xl:w-[80%] mx-auto relative z-10">

        {/* Section Header */}
        <div className="mb-20 lg:mb-28" data-aos="fade-up">
           <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-blue-500/20 backdrop-blur-sm border border-blue-500/30 rounded-full mb-6">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <span className="text-sm font-medium text-blue-300">Get to know me</span>
          </div>

          <h2 className="text-6xl md:text-7xl lg:text-8xl font-black text-white mb-4">
            About <span className="text-gradient-primary">Me</span>
          </h2>

          <div className="w-32 h-1.5 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"></div>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-start">

          {/* Left Side - Stats Cards */}
          <div className="space-y-6" data-aos="fade-right">

            {/* Education Card */}
            <div className="card-glass-hover p-8 group">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="text-2xl font-bold text-white mb-2">Education</h3>
                  <p className="text-lg text-slate-300 leading-relaxed">
                    Bachelor of Engineering in <span className="text-blue-400 font-semibold">Computer Engineering</span>
                  </p>
                  <p className="text-base text-slate-400 mt-2">
                    Zeal College, Pune • 2021-2025
                  </p>
                  <p className="text-sm text-slate-500 mt-1">
                    Minor: Data Science
                  </p>
                </div>
              </div>
            </div>

            {/* Experience Card */}
            <div className="card-glass-hover p-8 group">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-400 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="text-2xl font-bold text-white mb-2">Experience</h3>
                  <p className="text-lg text-slate-300 leading-relaxed">
                    Frontend Developer <span className="text-green-400 font-semibold">Intern</span>
                  </p>
                  <p className="text-base text-slate-400 mt-2">
                    Fulcrum Resources • Nov 2024 - Feb 2025
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center">
                      {[...Array(4)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" clipPath="inset(0 50% 0 0)" />
                      </svg>
                    </div>
                    <span className="text-sm text-slate-400">4.5/5 Rating</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Problem Solving Card */}
            <div className="card-glass-hover p-8 group">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="text-2xl font-bold text-white mb-2">Problem Solving</h3>
                  <p className="text-lg text-slate-300 leading-relaxed">
                    Strong expertise in <span className="text-purple-400 font-semibold">DSA</span> and <span className="text-purple-400 font-semibold">C++</span>
                  </p>
                  <p className="text-base text-slate-400 mt-2">
                    100+ problems solved on LeetCode
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Side - Bio Story */}
          <div className="space-y-8" data-aos="fade-left">

            {/* Main Bio Card */}
            <div className="card-glass p-10">
              <h3 className="text-3xl font-bold text-white mb-8">My Journey</h3>

              <div className="space-y-6">

                <div className="flex items-start gap-4 group">
                  <div className="flex-shrink-0 mt-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full group-hover:scale-125 transition-transform duration-300"></div>
                  </div>
                 <p className="text-lg text-slate-300 leading-relaxed">
  Computer Engineering graduate (2025) from Zeal College, Pune, specializing in <span className="text-blue-400 font-semibold">Frontend development</span> with hands-on experience in the <span className="text-blue-400 font-semibold">MERN stack</span>. Completed a minor in <span className="text-blue-400 font-semibold">Data Science</span>, combining development skills with data-driven problem-solving.
</p>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="flex-shrink-0 mt-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full group-hover:scale-125 transition-transform duration-300"></div>
                  </div>
                  <p className="text-lg text-slate-300 leading-relaxed">
                    During my internship at <span className="text-green-400 font-semibold">Fulcrum Resources</span>, I designed an employee management system using Next.js, improving HR efficiency by 35% and achieving a <span className="text-green-400 font-semibold">4.5/5 performance rating</span>.
                  </p>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="flex-shrink-0 mt-2">
                    <div className="w-3 h-3 bg-purple-500 rounded-full group-hover:scale-125 transition-transform duration-300"></div>
                  </div>
                  <p className="text-lg text-slate-300 leading-relaxed">
                    I've built production-ready projects including an <span className="text-purple-400 font-semibold">Enterprise Document Management System</span> with 25+ REST APIs and published an <span className="text-purple-400 font-semibold">npm package (DevMetrics SDK)</span> for API monitoring.
                  </p>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="flex-shrink-0 mt-2">
                    <div className="w-3 h-3 bg-cyan-500 rounded-full group-hover:scale-125 transition-transform duration-300"></div>
                  </div>
                  <p className="text-lg text-slate-300 leading-relaxed">
  With strong problem-solving skills (<span className="text-cyan-400 font-semibold">100+ LeetCode problems</span> solved) and a proven track record of delivering results, I'm seeking entry-level full-stack developer roles where I can build scalable, impactful web applications and continue growing as a developer.
</p>
                </div>
              </div>
            </div>

            

          </div>
        </div>

      </div>
    </section>
  );
}

export default About;