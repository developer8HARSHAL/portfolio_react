import React from 'react';

function Loading() {
  return (
    <div className="fixed inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex flex-col items-center justify-center z-50">
      {/* Logo with Spinning Animation */}
      <div className="relative">
        {/* Glow Effect */}
        <div className="absolute inset-0 blur-3xl bg-blue-500/30 animate-pulse"></div>
        
        {/* Logo */}
        <img 
          src="assets/logo.png" 
          alt="Loading" 
          className="w-32 h-32 md:w-40 md:h-40 animate-spin relative z-10" 
          style={{ animationDuration: '3s' }}
        />
      </div>
      
      {/* Loading Text */}
      <div className="mt-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
          Loading <span className="text-gradient-primary">Experience</span>
        </h2>
        <p className="text-slate-400 text-sm">Please wait while we set things up...</p>
      </div>
      
      {/* Progress Bar */}
      <div className="mt-6 w-64 h-1 bg-slate-800 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 animate-pulse rounded-full" 
             style={{ width: '100%', animation: 'pulse 1.5s ease-in-out infinite' }}>
        </div>
      </div>
      
      {/* Dots Animation */}
      <div className="flex gap-2 mt-4">
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
        <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
      </div>
    </div>
  );
}

export default Loading;