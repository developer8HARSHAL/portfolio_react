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