import React from 'react';
import { Heart, Phone, Users, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { HeroCTAButton } from './ui/hero-cta-button';

interface HowItWorksProps {
  isSidebarCollapsed: boolean;
}

const HowItWorks: React.FC<HowItWorksProps> = ({ isSidebarCollapsed }) => {
  const { isDark } = useTheme();
  const steps = [
    {
      icon: Phone,
      title: "Connect With Us",
      description: "Reach out for a compassionate consultation. We'll listen to your needs and guide you through planning options with care and understanding.",
      color: "bg-ubuntugift-primary"
    },
    {
      icon: Heart,
      title: "Choose Your Services",
      description: "Select from our dignified packages, caskets, and memorial options. We help you find the perfect way to honor your loved one.",
      color: "bg-compassion-sage"
    },
    {
      icon: Users,
      title: "Personalized Planning",
      description: "Our team coordinates with funeral homes, cultural leaders, and your family to create a meaningful ceremony that reflects your traditions.",
      color: "bg-ubuntugift-primary"
    },
    {
      icon: Star,
      title: "Peaceful Celebration",
      description: "We ensure every detail is handled with dignity, allowing you to focus on honoring your loved one and supporting each other through grief.",
      color: "bg-compassion-sage"
    }
  ];

  return (
    <section 
      className={`relative py-20 transition-all duration-700 ease-in-out border-b scroll-mt-32 ${
        isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'
      } ${
        isSidebarCollapsed ? 'lg:ml-24' : 'lg:ml-64'
      } ${
        isSidebarCollapsed ? 'lg:w-[calc(100%-6rem)]' : 'lg:w-[calc(100%-16rem)]'
      }`}
      style={{
        transition: 'margin-left 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94), width 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      }}
    >

      
      <div className="container mx-auto px-4 relative z-10 pt-16">
        <div className="text-center mb-16">
          <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full mb-4 ${
            isDark 
              ? 'bg-ubuntugift-primary/20 text-ubuntugift-primary' 
              : 'bg-compassion-sage/10 text-ubuntugift-primary'
          }`}>
            Our Process
          </span>
          <h2 id="how-it-works" className={`text-4xl lg:text-5xl font-bold ${
            isDark ? 'text-white' : 'text-gray-900'
          } mb-1`}>
            Planning Ahead is Compassionate
          </h2>
          <p className={`text-xl text-center mb-16 max-w-3xl mx-auto ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            From consultation to celebration, we guide families through every step with dignity and care.
          </p>
        </div>

        <div className="relative py-16 md:py-20">
          {/* Background Container */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            {/* Horizontal Wavy Line - Desktop */}
            <div className="hidden md:flex w-full h-full items-center justify-center pointer-events-none">
            <svg 
              className="w-full h-12" 
              viewBox="0 0 1200 120" 
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="wavyGradientHorizontal" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#4a5568" stopOpacity="1" />
                  <stop offset="25%" stopColor="#2d3748" stopOpacity="1" />
                  <stop offset="50%" stopColor="#718096" stopOpacity="1" />
                  <stop offset="75%" stopColor="#2d3748" stopOpacity="1" />
                  <stop offset="100%" stopColor="#4a5568" stopOpacity="1" />
                </linearGradient>
                <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>
              <motion.path
                d="M0,60 C150,10 300,110 450,60 S750,10 900,60 S1200,-40 1200,60"
                fill="none"
                stroke="url(#wavyGradientHorizontal)"
                strokeWidth="3"
                strokeLinecap="round"
                filter="url(#glow)"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ 
                  pathLength: 1, 
                  opacity: [0, 1, 0.8],
                  d: [
                    "M0,60 C150,10 300,110 450,60 S750,10 900,60 S1200,-40 1200,60",
                    "M0,60 C150,110 300,10 450,60 S750,110 900,60 S1200,160 1200,60",
                    "M0,60 C150,10 300,110 450,60 S750,10 900,60 S1200,-40 1200,60"
                  ]
                }}
                transition={{ 
                  duration: 8,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  times: [0, 0.5, 1]
                }}
                viewport={{ once: false }}
              />
              </svg>
            </div>

            {/* Vertical Wavy Line - Mobile */}
            <div className="md:hidden w-12 h-full mx-auto flex items-center justify-center pointer-events-none">
            <svg 
              className="h-full w-12" 
              viewBox="0 0 120 800" 
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="wavyGradientVertical" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#4a5568" stopOpacity="1" />
                  <stop offset="25%" stopColor="#2d3748" stopOpacity="1" />
                  <stop offset="50%" stopColor="#718096" stopOpacity="1" />
                  <stop offset="75%" stopColor="#2d3748" stopOpacity="1" />
                  <stop offset="100%" stopColor="#4a5568" stopOpacity="1" />
                </linearGradient>
                <filter id="glowVertical" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>
              <motion.path
                d="M60,0 C10,150 110,300 60,450 S10,650 60,800"
                fill="none"
                stroke="url(#wavyGradientVertical)"
                strokeWidth="3"
                strokeLinecap="round"
                filter="url(#glowVertical)"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ 
                  pathLength: 1, 
                  opacity: [0, 1, 0.8],
                  d: [
                    "M60,0 C10,150 110,300 60,450 S10,650 60,800",
                    "M60,0 C110,150 10,300 60,450 S110,650 60,800",
                    "M60,0 C10,150 110,300 60,450 S10,650 60,800"
                  ]
                }}
                transition={{ 
                  duration: 8,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  times: [0, 0.5, 1]
                }}
                viewport={{ once: false }}
              />
              </svg>
            </div>
          </div>

          {/* Steps in a single row */}
          <div className="relative z-10 container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-20">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  className={`p-6 rounded-xl backdrop-blur-sm ${
                    isDark 
                      ? 'bg-gray-800/50 border border-gray-700/20 hover:border-gray-600/40' 
                      : 'bg-white/70 border border-gray-100/80 hover:border-gray-200/90'
                  } transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1,
                    ease: "easeOut"
                  }}
                  viewport={{ once: true, margin: "-50px" }}
                >
                  <div className="flex flex-col items-center text-center">
                    {/* Step Number */}
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold mb-4 ${
                      isDark ? 'bg-ubuntugift-primary text-ubuntugift-light' : 'bg-ubuntugift-light text-ubuntugift-primary'
                    }`}>
                      {index + 1}
                    </div>
                    
                    {/* Icon */}
                    <div className="mb-4">
                      <div className={`${step.color} w-14 h-14 rounded-full flex items-center justify-center mx-auto shadow-lg`}>
                        <step.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    
                    {/* Content */}
                    <h3 className={`text-lg font-semibold mb-2 ${
                      isDark ? '!text-white' : '!text-gray-900'
                    }`}>
                      {step.title}
                    </h3>
                    
                    <p className={`text-sm ${
                      isDark ? '!text-gray-300' : '!text-gray-600'
                    }`}>
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <motion.div 
          className="text-center pt-16 pb-8 px-4 -mt-5"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className={`rounded-2xl p-8 shadow-lg border group ${
              isDark 
                ? 'bg-gray-800 border-gray-700 hover:border-gray-600' 
                : 'bg-white border-gray-100 hover:border-gray-200'
            }`}
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 25px 50px rgba(0,0,0,0.15)"
            }}
            transition={{ 
              type: "spring",
              stiffness: 300,
              damping: 30
            }}
          >
            <motion.h3 
              className={`text-3xl font-bold mb-4 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              viewport={{ once: true }}
            >
              Ready to Honor Your Loved One?
            </motion.h3>
            <motion.p 
              className={`text-xl mb-8 ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              viewport={{ once: true }}
            >
              Join families across Limpopo who trust Gift Ai for compassionate funeral services.
            </motion.p>
            <motion.div 
              className="flex flex-row flex-wrap items-center justify-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <HeroCTAButton 
                  className="font-manrope font-semibold text-sm sm:text-base px-4 py-2" 
                  defaultText="Apply Now"
                  sentText="Applied"
                  onClick={() => {
                    // Scroll to Services section, click Gift AI tab, then click Quick Sign-Up
                    const servicesSection = document.getElementById('tools-tabs');
                    if (servicesSection) {
                      servicesSection.scrollIntoView({ behavior: 'smooth' });
                      setTimeout(() => {
                        // First click the Gift AI tab
                        const giftAiTab = document.querySelector('[data-tab-id="ai"]') as HTMLElement;
                        if (giftAiTab) {
                          giftAiTab.click();
                          // Then click Quick Sign-Up button
                          setTimeout(() => {
                            const quickSignUpBtn = document.querySelector('button:has-text("Quick Sign-Up"), button[class*="Quick"]') as HTMLElement;
                            if (quickSignUpBtn) {
                              quickSignUpBtn.click();
                            }
                          }, 300);
                        }
                      }, 800);
                    }
                  }}
                />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <HeroCTAButton 
                  className="font-manrope font-semibold text-sm sm:text-base px-4 py-2 hero-cta-secondary" 
                  defaultText="Call"
                  sentText="Opened"
                  onClick={() => {
                    // Open Call popup via global event handled in Contact.tsx
                    window.dispatchEvent(new Event('openCallModal'));
                  }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>


    </section>
  );
};

export default HowItWorks;