import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/Layout/AuthLayout';
import Input from '../components/UI/Input';
import Button from '../components/UI/Button';
import { registerUser } from '../services/authService';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await registerUser({ name, email, password });
      alert('Registration successful! Please login.');
      navigate('/login');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Create Account" subtitle="Join NyayaSetu to start analyzing documents.">
      <form onSubmit={handleSubmit} className="space-y-stack-md">
        {error && <div className="text-error bg-error-container p-3 rounded-lg font-body-md text-sm">{error}</div>}
        
        <Input 
          label="Full Name" 
          type="text" 
          id="name"
          placeholder="Jane Doe" 
          icon="person" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          required 
        />

        <Input 
          label="Email Address" 
          type="email" 
          id="email"
          placeholder="name@firm.com" 
          icon="mail" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required 
        />
        
        <div>
          <label className="block font-label-md text-label-md text-primary mb-2" htmlFor="password">Password</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-outline text-xl">lock</span>
            </div>
            <input 
              className="w-full pl-10 pr-12 py-3 bg-surface border border-outline-variant rounded-lg font-body-md text-body-md text-on-surface placeholder:text-outline/70 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all" 
              id="password" 
              type={showPassword ? 'text' : 'password'} 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
            <button 
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-outline hover:text-on-surface transition-colors" 
              onClick={() => setShowPassword(!showPassword)} 
              type="button"
            >
              <span className="material-symbols-outlined text-xl">{showPassword ? 'visibility' : 'visibility_off'}</span>
            </button>
          </div>
        </div>

        <div className="pt-stack-sm">
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account'}
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

      {/* Sign In Link */}
      <div className="text-center font-body-md text-body-md text-on-surface-variant">
        Already have an account? 
        <Link className="font-label-md text-label-md text-primary hover:text-secondary hover:underline transition-colors ml-1" to="/login">Sign In</Link>
      </div>
    </AuthLayout>
  );
};

export default RegisterPage;
