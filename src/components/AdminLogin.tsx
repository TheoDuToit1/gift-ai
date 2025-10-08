import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Shield, AlertCircle, UserPlus } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const AdminLogin: React.FC = () => {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Check if admin profile exists on component mount
  useEffect(() => {
    const adminProfile = localStorage.getItem('ubuntugrace_admin_profile');
    if (!adminProfile) {
      // No admin profile exists, redirect to onboarding
      navigate('/admin/setup');
      return;
    }

    // Check if already authenticated
    const isAuthenticated = localStorage.getItem('adminAuthenticated') === 'true';
    if (isAuthenticated) {
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Get stored admin profile
      const adminProfileStr = localStorage.getItem('ubuntugrace_admin_profile');
      if (!adminProfileStr) {
        setError('No admin account found. Please complete setup first.');
        navigate('/admin/setup');
        return;
      }

      const adminProfile = JSON.parse(adminProfileStr);

      // Check credentials
      if (formData.email === adminProfile.email && formData.password === adminProfile.password) {
        localStorage.setItem('adminAuthenticated', 'true');
        navigate('/admin/dashboard');
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      setError('Login failed. Please try again.');
    }

    setIsLoading(false);
  };

  const handleSetupRedirect = () => {
    navigate('/admin/setup');
  };

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 ${
      isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'
    }`}>
      <div className={`w-full max-w-md rounded-2xl shadow-xl border overflow-hidden ${
        isDark ? 'bg-gray-800 border-gray-700' : 'bg-white/80 backdrop-blur-sm border-gray-200/60'
      }`}>

        {/* Header */}
        <div className={`p-8 text-center border-b ${
          isDark ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
            isDark ? 'bg-green-900/50' : 'bg-green-100'
          }`}>
            <Shield className={`w-8 h-8 ${
              isDark ? 'text-green-400' : 'text-green-600'
            }`} />
          </div>
          <h1 className={`text-2xl font-bold mb-2 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            UbuntuGift Admin
          </h1>
          <p className={`text-sm ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Access your funeral home dashboard
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {error && (
            <div className={`flex items-center gap-2 p-3 rounded-lg text-sm ${
              isDark ? 'bg-red-900/50 border border-red-700 text-red-300' : 'bg-red-50 border border-red-200 text-red-700'
            }`}>
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}

          <div>
            <label className={`block text-sm font-medium mb-2 ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                isDark
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-green-500'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-green-500'
              }`}
              placeholder="admin@ubuntugift.co.za"
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className={`w-full px-4 py-3 pr-12 rounded-lg border transition-colors ${
                  isDark
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-green-500'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-green-500'
                }`}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute right-3 top-1/2 -translate-y-1/2 ${
                  isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
              isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : `bg-green-600 hover:bg-green-500 text-white shadow-lg hover:shadow-xl`
            }`}
          >
            {isLoading ? 'Signing In...' : 'Sign In to Dashboard'}
          </button>
        </form>

        {/* Demo Credentials */}
        <div className={`px-8 pb-8 text-center`}>
          <div className={`p-4 rounded-lg border ${
            isDark ? 'bg-blue-900/20 border-blue-700' : 'bg-blue-50 border-blue-200'
          }`}>
            <p className={`text-sm font-medium mb-2 ${
              isDark ? 'text-blue-300' : 'text-blue-800'
            }`}>
              Need to Create an Account?
            </p>
            <p className={`text-xs mb-3 ${
              isDark ? 'text-blue-400' : 'text-blue-600'
            }`}>
              If you haven't set up your admin account yet, you'll be redirected to the setup wizard.
            </p>
            <button
              onClick={handleSetupRedirect}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isDark
                  ? 'bg-blue-600 text-white hover:bg-blue-500'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              <UserPlus className="w-4 h-4" />
              Go to Setup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
