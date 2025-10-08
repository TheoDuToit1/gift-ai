import React from 'react';
import { Mail, Phone } from 'lucide-react';
import BB8Toggle from './BB8Toggle';
import { useTheme } from '../contexts/ThemeContext';

interface FooterProps {
  id?: string;
  isSidebarCollapsed?: boolean;
}

const Footer: React.FC<FooterProps> = ({ id, isSidebarCollapsed }) => {
  const { isDark } = useTheme();
  
  return (
    <footer 
      id={id} 
      className={`w-full transition-all duration-700 ease-in-out ${
        isDark ? 'bg-gray-900' : 'bg-white'
      }`}
      style={{
        paddingLeft: isSidebarCollapsed !== undefined ? (isSidebarCollapsed ? '6rem' : '16rem') : '0',
        transition: 'padding 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94), background-color 0.3s ease'
      }}
    >
      <div className="mx-auto px-4 pt-16 pb-8 w-full">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            {/* Heading area without logo (logo moved below FSP) */}
            <div className="flex items-center space-x-3 mb-6"></div>
            <p className={`text-xl mb-6 -mt-6 max-w-md ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Compassionate funeral services for Limpopo families.
            </p>
            <p className={`leading-relaxed mb-6 ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`}>
              We honor every life with dignity and respect, providing comprehensive funeral services across Limpopo province.
              Our experienced team supports families through every step of their journey with compassion and cultural sensitivity.
            </p>
            
            {/* Contact Information */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-ubuntugift-primary" />
                <a href="mailto:admin@giftai.co.za" className={isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'}>admin@giftai.co.za</a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-ubuntugift-primary" />
                <a href="mailto:support@giftai.co.za" className={isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'}>support@giftai.co.za</a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-ubuntugift-primary" />
                <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>0860 111 222</span>
              </div>
              {/* Logo moved here, ensure it's clearly lower to align with theme toggle */}
              <div className="pt-[70px]">
                <div className="relative w-64 h-[111px] flex items-center justify-center">
                  <div className={`absolute inset-0 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ${isDark ? 'bg-gray-900 border-2 border-gray-700' : 'bg-white border-2 border-ubuntugift-primary'}`}>
                    <div className="absolute inset-0 flex items-center justify-center p-1.5">
                      <img 
                        src="/assets/images/Logo.jpg" 
                        alt="Day 1 Health Logo" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className={`text-lg font-semibold mb-6 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#plans" className={`transition-colors ${
                  isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                }`}>
                  Our Plans
                </a>
              </li>
              <li>
                <a href="#how-it-works" className={`transition-colors ${
                  isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                }`}>
                  How It Works
                </a>
              </li>
              <li>
                <a href="#why-choose" className={`transition-colors ${
                  isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                }`}>
                  Why Choose Us
                </a>
              </li>
              <li>
                <a href="#faqs" className={`transition-colors ${
                  isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                }`}>
                  FAQs
                </a>
              </li>
              <li>
                <a href="#contact" className={`transition-colors ${
                  isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                }`}>
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className={`text-lg font-semibold mb-6 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>Get in Touch</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-ubuntugift-primary" />
                <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>0860 111 222</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-ubuntugift-primary" />
                <a href="mailto:admin@giftai.co.za" className={isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}>admin@giftai.co.za</a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-ubuntugift-primary" />
                <a href="mailto:sales@giftai.co.za" className={isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}>sales@giftai.co.za</a>
              </div>
            </div>

            {/* Dark Theme Toggle */}
            <div className="mt-6">
              <h4 className="font-semibold mb-3 text-sm">Theme</h4>
              <div className="flex items-center justify-center">
                <BB8Toggle />
              </div>
              <p className="text-xs text-gray-400 text-center mt-2">Toggle between light and dark themes</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`border-t mt-12 pt-8 ${
          isDark ? 'border-gray-800' : 'border-gray-200'
        }`}>
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-wrap gap-6 text-sm">
              <a href="/privacy-policy" className={`pl-2 font-semibold transition-colors ${
                isDark 
                  ? 'text-gray-300 hover:text-white bg-ubuntugift-secondary/30 border border-ubuntugift-secondary rounded-lg px-3 py-1.5 text-base' 
                  : 'text-gray-800 hover:text-gray-900 bg-ubuntugift-light border border-ubuntugift-secondary rounded-lg px-3 py-1.5 text-base'
              }`}>
                Privacy Policy
              </a>
            </div>
            
            <div className={`text-sm ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              &copy; 2025 Gift Ai. All rights reserved.
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;