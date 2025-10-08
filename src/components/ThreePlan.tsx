import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { ChevronDown, Check } from 'lucide-react';
import MemberSignUpForm from './MemberSignUpForm';

interface ThreePlanProps {
  onClose?: () => void;
}

type PlanType = 'single' | 'family' | 'extended';

const ThreePlan: React.FC<ThreePlanProps> = ({ onClose }) => {
  const { isDark } = useTheme();
  const [selectedPlan, setSelectedPlan] = useState<PlanType | null>(null);
  const [expandedBenefit, setExpandedBenefit] = useState<PlanType | null>(null);

  const plans = [
    { 
      id: 'single' as PlanType, 
      label: 'Single Member Plan',
      price: 'R299/month',
      benefits: [
        'Full funeral coverage',
        'Casket selection',
        'Venue arrangements',
        'Transportation',
        'Documentation assistance',
        'Grief counseling support',
      ]
    },
    { 
      id: 'family' as PlanType, 
      label: 'Family Members Plan',
      price: 'R599/month',
      benefits: [
        'Coverage for up to 6 members',
        'Premium casket options',
        'Full venue services',
        'Transportation for family',
        'Memorial arrangements',
        'Grief counseling',
        'Family support services',
      ]
    },
    { 
      id: 'extended' as PlanType, 
      label: 'Extended Family Members Plan',
      price: 'R899/month',
      benefits: [
        'Coverage for up to 12 members',
        'Premium & luxury caskets',
        'Multiple venue options',
        'Full transportation services',
        'Complete memorial services',
        'Extended grief support',
        'Priority scheduling',
        'Dedicated family coordinator',
      ]
    },
  ];

  const handlePlanSelect = (planId: PlanType) => {
    setSelectedPlan(planId);
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        {onClose && (
          <button
            onClick={onClose}
            className={`mb-4 px-4 py-2 rounded-lg ${
              isDark ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
            }`}
          >
            ← Back
          </button>
        )}

        <div className="text-center mb-8">
          <h1 className={`text-4xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Select Your Plan
          </h1>
          <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Choose the plan that best fits your needs
          </p>
        </div>

        {/* Plan Tabs */}
        <div className={`rounded-xl shadow-sm border p-2 mb-8 ${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
        }`}>
          <div className="grid grid-cols-3 gap-2">
            {plans.map((plan) => (
              <button
                key={plan.id}
                onClick={() => handlePlanSelect(plan.id)}
                className={`px-4 py-3 rounded-lg font-medium transition-all bg-gradient-to-r from-orange-500 to-emerald-500 text-white ${
                  selectedPlan === plan.id
                    ? 'shadow-lg scale-105'
                    : 'opacity-90 hover:opacity-100 hover:shadow-lg hover:scale-105'
                }`}
              >
                {plan.label}
              </button>
            ))}
          </div>
        </div>

        {/* Show form below tabs when a plan is selected */}
        {selectedPlan ? (
          <MemberSignUpForm planType={selectedPlan} onClose={() => setSelectedPlan(null)} />
        ) : (
          <div className="space-y-4">
            <p className={`text-center text-sm mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Click on a plan above to proceed with sign-up
            </p>

            {/* Plan Benefits - Collapsible */}
            <div className="grid md:grid-cols-3 gap-4">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`rounded-xl border transition-all ${
                    isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                  }`}
                >
                  <button
                    onClick={() => setExpandedBenefit(expandedBenefit === plan.id ? null : plan.id)}
                    className="w-full p-4 flex items-center justify-between"
                  >
                    <div className="text-left">
                      <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {plan.label}
                      </h3>
                      <p className="text-emerald-600 font-bold text-sm mt-1">{plan.price}</p>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 transition-transform ${
                        expandedBenefit === plan.id ? 'rotate-180' : ''
                      } ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
                    />
                  </button>

                  {expandedBenefit === plan.id && (
                    <div className={`px-4 pb-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                      <ul className="space-y-2 mt-4">
                        {plan.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                            <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                              {benefit}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ThreePlan;
