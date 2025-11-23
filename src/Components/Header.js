import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'tailwindcss/tailwind.css';

const navLinks = [
  { label: 'Home', to: 'home', id: 'home' },
  { label: 'About', to: 'about', id: 'about' },
  { label: 'Experience', to: 'experience', id: 'experience' },
  { label: 'Projects', to: 'project', id: 'project' },
  { label: 'Skills', to: 'skill', id: 'skill' },
  { label: 'Contact', to: 'contact', id: 'contact' },
];

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = navLinks.map(link => link.id);
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest('.mobile-menu-container')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = (e) => {
    e.stopPropagation();
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Smooth scroll function
  const handleScrollTo = (targetId) => {
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 0;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      setActiveSection(targetId);
      closeMobileMenu();
    } else {
      console.warn(`Element with id "${targetId}" not found`);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 lg:left-10 lg:right-10 z-50 transition-all duration-500 ${isScrolled
          ? 'bg-slate-900/95 backdrop-blur-xl border-b border-white/10 shadow-lg'
          : 'bg-slate-900/80 lg:bg-transparent backdrop-blur-lg lg:backdrop-blur-none'
        }`}
    >
      <div className="w-[90%] lg:w-[85%] xl:w-[80%] mx-auto">
        <div className="flex items-center justify-between gap-8 py-4 lg:py-5">

          {/* Logo */}
          <Link
            to="/"
            className="relative z-50 group flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-white rounded-lg px-2 py-1 flex-shrink-0"
          >
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 overflow-hidden rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/40 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-blue-500/50 group-hover:scale-110">
              <img
                src='/assets/logo.png'
                alt="Harshal Pinge - Full-Stack Developer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden sm:block">
              <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors duration-300">
                Harshal
              </div>
              <div className="text-[10px] sm:text-xs text-slate-400 font-medium">
                Frontend Dev
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-2 xl:gap-4 flex-1 justify-center">
            {navLinks.map((item) => (
              <button
                key={item.id}
                onClick={() => handleScrollTo(item.to)}
                className={`relative px-4 xl:px-6 py-3 text-[15px] xl:text-[16px] font-medium rounded-lg transition-all duration-300 cursor-pointer group ${activeSection === item.id
                    ? 'text-white'
                    : 'text-slate-400 hover:text-white'
                  }`}
              >
                {item.label}

                <span
                  className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-300 ${activeSection === item.id ? 'w-8' : 'w-0 group-hover:w-8'
                    }`}
                />
              </button>
            ))}
          </nav>

          {/* Desktop Resume Button */}
          <div className="hidden lg:block flex-shrink-0">
            <a
              href="/assets/HarshalPinge.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 xl:px-8 py-3 xl:py-3.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-[15px] xl:text-[16px] font-semibold rounded-full shadow-lg shadow-blue-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/50 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
            >
              <svg className="w-4 h-4 xl:w-[18px] xl:h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Resume
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden relative z-50 w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400/50 flex-shrink-0"
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <span
                className={`w-full h-0.5 bg-white rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''
                  }`}
              />
              <span
                className={`w-full h-0.5 bg-white rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''
                  }`}
              />
              <span
                className={`w-full h-0.5 bg-white rounded-full transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''
                  }`}
              />
            </div>
          </button>

          {/* Mobile Menu */}
          {/* Mobile Menu */}
          <div
            className={`mobile-menu-container lg:hidden fixed inset-0 z-40 transition-all duration-500 ${isMobileMenuOpen ? 'visible' : 'invisible'
              }`}
          >
            {/* Backdrop - DARKER */}
            <div
              className={`absolute inset-0 bg-black/80 backdrop-blur-xl transition-opacity duration-500 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
                }`}
              onClick={closeMobileMenu}
            />

            {/* Menu Content - SOLID BACKGROUND */}
            <div
              className={`absolute top-0 right-0 h-full w-full sm:w-80 bg-slate-900 backdrop-blur-2xl border-l border-white/30 shadow-2xl transition-transform duration-500 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
              <div className="flex flex-col h-full pt-24 pb-8 px-6">

                {/* Navigation Links - BETTER VISIBILITY */}
                <nav className="flex-1 space-y-2">
                  {navLinks.map((item, index) => (
                    <button
                      key={item.id}
                      onClick={() => handleScrollTo(item.to)}
                      className={`w-full text-left px-6 py-4 text-[17px] font-semibold rounded-xl transition-all duration-300 cursor-pointer ${activeSection === item.id
                          ? 'bg-blue-500/30 text-white border border-blue-500/50'
                          : 'text-slate-300 hover:text-white hover:bg-white/10'
                        }`}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="flex items-center justify-between">
                        <span>{item.label}</span>
                        {activeSection === item.id && (
                          <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                    </button>
                  ))}
                </nav>

                {/* Mobile Resume Button */}
                <div className="border-t border-white/30 pt-6 space-y-4">
                  <a
                    href="/assets/HarshalPinge.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-[16px] font-bold rounded-xl shadow-lg shadow-blue-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/50"
                    onClick={closeMobileMenu}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download Resume
                  </a>

                  {/* Social Links */}
                  <div className="flex justify-center gap-3">
                    <a
                      href="https://github.com/developer8HARSHAL"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 flex items-center justify-center bg-white/10 hover:bg-white/20 border border-white/20 hover:border-blue-500/50 rounded-lg transition-all duration-300 text-slate-300 hover:text-blue-400"
                      aria-label="GitHub"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    </a>

                    <a
                      href="https://www.linkedin.com/in/harshal-pinge-ab13b5216/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 flex items-center justify-center bg-white/10 hover:bg-white/20 border border-white/20 hover:border-blue-500/50 rounded-lg transition-all duration-300 text-slate-300 hover:text-blue-400"
                      aria-label="LinkedIn"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>

                    <a
                      href="mailto:harshalpinge@gmail.com"
                      className="w-11 h-11 flex items-center justify-center bg-white/10 hover:bg-white/20 border border-white/20 hover:border-blue-500/50 rounded-lg transition-all duration-300 text-slate-300 hover:text-blue-400"
                      aria-label="Email"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;