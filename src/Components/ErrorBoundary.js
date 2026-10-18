import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
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
        <div className="min-h-screen bg-canvas flex items-center justify-center p-4">
          <div className="max-w-2xl w-full text-center">
            <div className="mb-8">
              <div className="w-24 h-24 bg-red-500/10 border-2 border-red-500/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>

              <h1 className="text-5xl md:text-6xl font-display font-bold text-paper mb-4">
                Oops! <span className="text-muted">Something Broke</span>
              </h1>

              <p className="text-xl text-muted mb-8 max-w-xl mx-auto">
                Don't worry, it's not you—it's me. An unexpected error occurred, but we can fix this together.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="btn-pill-accent"
              >
                Refresh Page
              </button>

              <a
                href={`mailto:harshalpinge@gmail.com?subject=Portfolio Error Report&body=Error: ${encodeURIComponent(this.state.error?.toString() || 'Unknown error')}`}
                className="btn-pill-ghost-dark"
              >
                Report Issue
              </a>
            </div>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-8 text-left bg-surface rounded-xl p-6 border border-line">
                <summary className="text-red-400 font-bold cursor-pointer mb-4 hover:text-red-300 transition-colors">
                  Error Details (Development Mode)
                </summary>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted font-semibold mb-1">Error Message:</p>
                    <pre className="text-sm text-red-400 overflow-auto bg-canvas p-3 rounded-lg">
                      {this.state.error.toString()}
                    </pre>
                  </div>
                  {this.state.errorInfo && (
                    <div>
                      <p className="text-sm text-muted font-semibold mb-1">Component Stack:</p>
                      <pre className="text-sm text-paper/70 overflow-auto bg-canvas p-3 rounded-lg max-h-64">
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
