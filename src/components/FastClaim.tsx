import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { 
  ArrowLeft, 
  Check, 
  Scan, 
  Mic, 
  FileText, 
  Package, 
  Plus,
  CreditCard,
  Flower2,
  Music,
  Video,
  Car,
  UtensilsCrossed
} from 'lucide-react';

interface FastClaimProps {
  onClose?: () => void;
}

type ClaimStep = 'verify' | 'details' | 'casket' | 'extras' | 'payment';

interface ClaimData {
  memberInfo: {
    policyNumber: string;
    memberName: string;
    verified: boolean;
  };
  deceasedInfo: {
    fullName: string;
    dateOfPassing: string;
    deathCertificate?: File;
  };
  casket: {
    id: string;
    name: string;
    price: number;
  } | null;
  extras: {
    venue: boolean;
    flowers: boolean;
    music: boolean;
    streaming: boolean;
    catering: boolean;
    transportation: boolean;
  };
  totalAmount: number;
}

const FastClaim: React.FC<FastClaimProps> = ({ onClose }) => {
  const { isDark } = useTheme();
  const [currentStep, setCurrentStep] = useState<ClaimStep>('verify');
  const [claimData, setClaimData] = useState<ClaimData>({
    memberInfo: {
      policyNumber: '',
      memberName: '',
      verified: false,
    },
    deceasedInfo: {
      fullName: '',
      dateOfPassing: '',
    },
    casket: null,
    extras: {
      venue: false,
      flowers: false,
      music: false,
      streaming: false,
      catering: false,
      transportation: false,
    },
    totalAmount: 0,
  });

  const steps = [
    { id: 'verify', label: 'Verify Member', number: 1 },
    { id: 'details', label: 'Claim Details', number: 2 },
    { id: 'casket', label: 'Select Casket', number: 3 },
    { id: 'extras', label: 'Add Extras', number: 4 },
    { id: 'payment', label: 'Payment', number: 5 },
  ];

  const getCurrentStepIndex = () => {
    return steps.findIndex(step => step.id === currentStep);
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="flex h-screen">
        {/* Left Sidebar - Progress */}
        <div className={`w-80 ${isDark ? 'bg-gray-800' : 'bg-white'} border-r ${isDark ? 'border-gray-700' : 'border-gray-200'} p-6`}>
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={onClose}
              className={`flex items-center gap-2 text-sm ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          </div>

          {/* Title */}
          <div className="mb-8">
            <h1 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Fast Claim
            </h1>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Quick and efficient claim processing
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-4">
            {steps.map((step, index) => {
              const isActive = step.id === currentStep;
              const isCompleted = index < getCurrentStepIndex();
              
              return (
                <div key={step.id} className="flex items-start gap-3">
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    isCompleted 
                      ? 'bg-emerald-600 text-white' 
                      : isActive 
                        ? 'bg-emerald-600 text-white'
                        : isDark 
                          ? 'bg-gray-700 text-gray-400' 
                          : 'bg-gray-200 text-gray-600'
                  }`}>
                    {isCompleted ? <Check className="w-4 h-4" /> : step.number}
                  </div>
                  <div>
                    <div className={`font-medium ${
                      isActive 
                        ? isDark ? 'text-white' : 'text-gray-900'
                        : isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {step.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Support */}
          <div className={`mt-auto pt-8 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700/50' : 'bg-gray-100'}`}>
              <p className={`text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Need help?
              </p>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Our support team is here to assist you
              </p>
              <button className="mt-3 text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                Contact Support
              </button>
            </div>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-3xl mx-auto">
            <AnimatePresence mode="wait">
              {/* Step 1: Verify Member */}
              {currentStep === 'verify' && (
                <motion.div
                  key="verify"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Verify Member
                    </h2>
                    <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Scan ID or enter policy number to verify member
                    </p>
                  </div>

                  {/* Quick Scan Options */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button
                      onClick={() => alert('Camera scanner will open')}
                      className={`p-6 rounded-xl border-2 border-dashed transition-all ${
                        isDark 
                          ? 'border-emerald-500/50 hover:border-emerald-500 hover:bg-emerald-500/10' 
                          : 'border-emerald-600/50 hover:border-emerald-600 hover:bg-emerald-50'
                      }`}
                    >
                      <Scan className={`w-8 h-8 mx-auto mb-3 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
                      <div className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Scan ID</div>
                      <div className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Quick verification</div>
                    </button>

                    <button
                      onClick={() => alert('Voice verification will start')}
                      className={`p-6 rounded-xl border-2 border-dashed transition-all ${
                        isDark 
                          ? 'border-emerald-500/50 hover:border-emerald-500 hover:bg-emerald-500/10' 
                          : 'border-emerald-600/50 hover:border-emerald-600 hover:bg-emerald-50'
                      }`}
                    >
                      <Mic className={`w-8 h-8 mx-auto mb-3 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
                      <div className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Voice Verify</div>
                      <div className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Say policy number</div>
                    </button>

                    <button
                      onClick={() => alert('Manual entry form')}
                      className={`p-6 rounded-xl border-2 border-dashed transition-all ${
                        isDark 
                          ? 'border-emerald-500/50 hover:border-emerald-500 hover:bg-emerald-500/10' 
                          : 'border-emerald-600/50 hover:border-emerald-600 hover:bg-emerald-50'
                      }`}
                    >
                      <FileText className={`w-8 h-8 mx-auto mb-3 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
                      <div className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Manual Entry</div>
                      <div className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Type policy number</div>
                    </button>
                  </div>

                  {/* Manual Input Form */}
                  <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Policy Number
                    </label>
                    <input
                      type="text"
                      placeholder="GFT-2025-XXXXXX"
                      value={claimData.memberInfo.policyNumber}
                      onChange={(e) => setClaimData({
                        ...claimData,
                        memberInfo: { ...claimData.memberInfo, policyNumber: e.target.value }
                      })}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        isDark 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      } focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
                    />
                  </div>

                  {/* Navigation */}
                  <div className="flex justify-end">
                    <button
                      onClick={() => setCurrentStep('details')}
                      className="px-8 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-colors"
                    >
                      Continue
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Claim Details */}
              {currentStep === 'details' && (
                <motion.div
                  key="details"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Claim Details
                    </h2>
                    <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Provide information about the deceased
                    </p>
                  </div>

                  {/* Scan Death Certificate */}
                  <div className={`p-6 rounded-xl border-2 border-dashed ${
                    isDark ? 'border-emerald-500/50 bg-gray-800' : 'border-emerald-600/50 bg-emerald-50'
                  }`}>
                    <div className="text-center">
                      <Scan className={`w-12 h-12 mx-auto mb-3 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
                      <h3 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Scan Death Certificate
                      </h3>
                      <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        Auto-fill details from death certificate
                      </p>
                      <button
                        onClick={() => alert('Camera will open to scan death certificate')}
                        className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
                      >
                        Scan Document
                      </button>
                    </div>
                  </div>

                  {/* Manual Entry */}
                  <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                    <h3 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Deceased Information
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          Full Name *
                        </label>
                        <input
                          type="text"
                          placeholder="Enter full name"
                          value={claimData.deceasedInfo.fullName}
                          onChange={(e) => setClaimData({
                            ...claimData,
                            deceasedInfo: { ...claimData.deceasedInfo, fullName: e.target.value }
                          })}
                          className={`w-full px-4 py-3 rounded-lg border ${
                            isDark 
                              ? 'bg-gray-700 border-gray-600 text-white' 
                              : 'bg-white border-gray-300 text-gray-900'
                          } focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          Date of Passing *
                        </label>
                        <input
                          type="date"
                          value={claimData.deceasedInfo.dateOfPassing}
                          onChange={(e) => setClaimData({
                            ...claimData,
                            deceasedInfo: { ...claimData.deceasedInfo, dateOfPassing: e.target.value }
                          })}
                          className={`w-full px-4 py-3 rounded-lg border ${
                            isDark 
                              ? 'bg-gray-700 border-gray-600 text-white' 
                              : 'bg-white border-gray-300 text-gray-900'
                          } focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Navigation */}
                  <div className="flex justify-between">
                    <button
                      onClick={() => setCurrentStep('verify')}
                      className={`px-8 py-3 rounded-xl font-semibold transition-colors ${
                        isDark 
                          ? 'bg-gray-700 text-white hover:bg-gray-600' 
                          : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                      }`}
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setCurrentStep('casket')}
                      className="px-8 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-colors"
                    >
                      Continue
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Select Casket */}
              {currentStep === 'casket' && (
                <motion.div
                  key="casket"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Select Casket
                    </h2>
                    <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Choose a casket for the funeral service
                    </p>
                  </div>

                  {/* Casket Options */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { id: '1', name: 'Oak Premium', price: 15000, description: 'Solid oak with brass handles' },
                      { id: '2', name: 'Pine Standard', price: 8500, description: 'Quality pine with silver handles' },
                      { id: '3', name: 'Mahogany Deluxe', price: 25000, description: 'Premium mahogany with gold accents' },
                      { id: '4', name: 'Basic Dignity', price: 5000, description: 'Simple and dignified option' },
                    ].map((casket) => (
                      <button
                        key={casket.id}
                        onClick={() => setClaimData({
                          ...claimData,
                          casket: casket,
                          totalAmount: casket.price
                        })}
                        className={`p-6 rounded-xl border-2 text-left transition-all ${
                          claimData.casket?.id === casket.id
                            ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-900/20'
                            : isDark
                              ? 'border-gray-700 hover:border-gray-600 bg-gray-800'
                              : 'border-gray-200 hover:border-gray-300 bg-white'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <Package className={`w-8 h-8 ${
                            claimData.casket?.id === casket.id
                              ? 'text-emerald-600'
                              : isDark ? 'text-gray-400' : 'text-gray-600'
                          }`} />
                          {claimData.casket?.id === casket.id && (
                            <Check className="w-6 h-6 text-emerald-600" />
                          )}
                        </div>
                        <h3 className={`font-bold text-lg mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {casket.name}
                        </h3>
                        <p className={`text-sm mb-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          {casket.description}
                        </p>
                        <div className="text-2xl font-bold text-emerald-600">
                          R{casket.price.toLocaleString()}
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Navigation */}
                  <div className="flex justify-between">
                    <button
                      onClick={() => setCurrentStep('details')}
                      className={`px-8 py-3 rounded-xl font-semibold transition-colors ${
                        isDark 
                          ? 'bg-gray-700 text-white hover:bg-gray-600' 
                          : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                      }`}
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setCurrentStep('extras')}
                      disabled={!claimData.casket}
                      className="px-8 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Continue
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Add Extras */}
              {currentStep === 'extras' && (
                <motion.div
                  key="extras"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Add Extras
                    </h2>
                    <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Optional services to enhance the funeral
                    </p>
                  </div>

                  {/* Extras Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { key: 'venue', icon: Package, label: 'Venue Rental', price: 3500 },
                      { key: 'flowers', icon: Flower2, label: 'Flowers', price: 1500 },
                      { key: 'music', icon: Music, label: 'Music/DJ', price: 2000 },
                      { key: 'streaming', icon: Video, label: 'Live Streaming', price: 1000 },
                      { key: 'catering', icon: UtensilsCrossed, label: 'Catering', price: 5000 },
                      { key: 'transportation', icon: Car, label: 'Transportation', price: 2500 },
                    ].map((extra) => {
                      const Icon = extra.icon;
                      const isSelected = claimData.extras[extra.key as keyof typeof claimData.extras];
                      
                      return (
                        <button
                          key={extra.key}
                          onClick={() => {
                            const newExtras = { ...claimData.extras, [extra.key]: !isSelected };
                            const extrasTotal = Object.entries(newExtras).reduce((sum, [key, value]) => {
                              if (value) {
                                const extraItem = [
                                  { key: 'venue', price: 3500 },
                                  { key: 'flowers', price: 1500 },
                                  { key: 'music', price: 2000 },
                                  { key: 'streaming', price: 1000 },
                                  { key: 'catering', price: 5000 },
                                  { key: 'transportation', price: 2500 },
                                ].find(e => e.key === key);
                                return sum + (extraItem?.price || 0);
                              }
                              return sum;
                            }, 0);
                            
                            setClaimData({
                              ...claimData,
                              extras: newExtras,
                              totalAmount: (claimData.casket?.price || 0) + extrasTotal
                            });
                          }}
                          className={`p-6 rounded-xl border-2 text-left transition-all ${
                            isSelected
                              ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-900/20'
                              : isDark
                                ? 'border-gray-700 hover:border-gray-600 bg-gray-800'
                                : 'border-gray-200 hover:border-gray-300 bg-white'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Icon className={`w-6 h-6 ${
                                isSelected ? 'text-emerald-600' : isDark ? 'text-gray-400' : 'text-gray-600'
                              }`} />
                              <div>
                                <div className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                  {extra.label}
                                </div>
                                <div className="text-emerald-600 font-bold">
                                  R{extra.price.toLocaleString()}
                                </div>
                              </div>
                            </div>
                            {isSelected && <Check className="w-6 h-6 text-emerald-600" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Total Summary */}
                  <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                    <div className="flex justify-between items-center">
                      <span className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Total Amount
                      </span>
                      <span className="text-3xl font-bold text-emerald-600">
                        R{claimData.totalAmount.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Navigation */}
                  <div className="flex justify-between">
                    <button
                      onClick={() => setCurrentStep('casket')}
                      className={`px-8 py-3 rounded-xl font-semibold transition-colors ${
                        isDark 
                          ? 'bg-gray-700 text-white hover:bg-gray-600' 
                          : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                      }`}
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setCurrentStep('payment')}
                      className="px-8 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-colors"
                    >
                      Continue to Payment
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 5: Payment */}
              {currentStep === 'payment' && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Payment
                    </h2>
                    <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Complete your claim payment
                    </p>
                  </div>

                  {/* Order Summary */}
                  <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                    <h3 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Order Summary
                    </h3>
                    <div className="space-y-3">
                      {claimData.casket && (
                        <div className="flex justify-between">
                          <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                            {claimData.casket.name}
                          </span>
                          <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            R{claimData.casket.price.toLocaleString()}
                          </span>
                        </div>
                      )}
                      {Object.entries(claimData.extras).map(([key, value]) => {
                        if (value) {
                          const extras = {
                            venue: { label: 'Venue Rental', price: 3500 },
                            flowers: { label: 'Flowers', price: 1500 },
                            music: { label: 'Music/DJ', price: 2000 },
                            streaming: { label: 'Live Streaming', price: 1000 },
                            catering: { label: 'Catering', price: 5000 },
                            transportation: { label: 'Transportation', price: 2500 },
                          };
                          const extra = extras[key as keyof typeof extras];
                          return (
                            <div key={key} className="flex justify-between">
                              <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                                {extra.label}
                              </span>
                              <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                R{extra.price.toLocaleString()}
                              </span>
                            </div>
                          );
                        }
                        return null;
                      })}
                      <div className={`pt-3 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                        <div className="flex justify-between items-center">
                          <span className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            Total
                          </span>
                          <span className="text-2xl font-bold text-emerald-600">
                            R{claimData.totalAmount.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                    <h3 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Payment Method
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          Card Number
                        </label>
                        <input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          className={`w-full px-4 py-3 rounded-lg border ${
                            isDark 
                              ? 'bg-gray-700 border-gray-600 text-white' 
                              : 'bg-white border-gray-300 text-gray-900'
                          } focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            className={`w-full px-4 py-3 rounded-lg border ${
                              isDark 
                                ? 'bg-gray-700 border-gray-600 text-white' 
                                : 'bg-white border-gray-300 text-gray-900'
                            } focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
                          />
                        </div>
                        <div>
                          <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            CVV
                          </label>
                          <input
                            type="text"
                            placeholder="123"
                            className={`w-full px-4 py-3 rounded-lg border ${
                              isDark 
                                ? 'bg-gray-700 border-gray-600 text-white' 
                                : 'bg-white border-gray-300 text-gray-900'
                            } focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Navigation */}
                  <div className="flex justify-between">
                    <button
                      onClick={() => setCurrentStep('extras')}
                      className={`px-8 py-3 rounded-xl font-semibold transition-colors ${
                        isDark 
                          ? 'bg-gray-700 text-white hover:bg-gray-600' 
                          : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                      }`}
                    >
                      Back
                    </button>
                    <button
                      onClick={() => {
                        alert('Claim submitted successfully! Reference: CLM-' + Date.now());
                        if (onClose) onClose();
                      }}
                      className="px-8 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-colors flex items-center gap-2"
                    >
                      <CreditCard className="w-5 h-5" />
                      Submit Claim
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FastClaim;
