import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserIcon, LockClosedIcon, EnvelopeIcon } from '@heroicons/react/24/outline';


const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
 
  const { login, register } = useAuth();
  const navigate = useNavigate();


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!isLogin) {
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          setLoading(false);
          return;
        }
       
        const userData = {
          name: formData.name,
          email: formData.email,
          password: formData.password
        };
        
        const result = await register(userData);
        if (result.success) {
          navigate('/search');
        } else {
          setError(result.error);
        }
      } else {
        const credentials = {
          email: formData.email,
          password: formData.password
        };
        
        const result = await login(credentials);
        if (result.success) {
          const { role } = result.user;
          // Navigate based on role
          if (role === 'admin') {
            navigate('/admin/dashboard');
          } else if (role === 'bus_manager') {
            navigate('/manager/dashboard');
          } else {
            navigate('/search');
          }
        } else {
          setError(result.error);
        }
      }
    } catch (err) {
      setError(isLogin ? 'Login failed. Please check your credentials.' : 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">TB</span>
            </div>
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              {isLogin ? 'Sign in' : 'Sign up'}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {isLogin ? "Or" : "Already have an account?"}{' '}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
              >
                {isLogin ? 'create account' : 'sign in'}
              </button>
            </p>
          </div>
         
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-center text-sm">
                {error}
              </div>
            )}
           
            <div className="space-y-5">
              {!isLogin && (
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required={!isLogin}
                      value={formData.name}
                      onChange={handleChange}
                      className="form-input pl-11 w-full py-3 text-sm"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>
              )}
             
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email address
                </label>
                <div className="relative">
                  <EnvelopeIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input pl-11 w-full py-3 text-sm"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
             
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <LockClosedIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete={isLogin ? "current-password" : "new-password"}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="form-input pl-11 w-full py-3 text-sm"
                    placeholder="••••••••"
                  />
                </div>
              </div>
             
              {!isLogin && (
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <LockClosedIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      required={!isLogin}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="form-input pl-11 w-full py-3 text-sm"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              )}
            </div>


            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary btn-full w-full py-3 text-base font-semibold"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    {isLogin ? 'Signing in...' : 'Creating...'}
                  </div>
                ) : (
                  isLogin ? 'Sign in' : 'Create account'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};


export default Login;
