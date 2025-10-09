import React from 'react';
import { motion, useSpring } from 'framer-motion';

const NotFoundPage = () => {
  const [isHovered, setIsHovered] = React.useState(false);

  const slideWidth = useSpring(0, { stiffness: 100, damping: 30 });

  React.useEffect(() => {
    slideWidth.set(isHovered ? 250 : 0);
  }, [isHovered, slideWidth]);
  return (
    <div style={{
      position: 'relative',
      margin: '0 auto',
      width: '100%',
      height: '100vh',
      paddingBottom: '25vh',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      fontFamily: '"Fira Sans", sans-serif',
      color: '#f5f6fa',
      boxSizing: 'border-box'
    }}>
      {/* Background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(#0C0E10, #446182)',
        zIndex: -1
      }}>
        <div style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          height: '25vh',
          background: '#0C0E10'
        }} />
      </div>

      {/* Left Section */}
      <div style={{
        position: 'relative',
        width: '40%',
        display: 'flex',
        alignItems: 'center'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              textAlign: 'center',
              fontSize: '9em',
              lineHeight: '1.3em',
              margin: '2rem 0 0.5rem 0',
              padding: 0,
              textShadow: '0 0 1rem #fefefe'
            }}
          >
            404
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            style={{
              textAlign: 'center',
              maxWidth: '480px',
              fontSize: '1.5em',
              lineHeight: '1.15em',
              padding: '0 1rem',
              margin: '0 auto 2rem auto'
            }}
          >
            Looks like the page you were looking for is no longer here.
          </motion.p>

          {/* Return Home Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            onClick={() => window.location.href = '/'}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
              padding: '0.8em 1.6em',
              border: 'none',
              borderRadius: '5px',
              fontWeight: 'bold',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              cursor: 'pointer',
              color: isHovered ? '#ffffff' : '#2c9caf',
              transform: isHovered ? 'scale(1.05)' : 'scale(1)',
              outline: `2px solid ${isHovered ? '#70bdca' : '#2c9caf'}`,
              boxShadow: isHovered ? '4px 5px 17px -4px #268391' : 'none',
              transition: 'all 1000ms',
              fontSize: '12px',
              position: 'relative',
              overflow: 'hidden',
              backgroundColor: 'transparent'
            }}
          >
            Return Home
            <motion.div
              style={{
                position: 'absolute',
                left: '-50px',
                top: '0',
                height: '100%',
                backgroundColor: '#2c9caf',
                transform: 'skewX(45deg)',
                zIndex: '-1',
                width: slideWidth
              }}
            />
          </motion.button>
        </div>
      </div>

      {/* Right Section */}
      <div style={{
        position: 'relative',
        width: '50%'
      }}>
        <svg
          style={{
            position: 'absolute',
            bottom: 0,
            paddingTop: '10vh',
            paddingLeft: '1vh',
            maxWidth: '100%',
            maxHeight: '100%'
          }}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="51.5 -15.288 385 505.565"
        >
          <defs>
            <radialGradient id="light-gradient" cx="119.676" cy="44.22" r="65" gradientUnits="userSpaceOnUse">
              <stop offset="0%" style={{ stopColor: '#FFFFFF', stopOpacity: 1 }} />
              <stop offset="50%" style={{ stopColor: '#EDEDED', stopOpacity: 0.5 }}>
                <animate attributeName="stop-opacity" values="0.0;0.5;0.0" dur="5000ms" repeatCount="indefinite" />
              </stop>
              <stop offset="100%" style={{ stopColor: '#EDEDED', stopOpacity: 0 }} />
            </radialGradient>
          </defs>

          {/* Bench Legs */}
          <g className="bench-legs" style={{ fill: '#0C0E10' }}>
            <path d="M202.778,391.666h11.111v98.611h-11.111V391.666z M370.833,390.277h11.111v100h-11.111V390.277z M183.333,456.944h11.111v33.333h-11.111V456.944z M393.056,456.944h11.111v33.333h-11.111V456.944z" />
          </g>

          {/* Top Bench */}
          <g className="top-bench" style={{ stroke: '#0C0E10', strokeWidth: '1px', fill: '#5B3E2B' }}>
            <path d="M396.527,397.917c0,1.534-1.243,2.777-2.777,2.777H190.972c-1.534,0-2.778-1.243-2.778-2.777v-8.333c0-1.535,1.244-2.778,2.778-2.778H393.75c1.534,0,2.777,1.243,2.777,2.778V397.917z M400.694,414.583c0,1.534-1.243,2.778-2.777,2.778H188.194c-1.534,0-2.778-1.244-2.778-2.778v-8.333c0-1.534,1.244-2.777,2.778-2.777h209.723c1.534,0,2.777,1.243,2.777,2.777V414.583z M403.473,431.25c0,1.534-1.244,2.777-2.778,2.777H184.028c-1.534,0-2.778-1.243-2.778-2.777v-8.333c0-1.534,1.244-2.778,2.778-2.778h216.667c1.534,0,2.778,1.244,2.778,2.778V431.25z" />
          </g>

          {/* Bottom Bench */}
          <g className="bottom-bench">
            <path style={{ fill: '#5B3E2B' }} d="M417.361,459.027c0,0.769-1.244,1.39-2.778,1.39H170.139c-1.533,0-2.777-0.621-2.777-1.39v-4.86c0-0.769,1.244-0.694,2.777-0.694h244.444c1.534,0,2.778-0.074,2.778,0.694V459.027z" />
            <path style={{ fill: '#5B3E2B' }} d="M185.417,443.75H400c0,0,18.143,9.721,17.361,10.417l-250-0.696C167.303,451.65,185.417,443.75,185.417,443.75z" />
          </g>

          {/* Lamp */}
          <g id="lamp">
            <path className="lamp-details" style={{ fill: '#202425' }} d="M125.694,421.997c0,1.257-0.73,3.697-1.633,3.697H113.44c-0.903,0-1.633-2.44-1.633-3.697V84.917c0-1.257,0.73-2.278,1.633-2.278h10.621c0.903,0,1.633,1.02,1.633,2.278V421.997z" />
            <path className="lamp-accent" style={{ fill: '#2a2d2f' }} d="M128.472,93.75c0,1.534-1.244,2.778-2.778,2.778h-13.889c-1.534,0-2.778-1.244-2.778-2.778V79.861c0-1.534,1.244-2.778,2.778-2.778h13.889c1.534,0,2.778,1.244,2.778,2.778V93.75z" />
            <circle className="lamp-light" style={{ fill: '#EFEFEF' }} cx="119.676" cy="44.22" r="40.51" />
            <path className="lamp-details" style={{ fill: '#202425' }} d="M149.306,71.528c0,3.242-13.37,13.889-29.861,13.889S89.583,75.232,89.583,71.528c0-4.166,13.369-13.889,29.861-13.889S149.306,67.362,149.306,71.528z" />
            <circle className="lamp-light__glow" style={{ fill: 'url(#light-gradient)' }} cx="119.676" cy="44.22" r="65" />
            <path className="lamp-bottom" style={{ fill: 'linear-gradient(#202425, #0C0E10)' }} d="M135.417,487.781c0,1.378-1.244,2.496-2.778,2.496H106.25c-1.534,0-2.778-1.118-2.778-2.496v-74.869c0-1.378,1.244-2.495,2.778-2.495h26.389c1.534,0,2.778,1.117,2.778,2.495V487.781z" />
          </g>
        </svg>
      </div>

      {/* Mobile Responsive Styles */}
      <style jsx>{`
        @media (max-width: 770px) {
          .container {
            flex-direction: column !important;
            padding-bottom: 0vh !important;
          }
          .left-section {
            width: 100% !important;
            height: 40% !important;
            position: absolute !important;
            top: 0 !important;
          }
          .right-section {
            width: 100% !important;
            height: 60% !important;
            position: absolute !important;
            bottom: 0 !important;
          }
          .heading {
            font-size: 7em !important;
            line-height: 1.15 !important;
            margin: 0 !important;
          }
          .subheading {
            font-size: 1.3em !important;
            line-height: 1.15 !important;
            max-width: 100% !important;
          }
          .ground {
            height: 0vh !important;
          }
          .svgimg {
            padding: 0 !important;
          }
        }
      `}</style>
    </div>
  );
};

export default NotFoundPage;
