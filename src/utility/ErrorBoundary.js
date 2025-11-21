import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null,
      errorInfo: null 
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
          <div className="max-w-2xl w-full text-center">
            
            {/* Error Icon */}
            <div className="mb-8">
              <div className="w-24 h-24 bg-red-500/10 border-2 border-red-500/30 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              
              {/* Title */}
              <h1 className="text-5xl md:text-6xl font-black text-white mb-4">
                Oops! <span className="text-gradient-primary">Something Broke</span>
              </h1>
              
              {/* Description */}
              <p className="text-xl text-slate-400 mb-8 max-w-xl mx-auto">
                Don't worry, it's not you—it's me. An unexpected error occurred, but we can fix this together.
              </p>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <button
                onClick={() => window.location.reload()}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105 transition-all duration-300"
              >
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Refresh Page
                </span>
              </button>
              
              <a 
                href={`mailto:harshalpinge@gmail.com?subject=Portfolio Error Report&body=Error: ${encodeURIComponent(this.state.error?.toString() || 'Unknown error')}`}
                className="px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-blue-500/50 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105"
              >
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Report Issue
                </span>
              </a>
            </div>
            
            {/* Development Error Details */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-8 text-left bg-slate-800/50 rounded-xl p-6 border border-slate-700/50 backdrop-blur-sm">
                <summary className="text-red-400 font-bold cursor-pointer mb-4 hover:text-red-300 transition-colors">
                  🔧 Error Details (Development Mode)
                </summary>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-slate-500 font-semibold mb-1">Error Message:</p>
                    <pre className="text-sm text-red-400 overflow-auto bg-slate-900/50 p-3 rounded-lg">
                      {this.state.error.toString()}
                    </pre>
                  </div>
                  {this.state.errorInfo && (
                    <div>
                      <p className="text-sm text-slate-500 font-semibold mb-1">Component Stack:</p>
                      <pre className="text-sm text-slate-300 overflow-auto bg-slate-900/50 p-3 rounded-lg max-h-64">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    </div>
                  )}
                </div>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;