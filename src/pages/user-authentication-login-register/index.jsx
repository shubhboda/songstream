import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';

import AuthTabs from './components/AuthTabs';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import SocialLogin from './components/SocialLogin';
import ForgotPasswordModal from './components/ForgotPasswordModal';

const UserAuthentication = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('login');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  // Mock credentials for testing
  const mockCredentials = {
    email: 'user@songstream.com',
    password: 'password123'
  };

  useEffect(() => {
    // Check if user is already authenticated
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      navigate('/music-dashboard-home');
    }
  }, [navigate]);

  const validateLoginForm = (formData) => {
    const newErrors = {};

    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    return newErrors;
  };

  const validateRegisterForm = (formData) => {
    const newErrors = {};

    if (!formData?.fullName) {
      newErrors.fullName = 'Full name is required';
    } else if (formData?.fullName?.length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters';
    }

    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/?.test(formData?.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    }

    if (!formData?.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData?.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms and conditions';
    }

    return newErrors;
  };

  const handleLogin = async (formData) => {
    const validationErrors = validateLoginForm(formData);
    
    if (Object.keys(validationErrors)?.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Check mock credentials
      if (formData?.email === mockCredentials?.email && formData?.password === mockCredentials?.password) {
        const userData = {
          id: 1,
          name: 'Music Lover',
          email: formData?.email,
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face',
          joinDate: '2024-01-15',
          plan: 'Premium',
          loginTime: new Date()?.toISOString()
        };

        localStorage.setItem('currentUser', JSON.stringify(userData));
        navigate('/music-dashboard-home');
      } else {
        setErrors({ 
          submit: `Invalid credentials. Use email: ${mockCredentials?.email} and password: ${mockCredentials?.password}` 
        });
      }
    } catch (error) {
      setErrors({ submit: 'Login failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (formData) => {
    const validationErrors = validateRegisterForm(formData);
    
    if (Object.keys(validationErrors)?.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      const userData = {
        id: Date.now(),
        name: formData?.fullName,
        email: formData?.email,
        avatar: `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000000)}?w=100&h=100&fit=crop&crop=face`,
        joinDate: new Date()?.toISOString()?.split('T')?.[0],
        plan: 'Free',
        isNewUser: true,
        registrationTime: new Date()?.toISOString()
      };

      localStorage.setItem('currentUser', JSON.stringify(userData));
      navigate('/music-dashboard-home');
    } catch (error) {
      setErrors({ submit: 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    setIsLoading(true);
    
    try {
      // Simulate social auth
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const userData = {
        id: Date.now(),
        name: `${provider?.charAt(0)?.toUpperCase() + provider?.slice(1)} User`,
        email: `user@${provider}.com`,
        avatar: `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000000)}?w=100&h=100&fit=crop&crop=face`,
        joinDate: new Date()?.toISOString()?.split('T')?.[0],
        plan: 'Free',
        provider: provider,
        socialLoginTime: new Date()?.toISOString()
      };
      
      localStorage.setItem('currentUser', JSON.stringify(userData));
      navigate('/music-dashboard-home');
    } catch (error) {
      setErrors({ submit: `${provider} authentication failed. Please try again.` });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = (email) => {
    console.log('Password reset requested for:', email);
    setTimeout(() => {
      setShowForgotPassword(false);
    }, 2000);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <div className="absolute top-20 left-10 w-32 h-32 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-primary/30 rounded-full blur-3xl" />
        </div>
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-center py-6 px-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <Icon name="Music" size={24} color="white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">SongStream</h1>
            <p className="text-sm text-muted-foreground">Your music, your way</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Welcome Message */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">
              {activeTab === 'login' ? 'Welcome back!' : 'Join SongStream'}
            </h2>
            <p className="text-muted-foreground">
              {activeTab === 'login' ?'Sign in to access your music library and playlists' :'Create your account and start discovering amazing music'
              }
            </p>
          </div>

          {/* Auth Card */}
          <div className="bg-card rounded-lg shadow-elevation border border-border p-6">
            <AuthTabs activeTab={activeTab} onTabChange={handleTabChange} />

            {activeTab === 'login' ? (
              <LoginForm
                onSubmit={handleLogin}
                isLoading={isLoading}
                errors={errors}
              />
            ) : (
              <RegisterForm
                onSubmit={handleRegister}
                isLoading={isLoading}
                errors={errors}
              />
            )}

            <SocialLogin
              onSocialLogin={handleSocialLogin}
              isLoading={isLoading}
            />

            {/* Additional Links */}
            {activeTab === 'login' && (
              <div className="text-center mt-6">
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-sm text-primary hover:underline"
                >
                  Forgot your password?
                </button>
              </div>
            )}
          </div>

          {/* Footer Links */}
          <div className="text-center mt-8 space-y-2">
            <p className="text-xs text-muted-foreground">
              By continuing, you agree to our{' '}
              <button className="text-primary hover:underline">Terms of Service</button>{' '}
              and{' '}
              <button className="text-primary hover:underline">Privacy Policy</button>
            </p>
            <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
              <button className="hover:text-foreground transition-spring">Help</button>
              <span>•</span>
              <button className="hover:text-foreground transition-spring">Support</button>
              <span>•</span>
              <button className="hover:text-foreground transition-spring">Contact</button>
            </div>
          </div>
        </div>
      </main>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        isOpen={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
        onSubmit={handleForgotPassword}
      />

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 z-50 bg-background/50 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-card rounded-lg p-6 shadow-elevation-high border border-border">
            <div className="flex items-center space-x-3">
              <div className="animate-spin w-5 h-5 border-2 border-primary border-t-transparent rounded-full" />
              <span className="text-foreground">
                {activeTab === 'login' ? 'Signing you in...' : 'Creating your account...'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAuthentication;