import React, { useState, useEffect } from 'react';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const toggleVisibility = () => {
      const scrolled = window.pageYOffset;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrolled / height) * 100;
      
      setScrollProgress(progress);
      setIsVisible(scrolled > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    toggleVisibility(); // Initial call
    
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-50 group transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16 pointer-events-none'
      }`}
      aria-label="Scroll to top"
    >
      {/* Progress Ring */}
      <div className="relative w-14 h-14">
        {/* Background Circle */}
        <svg className="w-full h-full -rotate-90">
          <circle
            cx="28"
            cy="28"
            r="24"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            className="text-slate-800"
          />
          {/* Progress Circle */}
          <circle
            cx="28"
            cy="28"
            r="24"
            stroke="url(#gradient)"
            strokeWidth="3"
            fill="none"
            strokeDasharray={2 * Math.PI * 24}
            strokeDashoffset={2 * Math.PI * 24 * (1 - scrollProgress / 100)}
            strokeLinecap="round"
            className="transition-all duration-150"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Button Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:shadow-xl group-hover:shadow-blue-500/40 group-hover:scale-110 transition-all duration-300">
            <svg 
              className="w-5 h-5 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2.5} 
                d="M5 10l7-7m0 0l7 7m-7-7v18" 
              />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Tooltip */}
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-slate-800 text-white text-sm font-medium rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        Back to top
      </span>
    </button>
  );
};

export default ScrollToTop;