import React from 'react';
import { Shield, Lock, Eye, UserCheck, FileText, Mail, ArrowLeft, Home } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';

interface PrivacyPolicyProps {
  isSidebarCollapsed: boolean;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ isSidebarCollapsed }) => { // eslint-disable-line @typescript-eslint/no-unused-vars
  const { isDark } = useTheme();
  const navigate = useNavigate();

  return (
    <section
      className={`py-20 transition-all duration-700 ease-in-out border-b min-h-screen ${
        isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'
      }`}
      style={{
        transition: 'margin-left 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94), width 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      }}
    >
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back to Home Button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={() => navigate('/')}
            className={`flex items-center gap-3 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
              isDark
                ? 'bg-gray-800 hover:bg-gray-700 border border-gray-600 text-gray-300 hover:text-white'
                : 'bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 hover:text-gray-900 shadow-lg'
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
            <Home className="w-5 h-5" />
            <span>Back to Home</span>
          </button>
        </div>
        <div className="text-center mb-16">
          <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full mb-4 ${
            isDark
              ? 'bg-green-900/50 text-green-400'
              : 'bg-green-100 text-green-800'
          }`}>
            Privacy Policy
          </span>
          <h1 className={`text-4xl lg:text-5xl font-bold mb-6 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Your Privacy Matters
          </h1>
          <p className={`text-xl max-w-3xl mx-auto ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            We are committed to protecting your personal information and maintaining the highest standards of privacy and confidentiality.
          </p>
        </div>

        <div className="space-y-8">
          {/* Introduction */}
          <div className={`p-8 rounded-2xl ${
            isDark ? 'bg-gray-800' : 'bg-white'
          } shadow-lg`}>
            <div className="flex items-start gap-4 mb-6">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                isDark ? 'bg-green-900/50' : 'bg-green-100'
              }`}>
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Our Commitment to Privacy
                </h2>
                <p className={`leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  UbuntuGift respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your information when you use our services or visit our website.
                </p>
              </div>
            </div>
          </div>

          {/* Information We Collect */}
          <div className={`p-8 rounded-2xl ${
            isDark ? 'bg-gray-800' : 'bg-white'
          } shadow-lg`}>
            <div className="flex items-start gap-4 mb-6">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                isDark ? 'bg-blue-900/50' : 'bg-blue-100'
              }`}>
                <Eye className="w-6 h-6 text-blue-600" />
              </div>
              <div className="w-full">
                <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Information We Collect
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Personal Information
                    </h4>
                    <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      We may collect personal information such as your name, contact details, date of birth, and other relevant information necessary for providing funeral services.
                    </p>
                  </div>
                  <div>
                    <h4 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Communication Records
                    </h4>
                    <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      Records of our communications with you, including emails, phone calls, and messages, to ensure we provide appropriate support during difficult times.
                    </p>
                  </div>
                  <div>
                    <h4 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Service-Related Information
                    </h4>
                    <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      Details about the services you request, including preferences, special requirements, and arrangements made on behalf of yourself or loved ones.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* How We Use Your Information */}
          <div className={`p-8 rounded-2xl ${
            isDark ? 'bg-gray-800' : 'bg-white'
          } shadow-lg`}>
            <div className="flex items-start gap-4 mb-6">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                isDark ? 'bg-purple-900/50' : 'bg-purple-100'
              }`}>
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
              <div className="w-full">
                <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  How We Use Your Information
                </h3>
                <ul className={`space-y-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>To provide compassionate funeral services and support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>To communicate with you about arrangements and services</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>To ensure compliance with legal and regulatory requirements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>To improve our services and better serve our community</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>To maintain accurate records for memorial and administrative purposes</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Information Sharing */}
          <div className={`p-8 rounded-2xl ${
            isDark ? 'bg-gray-800' : 'bg-white'
          } shadow-lg`}>
            <div className="flex items-start gap-4 mb-6">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                isDark ? 'bg-orange-900/50' : 'bg-orange-100'
              }`}>
                <UserCheck className="w-6 h-6 text-orange-600" />
              </div>
              <div className="w-full">
                <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Information Sharing and Disclosure
                </h3>
                <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  We understand the sensitive nature of the information we handle and are committed to maintaining strict confidentiality. Your information may only be shared in the following circumstances:
                </p>
                <ul className={`space-y-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>With your explicit consent for service provision</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>As required by law or legal proceedings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>With trusted service partners necessary for fulfilling arrangements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>To protect the rights and safety of individuals or the public</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Data Security */}
          <div className={`p-8 rounded-2xl ${
            isDark ? 'bg-gray-800' : 'bg-white'
          } shadow-lg`}>
            <div className="flex items-start gap-4 mb-6">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                isDark ? 'bg-red-900/50' : 'bg-red-100'
              }`}>
                <Lock className="w-6 h-6 text-red-600" />
              </div>
              <div className="w-full">
                <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Data Security and Protection
                </h3>
                <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  We implement comprehensive security measures to protect your personal information:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <h4 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Technical Security
                    </h4>
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      Encrypted data storage, secure communication channels, and regular security audits.
                    </p>
                  </div>
                  <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <h4 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Access Controls
                    </h4>
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      Limited access to personal information on a need-to-know basis only.
                    </p>
                  </div>
                  <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <h4 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Physical Security
                    </h4>
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      Secure facilities and controlled access to physical records and documents.
                    </p>
                  </div>
                  <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <h4 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Staff Training
                    </h4>
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      Regular training on privacy policies and data protection for all team members.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Your Rights */}
          <div className={`p-8 rounded-2xl ${
            isDark ? 'bg-gray-800' : 'bg-white'
          } shadow-lg`}>
            <div className="flex items-start gap-4 mb-6">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                isDark ? 'bg-indigo-900/50' : 'bg-indigo-100'
              }`}>
                <UserCheck className="w-6 h-6 text-indigo-600" />
              </div>
              <div className="w-full">
                <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Your Rights and Choices
                </h3>
                <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  You have several rights regarding your personal information:
                </p>
                <ul className={`space-y-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span><strong>Access:</strong> Request a copy of the personal information we hold about you</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span><strong>Correction:</strong> Request correction of inaccurate or incomplete information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span><strong>Deletion:</strong> Request deletion of your personal information under certain circumstances</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span><strong>Portability:</strong> Request transfer of your data to another service provider</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span><strong>Objection:</strong> Object to processing of your personal information</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Us */}
          <div className={`p-8 rounded-2xl ${
            isDark ? 'bg-gray-800' : 'bg-white'
          } shadow-lg`}>
            <div className="flex items-start gap-4 mb-6">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                isDark ? 'bg-teal-900/50' : 'bg-teal-100'
              }`}>
                <Mail className="w-6 h-6 text-teal-600" />
              </div>
              <div className="w-full">
                <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Contact Us About Privacy
                </h3>
                <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  If you have any questions about this Privacy Policy or wish to exercise your rights, please contact us:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Phone
                    </h4>
                    <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      0860 111 222
                    </p>
                  </div>
                  <div>
                    <h4 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Email
                    </h4>
                    <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      privacy@giftai.co.za
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <h4 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Data Protection Officer
                  </h4>
                  <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    For data protection related inquiries, please contact our Data Protection Officer at dpo@giftai.co.za
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Last Updated */}
          <div className={`text-center p-6 rounded-2xl ${
            isDark ? 'bg-gray-800' : 'bg-white'
          } shadow-lg`}>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              This Privacy Policy was last updated on October 6, 2025.
            </p>
            <p className={`text-sm mt-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              We regularly review and update our privacy practices to ensure ongoing compliance and protection of your rights.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
