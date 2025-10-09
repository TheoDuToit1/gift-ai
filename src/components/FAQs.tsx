import React, { useMemo, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

interface FAQsProps {
  isSidebarCollapsed: boolean;
}

const FAQs: React.FC<FAQsProps> = ({ isSidebarCollapsed }) => {
  // Support opening multiple and a global open/close all toggle
  const [expandedAll, setExpandedAll] = useState(false);
  const [openSet, setOpenSet] = useState<Set<number>>(new Set());
  const [showFaqs, setShowFaqs] = useState(false);
  const { isDark } = useTheme();

  // Selected 8 most relevant FAQs from the list provided by the user
  const faqs = [
    {
      question: "What services does Grace Ai provide?",
      answer: "We offer comprehensive funeral services including traditional ceremonies, modern memorials, casket selection, transportation, and personalized planning to honor your loved one according to your cultural traditions."
    },
    {
      question: "How much does a basic funeral cost?",
      answer: "Our Basic Dignity Package starts at R8,500 and includes essential services like casket, transportation, and ceremony coordination. Premium packages range from R18,500 to R35,000 depending on your needs."
    },
    {
      question: "Do you serve all cultural and religious traditions?",
      answer: "Yes, we honor all cultural and religious traditions across Limpopo province. Our team includes cultural specialists who understand and respect diverse customs, from traditional African ceremonies to various religious observances."
    },
    {
      question: "Can I pre-plan my funeral arrangements?",
      answer: "Absolutely. Pre-planning gives you peace of mind and allows you to make decisions according to your wishes. We offer consultation services to help you plan ahead and relieve your family of this burden during difficult times."
    },
    {
      question: "What if I need services outside regular hours?",
      answer: "Our compassionate team is available 24/7 for emergencies. We understand that loss can happen at any time and we're here to support families whenever they need us, including weekends and holidays."
    },
    {
      question: "Do you offer payment plans or financial assistance?",
      answer: "Yes, we offer flexible payment options and can connect families with available community support resources. Our transparent pricing ensures no hidden fees, and we're committed to making dignified services accessible."
    },
    {
      question: "Can I customize the ceremony according to our traditions?",
      answer: "Absolutely. We work closely with families to create personalized ceremonies that reflect your loved one's life, values, and cultural heritage. From music selections to traditional rituals, we honor your unique wishes."
    },
    {
      question: "What support do you provide to grieving families?",
      answer: "Beyond funeral services, we offer compassionate guidance, connect families with grief support resources, and ensure every detail is handled with dignity. Our team provides emotional support throughout the planning and ceremony process."
    }
  ];

  const allOpen = useMemo(() => expandedAll || openSet.size === faqs.length, [expandedAll, openSet, faqs.length]);

  const toggleAll = () => {
    if (allOpen) {
      setExpandedAll(false);
      setOpenSet(new Set());
    } else {
      setExpandedAll(true);
      setOpenSet(new Set(faqs.map((_, i) => i)));
    }
  };

  return (
    <section 
      className={`py-20 transition-all duration-700 ease-in-out border-b scroll-mt-32 ${
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
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className={`inline-block mt-2.5 px-4 py-1.5 text-base font-medium rounded-full mb-4 ${
            isDark 
              ? 'bg-ubuntugift-secondary/50 text-ubuntugift-light' 
              : 'bg-ubuntugift-light text-ubuntugift-primary'
          }`}>
            Common Questions
          </span>
          <h2 id="faqs" className={`text-4xl lg:text-5xl font-bold mb-6 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center gap-3 mb-8 w-full mt-[26px]">
            <button
              onClick={() => setShowFaqs(v => !v)}
              className={`px-4 py-2 rounded-lg border text-sm font-semibold transition-colors flex items-center gap-2 ${
                isDark
                  ? 'bg-ubuntugift-secondary/30 text-ubuntugift-light hover:bg-ubuntugift-secondary/50 border-ubuntugift-secondary'
                  : 'bg-ubuntugift-light text-ubuntugift-primary hover:bg-ubuntugift-light/80 border-ubuntugift-primary'
              }`}
            >
              {showFaqs ? 'Hide FAQs' : 'Show Frequently Asked Questions'}
              <ChevronDown className={`w-6 h-6 flex-shrink-0 transition-transform duration-300 ${
                showFaqs ? 'rotate-180' : ''
              } ${
                isDark ? 'text-gray-400' : 'text-gray-400'
              }`} />
            </button>
            {showFaqs && (
              <button
                onClick={toggleAll}
                className={`px-4 py-2 rounded-lg border text-sm font-semibold transition-colors ${
                  isDark
                    ? 'bg-gray-800 text-gray-200 hover:bg-gray-700 border-gray-700'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200 border-gray-300'
                }`}
              >
                {allOpen ? 'Collapse all' : 'Expand all'}
              </button>
            )}
          </div>
          {showFaqs && faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`mb-4 rounded-2xl overflow-hidden shadow-sm transition-all duration-300 ${
                isDark ? 'bg-gray-800' : 'bg-gray-50'
              }`}
              whileHover={{ 
                scale: 1.02,
                boxShadow: isDark 
                  ? '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.1)'
                  : '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
              }}
              
            >
              <motion.button
                className={`w-full px-8 py-6 text-left flex items-center justify-between transition-colors duration-200 ${
                  isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                }`}
                onClick={() => {
                  // If previously in expand-all mode, switch to manual and toggle this item
                  setExpandedAll(false);
                  setOpenSet(prev => {
                    const next = new Set(prev);
                    if (next.has(index)) next.delete(index); else next.add(index);
                    return next;
                  });
                }}
                whileTap={{ scale: 0.98 }}
              >
                <h3 className={`text-lg font-semibold pr-4 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>{faq.question}</h3>
                <motion.div
                  animate={{ rotate: (expandedAll || openSet.has(index)) ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <ChevronDown className={`w-6 h-6 flex-shrink-0 ${
                    isDark ? 'text-gray-400' : 'text-gray-400'
                  }`} />
                </motion.div>
              </motion.button>
              
              <AnimatePresence>
                {(expandedAll || openSet.has(index)) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ 
                      duration: 0.4,
                      ease: [0.04, 0.62, 0.23, 0.98]
                    }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-6">
                      <motion.div 
                        className={`w-full h-px mb-6 ${
                          isDark ? 'bg-gray-600' : 'bg-gray-200'
                        }`}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      ></motion.div>
                      <motion.p 
                        className={`leading-relaxed ${
                          isDark ? 'text-gray-300' : 'text-gray-600'
                        }`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                      >
                        {faq.answer}
                      </motion.p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 text-center">
          <div className={`rounded-2xl p-8 max-w-2xl mx-auto ${
            isDark ? 'bg-ubuntugift-secondary/30' : 'bg-ubuntugift-light'
          }`}>
            <h3 className={`text-2xl font-bold mb-4 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Still Have Questions?
            </h3>
            <p className={`mb-6 ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Our friendly consultants are available to help you understand your options and find the right plan for your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  window.dispatchEvent(new Event('openCallModal'));
                }}
                aria-label="Call Day1Health"
                className="bg-ubuntugift-primary text-ubuntugift-light px-6 py-3 rounded-xl font-semibold hover:bg-ubuntugift-secondary transition-colors text-center"
              >
                Call 0860 111 222
              </button>
              <button
                onClick={() => {
                  // Scroll to contact section and open Prospective modal
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  // Support both immediate event and delayed open via sessionStorage (in case of navigation)
                  try { sessionStorage.setItem('openProspective', '1'); } catch {}
                  window.dispatchEvent(new Event('openProspective'));
                }}
                className="border-2 border-ubuntugift-primary text-ubuntugift-primary px-6 py-3 rounded-xl font-semibold hover:bg-ubuntugift-primary hover:text-ubuntugift-light transition-colors"
              >
                Email Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQs;