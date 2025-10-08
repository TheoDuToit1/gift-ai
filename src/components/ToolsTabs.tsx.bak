import React, { useState, useEffect } from 'react';
import { Shield, CreditCard, Heart, Users, Check, Phone, Mail, ArrowRight, Zap, PenTool } from 'lucide-react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { AnimatedPaymentButton } from './ui/animated-payment-button';
import ChatBot from './ChatBot';
import FastClaim from './FastClaim';
import ThreePlan from './ThreePlan';
import { useNavigate } from 'react-router-dom';
import { ButtonColorful } from './ui/button-colorful';

// Enhanced Animated background carousel for intro cards
const IntroCarousel: React.FC<{
  images: string[];
  intervalMs?: number;
  overlayClassName?: string;
}> = ({ images, intervalMs = 4200, overlayClassName = 'bg-black/40' }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length === 0) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [images, intervalMs]);

  const len = images.length || 1;
  const current = images[index] ?? images[0];
  const prev = images[(index - 1 + len) % len] ?? images[0];
  const dir = index % 2 === 0 ? 1 : -1; // alternate direction for Ken Burns

  return (
    <div className="pointer-events-none absolute inset-0 rounded-2xl overflow-hidden z-0">
      {/* Backdrop: previous image, static underlay */}
      <motion.img
        key={`prev-${prev}-${index}`}
        src={prev}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        initial={false}
        animate={{
          scale: 1.08,
          x: `${-2 * dir}%`,
          filter: 'saturate(1.0) contrast(1.0) brightness(0.96)'
        }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Morph-reveal: current image revealed via blob-like keyframed clip-path (top-left biased) */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={`reveal-${current}-${index}`}
          className="absolute inset-0"
          initial={{
            clipPath:
              'polygon(18% 10%, 38% 12%, 52% 24%, 44% 40%, 28% 42%, 16% 34%, 12% 22%, 14% 14%)'
          }}
          animate={{
            clipPath: [
              'polygon(18% 10%, 38% 12%, 52% 24%, 44% 40%, 28% 42%, 16% 34%, 12% 22%, 14% 14%)',
              'polygon(0% 0%, 50% 8%, 70% 30%, 60% 60%, 35% 65%, 12% 55%, 6% 30%, 8% 10%)',
              'polygon(-30% -30%, 130% -30%, 130% 130%, -30% 130%, -30% -30%, 130% -30%, 130% 130%, -30% 130%)'
            ]
          }}
          exit={{
            clipPath:
              'polygon(-30% -30%, 130% -30%, 130% 130%, -30% 130%, -30% -30%, 130% -30%, 130% 130%, -30% 130%)'
          }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.img
            src={current}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ scale: 1.06, x: `${6 * dir}%`, opacity: 1, filter: 'blur(6px) saturate(1.08) contrast(1.05) brightness(0.98)' }}
            animate={{
              scale: 1.14,
              x: '0%',
              filter: 'blur(0px) saturate(1.08) contrast(1.05) brightness(0.98)'
            }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Vignettes and edge gradients for text contrast */}
      <div className={`${overlayClassName} absolute inset-0`} />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-black/25" />
    </div>
  );
};

interface ToolsTabsProps {
  isSidebarCollapsed: boolean;
}

const ToolsTabs: React.FC<ToolsTabsProps> = ({ isSidebarCollapsed }) => {
  const [activeTab, setActiveTab] = useState('daytoday');
  const { isDark } = useTheme();
  const navigate = useNavigate();
  // Track which AI view to show: 'intro' | 'fastclaim' | 'chatbot' | 'signup'
  const [aiView, setAiView] = useState<'intro' | 'fastclaim' | 'chatbot' | 'signup'>('intro');
  // Track expanded state for Day-to-Day pricing cards
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    intro: false,
    family: false,
    basic: false,
    student: false,
  });
  // Reveal pricing cards by default (no need to open intro)
  const [showDayToDayCards, setShowDayToDayCards] = useState(true);
  const toggleExpanded = (key: 'family' | 'basic' | 'student') =>
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  const toggleIntro = () =>
    setExpanded((prev) => {
      const nextIntro = !prev.intro;
      if (nextIntro) setShowDayToDayCards(true);
      return { ...prev, intro: nextIntro };
    });

  const [familyChildren, setFamilyChildren] = useState(1);


  const tabs = [
    { 
      id: 'daytoday', 
      label: 'Packages', 
      icon: Heart,
      bgColor: 'bg-orange-500',
      iconColor: 'text-ubuntugift-primary',
      hoverBg: 'hover:bg-ubuntugift-light/80'
    },
    { 
      id: 'hospital', 
      label: 'Caskets', 
      icon: CreditCard,
      bgColor: 'bg-emerald-500',
      iconColor: 'text-ubuntugift-primary',
      hoverBg: 'hover:bg-ubuntugift-light/80'
    },
    { 
      id: 'comprehensive', 
      label: 'Extras', 
      icon: Shield,
      bgColor: 'bg-orange-400',
      iconColor: 'text-ubuntugift-primary',
      hoverBg: 'hover:bg-ubuntugift-light/80'
    },
    { 
      id: 'ai', 
      label: 'Gift Ai', 
      icon: Users,
      bgColor: 'bg-emerald-600',
      iconColor: 'text-ubuntugift-primary',
      hoverBg: 'hover:bg-ubuntugift-light/80'
    }
  ];

  const handleTabClick = (tabId: string) => {
    // When changing tabs, ensure any open pricing cards are closed and reset AI view
    setActiveTab(tabId);
    setExpanded({ intro: false, family: false, basic: false, student: false });
    setAiView('intro'); // Reset AI view when switching tabs
  };

  // Defensive: if activeTab changes from anywhere, collapse any open cards
  useEffect(() => {
    setExpanded({ intro: false, family: false, basic: false, student: false });
    // Keep cards revealed for quick access; adjust per-tab if needed later
    setShowDayToDayCards(true);
  }, [activeTab]);

  // On mount, do not restore any saved tab; always default to Day-To-Day
  useEffect(() => {
    setActiveTab('daytoday');
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'daytoday':
        return (
          <LayoutGroup>
            <motion.div className={`w-full max-w-[85vw] ${isSidebarCollapsed ? 'md:max-w-[74rem]' : 'md:max-w-[min(74rem,calc(100vw-14rem-0.5rem))]'} mx-auto px-4 md:px-2`}>
              <motion.div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-5 items-start overflow-visible">
                {/* Introduction Column */}
                <motion.div 
                  className={`relative rounded-2xl shadow-lg p-5 border-2 transition-all overflow-visible transform-gpu ring-1 ring-emerald-400/20 shadow-[0_0_40px_rgba(16,185,129,0.15)] ${
                    isDark 
                      ? 'bg-gray-800 border-emerald-700 hover:border-emerald-500' 
                      : 'bg-white border-emerald-200 hover:border-emerald-400'
                  } ${expanded.intro ? 'min-h-[420px]' : 'min-h-[140px]'} `}
                  layout="position"
                  transition={{ 
                    duration: 0.4,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  viewport={{ once: true, margin: "-50px" }}
                  whileHover={{}}
                >
                  <IntroCarousel
                    images={[
                      '/assets/images/single (1).jpg',
                      '/assets/images/couple (1).jpg',
                      '/assets/images/family (1).jpg',
                    ]}
                  />
                  <div
                    className="relative z-10 flex items-start justify-between gap-3 text-white cursor-pointer select-none"
                    onClick={toggleIntro}
                    role="button"
                    aria-label={expanded.intro ? 'Collapse introduction' : 'Expand introduction'}
                  >
                    <div>
                      <motion.span
                        className={`inline-flex items-center rounded-md px-2 py-0.5 border backdrop-blur-sm mb-2 bg-emerald-500/10 border-emerald-200/30 text-white`}
                        animate={{ scale: [1, 1.05, 1], boxShadow: [
                          '0 0 0px rgba(16,185,129,0.0)',
                          '0 0 18px rgba(16,185,129,0.35)',
                          '0 0 0px rgba(16,185,129,0.0)'
                        ] }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        Start here
                      </motion.span>
                      <h3 className={`text-xl font-bold text-white`}>
                        Choose a Burial Plan that fits your life
                      </h3>
                    </div>
                    <motion.button
                      type="button"
                      aria-label={expanded.intro ? 'Collapse introduction' : 'Expand introduction'}
                      className={`inline-flex items-center justify-center w-8 h-8 rounded-lg border text-sm text-white border-white/30 bg-white/10 hover:bg-white/15`}
                      onClick={(e) => { e.stopPropagation(); toggleIntro(); }}
                      animate={
                        expanded.intro
                          ? { y: 0, rotate: 180 }
                          : { y: [0, -3, 0], rotate: 0 }
                      }
                      transition={
                        expanded.intro
                          ? { duration: 0.2 }
                          : { y: { duration: 1.2, repeat: Infinity, ease: 'easeInOut' }, rotate: { duration: 0.2 } }
                      }
                    >
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                        <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z" />
                      </svg>
                    </motion.button>
                  </div>
                  {!expanded.intro && (
                    <div className="relative z-10 mt-3 flex flex-wrap items-center gap-2 text-white">
                      <button
                        type="button"
                        className="inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold border backdrop-blur-sm bg-white/10 border-white/15 hover:bg-white/15 transition-all"
                        onClick={(e) => { e.stopPropagation(); toggleIntro(); setShowDayToDayCards(true); }}
                      >
                        Open introduction
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center rounded-full px-3 py-1.5 text-[11px] font-semibold border backdrop-blur-sm bg-white/10 border-white/15 hover:bg-white/15 transition-all"
                        onClick={(e) => { e.stopPropagation(); setShowDayToDayCards(true); setExpanded(prev => ({ ...prev, student: true, family: false, basic: false })); }}
                      >
                        Single
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center rounded-full px-3 py-1.5 text-[11px] font-semibold border backdrop-blur-sm bg-white/10 border-white/15 hover:bg-white/15 transition-all"
                        onClick={(e) => { e.stopPropagation(); setShowDayToDayCards(true); setExpanded(prev => ({ ...prev, student: false, family: false, basic: true })); }}
                      >
                        Couples
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center rounded-full px-3 py-1.5 text-[11px] font-semibold border backdrop-blur-sm bg-white/10 border-white/15 hover:bg-white/15 transition-all"
                        onClick={(e) => { e.stopPropagation(); setShowDayToDayCards(true); setExpanded(prev => ({ ...prev, student: false, family: true, basic: false })); }}
                      >
                        Family
                      </button>
                    </div>
                  )}
                  <motion.div
                    key="intro-content"
                    initial={false}
                    animate={{ height: expanded.intro ? 'auto' : 0, opacity: expanded.intro ? 1 : 0 }}
                    transition={{ duration: 0.22, ease: [0.4, 0.0, 0.2, 1] }}
                    style={{ overflow: 'hidden' }}
                    aria-hidden={!expanded.intro}
                    className="relative z-10 text-white"
                  >
                    <p className={`mt-2 text-white`}>
                      Compassionate funeral services for your loved ones. Choose from our burial plans
                      to ensure dignity and peace during difficult times.
                    </p>
                    <ul className="space-y-3 mt-4">
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-emerald-400 mr-2 mt-0.5" />
                        <span className={`text-white`}>Full funeral coverage</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-emerald-400 mr-2 mt-0.5" />
                        <span className={`text-white`}>Casket selection & venue arrangements</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-emerald-400 mr-2 mt-0.5" />
                        <span className={`text-white`}>Transportation & documentation</span>
                      </li>
                    </ul>
                  </motion.div>
                </motion.div>

                {/* Single Member Plan - CARD 1 */}
                <motion.div 
                  className={`order-1 relative z-30 group rounded-2xl shadow-lg p-5 border-2 transition-all overflow-visible transform-gpu ${
                    isDark 
                      ? 'bg-gray-800 border-green-700 hover:border-green-500' 
                      : 'bg-white border-green-200 hover:border-green-400'
                  } min-h-[140px] `}
                  layout="position"
                  initial={false}
                  animate={showDayToDayCards ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.45, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true, margin: "-50px" }}
                  whileHover={{}}
                  style={{ pointerEvents: showDayToDayCards ? 'auto' : 'none' }}
                >
                  {expanded.student && (
                    <motion.div
                      key="student-bg"
                      aria-hidden
                      className="pointer-events-none absolute inset-0 rounded-2xl overflow-hidden z-0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.4, 0.0, 0.2, 1] }}
                    >
                      <img
                        src="/assets/images/single (1).jpg"
                        alt=""
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className={`${isDark ? 'bg-black/50' : 'bg-black/35'} absolute inset-0`} />
                    </motion.div>
                  )}
                  <div className="relative z-10 mb-[17px]">
                    <AnimatePresence mode="wait" initial={false}>
                      {expanded.student ? (
                        <motion.div
                          key="hdr-expanded-student"
                          className={`relative z-20 flex flex-col items-start gap-1`}
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 6 }}
                          transition={{ duration: 0.18 }}
                        >
                          <div className="flex flex-col items-start gap-2">
                            <motion.span
                              className={`inline-flex items-center rounded-md px-2 py-0.5 border backdrop-blur-sm ${isDark ? 'bg-emerald-500/10 border-emerald-200/20' : 'bg-emerald-500/10 border-emerald-500/20'} text-lg font-bold text-emerald-400`}
                              initial={{ opacity: 0, x: -6 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -6 }}
                              transition={{ duration: 0.18 }}
                            >
                              Single Member Plan
                            </motion.span>
                            <motion.div
                              layoutId="daytoday-single-price"
                              className={`inline-flex items-baseline gap-2 rounded-xl border backdrop-blur-sm px-3 py-1 w-fit whitespace-nowrap self-start ${isDark ? 'bg-emerald-500/10 border-emerald-200/20' : 'bg-emerald-500/10 border-emerald-500/20'}`}
                              transition={{ type: 'tween', duration: 0.22, ease: [0.4, 0.0, 0.2, 1] }}
                            >
                              <span className="text-2xl font-bold text-emerald-400">R385</span>
                              <span className={`text-white text-sm font-normal`}>/month</span>
                            </motion.div>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.h3
                          key="hdr-collapsed-student"
                          className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 6 }}
                          transition={{ duration: 0.18 }}
                        >
                          Single Member Plan
                        </motion.h3>
                      )}
                    </AnimatePresence>
                  </div>
                  {expanded.student && null}
                  <motion.div key="student-content"
                    initial={false}
                    animate={{ height: expanded.student ? 'auto' : 0, opacity: expanded.student ? 1 : 0 }}
                    transition={{ duration: 0.22, ease: [0.4, 0.0, 0.2, 1] }}
                    style={{ overflow: 'hidden' }}
                    aria-hidden={!expanded.student}
                    className="relative z-10"
                  >
                    <div className={`rounded-xl border ${isDark ? 'bg-emerald-500/10 border-emerald-200/20' : 'bg-emerald-500/10 border-emerald-500/20'} backdrop-blur-sm p-4 mb-6`}>
                      <ul className="space-y-3">
                        <li className="flex items-center"><Check className="w-5 h-5 text-emerald-400 mr-2" /> <span className={`text-white`}>Full funeral coverage</span></li>
                        <li className="flex items-center"><Check className="w-5 h-5 text-emerald-400 mr-2" /> <span className={`text-white`}>Casket selection</span></li>
                        <li className="flex items-center"><Check className="w-5 h-5 text-emerald-400 mr-2" /> <span className={`text-white`}>Venue arrangements</span></li>
                        <li className="flex items-center"><Check className="w-5 h-5 text-emerald-400 mr-2" /> <span className={`text-white`}>Transportation</span></li>
                        <li className="flex items-center"><Check className="w-5 h-5 text-emerald-400 mr-2" /> <span className={`text-white`}>Documentation assistance</span></li>
                      </ul>
                    </div>
                  </motion.div>
                  <div className={(expanded.student ? 'mt-[-3px] ' : 'mt-8 ') + 'relative z-10'}>
                    <div className="relative">
                      <AnimatedPaymentButton 
                        text="Choose Plan"
                        className="bronze"
                        hoverMessages={[
                          'Full funeral coverage',
                          'Casket selection',
                          'Venue arrangements',
                          'Transportation',
                        ]}
                        hoverIcons={['wallet','card','payment','check']}
                        showArrow={false}
                        expanded={expanded.student}
                        onToggleExpand={() => toggleExpanded('student')}
                        to="/plans/day-to-day?variant=single"
                      />
                    </div>
                    <button
                      type="button"
                      aria-label={expanded.student ? 'Collapse Single Member details' : 'Expand Single Member details'}
                      className={`absolute left-1/2 -translate-x-1/2 bottom-[-36px] inline-flex items-center justify-center w-8 h-8 rounded-full border backdrop-blur-sm z-[999]
                        transition-transform duration-200 ease-out shadow-md hover:shadow-lg hover:scale-105 focus:outline-none
                        ${isDark 
                          ? 'bg-gray-900/60 border-white/15 text-white ring-1 ring-white/10'
                          : 'bg-white/80 border-gray-200 text-gray-800 ring-1 ring-black/5'}
                        ${expanded.student ? 'rotate-180' : ''}`}
                      onClick={() => toggleExpanded('student')}
                    >
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                        <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z" />
                      </svg>
                    </button>
                  </div>
                  {!expanded.student && (
                    <div
                      className={`pointer-events-none absolute top-3 right-3 rounded-xl px-3 py-2 shadow-sm border text-right opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-10 backdrop-blur-sm ${
                        isDark
                          ? 'bg-white/10 border-white/15'
                          : 'bg-white/30 border-white/40'
                      }`}
                    >
                      <div className={`text-[10px] uppercase tracking-wider ${isDark ? 'text-green-300' : 'text-green-700'}`}>
                        {tabs.find(t => t.id === activeTab)?.label}
                      </div>
                      <motion.div layoutId="daytoday-single-price" className={`leading-none text-green-600`} transition={{ type: 'tween', duration: 0.22, ease: [0.4, 0.0, 0.2, 1] }}>
                        <span className="text-sm align-top mr-1">R</span>
                        <span className="text-2xl font-bold">385</span>
                        <span className={`${isDark ? 'text-gray-300' : 'text-gray-600'} text-[10px] ml-1`}>/mo</span>
                      </motion.div>
                    </div>
                  )}
                </motion.div>

                {/* Couples Plan - CARD 2 */}
                <motion.div 
                  className={`order-2 relative group rounded-2xl shadow-lg p-5 border-2 transition-all overflow-visible transform-gpu ${
                    isDark 
                      ? 'bg-gray-800 border-green-700 hover:border-green-500' 
                      : 'bg-white border-green-200 hover:border-green-400'
                  } min-h-[140px] `}
                  layout="position"
                  initial={false}
                  animate={showDayToDayCards ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.45, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true, margin: "-50px" }}
                  whileHover={{}}
                  style={{ pointerEvents: showDayToDayCards ? 'auto' : 'none' }}
                >
                  {expanded.basic && (
                    <motion.div
                      key="couple-bg"
                      aria-hidden
                      className="pointer-events-none absolute inset-0 rounded-2xl overflow-hidden z-0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.4, 0.0, 0.2, 1] }}
                    >
                      <img
                        src="/assets/images/couple (1).jpg"
                        alt=""
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className={`${isDark ? 'bg-black/50' : 'bg-black/35'} absolute inset-0`} />
                    </motion.div>
                  )}
                  <div className="mb-[17px]">
                    <AnimatePresence mode="wait" initial={false}>
                      {expanded.basic ? (
                        <motion.div
                          key="hdr-expanded-couple"
                          className={`relative z-20 flex flex-col gap-2`}
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 6 }}
                          transition={{ duration: 0.18 }}
                        >
                          <motion.span
                            className={`inline-flex w-fit items-center rounded-md px-2 py-0.5 border backdrop-blur-sm ${isDark ? 'bg-emerald-500/10 border-emerald-200/20' : 'bg-emerald-500/10 border-emerald-500/20'} text-base font-semibold text-emerald-300`}
                            initial={{ opacity: 0, x: -6 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -6 }}
                            transition={{ duration: 0.18 }}
                          >
                            Family Members Plan
                          </motion.span>
                          <motion.div
                            layoutId="daytoday-couple-price"
                            className={`inline-flex items-baseline gap-2 rounded-xl border backdrop-blur-sm px-3 py-1 w-fit whitespace-nowrap self-start ${isDark ? 'bg-emerald-500/10 border-emerald-200/20' : 'bg-emerald-500/10 border-emerald-500/20'}`}
                            transition={{ type: 'tween', duration: 0.22, ease: [0.4, 0.0, 0.2, 1] }}
                          >
                            <span className="text-2xl font-bold text-emerald-400">R674</span>
                            <span className={`text-white text-sm font-normal`}>/month</span>
                          </motion.div>
                        </motion.div>
                      ) : (
                        <motion.h3
                          key="hdr-collapsed-couple"
                          className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 6 }}
                          transition={{ duration: 0.18 }}
                        >
                          Family Burial Plan
                        </motion.h3>
                      )}
                    </AnimatePresence>
                  </div>
                  {expanded.basic && null}
                  <motion.div key="couple-content"
                    initial={false}
                    animate={{ height: expanded.basic ? 'auto' : 0, opacity: expanded.basic ? 1 : 0 }}
                    transition={{ duration: 0.22, ease: [0.4, 0.0, 0.2, 1] }}
                    style={{ overflow: 'hidden' }}
                    aria-hidden={!expanded.basic}
                  >
                    <div className={`rounded-xl border ${isDark ? 'bg-emerald-500/10 border-emerald-200/20' : 'bg-emerald-500/10 border-emerald-500/20'} backdrop-blur-sm p-4 mb-6`}>
                      <ul className="space-y-3">
                        <li className="flex items-center"><Check className="w-5 h-5 text-emerald-400 mr-2" /> <span className={`text-white`}>Coverage for up to 6 members</span></li>
                        <li className="flex items-center"><Check className="w-5 h-5 text-emerald-400 mr-2" /> <span className={`text-white`}>Premium casket options</span></li>
                        <li className="flex items-center"><Check className="w-5 h-5 text-emerald-400 mr-2" /> <span className={`text-white`}>Full venue services</span></li>
                        <li className="flex items-center"><Check className="w-5 h-5 text-emerald-400 mr-2" /> <span className={`text-white`}>Memorial arrangements</span></li>
                        <li className="flex items-center"><Check className="w-5 h-5 text-emerald-400 mr-2" /> <span className={`text-white`}>Grief counseling</span></li>
                      </ul>
                    </div>
                  </motion.div>
                  <div className={(expanded.basic ? 'mt-[-3px] ' : 'mt-8 ') + 'relative z-10'}>
                    <div className="relative">
                      <AnimatedPaymentButton 
                        text="Choose Plan"
                        className="silver"
                        hoverMessages={[
                          'Coverage for 6 members',
                          'Premium caskets',
                          'Full venue services',
                          'Memorial arrangements',
                        ]}
                        hoverIcons={['wallet','card','payment','check']}
                        showArrow={false}
                        expanded={expanded.basic}
                        onToggleExpand={() => toggleExpanded('basic')}
                        to="/plans/day-to-day?variant=couple"
                      />
                    </div>
                    <button
                      type="button"
                      aria-label={expanded.basic ? 'Collapse Family Plan details' : 'Expand Family Plan details'}
                      className={`absolute left-1/2 -translate-x-1/2 bottom-[-36px] inline-flex items-center justify-center w-8 h-8 rounded-full border backdrop-blur-sm z-[999]
                        transition-transform duration-200 ease-out shadow-md hover:shadow-lg hover:scale-105 focus:outline-none
                        ${isDark 
                          ? 'bg-gray-900/60 border-white/15 text-white ring-1 ring-white/10'
                          : 'bg-white/80 border-gray-200 text-gray-800 ring-1 ring-black/5'}
                        ${expanded.basic ? 'rotate-180' : ''}`}
                      onClick={() => toggleExpanded('basic')}
                    >
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                        <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z" />
                      </svg>
                    </button>
                  </div>
                  {!expanded.basic && (
                    <div
                      className={`pointer-events-none absolute top-3 right-3 rounded-xl px-3 py-2 shadow-sm border text-right opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-10 backdrop-blur-sm ${
                        isDark
                          ? 'bg-white/10 border-white/15'
                          : 'bg-white/30 border-white/40'
                      }`}
                    >
                      <div className={`text-[10px] uppercase tracking-wider ${isDark ? 'text-green-300' : 'text-green-700'}`}>
                        {tabs.find(t => t.id === activeTab)?.label}
                      </div>
                      <motion.div layoutId="daytoday-couple-price" className={`leading-none text-green-600`} transition={{ type: 'tween', duration: 0.22, ease: [0.4, 0.0, 0.2, 1] }}>
                        <span className="text-sm align-top mr-1">R</span>
                        <span className="text-2xl font-bold">674</span>
                        <span className={`${isDark ? 'text-gray-300' : 'text-gray-600'} text-[10px] ml-1`}>/mo</span>
                      </motion.div>
                    </div>
                  )}
                </motion.div>

                {/* Extended Family Plan - CARD 3 */}
                <motion.div 
                  className={`order-3 relative group rounded-2xl shadow-lg p-5 border-2 transition-all overflow-visible transform-gpu ${
                    isDark 
                      ? 'bg-gray-800 border-green-700 hover:border-green-500' 
                      : 'bg-white border-green-200 hover:border-green-400'
                  } min-h-[140px] `}
                  layout="position"
                  initial={false}
                  animate={showDayToDayCards ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true, margin: "-50px" }}
                  whileHover={{}}
                >
                  {expanded.family && (
                    <motion.div
                      key="family-bg"
                      aria-hidden
                      className="pointer-events-none absolute inset-0 rounded-2xl overflow-hidden z-0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.4, 0.0, 0.2, 1] }}
                    >
                      <img
                        src="/assets/images/family (1).jpg"
                        alt=""
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className={`${isDark ? 'bg-black/50' : 'bg-black/35'} absolute inset-0`} />
                    </motion.div>
                  )}
                  <div className="relative z-10 mb-[17px]">
                    <AnimatePresence mode="wait" initial={false}>
                      {expanded.family ? (
                        <motion.div
                          key="hdr-expanded-family"
                          className={`relative z-20 flex flex-col gap-2`}
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 6 }}
                          transition={{ duration: 0.18 }}
                        >
                          <motion.span
                            className={`inline-flex w-fit items-center rounded-md px-2 py-0.5 border backdrop-blur-sm ${isDark ? 'bg-emerald-500/10 border-emerald-200/20' : 'bg-emerald-500/10 border-emerald-500/20'} text-base font-semibold text-emerald-300`}
                            initial={{ opacity: 0, x: -6 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -6 }}
                            transition={{ duration: 0.18 }}
                          >
                            Extended Family Members Plan
                          </motion.span>
                          <motion.div
                            layoutId="daytoday-family-price"
                            className={`inline-flex items-baseline gap-2 rounded-xl border backdrop-blur-sm px-3 py-1 w-fit whitespace-nowrap self-start ${isDark ? 'bg-emerald-500/10 border-emerald-200/20' : 'bg-emerald-500/10 border-emerald-500/20'}`}
                            transition={{ type: 'tween', duration: 0.22, ease: [0.4, 0.0, 0.2, 1] }}
                          >
                            <span className="text-2xl font-bold text-emerald-400">R867</span>
                            <span className={`text-white text-sm font-normal`}>/month</span>
                          </motion.div>
                        </motion.div>
                      ) : (
                        <motion.h3
                          key="hdr-collapsed-family"
                          className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 6 }}
                          transition={{ duration: 0.18 }}
                        >
                          Extended Family Burial Plan
                        </motion.h3>
                      )}
                    </AnimatePresence>
                  </div>
                  {expanded.family && null}
                  <motion.div key="family-content"
                    initial={false}
                    animate={{ height: expanded.family ? 'auto' : 0, opacity: expanded.family ? 1 : 0 }}
                    transition={{ duration: 0.22, ease: [0.4, 0.0, 0.2, 1] }}
                    style={{ overflow: 'hidden' }}
                    aria-hidden={!expanded.family}
                  >
                    <div className={`rounded-xl border ${isDark ? 'bg-emerald-500/10 border-emerald-200/20' : 'bg-emerald-500/10 border-emerald-500/20'} backdrop-blur-sm p-4 mb-6`}>
                      <ul className="space-y-3">
                        <li className="flex items-center"><Check className="w-5 h-5 text-emerald-400 mr-2" /> <span className={`text-white`}>Coverage for up to 12 members</span></li>
                        <li className="flex items-center"><Check className="w-5 h-5 text-emerald-400 mr-2" /> <span className={`text-white`}>Premium & luxury caskets</span></li>
                        <li className="flex items-center"><Check className="w-5 h-5 text-emerald-400 mr-2" /> <span className={`text-white`}>Multiple venue options</span></li>
                        <li className="flex items-center"><Check className="w-5 h-5 text-emerald-400 mr-2" /> <span className={`text-white`}>Complete memorial services</span></li>
                        <li className="flex items-center"><Check className="w-5 h-5 text-emerald-400 mr-2" /> <span className={`text-white`}>Extended grief support</span></li>
                        <li className="flex items-center"><Check className="w-5 h-5 text-emerald-400 mr-2" /> <span className={`text-white`}>Priority scheduling</span></li>
                      </ul>
                    </div>
                  </motion.div>
                  <div className={(expanded.family ? 'mt-[-3px] ' : 'mt-8 ') + 'relative z-10'}>
                    <div className="relative">
                      <AnimatedPaymentButton 
                        text="Choose Plan"
                        className="bronze"
                        hoverMessages={[
                          'Coverage for 12 members',
                          'Luxury caskets',
                          'Multiple venues',
                          'Complete memorial services',
                        ]}
                        hoverIcons={['wallet','card','payment','check']}
                        showArrow={false}
                        expanded={expanded.family}
                        onToggleExpand={() => toggleExpanded('family')}
                        to="/plans/day-to-day?variant=family"
                      />
                    </div>
                    <button
                      type="button"
                      aria-label={expanded.family ? 'Collapse Extended Family details' : 'Expand Extended Family details'}
                      className={`absolute left-1/2 -translate-x-1/2 bottom-[-36px] inline-flex items-center justify-center w-8 h-8 rounded-full border backdrop-blur-sm z-[999]
                        transition-transform duration-200 ease-out shadow-md hover:shadow-lg hover:scale-105 focus:outline-none
                        ${isDark 
                          ? 'bg-gray-900/60 border-white/15 text-white ring-1 ring-white/10'
                          : 'bg-white/80 border-gray-200 text-gray-800 ring-1 ring-black/5'}
                        ${expanded.family ? 'rotate-180' : ''}`}
                      onClick={() => toggleExpanded('family')}
                    >
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                        <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z" />
                      </svg>
                    </button>
                  </div>
                  {!expanded.family && (
                    <div
                      className={`pointer-events-none absolute top-3 right-3 rounded-xl px-3 py-2 shadow-sm border text-right opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-10 backdrop-blur-sm ${
                        isDark
                          ? 'bg-white/10 border-white/15'
                          : 'bg-white/30 border-white/40'
                      }`}
                    >
                      <div className={`text-[10px] uppercase tracking-wider ${isDark ? 'text-green-300' : 'text-green-700'}`}>
                        {tabs.find(t => t.id === activeTab)?.label}
                      </div>
                      <motion.div layoutId="daytoday-family-price" className={`leading-none text-green-600`}>
                        <span className="text-sm align-top mr-1">R</span>
                        <span className="text-2xl font-bold">867</span>
                        <span className={`ml-1 text-[10px] ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>/mo</span>
                      </motion.div>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            </motion.div>
          </LayoutGroup>
        );

      case 'hospital':
        return (
          <div className={`w-full max-w-4xl mx-auto px-4 py-8`}>
            <div className="text-center mb-8">
              <h2 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Choose a Casket
              </h2>
              <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Select from our range of dignified caskets
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {/* Basic Casket */}
              <div className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${isDark ? 'bg-gray-800 border-gray-700 hover:border-emerald-500' : 'bg-white border-gray-200 hover:border-emerald-500'}`}>
                <div className="text-center mb-4">
                  <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-3 ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <span className="text-3xl">⚰️</span>
                  </div>
                  <h3 className={`font-bold text-lg mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Basic Casket</h3>
                  <p className="text-emerald-600 font-bold text-xl mb-2">R4,500</p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Simple and dignified</p>
                </div>
              </div>

              {/* Standard Casket */}
              <div className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${isDark ? 'bg-gray-800 border-emerald-700 hover:border-emerald-500' : 'bg-white border-emerald-200 hover:border-emerald-500'}`}>
                <div className="text-center mb-4">
                  <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-3 ${isDark ? 'bg-emerald-900/30' : 'bg-emerald-50'}`}>
                    <span className="text-3xl">⚰️</span>
                  </div>
                  <div className="inline-block px-3 py-1 bg-emerald-500 text-white text-xs font-semibold rounded-full mb-2">
                    POPULAR
                  </div>
                  <h3 className={`font-bold text-lg mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Standard Casket</h3>
                  <p className="text-emerald-600 font-bold text-xl mb-2">R8,500</p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Quality craftsmanship</p>
                </div>
              </div>

              {/* Premium Casket */}
              <div className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${isDark ? 'bg-gray-800 border-gray-700 hover:border-emerald-500' : 'bg-white border-gray-200 hover:border-emerald-500'}`}>
                <div className="text-center mb-4">
                  <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-3 ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <span className="text-3xl">⚰️</span>
                  </div>
                  <h3 className={`font-bold text-lg mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Premium Casket</h3>
                  <p className="text-emerald-600 font-bold text-xl mb-2">R15,000</p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Luxury finish</p>
                </div>
              </div>
            </div>

            <div className={`text-center p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
                All caskets include delivery and professional handling
              </p>
              <button className="px-6 py-3 bg-gradient-to-r from-orange-500 to-emerald-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all">
                Continue to Payment
              </button>
            </div>
          </div>
        );

      case 'comprehensive':
        return (
          <div className={`w-full max-w-4xl mx-auto px-4 py-8`}>
            <div className="text-center mb-8">
              <h2 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Add Extras
              </h2>
              <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Optional services to enhance the funeral
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {/* Venue Rental */}
              <div className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${isDark ? 'bg-gray-800 border-gray-700 hover:border-emerald-500' : 'bg-white border-gray-200 hover:border-emerald-500'}`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      <span className="text-xl">🏛️</span>
                    </div>
                    <div>
                      <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Venue Rental</h3>
                      <p className="text-emerald-600 font-bold">R3,500</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Flowers */}
              <div className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${isDark ? 'bg-gray-800 border-gray-700 hover:border-emerald-500' : 'bg-white border-gray-200 hover:border-emerald-500'}`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      <span className="text-xl">🌸</span>
                    </div>
                    <div>
                      <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Flowers</h3>
                      <p className="text-emerald-600 font-bold">R1,500</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Music/DJ */}
              <div className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${isDark ? 'bg-gray-800 border-gray-700 hover:border-emerald-500' : 'bg-white border-gray-200 hover:border-emerald-500'}`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      <span className="text-xl">🎵</span>
                    </div>
                    <div>
                      <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Music/DJ</h3>
                      <p className="text-emerald-600 font-bold">R2,000</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Live Streaming */}
              <div className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${isDark ? 'bg-gray-800 border-gray-700 hover:border-emerald-500' : 'bg-white border-gray-200 hover:border-emerald-500'}`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      <span className="text-xl">📹</span>
                    </div>
                    <div>
                      <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Live Streaming</h3>
                      <p className="text-emerald-600 font-bold">R1,000</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Catering */}
              <div className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${isDark ? 'bg-gray-800 border-gray-700 hover:border-emerald-500' : 'bg-white border-gray-200 hover:border-emerald-500'}`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      <span className="text-xl">🍽️</span>
                    </div>
                    <div>
                      <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Catering</h3>
                      <p className="text-emerald-600 font-bold">R5,000</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Transportation */}
              <div className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${isDark ? 'bg-gray-800 border-gray-700 hover:border-emerald-500' : 'bg-white border-gray-200 hover:border-emerald-500'}`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      <span className="text-xl">🚗</span>
                    </div>
                    <div>
                      <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Transportation</h3>
                      <p className="text-emerald-600 font-bold">R2,500</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={`p-6 rounded-xl border-2 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className="flex items-center justify-between mb-4">
                <span className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Total Amount</span>
                <span className="text-3xl font-bold text-emerald-600">R0</span>
              </div>
              <button className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-emerald-500 text-white rounded-lg font-medium hover:shadow-lg transition-all">
                Continue to Payment
              </button>
            </div>
          </div>
        );
    
      case 'hospital':
        return (
          <LayoutGroup>
            <motion.div className={`w-full max-w-[85vw] ${isSidebarCollapsed ? 'md:max-w-[74rem]' : 'md:max-w-[min(74rem,calc(100vw-14rem-0.5rem))]'} mx-auto px-4 md:px-2`}>
              <motion.div className="grid md:grid-cols-2 lg:grid-cols-[1.02fr_repeat(3,1fr)] gap-6 md:gap-5 items-start overflow-visible">
                {/* Introduction Column (same as Comprehensive) */}
                <motion.div 
                  className={`relative rounded-2xl shadow-lg p-5 border-2 transition-all overflow-visible transform-gpu ring-1 ring-emerald-400/20 shadow-[0_0_40px_rgba(16,185,129,0.15)] ${
                    isDark 
                      ? 'bg-gray-800 border-emerald-700 hover:border-emerald-500' 
                      : 'bg-white border-emerald-200 hover:border-emerald-400'
                  } ${expanded.intro ? 'min-h-[420px]' : 'min-h-[140px]'} `}
                  layout="position"
                  transition={{ 
                    duration: 0.4,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  viewport={{ once: true, margin: "-50px" }}
                  whileHover={{}}
                >
                  {/* Background accent: animated Single/Couple/Family */}
                  <IntroCarousel
                    images={[
                      '/assets/images/single (1).jpg',
                      '/assets/images/couple (1).jpg',
                      '/assets/images/family (1).jpg',
                    ]}
                  />
                  <div
                    className="relative z-10 flex items-start justify-between gap-3 text-white cursor-pointer select-none"
                    onClick={toggleIntro}
                    role="button"
                    aria-label={expanded.intro ? 'Collapse introduction' : 'Expand introduction'}
                  >
                    <div>
                      <motion.span
                        className={`inline-flex items-center rounded-md px-2 py-0.5 border backdrop-blur-sm mb-2 bg-emerald-500/10 border-emerald-200/30 text-white`}
                        animate={{ scale: [1, 1.05, 1], boxShadow: [
                          '0 0 0px rgba(16,185,129,0.0)',
                          '0 0 18px rgba(16,185,129,0.35)',
                          '0 0 0px rgba(16,185,129,0.0)'
                        ] }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        Start here
                      </motion.span>
                      <h3 className={`text-xl font-bold text-white`}>
                        Choose a Hospital Plan that fits your life
                      </h3>
                    </div>
                    <motion.button
                      type="button"
                      aria-label={expanded.intro ? 'Collapse introduction' : 'Expand introduction'}
                      className={`inline-flex items-center justify-center w-8 h-8 rounded-lg border text-sm text-white border-white/30 bg-white/10 hover:bg-white/15`}
                      onClick={(e) => { e.stopPropagation(); toggleIntro(); }}
                      animate={
                        expanded.intro
                          ? { y: 0, rotate: 180 }
                          : { y: [0, -3, 0], rotate: 0 }
                      }
                      transition={
                        expanded.intro
                          ? { duration: 0.2 }
                          : { y: { duration: 1.2, repeat: Infinity, ease: 'easeInOut' }, rotate: { duration: 0.2 } }
                      }
                    >
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                        <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z" />
                      </svg>
                    </motion.button>
                  </div>
                  {/* Collapsed teaser actions (match Day-To-Day style; Hospital uses tiers) */}
                  {!expanded.intro && (
                    <div className="relative z-10 mt-3 flex flex-wrap items-center gap-2 text-white">
                      <button
                        type="button"
                        className="inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold border backdrop-blur-sm bg-white/10 border-white/15 hover:bg-white/15 transition-all"
                        onClick={(e) => { e.stopPropagation(); toggleIntro(); setShowDayToDayCards(true); }}
                      >
                        Open introduction
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center rounded-full px-3 py-1.5 text-[11px] font-semibold border backdrop-blur-sm bg-white/10 border-white/15 hover:bg-white/15 transition-all"
                        onClick={(e) => { e.stopPropagation(); setShowDayToDayCards(true); setExpanded(prev => ({ ...prev, student: true, family: false, basic: false })); }}
                      >
                        Value
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center rounded-full px-3 py-1.5 text-[11px] font-semibold border backdrop-blur-sm bg-white/10 border-white/15 hover:bg-white/15 transition-all"
                        onClick={(e) => { e.stopPropagation(); setShowDayToDayCards(true); setExpanded(prev => ({ ...prev, student: false, family: false, basic: true })); }}
                      >
                        Platinum
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center rounded-full px-3 py-1.5 text-[11px] font-semibold border backdrop-blur-sm bg-white/10 border-white/15 hover:bg-white/15 transition-all"
                        onClick={(e) => { e.stopPropagation(); setShowDayToDayCards(true); setExpanded(prev => ({ ...prev, student: false, family: true, basic: false })); }}
                      >
                        Executive
                      </button>
                    </div>
                  )}
                  <motion.div
                    key="intro-content"
                    initial={false}
                    animate={{ height: expanded.intro ? 'auto' : 0, opacity: expanded.intro ? 1 : 0 }}
                    transition={{ duration: 0.22, ease: [0.4, 0.0, 0.2, 1] }}
                    style={{ overflow: 'hidden' }}
                    aria-hidden={!expanded.intro}
                    className="relative z-10 text-white"
                  >
                    <p className={`mt-2 text-white`}>
                      Practical, affordable healthcare for everyday needs. Choose from our flexible options
                      to cover GP visits, basic medication, and essential health services for you and your family.
                    </p>
                    <ul className="space-y-3 mt-4">
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-emerald-400 mr-2 mt-0.5" />
                        <span className={`text-white`}>GP consultations and virtual care</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-emerald-400 mr-2 mt-0.5" />
                        <span className={`text-white`}>Acute and chronic medication options</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-emerald-400 mr-2 mt-0.5" />
                        <span className={`text-white`}>Dental, optical and basic diagnostics</span>
                      </li>
                    </ul>
                    {/* Intro helper */}
                    <div className="mt-5 text-sm text-gray-200">
                      Open the Introduction to reveal the pricing options below. Cards will slide in one by one.
                    </div>
                    {/* Intro actions: reveal and jump */}
                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      
                      <button
                        type="button"
                        className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold border backdrop-blur-sm bg-white/10 border-white/15 text-white hover:bg-white/15 transition-all`}
                        onClick={() => {
                          setShowDayToDayCards(true);
                          setExpanded(prev => ({ ...prev, student: true, family: false, basic: false }));
                        }}
                      >
                        Value
                      </button>
                      <button
                        type="button"
                        className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold border backdrop-blur-sm bg-white/10 border-white/15 text-white hover:bg-white/15 transition-all`}
                        onClick={() => {
                          setShowDayToDayCards(true);
                          setExpanded(prev => ({ ...prev, student: false, family: false, basic: true }));
                        }}
                      >
                        Platinum
                      </button>
                      <button
                        type="button"
                        className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold border backdrop-blur-sm bg-white/10 border-white/15 text-white hover:bg-white/15 transition-all`}
                        onClick={() => {
                          setShowDayToDayCards(true);
                          setExpanded(prev => ({ ...prev, student: false, family: true, basic: false }));
                        }}
                      >
                        Executive
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
                {/* Student Plan (Single) (same as Comprehensive) */}
                <motion.div 
                  className={`order-1 relative z-30 group rounded-2xl shadow-lg p-5 border-2 transition-all overflow-visible transform-gpu ${
                    isDark 
                      ? 'bg-gray-800 border-green-700 hover:border-green-500' 
                      : 'bg-white border-green-200 hover:border-green-400'
                  } min-h-[140px] `}
                  layout="position"
                  initial={false}
                  animate={showDayToDayCards ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.45, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true, margin: "-50px" }}
                  whileHover={{}}
                  style={{ pointerEvents: showDayToDayCards ? 'auto' : 'none' }}
                >
                  {expanded.student && (
                    <motion.div
                      key="student-bg"
                      aria-hidden
                      className="pointer-events-none absolute inset-0 rounded-2xl overflow-hidden z-0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.4, 0.0, 0.2, 1] }}
                    >
                      <img
                        src="/assets/images/single (1).jpg"
                        alt=""
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className={`${isDark ? 'bg-black/50' : 'bg-black/35'} absolute inset-0`} />
                    </motion.div>
                  )}
                  <div className="relative z-10 mb-[17px]">
                    <AnimatePresence mode="wait" initial={false}>
                      {expanded.student ? (
                        <motion.div
                          key="hdr-expanded-student"
                          className={`relative z-20 flex flex-col items-start gap-1`}
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 6 }}
                          transition={{ duration: 0.18 }}
                        >
                          <motion.span
                            className={`inline-flex items-center rounded-md px-2 py-0.5 border backdrop-blur-sm ${isDark ? 'bg-emerald-500/10 border-emerald-200/20' : 'bg-emerald-500/10 border-emerald-500/20'} text-lg font-bold text-emerald-400`}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -8 }}
                            transition={{ duration: 0.18 }}
                          >
                            <motion.span
                              className="inline-flex"
                              initial="hidden"
                              animate="show"
                              variants={{ show: { transition: { staggerChildren: 0.035 } } }}
                            >
                              {'Hospital'.split('')?.map((ch, i) => (
                                <motion.span
                                  key={i}
                                  className="inline-block"
                                  variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
                                  transition={{ duration: 0.18 }}
                                >
                                  {ch === ' ' ? '\u00A0' : ch}
                                </motion.span>
                              ))}
                            </motion.span>
                          </motion.span>
                          <div className="flex items-baseline gap-2">
                            <motion.span
                              className={`inline-flex items-center rounded-md px-2 py-0.5 border backdrop-blur-sm ${isDark ? 'bg-emerald-500/10 border-emerald-200/20' : 'bg-emerald-500/10 border-emerald-500/20'} text-lg font-bold text-emerald-400`}
                              initial={{ opacity: 0, x: 8 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 8 }}
                              transition={{ duration: 0.18 }}
                            >
                              Value
                            </motion.span>
                            <motion.div
                              layoutId="hospital-value-price"
                              className={`relative z-30 inline-flex items-baseline gap-2 rounded-xl border backdrop-blur-sm px-3 py-1 ${isDark ? 'bg-emerald-500/10 border-emerald-200/20' : 'bg-emerald-500/10 border-emerald-500/20'}`}
                              transition={{ type: 'tween', duration: 0.22, ease: [0.4, 0.0, 0.2, 1] }}
                            >
                              <span className="text-2xl font-bold text-emerald-400">R390</span>
                              <span className={`text-white text-sm font-normal`}>/month</span>
                            </motion.div>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.h3
                          key="hdr-collapsed-student"
                          className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 6 }}
                          transition={{ duration: 0.18 }}
                        >
                          Value
                        </motion.h3>
                      )}
                    </AnimatePresence>
                  </div>
                  {expanded.student && null}
                  <motion.div key="student-content"
                    initial={false}
                    animate={{ height: expanded.student ? 'auto' : 0, opacity: expanded.student ? 1 : 0 }}
                    transition={{ duration: 0.22, ease: [0.4, 0.0, 0.2, 1] }}
                    style={{ overflow: 'hidden' }}
                    aria-hidden={!expanded.student}
                    className="relative z-10"
                  >
                    <div className={`rounded-xl border ${isDark ? 'bg-emerald-500/10 border-emerald-200/20' : 'bg-emerald-500/10 border-emerald-500/20'} backdrop-blur-sm p-4 mb-6`}>
                      <ul className="space-y-3">
                        <li className="flex items-center"><Check className="w-5 h-5 text-emerald-400 mr-2" /> <span className={`text-white`}>Private Hospital Benefits</span></li>
                        <li className="flex items-center"><Check className="w-5 h-5 text-emerald-400 mr-2" /> <span className={`text-white`}>Illness & accident cover</span></li>
                        <li className="flex items-center"><Check className="w-5 h-5 text-emerald-400 mr-2" /> <span className={`text-white`}>Ambulance services</span></li>
                        <li className="flex items-center"><Check className="w-5 h-5 text-emerald-400 mr-2" /> <span className={`text-white`}>Funeral benefits</span></li>
                      </ul>
                    </div>
                  </motion.div>
                  <div className={(expanded.student ? 'mt-[-3px] ' : 'mt-8 ') + 'relative z-10'}>
                    <div className="relative">
                      <AnimatedPaymentButton 
                        text="Choose Plan"
                        className="bronze"
                        hoverMessages={[
                          'Private Hospital Benefits',
                          'Illness & accident',
                          'Ambulance',
                          'Funeral benefits',
                        ]}
                        hoverIcons={['wallet','card','payment','check']}
                        showArrow={false}
                        expanded={expanded.student}
                        onToggleExpand={() => toggleExpanded('student')}
                        to="/plans/hospital?tier=Value&variant=single"
                      />
                    </div>
                    <button
                      type="button"
                      aria-label={expanded.student ? 'Collapse Student Care details' : 'Expand Student Care details'}
                      className={`absolute left-1/2 -translate-x-1/2 bottom-[-36px] inline-flex items-center justify-center w-8 h-8 rounded-full border backdrop-blur-sm z-[999]
                        transition-transform duration-200 ease-out shadow-md hover:shadow-lg hover:scale-105 focus:outline-none
                        ${isDark 
                          ? 'bg-gray-900/60 border-white/15 text-white ring-1 ring-white/10'
                          : 'bg-white/80 border-gray-200 text-gray-800 ring-1 ring-black/5'}
                        ${expanded.student ? 'rotate-180' : ''}`}
                      onClick={() => toggleExpanded('student')}
                    >
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                        <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z" />
                      </svg>
                    </button>
                  </div>
                  {/* Hover Badge (collapsed only) */}
                  {!expanded.student && (
                    <div
                      className={`pointer-events-none absolute top-3 right-3 rounded-xl px-3 py-2 shadow-sm border text-right opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-10 backdrop-blur-sm ${
                        isDark
                          ? 'bg-white/10 border-white/15'
                          : 'bg-white/30 border-white/40'
                      }`}
                    >
                      <div className={`text-[10px] uppercase tracking-wider ${isDark ? 'text-green-300' : 'text-green-700'}`}>
                        {tabs.find(t => t.id === activeTab)?.label}
                      </div>
                      <motion.div layoutId="student-price" className={`leading-none text-green-600`} transition={{ type: 'tween', duration: 0.22, ease: [0.4, 0.0, 0.2, 1] }}>
                        <span className="text-sm align-top mr-1">R</span>
                        <span className="text-2xl font-bold">390</span>
                        <span className={`${isDark ? 'text-gray-300' : 'text-gray-600'} text-[10px] ml-1`}>/mo</span>
                      </motion.div>
                    </div>
                  )}
                </motion.div>

                {/* Family Care (same as Comprehensive) */}
                <motion.div 
                  className={`order-3 relative group rounded-2xl shadow-lg p-5 border-2 transition-all overflow-visible transform-gpu ${
                    isDark 
                      ? 'bg-gray-800 border-green-700 hover:border-green-500' 
                      : 'bg-white border-green-200 hover:border-green-400'
                  } min-h-[140px] `}
                  layout="position"
                  initial={false}
                  animate={showDayToDayCards ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true, margin: "-50px" }}
                  whileHover={{}}
                >
                  {expanded.family && (
                    <motion.div
                      key="family-bg"
                      aria-hidden
                      className="pointer-events-none absolute inset-0 rounded-2xl overflow-hidden z-0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.4, 0.0, 0.2, 1] }}
                    >
                      <img
                        src="/assets/images/family (1).jpg"
                        alt=""
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className={`${isDark ? 'bg-black/50' : 'bg-black/35'} absolute inset-0`} />
                    </motion.div>
                  )}
                  <div className="relative z-10 mb-[17px]">
                    <AnimatePresence mode="wait" initial={false}>
                      {expanded.family ? (
                        <motion.div
                          key="hdr-expanded-family"
                          className={`relative z-20 flex flex-col items-start gap-1`}
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 6 }}
                          transition={{ duration: 0.18 }}
                        >
                          {/* Main category badge */}
                          <div className="flex items-baseline gap-2">
                            <motion.span
                              className={`inline-flex items-center rounded-md px-2 py-0.5 border backdrop-blur-sm ${isDark ? 'bg-emerald-500/10 border-emerald-200/20' : 'bg-emerald-500/10 border-emerald-500/20'} text-lg font-bold text-emerald-400`}
                              initial={{ opacity: 0, x: -8 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -8 }}
                              transition={{ duration: 0.18 }}
                            >
                              Hospital
                            </motion.span>
                          </div>
                          {/* Tier badge */}
                          <div className="flex items-baseline gap-2">
                            <motion.span
                              className={`inline-flex items-center rounded-md px-2 py-0.5 border backdrop-blur-sm ${isDark ? 'bg-emerald-500/10 border-emerald-200/20' : 'bg-emerald-500/10 border-emerald-500/20'} text-lg font-bold text-emerald-400`}
                              initial={{ opacity: 0, x: 8 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 8 }}
                              transition={{ duration: 0.18 }}
                            >
                              Executive
                            </motion.span>
                            <motion.div
                              layoutId="hospital-executive-price"
                              className={`relative z-30 inline-flex items-baseline gap-2 rounded-xl border backdrop-blur-sm px-3 py-1 ${isDark ? 'bg-emerald-500/10 border-emerald-200/20' : 'bg-emerald-500/10 border-emerald-500/20'}`}
                              transition={{ type: 'tween', duration: 0.22, ease: [0.4, 0.0, 0.2, 1] }}
                            >
                              <span className="text-2xl font-bold text-emerald-400">R640</span>
                              <span className={`text-white text-sm font-normal`}>/month</span>
                            </motion.div>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.h3
                          key="hdr-collapsed-family"
                          className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 6 }}
                          transition={{ duration: 0.18 }}
                        >
                          Executive
                        </motion.h3>
                      )}
                    </AnimatePresence>
                  </div>
                  <motion.div key="family-content"
                    initial={false}
                    animate={{ height: expanded.family ? 'auto' : 0, opacity: expanded.family ? 1 : 0 }}
                    transition={{ duration: 0.22, ease: [0.4, 0.0, 0.2, 1] }}
                    style={{ overflow: 'hidden' }}
                    aria-hidden={!expanded.family}
                  >
                    <div className={`rounded-xl border ${isDark ? 'bg-emerald-500/10 border-emerald-200/20' : 'bg-emerald-500/10 border-emerald-500/20'} backdrop-blur-sm p-4 mb-6`}>
                      <ul className="space-y-3">
                        <li className="flex items-center"><Check className="w-5 h-5 text-emerald-400 mr-2" /> <span className={`text-white`}>Private Hospital Benefits</span></li>
                        <li className="flex items-center"><Check className="w-5 h-5 text-emerald-400 mr-2" /> <span className={`text-white`}>Illness cover and Illness Top-up</span></li>
                        <li className="flex items-center"><Check className="w-5 h-5 text-emerald-400 mr-2" /> <span className={`text-white`}>Critical illness</span></li>
                        <li className="flex items-center"><Check className="w-5 h-5 text-emerald-400 mr-2" /> <span className={`text-white`}>Increased accident cover</span></li>
                        <li className="flex items-center"><Check className="w-5 h-5 text-emerald-400 mr-2" /> <span className={`text-white`}>Maternity</span></li>
                        <li className="flex items-center"><Check className="w-5 h-5 text-emerald-400 mr-2" /> <span className={`text-white`}>Accidental permanent disability</span></li>
                        <li className="flex items-center"><Check className="w-5 h-5 text-emerald-400 mr-2" /> <span className={`text-white`}>Ambulance and funeral benefits</span></li>
                      </ul>
                    </div>
                  </motion.div>
                  <div className={(expanded.family ? 'mt-[-3px] ' : 'mt-8 ') + 'relative z-10'}>
                    <div className="relative">
                      <AnimatedPaymentButton 
                        text="Choose Plan"
                        className="bronze"
                        hoverMessages={[
                          'Private Hospital Benefits',
                          'Illness Top-up',
                          'Critical illness',
                          'Increased accident cover',
                        ]}
                        hoverIcons={['wallet','card','payment','check']}
                        showArrow={false}
                        expanded={expanded.family}
                        onToggleExpand={() => toggleExpanded('family')}
                        to="/plans/hospital?tier=Executive&variant=family"
                      />
                    </div>
                    <button
                      type="button"
                      aria-label={expanded.family ? 'Collapse Family Care details' : 'Expand Family Care details'}
                      className={`absolute left-1/2 -translate-x-1/2 bottom-[-36px] inline-flex items-center justify-center w-8 h-8 rounded-full border backdrop-blur-sm z-[999]
                        transition-transform duration-200 ease-out shadow-md hover:shadow-lg hover:scale-105 focus:outline-none
                        ${isDark 
                          ? 'bg-gray-900/60 border-white/15 text-white ring-1 ring-white/10'
                          : 'bg-white/80 border-gray-200 text-gray-800 ring-1 ring-black/5'}
                        ${expanded.family ? 'rotate-180' : ''}`}
                      onClick={() => toggleExpanded('family')}
                    >
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                        <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z" />
                      </svg>
                    </button>
                  </div>
                  {/* Hover Badge (collapsed only) */}
                  {!expanded.family && (
                    <div
                      className={`pointer-events-none absolute top-3 right-3 rounded-xl px-3 py-2 shadow-sm border text-right opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-10 backdrop-blur-sm ${
                        isDark
                          ? 'bg-white/10 border-white/15'
                          : 'bg-white/30 border-white/40'
                      }`}
                    >
                        <div className={`text-[10px] uppercase tracking-wider ${isDark ? 'text-green-300' : 'text-green-700'}`}>
                          {tabs.find(t => t.id === activeTab)?.label}
                        </div>
                        <motion.div layoutId="family-price" className={`leading-none text-green-600`}>
                          <span className="text-sm align-top mr-1">R</span>
                          <span className="text-2xl font-bold">640</span>
                          <span className={`${isDark ? 'text-gray-300' : 'text-gray-600'} text-[10px] ml-1`}>/mo</span>
                        </motion.div>
                    </div>
                  )}
                </motion.div>

                {/* Couple Plan (same as Comprehensive) */}
                <motion.div 
                  className={`order-2 relative group rounded-2xl shadow-lg p-5 border-2 transition-all overflow-visible transform-gpu ${
                    isDark 
                      ? 'bg-gray-800 border-green-700 hover:border-green-500' 
                      : 'bg-white border-green-200 hover:border-green-400'
                  } min-h-[140px] `}
                  layout="position"
                  initial={false}
                  animate={showDayToDayCards ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.45, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true, margin: "-50px" }}
                  whileHover={{}}
                  style={{ pointerEvents: showDayToDayCards ? 'auto' : 'none' }}
                >
                  {expanded.basic && (
                    <motion.div
                      key="couple-bg"
                      aria-hidden
                      className="pointer-events-none absolute inset-0 rounded-2xl overflow-hidden z-0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.4, 0.0, 0.2, 1] }}
                    >
                      <img
                        src="/assets/images/couple (1).jpg"
                        alt=""
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className={`${isDark ? 'bg-black/50' : 'bg-black/35'} absolute inset-0`} />
                    </motion.div>
                  )}
                  <div className="relative z-10 mb-[17px]">
                    <AnimatePresence mode="wait" initial={false}>
                      {expanded.basic ? (
                        <motion.div
                          key="hdr-expanded-couple"
                          className={`relative z-20 flex flex-col items-start gap-1`}
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 6 }}
                          transition={{ duration: 0.18 }}
                        >
                          {/* Main category badge */}
                          <motion.span
                            className={`inline-flex items-center rounded-md px-2 py-0.5 border backdrop-blur-sm ${isDark ? 'bg-emerald-500/10 border-emerald-200/20' : 'bg-emerald-500/10 border-emerald-500/20'} text-lg font-bold text-emerald-400`}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -8 }}
                            transition={{ duration: 0.18 }}
                          >
                            Hospital
                          </motion.span>
                          {/* Tier badge */}
                          <div className="flex items-baseline gap-2">
                            <motion.span
                              className={`inline-flex items-center rounded-md px-2 py-0.5 border backdrop-blur-sm ${isDark ? 'bg-emerald-500/10 border-emerald-200/20' : 'bg-emerald-500/10 border-emerald-500/20'} text-lg font-bold text-emerald-400`}
                              initial={{ opacity: 0, x: 8 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 8 }}
                              transition={{ duration: 0.18 }}
                            >
                              Platinum
                            </motion.span>
                            <motion.div
                              layoutId="hospital-platinum-price"
                              className={`relative z-30 inline-flex items-baseline gap-2 rounded-xl border backdrop-blur-sm px-3 py-1 ${isDark ? 'bg-emerald-500/10 border-emerald-200/20' : 'bg-emerald-500/10 border-emerald-500/20'}`}
                              transition={{ type: 'tween', duration: 0.22, ease: [0.4, 0.0, 0.2, 1] }}
                            >
                              <span className="text-2xl font-bold text-emerald-400">R560</span>
                              <span className={`text-white text-sm font-normal`}>/month</span>
                            </motion.div>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.h3
                          key="hdr-collapsed-couple"
                          className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 6 }}
                          transition={{ duration: 0.18 }}
                        >
                          Platinum
                        </motion.h3>
                      )}
                    </AnimatePresence>
                  </div>
                  <motion.div key="couple-content"
                    initial={false}
                    animate={{ height: expanded.basic ? 'auto' : 0, opacity: expanded.basic ? 1 : 0 }}
                    transition={{ duration: 0.22, ease: [0.4, 0.0, 0.2, 1] }}
                    style={{ overflow: 'hidden' }}
                    aria-hidden={!expanded.basic}
                  >
                    <div className={`rounded-xl border ${isDark ? 'bg-emerald-500/10 border-emerald-200/20' : 'bg-emerald-500/10 border-emerald-500/20'} backdrop-blur-sm p-4 mb-6`}>
                      <ul className="space-y-3">
                        <li className="flex items-center"><Check className="w-5 h-5 text-emerald-400 mr-2" /> <span className={`text-white`}>Private Hospital Benefits</span></li>
                        <li className="flex items-center"><Check className="w-5 h-5 text-emerald-400 mr-2" /> <span className={`text-white`}>Illness & accident cover</span></li>
                        <li className="flex items-center"><Check className="w-5 h-5 text-emerald-400 mr-2" /> <span className={`text-white`}>Critical illness</span></li>
                        <li className="flex items-center"><Check className="w-5 h-5 text-emerald-400 mr-2" /> <span className={`text-white`}>Maternity</span></li>
                        <li className="flex items-center"><Check className="w-5 h-5 text-emerald-400 mr-2" /> <span className={`text-white`}>Accidental permanent disability</span></li>
                        <li className="flex items-center"><Check className="w-5 h-5 text-emerald-400 mr-2" /> <span className={`text-white`}>Ambulance and funeral benefits</span></li>
                      </ul>
                    </div>
                  </motion.div>
                  <div className={(expanded.basic ? 'mt-[-3px] ' : 'mt-8 ') + 'relative z-10'}>
                    <div className="relative">
                      <AnimatedPaymentButton 
                        text="Choose Plan"
                        className="silver"
                        hoverMessages={[
                          'Private Hospital Benefits',
                          'Illness & accident',
                          'Critical illness',
                          'Maternity',
                        ]}
                        hoverIcons={['wallet','card','payment','check']}
                        showArrow={false}
                        expanded={expanded.basic}
                        onToggleExpand={() => toggleExpanded('basic')}
                        to="/plans/hospital?tier=Platinum&variant=couple"
                      />
                    </div>
                    <button
                      type="button"
                      aria-label={expanded.basic ? 'Collapse Couples Care details' : 'Expand Couples Care details'}
                      className={`absolute left-1/2 -translate-x-1/2 bottom-[-36px] inline-flex items-center justify-center w-8 h-8 rounded-full border backdrop-blur-sm z-[999]
                        transition-transform duration-200 ease-out shadow-md hover:shadow-lg hover:scale-105 focus:outline-none
                        ${isDark 
                          ? 'bg-gray-900/60 border-white/15 text-white ring-1 ring-white/10'
                          : 'bg-white/80 border-gray-200 text-gray-800 ring-1 ring-black/5'}
                        ${expanded.basic ? 'rotate-180' : ''}`}
                      onClick={() => toggleExpanded('basic')}
                    >
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                        <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z" />
                      </svg>
                    </button>
                  </div>
                  {/* Hover Badge (collapsed only) */}
                  {!expanded.basic && (
                    <div
                      className={`pointer-events-none absolute top-3 right-3 rounded-xl px-3 py-2 shadow-sm border text-right opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-10 backdrop-blur-sm ${
                        isDark
                          ? 'bg-white/10 border-white/15'
                          : 'bg-white/30 border-white/40'
                      }`}
                    >
                      <div className={`text-[10px] uppercase tracking-wider ${isDark ? 'text-green-300' : 'text-green-700'}`}>
                        {tabs.find(t => t.id === activeTab)?.label}
                      </div>
                      <motion.div layoutId="basic-price" className={`leading-none text-green-600`} transition={{ type: 'tween', duration: 0.22, ease: [0.4, 0.0, 0.2, 1] }}>
                        <span className="text-sm align-top mr-1">R</span>
                        <span className="text-2xl font-bold">560</span>
                        <span className={`${isDark ? 'text-gray-300' : 'text-gray-600'} text-[10px] ml-1`}>/mo</span>
                      </motion.div>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            </motion.div>
          </LayoutGroup>
        );
      
      case 'senior':
        return (
          <LayoutGroup>
            <motion.div className={`w-full max-w-full ${isSidebarCollapsed ? 'md:max-w-[74rem]' : 'md:max-w-[min(74rem,calc(100vw-14rem-0.5rem))]'} mx-auto px-4 md:px-2`}>
              <motion.div className="grid md:grid-cols-2 lg:grid-cols-[1.02fr_repeat(3,1fr)] gap-6 md:gap-5 items-start overflow-visible">
                {/* Introduction Column (Senior-Plan intro) */}
                <motion.div 
                  className={`relative rounded-2xl shadow-lg p-5 border-2 transition-all overflow-visible transform-gpu ring-1 ring-emerald-400/20 shadow-[0_0_40px_rgba(16,185,129,0.15)] ${
                    isDark 
                      ? 'bg-gray-800 border-emerald-700 hover:border-emerald-500' 
                      : 'bg-white border-emerald-200 hover:border-emerald-400'
                  } ${expanded.intro ? 'min-h-[420px]' : 'min-h-[140px]'} `}
                  layout="position"
                  transition={{ 
                    duration: 0.4,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  viewport={{ once: true, margin: "-50px" }}
                  whileHover={{}}
                >
                  {/* Background accent: animated Single/Couple/Family */}
                  <IntroCarousel
                    images={[
                      '/assets/images/single (1).jpg',
                      '/assets/images/couple (1).jpg',
                      '/assets/images/family (1).jpg',
                    ]}
                  />
                  <div
                    className="relative z-10 flex items-start justify-between gap-3 text-white cursor-pointer select-none"
                    onClick={toggleIntro}
                    role="button"
                    aria-label={expanded.intro ? 'Collapse introduction' : 'Expand introduction'}
                  >
                    <div>
                      <motion.span
                        className={`inline-flex items-center rounded-md px-2 py-0.5 border backdrop-blur-sm mb-2 bg-emerald-500/10 border-emerald-200/30 text-white`}
                        animate={{ scale: [1, 1.05, 1], boxShadow: [
                          '0 0 0px rgba(16,185,129,0.0)',
                          '0 0 18px rgba(16,185,129,0.35)',
                          '0 0 0px rgba(16,185,129,0.0)'
                        ] }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        Start here
                      </motion.span>
                      <h3 className={`text-xl font-bold text-white`}>
                        Choose a Senior Plan that fits your life
                      </h3>
                    </div>
                    <motion.button
                      type="button"
                      aria-label={expanded.intro ? 'Collapse introduction' : 'Expand introduction'}
                      className={`inline-flex items-center justify-center w-8 h-8 rounded-lg border text-sm text-white border-white/30 bg-white/10 hover:bg-white/15`}
                      onClick={(e) => { e.stopPropagation(); toggleIntro(); }}
                      animate={
                        expanded.intro
                          ? { y: 0, rotate: 180 }
                          : { y: [0, -3, 0], rotate: 0 }
                      }
                      transition={
                        expanded.intro
                          ? { duration: 0.2 }
                          : { y: { duration: 1.2, repeat: Infinity, ease: 'easeInOut' }, rotate: { duration: 0.2 } }
                      }
                    >
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                        <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z" />
                      </svg>
                    </motion.button>
                  </div>
                  {/* Collapsed teaser actions (match Day-To-Day style; mapped to Senior categories) */}
                  {!expanded.intro && (
                    <div className="relative z-10 mt-3 flex flex-wrap items-center gap-2 text-white">
                      <button
                        type="button"
                        className="inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold border backdrop-blur-sm bg-white/10 border-white/15 hover:bg-white/15 transition-all"
                        onClick={(e) => { e.stopPropagation(); toggleIntro(); setShowDayToDayCards(true); }}
                      >
                        Open introduction
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center rounded-full px-3 py-1.5 text-[11px] font-semibold border backdrop-blur-sm bg-white/10 border-white/15 hover:bg-white/15 transition-all"
                        onClick={(e) => { e.stopPropagation(); setShowDayToDayCards(true); setExpanded(prev => ({ ...prev, student: true, family: false, basic: false })); }}
                      >
                        Day-to-Day
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center rounded-full px-3 py-1.5 text-[11px] font-semibold border backdrop-blur-sm bg-white/10 border-white/15 hover:bg-white/15 transition-all"
                        onClick={(e) => { e.stopPropagation(); setShowDayToDayCards(true); setExpanded(prev => ({ ...prev, student: false, family: true, basic: false })); }}
                      >
                        Hospital
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center rounded-full px-3 py-1.5 text-[11px] font-semibold border backdrop-blur-sm bg-white/10 border-white/15 hover:bg-white/15 transition-all"
                        onClick={(e) => { e.stopPropagation(); setShowDayToDayCards(true); setExpanded(prev => ({ ...prev, student: false, family: false, basic: true })); }}
                      >
                        Comprehensive
                      </button>
                    </div>
                  )}
                  <motion.div
                    key="intro-content"
                    initial={false}
                    animate={{ height: expanded.intro ? 'auto' : 0, opacity: expanded.intro ? 1 : 0 }}
                    transition={{ duration: 0.22, ease: [0.4, 0.0, 0.2, 1] }}
                    style={{ overflow: 'hidden' }}
                    aria-hidden={!expanded.intro}
                    className="relative z-10 text-white"
                  >
                    <p className={`mt-2 text-white`}>
                      Practical, affordable healthcare for everyday needs. Choose from our flexible options
                      to cover GP visits, basic medication, and essential health services for you and your family.
                    </p>
                    <ul className="space-y-3 mt-4">
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-emerald-400 mr-2 mt-0.5" />
                        <span className={`text-white`}>GP consultations and virtual care</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-emerald-400 mr-2 mt-0.5" />
                        <span className={`text-white`}>Acute and chronic medication options</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-emerald-400 mr-2 mt-0.5" />
                        <span className={`text-white`}>Dental, optical and basic diagnostics</span>
                      </li>
                    </ul>
                    {/* Intro helper */}
                    <div className="mt-5 text-sm text-gray-200">
                      Open the Introduction to reveal the pricing options below. Cards will slide in one by one.
                    </div>
                    {/* Intro actions: reveal and jump (match Day-To-Day style; mapped to Senior categories) */}
                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold border backdrop-blur-sm bg-white/10 border-white/15 text-white hover:bg-white/15 transition-all`}
                        onClick={() => {
                          setShowDayToDayCards(true);
                          setExpanded(prev => ({ ...prev, student: true, family: false, basic: false }));
                        }}
                      >
                        Day-to-Day
                      </button>
                      <button
                        type="button"
                        className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold border backdrop-blur-sm bg-white/10 border-white/15 text-white hover:bg-white/15 transition-all`}
                        onClick={() => {
                          setShowDayToDayCards(true);
                          setExpanded(prev => ({ ...prev, student: false, family: true, basic: false }));
                        }}
                      >
                        Hospital
                      </button>
                      <button
                        type="button"
                        className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold border backdrop-blur-sm bg-white/10 border-white/15 text-white hover:bg-white/15 transition-all`}
                        onClick={() => {
                          setShowDayToDayCards(true);
                          setExpanded(prev => ({ ...prev, student: false, family: false, basic: true }));
                        }}
                      >
                        Comprehensive
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
                {/* Day-to-Day (Single/Couple) */}
                <motion.div 
                  className={`order-1 relative z-30 group rounded-2xl shadow-lg p-5 border-2 transition-all overflow-visible transform-gpu ${
                    isDark 
                      ? 'bg-gray-800 border-green-700 hover:border-green-500' 
                      : 'bg-white border-green-200 hover:border-green-400'
                  } min-h-[140px] `}
                  layout="position"
                  initial={false}
                  animate={showDayToDayCards ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.45, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true, margin: "-50px" }}
                  whileHover={{}}
                  style={{ pointerEvents: showDayToDayCards ? 'auto' : 'none' }}
                >
                  {expanded.student && (
                    <motion.div
                      key="student-bg"
                      aria-hidden
                      className="pointer-events-none absolute inset-0 rounded-2xl overflow-hidden z-0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.4, 0.0, 0.2, 1] }}
                    >
                      <img
                        src="/assets/images/single (1).jpg"
                        alt=""
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className={`${isDark ? 'bg-black/50' : 'bg-black/35'} absolute inset-0`} />
                    </motion.div>
                  )}
                  <div className="relative z-10 mb-[17px]">
                    <AnimatePresence mode="wait" initial={false}>
                      {expanded.student ? (
                        <motion.div
                          key="hdr-expanded-student"
                          className={`relative z-20 flex flex-col items-start gap-1`}
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 6 }}
                          transition={{ duration: 0.18 }}
                        >
                          <div className="flex items-center gap-2">
                            <motion.span
                              className={`inline-flex items-center rounded-md px-2 py-0.5 border backdrop-blur-sm ${isDark ? 'bg-emerald-500/10 border-emerald-200/20' : 'bg-emerald-500/10 border-emerald-500/20'} text-lg font-bold text-emerald-400`}
                              initial={{ opacity: 0, x: -8 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -8 }}
                              transition={{ duration: 0.18 }}
                            >
                              <motion.span
                                className="inline-flex"
                                initial="hidden"
                                animate="show"
                                variants={{ show: { transition: { staggerChildren: 0.035 } } }}
                              >
                                {'Senior'.split('')?.map((ch, i) => (
                                  <motion.span
                                    key={i}
                                    className="inline-block"
                                    variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
                                    transition={{ duration: 0.18 }}
                                  >
                                    {ch === ' ' ? '\u00A0' : ch}
                                  </motion.span>
                                ))}
                              </motion.span>
                            </motion.span>
                            <motion.span
                              className={`inline-flex items-center rounded-md px-2 py-0.5 border backdrop-blur-sm ${isDark ? 'bg-emerald-500/10 border-emerald-200/20' : 'bg-emerald-500/10 border-emerald-500/20'} text-lg font-bold text-emerald-400`}
                              initial={{ opacity: 0, x: -8 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -8 }}
                              transition={{ duration: 0.18 }}
                            >
                              Day-to-Day
                            </motion.span>
                          </div>
                          <motion.div
                            layoutId="senior-day-header-price"
                            className={`mt-2 relative z-10 inline-flex items-baseline gap-2 rounded-xl border backdrop-blur-sm px-3 py-1 ${isDark ? 'bg-emerald-500/10 border-emerald-200/20' : 'bg-emerald-500/10 border-emerald-500/20'}`}
                            transition={{ type: 'tween', duration: 0.22, ease: [0.4, 0.0, 0.2, 1] }}
                          >
                            <span className="text-2xl font-bold text-emerald-400">R425</span>
                            <span className={`text-white text-sm font-normal`}>/month</span>
                          </motion.div>
                        </motion.div>
                      ) : (
                        <motion.h3
                          key="hdr-collapsed-student"
                          className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 6 }}
                          transition={{ duration: 0.18 }}
                        >
                          Day-to-Day
                        </motion.h3>
                      )}
                    </AnimatePresence>
                  </div>
                  {/* Removed Senior Day-to-Day detailed price breakdown (Single/Couple) */}
                  <motion.div key="student-content"
                    initial={false}
                    animate={{ height: expanded.student ? 'auto' : 0, opacity: expanded.student ? 1 : 0 }}
                    transition={{ duration: 0.22, ease: [0.4, 0.0, 0.2, 1] }}
                    style={{ overflow: 'hidden' }}
                    aria-hidden={!expanded.student}
                    className="relative z-10"
                  >
                    <div className={`rounded-xl border ${isDark ? 'bg-emerald-500/10 border-emerald-200/20' : 'bg-emerald-500/10 border-emerald-500/20'} backdrop-blur-sm p-4 mb-6`}>
                      <ul className="space-y-2">
                        <li className="flex items-start"><Check className="w-4 h-4 text-emerald-400 mr-2 mt-0.5" /> <span className={`text-white text-sm leading-snug`}>Senior Day to Day Plan</span></li>
                        <li className="flex items-start"><Check className="w-4 h-4 text-emerald-400 mr-2 mt-0.5" /> <span className={`text-white text-sm leading-snug`}>Doctor visits / acute & chronic medication</span></li>
                        <li className="flex items-start"><Check className="w-4 h-4 text-emerald-400 mr-2 mt-0.5" /> <span className={`text-white text-sm leading-snug`}>Blood tests & x-rays</span></li>
                        <li className="flex items-start"><Check className="w-4 h-4 text-emerald-400 mr-2 mt-0.5" /> <span className={`text-white text-sm leading-snug`}>Dentistry & optometry</span></li>
                        <li className="flex items-start"><Check className="w-4 h-4 text-emerald-400 mr-2 mt-0.5" /> <span className={`text-white text-sm leading-snug`}>Funeral benefits</span></li>
                      </ul>
                    </div>
                  </motion.div>
                  <div className={(expanded.student ? 'mt-[-3px] ' : 'mt-8 ') + 'relative z-10'}>
                    <div className="relative">
                      <AnimatedPaymentButton 
                        text="Choose Plan"
                        className="bronze"
                        hoverMessages={[
                          'Senior Day to Day Plan',
                          'Doctor visits & medication',
                          'Blood tests & x-rays',
                          'Dentistry, optometry & funeral',
                        ]}
                        hoverIcons={['wallet','card','payment','check']}
                        showArrow={false}
                        expanded={expanded.student}
                        onToggleExpand={() => toggleExpanded('student')}
                        to="/plans/senior-plan?category=Day-to-Day&variant=single"
                      />
                    </div>
                    <button
                      type="button"
                      aria-label={expanded.student ? 'Collapse Student Care details' : 'Expand Student Care details'}
                      className={`absolute left-1/2 -translate-x-1/2 bottom-[-36px] inline-flex items-center justify-center w-8 h-8 rounded-full border backdrop-blur-sm z-[999]
                        transition-transform duration-200 ease-out shadow-md hover:shadow-lg hover:scale-105 focus:outline-none
                        ${isDark 
                          ? 'bg-gray-900/60 border-white/15 text-white ring-1 ring-white/10'
                          : 'bg-white/80 border-gray-200 text-gray-800 ring-1 ring-black/5'}
                        ${expanded.student ? 'rotate-180' : ''}`}
                      onClick={() => toggleExpanded('student')}
                    >
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                        <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z" />
                      </svg>
                    </button>
                  </div>
                  {/* Hover Badge (collapsed only) */}
                  {!expanded.student && (
                    <div
                      className={`pointer-events-none absolute top-3 right-3 rounded-xl px-3 py-2 shadow-sm border text-right opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-10 backdrop-blur-sm ${
                        isDark
                          ? 'bg-white/10 border-white/15'
                          : 'bg-white/30 border-white/40'
                      }`}
                    >
                      <div className={`text-[10px] uppercase tracking-wider ${isDark ? 'text-green-300' : 'text-green-700'}`}>
                        {tabs.find(t => t.id === activeTab)?.label}
                      </div>
                      <motion.div layoutId={`senior-day-header-price`} className={`leading-none text-green-600`} transition={{ type: 'tween', duration: 0.22, ease: [0.4, 0.0, 0.2, 1] }}>
                        <span className="text-sm align-top mr-1">R</span>
                        <span className="text-2xl font-bold">425</span>
                        <span className={`${isDark ? 'text-gray-300' : 'text-gray-600'} text-[10px] ml-1`}>/mo</span>
                      </motion.div>
                    </div>
                  )}
                </motion.div>

                {/* Hospital (Single/Couple) */}
                <motion.div 
                  className={`order-3 relative group rounded-2xl shadow-lg p-5 border-2 transition-all overflow-visible transform-gpu ${
                    isDark 
                      ? 'bg-gray-800 border-green-700 hover:border-green-500' 
                      : 'bg-white border-green-200 hover:border-green-400'
                  } min-h-[140px] `}
                  layout="position"
                  initial={false}
                  animate={showDayToDayCards ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true, margin: "-50px" }}
                  whileHover={{}}
                >
                  {expanded.family && (
                    <motion.div
                      key="family-bg"
                      aria-hidden
                      className="pointer-events-none absolute inset-0 rounded-2xl overflow-hidden z-0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.4, 0.0, 0.2, 1] }}
                    >
                      <img
                        src="https://placehold.co/1200x800/111/fff?text=Demo"
                        alt=""
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className={`${isDark ? 'bg-black/50' : 'bg-black/35'} absolute inset-0`} />
                    </motion.div>
                  )}
                  <div className="relative z-10 mb-[17px]">
                    <AnimatePresence mode="wait" initial={false}>
                      {expanded.family ? (
                        <motion.div
                          key="hdr-expanded-family"
                          className="relative z-20 flex flex-col items-start gap-1"
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 6 }}
                          transition={{ duration: 0.18 }}
                        >
                          <div className="flex items-center gap-2">
                            <motion.span
                              className={`inline-flex items-center rounded-md px-2 py-0.5 border backdrop-blur-sm ${isDark ? 'bg-emerald-500/10 border-emerald-200/20' : 'bg-emerald-500/10 border-emerald-500/20'} text-lg font-bold text-emerald-400`}
                              initial={{ opacity: 0, x: -8 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -8 }}
                              transition={{ duration: 0.18 }}
                            >
                              <motion.span
                                className="inline-flex"
                                initial="hidden"
                                animate="show"
                                variants={{ show: { transition: { staggerChildren: 0.03 } } }}
                            >
                                {'Senior'.split('').map((ch, i) => (
                                  <motion.span
                                    key={i}
                                    className="inline-block"
                                    variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
                                    transition={{ duration: 0.18 }}
                                  >
                                    {ch === ' ' ? '\u00A0' : ch}
                                  </motion.span>
                                ))}
                              </motion.span>
                            </motion.span>
                            <motion.span
                              className={`inline-flex items-center rounded-md px-2 py-0.5 border backdrop-blur-sm ${isDark ? 'bg-emerald-500/10 border-emerald-200/20' : 'bg-emerald-500/10 border-emerald-500/20'} text-lg font-bold text-emerald-400`}
                              initial={{ opacity: 0, x: -8 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -8 }}
                              transition={{ duration: 0.18 }}
                            >
                              Hospital
                            </motion.span>
                          </div>
                          <motion.div
                            layoutId="senior-hospital-header-price"
                            className={`mt-2 relative z-10 inline-flex items-baseline gap-2 rounded-xl border backdrop-blur-sm px-3 py-1 ${isDark ? 'bg-emerald-500/10 border-emerald-200/20' : 'bg-emerald-500/10 border-emerald-500/20'}`}
                            transition={{ type: 'tween', duration: 0.22, ease: [0.4, 0.0, 0.2, 1] }}
                          >
                            <span className="text-2xl font-bold text-emerald-400">R580</span>
                            <span className={`text-white text-sm font-normal`}>/month</span>
                          </motion.div>
                        </motion.div>
                      ) : (
                        <motion.h3
                          key="hdr-collapsed-family"
                          className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 6 }}
                          transition={{ duration: 0.18 }}
                        >
                          Hospital
                        </motion.h3>
                      )}
                    </AnimatePresence>
                  </div>
                  {/* Removed Senior Hospital detailed price breakdown (Single/Couple) */}
                  <motion.div key="family-content"
                    initial={false}
                    animate={{ height: expanded.family ? 'auto' : 0, opacity: expanded.family ? 1 : 0 }}
                    transition={{ duration: 0.22, ease: [0.4, 0.0, 0.2, 1] }}
                    style={{ overflow: 'hidden' }}
                    aria-hidden={!expanded.family}
                  >
                    <div className={`rounded-xl border ${isDark ? 'bg-emerald-500/10 border-emerald-200/20' : 'bg-emerald-500/10 border-emerald-500/20'} backdrop-blur-sm p-4 mb-6`}>
                      <ul className="space-y-2">
                        <li className="flex items-start"><Check className="w-4 h-4 text-emerald-400 mr-2 mt-0.5" /> <span className={`text-white text-sm leading-snug`}>Private Hospital Benefits</span></li>
                        <li className="flex items-start"><Check className="w-4 h-4 text-emerald-400 mr-2 mt-0.5" /> <span className={`text-white text-sm leading-snug`}>Illness</span></li>
                        <li className="flex items-start"><Check className="w-4 h-4 text-emerald-400 mr-2 mt-0.5" /> <span className={`text-white text-sm leading-snug`}>Accident</span></li>
                        <li className="flex items-start"><Check className="w-4 h-4 text-emerald-400 mr-2 mt-0.5" /> <span className={`text-white text-sm leading-snug`}>Ambulance & funeral benefits</span></li>
                      </ul>
                    </div>
                  </motion.div>
                  <div className={(expanded.family ? 'mt-[-3px] ' : 'mt-8 ') + 'relative z-10'}>
                    <div className="relative">
                      <AnimatedPaymentButton 
                        text="Choose Plan"
                        className="bronze"
                        hoverMessages={[
                          'Private Hospital Benefits',
                          'Illness & accident',
                          'Ambulance',
                          'Funeral benefits',
                        ]}
                        hoverIcons={['wallet','card','payment','check']}
                        showArrow={false}
                        expanded={expanded.family}
                        onToggleExpand={() => toggleExpanded('family')}
                        to="/plans/senior-plan?category=Hospital&variant=single"
                      />
                    </div>
                    <button
                      type="button"
                      aria-label={expanded.family ? 'Collapse Family Care details' : 'Expand Family Care details'}
                      className={`absolute left-1/2 -translate-x-1/2 bottom-[-36px] inline-flex items-center justify-center w-8 h-8 rounded-full border backdrop-blur-sm z-[999]
                        transition-transform duration-200 ease-out shadow-md hover:shadow-lg hover:scale-105 focus:outline-none
                        ${isDark 
                          ? 'bg-gray-900/60 border-white/15 text-white ring-1 ring-white/10'
                          : 'bg-white/80 border-gray-200 text-gray-800 ring-1 ring-black/5'}
                        ${expanded.family ? 'rotate-180' : ''}`}
                      onClick={() => toggleExpanded('family')}
                    >
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                        <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z" />
                      </svg>
                    </button>
                  </div>
                  {/* Hover Badge (collapsed only) */}
                  {!expanded.family && (
                    <div
                      className={`pointer-events-none absolute top-3 right-3 rounded-xl px-3 py-2 shadow-sm border text-right opacity-0 group-hover:opacity-100 transition-opacity duration-150 ${
                        isDark
                          ? 'bg-gray-900/80 border-gray-700'
                          : 'bg-white/90 border-gray-200'
                      }`}
                    >
                        <div className={`text-[10px] uppercase tracking-wider ${isDark ? 'text-green-300' : 'text-green-700'}`}>
                          {tabs.find(t => t.id === activeTab)?.label}
                        </div>
                        <motion.div layoutId="senior-hospital-header-price" className={`leading-none text-green-600`}>
                          <span className="text-sm align-top mr-1">R</span>
                          <span className="text-2xl font-bold">580</span>
                          <span className={`ml-1 text-[10px] ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>/mo</span>
                        </motion.div>
                    </div>
                  )}
                </motion.div>

                {/* Comprehensive (Single/Couple) */}
                <motion.div 
                  className={`order-2 relative group rounded-2xl shadow-lg p-5 border-2 transition-all overflow-visible transform-gpu ${
                    isDark 
                      ? 'bg-gray-800 border-green-700 hover:border-green-500' 
                      : 'bg-white border-green-200 hover:border-green-400'
                  } min-h-[140px] `}
                  layout="position"
                  initial={false}
                  animate={showDayToDayCards ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.45, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true, margin: "-50px" }}
                  whileHover={{}}
                  style={{ pointerEvents: showDayToDayCards ? 'auto' : 'none' }}
                >
                  {expanded.basic && (
                    <motion.div
                      key="couple-bg"
                      aria-hidden
                      className="pointer-events-none absolute inset-0 rounded-2xl overflow-hidden z-0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.4, 0.0, 0.2, 1] }}
                    >
                      <img
                        src="https://placehold.co/1200x800/111/fff?text=Demo"
                        alt=""
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className={`${isDark ? 'bg-black/50' : 'bg-black/35'} absolute inset-0`} />
                    </motion.div>
                  )}
                  <div className="relative z-10 mb-[17px]">
                    <AnimatePresence mode="wait" initial={false}>
                      {expanded.basic ? (
                        <motion.div
                          key="hdr-expanded-couple"
                          className={`relative z-20 flex flex-col items-start gap-1`}
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 6 }}
                          transition={{ duration: 0.18 }}
                        >
                          <div className="flex items-center gap-2">
                            <motion.span
                              className={`inline-flex items-center rounded-md px-2 py-0.5 border backdrop-blur-sm ${isDark ? 'bg-emerald-500/10 border-emerald-200/20' : 'bg-emerald-500/10 border-emerald-500/20'} text-lg font-bold text-emerald-400`}
                              initial={{ opacity: 0, x: -8 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -8 }}
                              transition={{ duration: 0.18 }}
                            >
                              <motion.span
                                className="inline-flex"
                                initial="hidden"
                                animate="show"
                                variants={{ show: { transition: { staggerChildren: 0.035 } } }}
                              >
                                {'Senior'.split('')?.map((ch, i) => (
                                  <motion.span
                                    key={i}
                                    className="inline-block"
                                    variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
                                    transition={{ duration: 0.18 }}
                                  >
                                    {ch === ' ' ? '\u00A0' : ch}
                                  </motion.span>
                                ))}
                              </motion.span>
                            </motion.span>
                            <motion.span
                              className={`inline-flex items-center rounded-md px-2 py-0.5 border backdrop-blur-sm ${isDark ? 'bg-emerald-500/10 border-emerald-200/20' : 'bg-emerald-500/10 border-emerald-500/20'} text-lg font-bold text-emerald-400`}
                              initial={{ opacity: 0, x: -8 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -8 }}
                              transition={{ duration: 0.18 }}
                            >
                              Comprehensive
                            </motion.span>
                          </div>
                          <motion.div
                            layoutId="senior-comprehensive-header-price"
                            className={`mt-2 relative z-10 inline-flex items-baseline gap-2 rounded-xl border backdrop-blur-sm px-3 py-1 ${isDark ? 'bg-emerald-500/10 border-emerald-200/20' : 'bg-emerald-500/10 border-emerald-500/20'}`}
                            transition={{ type: 'tween', duration: 0.22, ease: [0.4, 0.0, 0.2, 1] }}
                          >
                            <span className="text-2xl font-bold text-emerald-400">R875</span>
                            <span className={`text-white text-sm font-normal`}>/month</span>
                          </motion.div>
                        </motion.div>
                      ) : (
                        <motion.h3
                          key="hdr-collapsed-couple"
                          className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 6 }}
                          transition={{ duration: 0.18 }}
                        >
                          Comprehensive
                        </motion.h3>
                      )}
                    </AnimatePresence>
                  </div>
                  {/* Removed Senior Comprehensive detailed price breakdown (Single/Couple) */}
                  <motion.div key="couple-content"
                    initial={false}
                    animate={{ height: expanded.basic ? 'auto' : 0, opacity: expanded.basic ? 1 : 0 }}
                    transition={{ duration: 0.22, ease: [0.4, 0.0, 0.2, 1] }}
                    style={{ overflow: 'hidden' }}
                    aria-hidden={!expanded.basic}
                  >
                    <div className={`rounded-xl border ${isDark ? 'bg-emerald-500/10 border-emerald-200/20' : 'bg-emerald-500/10 border-emerald-500/20'} backdrop-blur-sm p-4 mb-6`}>
                      <ul className="space-y-2">
                        <li className="flex items-start"><Check className="w-4 h-4 text-emerald-400 mr-2 mt-0.5" /> <span className={`text-white text-sm leading-snug`}>Doctor visits</span></li>
                        <li className="flex items-start"><Check className="w-4 h-4 text-emerald-400 mr-2 mt-0.5" /> <span className={`text-white text-sm leading-snug`}>Acute & chronic medication</span></li>
                        <li className="flex items-start"><Check className="w-4 h-4 text-emerald-400 mr-2 mt-0.5" /> <span className={`text-white text-sm leading-snug`}>Blood tests & x-rays</span></li>
                        <li className="flex items-start"><Check className="w-4 h-4 text-emerald-400 mr-2 mt-0.5" /> <span className={`text-white text-sm leading-snug`}>Dentistry & optometry</span></li>
                        <li className="flex items-start"><Check className="w-4 h-4 text-emerald-400 mr-2 mt-0.5" /> <span className={`text-white text-sm leading-snug`}>Funeral benefits</span></li>
                        <li className="flex items-start"><Check className="w-4 h-4 text-emerald-400 mr-2 mt-0.5" /> <span className={`text-white text-sm leading-snug`}>Illness</span></li>
                        <li className="flex items-start"><Check className="w-4 h-4 text-emerald-400 mr-2 mt-0.5" /> <span className={`text-white text-sm leading-snug`}>Accident</span></li>
                        <li className="flex items-start"><Check className="w-4 h-4 text-emerald-400 mr-2 mt-0.5" /> <span className={`text-white text-sm leading-snug`}>Ambulance & funeral benefits</span></li>
                      </ul>
                    </div>
                  </motion.div>
                  <div className={(expanded.basic ? 'mt-[-3px] ' : 'mt-8 ') + 'relative z-10'}>
                    <div className="relative">
                      <AnimatedPaymentButton 
                        text="Choose Plan"
                        className="silver"
                        hoverMessages={[
                          'Doctor visits & medication',
                          'Blood tests & x-rays',
                          'Illness & accident',
                          'Ambulance & funeral',
                        ]}
                        hoverIcons={['wallet','card','payment','check']}
                        showArrow={false}
                        expanded={expanded.basic}
                        onToggleExpand={() => toggleExpanded('basic')}
                        to="/plans/senior-plan?category=Comprehensive&variant=couple"
                      />
                    </div>
                    <button
                      type="button"
                      aria-label={expanded.basic ? 'Collapse Couples Care details' : 'Expand Couples Care details'}
                      className={`absolute left-1/2 -translate-x-1/2 bottom-[-36px] inline-flex items-center justify-center w-8 h-8 rounded-full border backdrop-blur-sm z-[999]
                        transition-transform duration-200 ease-out shadow-md hover:shadow-lg hover:scale-105 focus:outline-none
                        ${isDark 
                          ? 'bg-gray-900/60 border-white/15 text-white ring-1 ring-white/10'
                          : 'bg-white/80 border-gray-200 text-gray-800 ring-1 ring-black/5'}
                        ${expanded.basic ? 'rotate-180' : ''}`}
                      onClick={() => toggleExpanded('basic')}
                    >
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                        <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z" />
                      </svg>
                    </button>
                  </div>
                  {/* Hover Badge (collapsed only) */}
                  {!expanded.basic && (
                    <div
                      className={`pointer-events-none absolute top-3 right-3 rounded-xl px-3 py-2 shadow-sm border text-right opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-10 backdrop-blur-sm ${
                        isDark
                          ? 'bg-white/10 border-white/15'
                          : 'bg-white/30 border-white/40'
                      }`}
                    >
                      <div className={`text-[10px] uppercase tracking-wider ${isDark ? 'text-green-300' : 'text-green-700'}`}>
                        {tabs.find(t => t.id === activeTab)?.label}
                      </div>
                      <motion.div layoutId="senior-comprehensive-header-price" className={`leading-none text-green-600`} transition={{ type: 'tween', duration: 0.22, ease: [0.4, 0.0, 0.2, 1] }}>
                        <span className="text-sm align-top mr-1">R</span>
                        <span className="text-2xl font-bold">875</span>
                        <span className={`${isDark ? 'text-gray-300' : 'text-gray-600'} text-[10px] ml-1`}>/mo</span>
                      </motion.div>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            </motion.div>
          </LayoutGroup>
        );
      
      case 'ai':
        // Show FastClaim component if aiView is 'fastclaim'
        if (aiView === 'fastclaim') {
          return <FastClaim onClose={() => setAiView('intro')} />;
        }
        
        // Show ChatBot if aiView is 'chatbot'
        if (aiView === 'chatbot') {
          return (
            <div className="max-w-6xl mx-auto">
              <button
                onClick={() => setAiView('intro')}
                className={`mb-4 px-4 py-2 rounded-lg ${
                  isDark ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                ← Back
              </button>
              <ChatBot isSidebarCollapsed={isSidebarCollapsed} inline={true} />
            </div>
          );
        }
        
        // Show Sign-Up form if aiView is 'signup'
        if (aiView === 'signup') {
          return <ThreePlan onClose={() => setAiView('intro')} />;
        }
        
        // Default intro view
        return (
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Left side - Text content */}
              <div className="text-center lg:text-left">
                <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-full mb-6 ${
                  isDark ? 'bg-green-900/50 text-green-400' : 'bg-green-100 text-green-800'
                }`}>
                  <Users className="w-5 h-5" />
                  <span className="font-medium">AI Assistant</span>
                </div>
                <h3 className={`text-3xl lg:text-4xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Talk to Gift
                </h3>
                <p className={`text-xl mb-8 leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  Our compassionate AI assistant is here to help you navigate funeral planning with dignity and care. 
                  Get instant answers to your questions about Gift AI services.
                </p>

                {/* Call to Action */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <button 
                    onClick={() => setAiView('fastclaim')}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg"
                  >
                    <Zap className="w-5 h-5" />
                    Fast Claim
                  </button>
                  <button
                    onClick={() => setAiView('signup')}
                    className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 border ${
                      isDark
                        ? 'border-ubuntugift-primary text-ubuntugift-light hover:bg-ubuntugift-primary hover:text-ubuntugift-light'
                        : 'border-ubuntugift-primary text-ubuntugift-primary hover:bg-ubuntugift-primary hover:text-ubuntugift-light'
                    }`}
                  >
                    <PenTool className="w-5 h-5" />
                    Quick Sign-Up
                  </button>
                  <button
                    onClick={() => setAiView('chatbot')}
                    className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 border ${
                      isDark
                        ? 'border-ubuntugift-primary text-ubuntugift-light hover:bg-ubuntugift-primary hover:text-ubuntugift-light'
                        : 'border-ubuntugift-primary text-ubuntugift-primary hover:bg-ubuntugift-primary hover:text-ubuntugift-light'
                    }`}
                  >
                    <Mail className="w-5 h-5" />
                    Talk with Gift
                  </button>
                </div>
              </div>

              {/* Right side - Gift AI info card */}
              <div className={`rounded-2xl shadow-lg p-8 border ${
                isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
              }`}>
                <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-full mb-6 ${
                  isDark ? 'bg-emerald-900/50 text-emerald-400' : 'bg-emerald-100 text-emerald-800'
                }`}>
                  <Users className="w-5 h-5" />
                  <span className="font-medium">Gift - AI Assistant</span>
                </div>
                <p className={`text-lg mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  Hello! I'm Gift, your compassionate AI assistant for Gift AI. I'm here to help you with any questions about Gift services, planning, or cultural traditions.
                </p>
                <div className="space-y-4">
                  <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      💬 <strong>Ask me anything</strong> about our services, packages, or cultural care options
                    </p>
                  </div>
                  <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      ⚡ <strong>Fast Claim</strong> - Quick and efficient claim processing
                    </p>
                  </div>
                  <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      📝 <strong>Quick Sign-Up</strong> - Join our community in minutes
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Get Your Quote Today</h3>
                <p className="text-gray-600">Fill out the form below and we'll get back to you within 24 hours</p>
              </div>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-ubuntugift-primary focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input 
                      type="tel" 
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-ubuntugift-primary focus:border-transparent"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-ubuntugift-primary focus:border-transparent"
                    placeholder="Enter your email address"
                  />
                </div>
                <button 
                  type="submit" 
                  className="w-full bg-ubuntugift-primary text-ubuntugift-light py-4 rounded-xl font-semibold hover:bg-ubuntugift-secondary transition-colors flex items-center justify-center"
                >
                  Get My Quote
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              </form>
              <div className="flex items-center justify-center space-x-4 mt-8 pt-8 border-t border-gray-200">
                <button className="flex items-center space-x-2 text-ubuntugift-primary hover:text-ubuntugift-secondary transition-colors">
                  <Phone className="w-5 h-5" />
                  <span>Call Us: 0876 100 600</span>
                </button>
                <button className="flex items-center space-x-2 text-ubuntugift-primary hover:text-ubuntugift-secondary transition-colors">
                  <Mail className="w-5 h-5" />
                  <span>Email Us</span>
                </button>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div id="plans" data-services-section="true" data-gift-ai-section="true" className={`relative z-30 pt-2.5 transition-all duration-700 ease-in-out ${isDark ? 'bg-gray-900' : 'bg-white'} ${isSidebarCollapsed ? 'lg:ml-24 lg:w-[calc(100%-6rem)]' : 'lg:ml-64 lg:w-[calc(100%-16rem)]'}`} style={{
      transition: 'margin-left 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94), width 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    }}>
      <div className="w-full mx-auto px-4">
        {/* Floating Tabs */}
        <div className="flex justify-center mb-12">
          <div className={`w-full max-w-full ${isSidebarCollapsed ? 'md:max-w-[74rem]' : 'md:max-w-[min(74rem,calc(100vw-14rem-0.5rem))]'} mx-auto rounded-2xl shimmer-border shadow-lg px-2 py-3 backdrop-blur-sm transition-colors duration-300 ${isDark ? 'bg-gray-800/95 border border-gray-700' : 'bg-white/95 border border-gray-100'}`}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-4 px-3 md:px-0">
              {tabs.map((tab) => (
                <ButtonColorful
                  key={tab.id}
                  data-tab-id={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  label={tab.label}
                  bgColor={tab.bgColor}
                  className={`w-full ${
                    activeTab === tab.id
                      ? 'ring-2 ring-white'
                      : ''
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* Content Panel */}
        <div className={`transition-all duration-500 ease-in-out`}>
          <div className={`transform transition-all duration-500 ${
            activeTab ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolsTabs;