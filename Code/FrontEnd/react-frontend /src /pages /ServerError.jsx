import React from 'react';
import { Link } from 'react-router-dom';

const ServerError = ({ error, resetError }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-surface text-center">
      <span className="material-symbols-outlined text-6xl text-error mb-4">cloud_off</span>
      <h1 className="text-display-lg text-primary mb-2">500 - Server Error</h1>
      <p className="text-body-lg text-gray-600 mb-8 max-w-md">
        We're experiencing some technical difficulties on our end. Please try again in a few moments.
      </p>
      {error && (
        <div className="bg-red-50 text-red-800 p-4 rounded-lg text-sm mb-8 max-w-lg text-left overflow-auto border border-red-100">
          <p className="font-semibold mb-1">Error Details (for support):</p>
          <code>{error.toString()}</code>
        </div>
      )}
      <div className="flex gap-4">
        {resetError && (
          <button 
            onClick={resetError}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-light transition-colors font-medium"
          >
            Try Again
          </button>
        )}
        <Link 
          to="/" 
          onClick={resetError}
          className="px-6 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
};

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false, error: null });
  }

  render() {
    if (this.state.hasError) {
      return <ServerError error={this.state.error} resetError={this.resetError} />;
    }
    return this.props.children;
  }
}

export default ServerError;
