import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../components/Layout/AuthLayout';
import Input from '../components/UI/Input';
import Button from '../components/UI/Button';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setMessage('If an account exists, a reset link has been sent to your email.');
      setLoading(false);
    }, 1000);
  };

  return (
    <AuthLayout title="Reset Password" subtitle="Enter your email to receive a password reset link.">
      <form onSubmit={handleSubmit} className="space-y-stack-md">
        {message && <div className="text-primary bg-primary-fixed p-3 rounded-lg font-body-md text-sm">{message}</div>}
        
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
        
        <div className="pt-stack-sm">
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Sending...' : 'Send Reset Link'}
            {!loading && <span className="material-symbols-outlined text-sm">arrow_forward</span>}
          </Button>
        </div>
      </form>

      <div className="mt-stack-md text-center font-body-md text-body-md text-on-surface-variant">
        Remembered your password? 
        <Link className="font-label-md text-label-md text-primary hover:text-secondary hover:underline transition-colors ml-1" to="/login">Sign In</Link>
      </div>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
