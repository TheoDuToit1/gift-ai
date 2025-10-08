import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Shield, AlertCircle, Check, ArrowRight, ArrowLeft } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface AdminProfile {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  funeralHomeName: string;
  location: string;
  branch: string;
  createdAt: string;
}

const AdminOnboarding: React.FC = () => {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<AdminProfile>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    funeralHomeName: '',
    location: '',
    branch: '',
    createdAt: ''
  });

  const totalSteps = 3;

  // Check if admin already exists
  useEffect(() => {
    const existingAdmin = localStorage.getItem('ubuntugrace_admin_profile');
    if (existingAdmin) {
      navigate('/admin');
    }
  }, [navigate]);

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
      if (!formData.password) newErrors.password = 'Password is required';
      else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    }

    if (step === 2) {
      if (!formData.funeralHomeName.trim()) newErrors.funeralHomeName = 'Funeral home name is required';
      if (!formData.location.trim()) newErrors.location = 'Location is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      // Create admin profile
      const adminProfile: AdminProfile = {
        ...formData,
        createdAt: new Date().toISOString()
      };

      // Save to localStorage (acts like persistent cookies)
      localStorage.setItem('ubuntugrace_admin_profile', JSON.stringify(adminProfile));
      localStorage.setItem('adminAuthenticated', 'true');

      // Navigate to dashboard
      navigate('/admin/dashboard');
    }
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3].map((step) => (
        <div key={step} className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            step <= currentStep
              ? 'bg-green-600 text-white'
              : isDark ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-600'
          }`}>
            {step < currentStep ? <Check className="w-4 h-4" /> : step}
          </div>
          {step < 3 && (
            <div className={`w-12 h-0.5 mx-2 ${
              step < currentStep ? 'bg-green-600' : isDark ? 'bg-gray-700' : 'bg-gray-200'
            }`} />
          )}
        </div>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Create Your Admin Account
        </h2>
        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Set up your personal information and login credentials
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={`block text-sm font-medium mb-2 ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`}>
            First Name *
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 rounded-lg border transition-colors ${
              errors.firstName
                ? 'border-red-500 focus:border-red-500'
                : isDark
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-green-500'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-green-500'
            }`}
            placeholder="Enter first name"
          />
          {errors.firstName && (
            <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
          )}
        </div>

        <div>
          <label className={`block text-sm font-medium mb-2 ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Last Name *
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 rounded-lg border transition-colors ${
              errors.lastName
                ? 'border-red-500 focus:border-red-500'
                : isDark
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-green-500'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-green-500'
            }`}
            placeholder="Enter last name"
          />
          {errors.lastName && (
            <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
          )}
        </div>
      </div>

      <div>
        <label className={`block text-sm font-medium mb-2 ${
          isDark ? 'text-gray-300' : 'text-gray-700'
        }`}>
          Email Address *
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className={`w-full px-4 py-3 rounded-lg border transition-colors ${
            errors.email
              ? 'border-red-500 focus:border-red-500'
              : isDark
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-green-500'
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-green-500'
          }`}
          placeholder="admin@yourfuneralhome.co.za"
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email}</p>
        )}
      </div>

      <div>
        <label className={`block text-sm font-medium mb-2 ${
          isDark ? 'text-gray-300' : 'text-gray-700'
        }`}>
          Password *
        </label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 pr-12 rounded-lg border transition-colors ${
              errors.password
                ? 'border-red-500 focus:border-red-500'
                : isDark
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-green-500'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-green-500'
            }`}
            placeholder="Create a secure password"
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
        {errors.password && (
          <p className="text-red-500 text-xs mt-1">{errors.password}</p>
        )}
        <p className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
          Must be at least 8 characters long
        </p>
      </div>

      <div>
        <label className={`block text-sm font-medium mb-2 ${
          isDark ? 'text-gray-300' : 'text-gray-700'
        }`}>
          Phone Number *
        </label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          className={`w-full px-4 py-3 rounded-lg border transition-colors ${
            errors.phone
              ? 'border-red-500 focus:border-red-500'
              : isDark
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-green-500'
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-green-500'
          }`}
          placeholder="087 123 4567"
        />
        {errors.phone && (
          <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
        )}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Funeral Home Details
        </h2>
        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Tell us about your funeral home and location
        </p>
      </div>

      <div>
        <label className={`block text-sm font-medium mb-2 ${
          isDark ? 'text-gray-300' : 'text-gray-700'
        }`}>
          Funeral Home Name *
        </label>
        <input
          type="text"
          name="funeralHomeName"
          value={formData.funeralHomeName}
          onChange={handleInputChange}
          className={`w-full px-4 py-3 rounded-lg border transition-colors ${
            errors.funeralHomeName
              ? 'border-red-500 focus:border-red-500'
              : isDark
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-green-500'
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-green-500'
          }`}
          placeholder="UbuntuGift Funeral Services"
        />
        {errors.funeralHomeName && (
          <p className="text-red-500 text-xs mt-1">{errors.funeralHomeName}</p>
        )}
      </div>

      <div>
        <label className={`block text-sm font-medium mb-2 ${
          isDark ? 'text-gray-300' : 'text-gray-700'
        }`}>
          District/Location *
        </label>
        <select
          name="location"
          value={formData.location}
          onChange={handleInputChange}
          className={`w-full px-4 py-3 rounded-lg border transition-colors ${
            errors.location
              ? 'border-red-500 focus:border-red-500'
              : isDark
                ? 'bg-gray-700 border-gray-600 text-white focus:border-green-500'
                : 'bg-white border-gray-300 text-gray-900 focus:border-green-500'
          }`}
        >
          <option value="">Select your district</option>
          <option value="Capricorn">Capricorn (Polokwane)</option>
          <option value="Vhembe">Vhembe (Thohoyandou)</option>
          <option value="Mopani">Mopani (Giyani)</option>
          <option value="Sekhukhune">Sekhukhune (Groblersdal)</option>
          <option value="Waterberg">Waterberg (Modimolle)</option>
          <option value="Other">Other</option>
        </select>
        {errors.location && (
          <p className="text-red-500 text-xs mt-1">{errors.location}</p>
        )}
      </div>

      <div>
        <label className={`block text-sm font-medium mb-2 ${
          isDark ? 'text-gray-300' : 'text-gray-700'
        }`}>
          Branch/Location Name
        </label>
        <input
          type="text"
          name="branch"
          value={formData.branch}
          onChange={handleInputChange}
          className={`w-full px-4 py-3 rounded-lg border transition-colors ${
            isDark
              ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-green-500'
              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-green-500'
          }`}
          placeholder="Main Branch, East Branch, etc."
        />
      </div>

      <div className={`p-4 rounded-lg border ${
        isDark ? 'bg-blue-900/20 border-blue-700' : 'bg-blue-50 border-blue-200'
      }`}>
        <h4 className={`font-medium mb-2 ${isDark ? 'text-blue-300' : 'text-blue-800'}`}>
          What You'll Get Access To:
        </h4>
        <ul className={`text-sm space-y-1 ${isDark ? 'text-blue-400' : 'text-blue-700'}`}>
          <li>• Comprehensive analytics dashboard</li>
          <li>• Booking and appointment management</li>
          <li>• Customer inquiry tracking</li>
          <li>• Service performance metrics</li>
          <li>• Local market insights</li>
        </ul>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Review & Complete Setup
        </h2>
        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Please review your information before completing setup
        </p>
      </div>

      <div className={`p-6 rounded-lg border ${
        isDark ? 'bg-gray-800 border-gray-700' : 'bg-white/60 backdrop-blur-sm border-gray-200/60'
      }`}>
        <h3 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Personal Information
        </h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className={`font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Name:</span>
            <p className={isDark ? 'text-white' : 'text-gray-900'}>
              {formData.firstName} {formData.lastName}
            </p>
          </div>
          <div>
            <span className={`font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Email:</span>
            <p className={isDark ? 'text-white' : 'text-gray-900'}>{formData.email}</p>
          </div>
          <div>
            <span className={`font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Phone:</span>
            <p className={isDark ? 'text-white' : 'text-gray-900'}>{formData.phone}</p>
          </div>
        </div>
      </div>

      <div className={`p-6 rounded-lg border ${
        isDark ? 'bg-gray-800 border-gray-700' : 'bg-white/60 backdrop-blur-sm border-gray-200/60'
      }`}>
        <h3 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Funeral Home Details
        </h3>
        <div className="grid grid-cols-1 gap-4 text-sm">
          <div>
            <span className={`font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Funeral Home:</span>
            <p className={isDark ? 'text-white' : 'text-gray-900'}>{formData.funeralHomeName}</p>
          </div>
          <div>
            <span className={`font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Location:</span>
            <p className={isDark ? 'text-white' : 'text-gray-900'}>{formData.location}</p>
          </div>
          {formData.branch && (
            <div>
              <span className={`font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Branch:</span>
              <p className={isDark ? 'text-white' : 'text-gray-900'}>{formData.branch}</p>
            </div>
          )}
        </div>
      </div>

      <div className={`p-4 rounded-lg border ${
        isDark ? 'bg-green-900/20 border-green-700' : 'bg-green-50/60 border-green-200/60'
      }`}>
        <div className="flex items-start gap-3">
          <Check className={`w-5 h-5 mt-0.5 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
          <div>
            <h4 className={`font-medium ${isDark ? 'text-green-300' : 'text-green-800'}`}>
              Ready to Launch!
            </h4>
            <p className={`text-sm ${isDark ? 'text-green-400' : 'text-green-700'}`}>
              Your UbuntuGift admin account will be created and you'll be taken to your analytics dashboard.
              All information is securely stored locally on your device.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 py-8 ${
      isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'
    }`}>
      <div className={`w-full max-w-2xl rounded-2xl shadow-xl border overflow-hidden ${
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
            UbuntuGift Admin Setup
          </h1>
          <p className={`text-sm ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Create your funeral home admin account
          </p>
        </div>

        {/* Step Indicator */}
        {renderStepIndicator()}

        {/* Form Content */}
        <div className="px-8 pb-8">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentStep === 1}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                currentStep === 1
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : isDark
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </button>

            {currentStep < totalSteps ? (
              <button
                type="button"
                onClick={handleNext}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                  isDark
                    ? 'bg-green-600 hover:bg-green-500 text-white'
                    : 'bg-green-500 hover:bg-green-600 text-white'
                }`}
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                  isDark
                    ? 'bg-green-600 hover:bg-green-500 text-white'
                    : 'bg-green-500 hover:bg-green-600 text-white'
                }`}
              >
                Complete Setup
                <Check className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOnboarding;
