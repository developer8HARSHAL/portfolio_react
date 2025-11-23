import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Home() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
   <section id="home" className="min-h-screen flex items-center text-white pt-24 pb-16 lg:py-40 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"></div>

      <div className="w-[90%] lg:w-[85%] xl:w-[80%] mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 lg:gap-28 xl:gap-32 items-center">

          {/* Left Side - Content */}
          <div className="order-2 lg:order-1 space-y-10" data-aos="fade-right">
            {/* Badge */}
            <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-blue-500/20 backdrop-blur-sm border border-blue-500/30 rounded-full">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-blue-300">Fresh Graduate 2025 | Seeking Full-Time Role</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-3">
              <h1 className="text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-black leading-none tracking-tight">
                <span className="block text-white mb-3">Harshal</span>
                <span className="block text-gradient-primary text-6xl md:text-7xl lg:text-8xl xl:text-[9rem]">Pinge→</span>
              </h1>
            </div>

            {/* Fullstack Developer badge */}
            <div className="inline-flex items-center gap-4 px-7 py-4 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 backdrop-blur-md border border-blue-500/30 rounded-full">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center text-lg font-black shadow-lg">
                FD
              </div>
              <span className="text-xl font-semibold text-white">Frontend Developer</span>
            </div>

            {/* Description */}
            <div className="space-y-5 max-w-2xl px-2 lg:px-0">
  <p className="text-xl lg:text-3xl text-slate-300 leading-relaxed font-medium">
                Computer Engineering graduate (2025) specializing in Frontend Developer, based in <span className="text-blue-400 font-semibold">Pune, India.</span>
              </p>

              <p className="text-lg lg:text-xl text-slate-400 leading-relaxed">
                Recently completed a frontend internship at <span className="text-blue-400 font-semibold">Fulcrum Resources</span> (rated 4.5/5), where I improved HR efficiency by <span className="text-blue-400 font-semibold">35%</span> and reduced manual errors by <span className="text-blue-400 font-semibold">25%</span>. Published an <span className="text-blue-400 font-semibold">npm package</span> (DevMetrics SDK), built enterprise applications with <span className="text-blue-400 font-semibold">25+ RESTful APIs</span>, and solved <span className="text-blue-400 font-semibold">100+ LeetCode problems</span>. Strong foundation in <span className="text-blue-400 font-semibold">MERN stack</span>, <span className="text-blue-400 font-semibold">cloud computing</span>, and <span className="text-blue-400 font-semibold">C++</span>.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-5 pt-6">
              <Link to="/Contact" className="btn-primary text-lg lg:text-xl px-10 py-5">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Get in Touch
              </Link>

              <a
                href="/assets/HarshalPinge.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-lg lg:text-xl px-10 py-5"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download Resume
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-5 pt-8">
              <span className="text-sm text-slate-500 font-medium">Follow me:</span>
              <div className="flex gap-4">
                <a
                  href="https://linkedin.com/in/harshal-pinge-ab13b5216/"
                  className="social-link w-12 h-12"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a
                  href="https://github.com/developer8HARSHAL"
                  className="social-link w-12 h-12"
                  aria-label="GitHub"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
                {/* <a
                  href="#"
                  className="social-link w-12 h-12"
                  aria-label="Twitter"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a> */}
              </div>
            </div>
          </div>

          {/* Right Side - Profile Image with Floating Badges */}
          <div className="order-1 lg:order-2 relative" data-aos="fade-left">
            <div className="relative w-full max-w-2xl mx-auto">
              {/* Main Profile Image - No background, just cutout */}
              <div className="relative z-10 group">
                {/* Glow effect behind cutout image */}
                {/* <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 via-cyan-400/20 to-purple-500/30 rounded-full blur-[100px] scale-90 group-hover:scale-100 transition-transform duration-700"></div> */}

                <img
                  src="/assets/LinkedIn_Profile1.jpg"
                  alt="Harshal Pinge"
                  className="relative w-full h-auto transform group-hover:scale-[1.03] transition-transform duration-700 drop-shadow-2xl"
                // style={{ filter: 'drop-shadow(0 20px 60px rgba(59, 130, 246, 0.4))' }}
                />
              </div>

              {/* Floating Badge 1 - Developer */}
              <div
                className="absolute top-8 lg:top-12 -left-8 lg:-left-16 z-20 animate-float"
                data-aos="zoom-in"
                data-aos-delay="200"
              >
                <div className="w-32 h-32 lg:w-40 lg:h-40 xl:w-48 xl:h-48 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-2xl shadow-blue-500/40 border-4 border-slate-900/50 backdrop-blur-sm hover:scale-110 transition-transform duration-500 cursor-pointer">
                  <div className="text-center">
                    <div className="text-3xl lg:text-4xl xl:text-5xl font-black text-white leading-none">DEV</div>
                    <div className="text-sm lg:text-base text-blue-100 font-semibold mt-1">Developer</div>
                  </div>
                </div>
              </div>

              {/* Floating Badge 2 - Experience Designer */}
              <div
                className="absolute top-32 lg:top-44 -right-8 lg:-right-20 z-20 animate-float delay-200"
                data-aos="zoom-in"
                data-aos-delay="400"
              >
                <div className="w-36 h-36 lg:w-48 lg:h-48 xl:w-56 xl:h-56 bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-full flex items-center justify-center shadow-2xl shadow-cyan-400/40 border-4 border-slate-900/50 backdrop-blur-sm hover:scale-110 transition-transform duration-500 cursor-pointer">
                  <div className="text-center px-4">
                    <div className="text-2xl lg:text-3xl xl:text-4xl font-black text-slate-900 leading-tight">Frontend</div>
                    <div className="text-2xl lg:text-3xl xl:text-4xl font-black text-slate-900 leading-tight">Developer</div>
                  </div>
                </div>
              </div>

              {/* Floating Badge 3 - C++ */}
              <div
                className="absolute bottom-12 lg:bottom-16 -left-6 lg:-left-12 z-20 animate-float delay-400"
                data-aos="zoom-in"
                data-aos-delay="600"
              >
                <div className="w-28 h-28 lg:w-36 lg:h-36 xl:w-40 xl:h-40 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl shadow-purple-500/40 border-4 border-slate-900/50 backdrop-blur-sm hover:scale-110 transition-transform duration-500 cursor-pointer">
                  <div className="text-center">
                    <div className="text-3xl lg:text-4xl xl:text-5xl font-black text-white">C++</div>
                  </div>
                </div>
              </div>

              {/* Decorative Gradient Orbs */}
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-blue-500/20 rounded-full blur-[100px] animate-pulse"></div>
              <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-cyan-400/15 rounded-full blur-[100px] animate-pulse delay-300"></div>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce hidden lg:flex">
        <div className="flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
          <span className="text-xs text-slate-400 font-medium tracking-widest uppercase">Scroll</span>
          <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}

export default Home;