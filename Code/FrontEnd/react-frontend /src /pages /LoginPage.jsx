import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/Layout/AuthLayout';
import Input from '../components/UI/Input';
import Button from '../components/UI/Button';
import { loginUser } from '../services/authService';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const data = await loginUser(email, password);
      login(data.user || {}, data.token);
      // Wait, dashboard isn't migrated. For now just show a success message or alert.
      
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Welcome Back" subtitle="Sign in to continue to your dashboard.">
      <form onSubmit={handleSubmit} className="space-y-stack-md" noValidate>
        {error && (
          <div 
            id="login-error" 
            role="alert" 
            aria-live="assertive" 
            className="text-error bg-error-container p-3 rounded-lg font-body-md text-sm"
          >
            {error}
          </div>
        )}
        
        <Input 
          label="Email Address" 
          type="email" 
          id="email"
          placeholder="name@firm.com" 
          icon="mail" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required 
          aria-required="true"
          aria-invalid={!!error}
          aria-describedby={error ? "login-error" : undefined}
        />
        
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block font-label-md text-label-md text-primary" htmlFor="password">Password</label>
            <Link className="font-label-md text-label-md text-secondary hover:text-secondary-fixed-dim transition-colors" to="/forgot-password">Forgot password?</Link>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-outline text-xl" aria-hidden="true">lock</span>
            </div>
            <input 
              className="w-full pl-10 pr-12 py-3 bg-surface border border-outline-variant rounded-lg font-body-md text-body-md text-on-surface placeholder:text-outline/70 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all" 
              id="password" 
              type={showPassword ? 'text' : 'password'} 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
              aria-required="true"
              aria-invalid={!!error}
              aria-describedby={error ? "login-error" : undefined}
            />
            <button 
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-outline hover:text-on-surface transition-colors" 
              onClick={() => setShowPassword(!showPassword)} 
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
            >
              <span className="material-symbols-outlined text-xl" aria-hidden="true">{showPassword ? 'visibility' : 'visibility_off'}</span>
            </button>
          </div>
        </div>

        <div className="pt-stack-sm">
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Signing In...' : 'Sign In'}
            {!loading && <span className="material-symbols-outlined text-sm">arrow_forward</span>}
          </Button>
        </div>
      </form>

      {/* Divider */}
      <div className="my-stack-md flex items-center">
        <div className="flex-grow border-t border-outline-variant"></div>
        <span className="mx-4 font-caption text-caption text-outline">or</span>
        <div className="flex-grow border-t border-outline-variant"></div>
      </div>

      {/* Create Account Link */}
      <div className="text-center font-body-md text-body-md text-on-surface-variant">
        Don't have an account? 
        <Link className="font-label-md text-label-md text-primary hover:text-secondary hover:underline transition-colors ml-1" to="/register">Create Account</Link>
      </div>

      {/* Privacy Assurance */}
      <div className="mt-stack-lg pt-stack-md border-t border-surface-variant flex items-start justify-center gap-2">
        <span className="material-symbols-outlined text-secondary text-base mt-0.5">verified_user</span>
        <p className="font-caption text-caption text-on-surface-variant text-center max-w-[280px]">
          Your connection is secure and encrypted. We employ institutional-grade privacy protocols to protect your data.
        </p>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
