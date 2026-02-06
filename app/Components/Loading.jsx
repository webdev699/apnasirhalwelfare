import React from 'react';

const ModernLoader = ({ type = 'gradient', size = 'medium', text = 'Loading...' }) => {
  return (
    <div className="loader-container">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        .loader-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 2rem;
          font-family: 'Inter', sans-serif;
        }

        /* Size Variants */
        .loader-small { width: 40px; height: 40px; }
        .loader-medium { width: 60px; height: 60px; }
        .loader-large { width: 80px; height: 80px; }

        /* Loading Text */
        .loader-text {
          font-size: 1rem;
          font-weight: 600;
          color: #64748B;
          letter-spacing: 0.05em;
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }

        /* ==================== GRADIENT SPINNER ==================== */
        .gradient-spinner {
          border: 4px solid rgba(99, 102, 241, 0.1);
          border-top: 4px solid transparent;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          position: relative;
        }

        .gradient-spinner::before {
          content: '';
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          background: linear-gradient(135deg, #6366F1, #EC4899, #F59E0B);
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
          -webkit-mask-composite: xor;
          padding: 4px;
          animation: rotate 2s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @keyframes rotate {
          to { transform: rotate(-360deg); }
        }

        /* ==================== DOTS LOADER ==================== */
        .dots-loader {
          display: flex;
          gap: 0.75rem;
          align-items: center;
        }

        .dot {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: linear-gradient(135deg, #6366F1, #EC4899);
          animation: dotBounce 1.4s ease-in-out infinite;
        }

        .dot:nth-child(1) { animation-delay: 0s; }
        .dot:nth-child(2) { animation-delay: 0.2s; }
        .dot:nth-child(3) { animation-delay: 0.4s; }

        @keyframes dotBounce {
          0%, 80%, 100% {
            transform: scale(0);
            opacity: 0.5;
          }
          40% {
            transform: scale(1);
            opacity: 1;
          }
        }

        /* ==================== PULSE LOADER ==================== */
        .pulse-loader {
          position: relative;
        }

        .pulse-ring {
          position: absolute;
          border-radius: 50%;
          border: 3px solid #6366F1;
          animation: pulseRing 2s ease-out infinite;
        }

        .pulse-ring:nth-child(1) { animation-delay: 0s; }
        .pulse-ring:nth-child(2) { animation-delay: 0.5s; }
        .pulse-ring:nth-child(3) { animation-delay: 1s; }

        @keyframes pulseRing {
          0% {
            inset: 50%;
            opacity: 1;
          }
          100% {
            inset: -20px;
            opacity: 0;
          }
        }

        .pulse-core {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: linear-gradient(135deg, #6366F1, #EC4899);
          animation: pulseCore 2s ease-in-out infinite;
        }

        @keyframes pulseCore {
          0%, 100% { transform: scale(0.8); opacity: 0.8; }
          50% { transform: scale(1); opacity: 1; }
        }

        /* ==================== BARS LOADER ==================== */
        .bars-loader {
          display: flex;
          gap: 0.5rem;
          align-items: center;
          height: 60px;
        }

        .bar {
          width: 8px;
          background: linear-gradient(180deg, #6366F1, #EC4899);
          border-radius: 50px;
          animation: barStretch 1.2s ease-in-out infinite;
        }

        .bar:nth-child(1) { animation-delay: 0s; }
        .bar:nth-child(2) { animation-delay: 0.15s; }
        .bar:nth-child(3) { animation-delay: 0.3s; }
        .bar:nth-child(4) { animation-delay: 0.45s; }
        .bar:nth-child(5) { animation-delay: 0.6s; }

        @keyframes barStretch {
          0%, 100% { height: 20px; }
          50% { height: 60px; }
        }

        /* ==================== CIRCLE LOADER ==================== */
        .circle-loader {
          display: flex;
          position: relative;
        }

        .circle {
          position: absolute;
          border-radius: 50%;
          border: 4px solid transparent;
          animation: circleRotate 2s linear infinite;
        }

        .circle:nth-child(1) {
          width: 100%;
          height: 100%;
          border-top-color: #6366F1;
          animation-duration: 2s;
        }

        .circle:nth-child(2) {
          width: 80%;
          height: 80%;
          top: 10%;
          left: 10%;
          border-right-color: #EC4899;
          animation-duration: 1.5s;
          animation-direction: reverse;
        }

        .circle:nth-child(3) {
          width: 60%;
          height: 60%;
          top: 20%;
          left: 20%;
          border-bottom-color: #F59E0B;
          animation-duration: 1s;
        }

        @keyframes circleRotate {
          to { transform: rotate(360deg); }
        }

        /* ==================== SQUARE LOADER ==================== */
        .square-loader {
          position: relative;
        }

        .square {
          position: absolute;
          border: 3px solid #6366F1;
          border-radius: 8px;
          animation: squareRotate 2s ease-in-out infinite;
        }

        .square:nth-child(1) {
          width: 100%;
          height: 100%;
          animation-delay: 0s;
        }

        .square:nth-child(2) {
          width: 70%;
          height: 70%;
          top: 15%;
          left: 15%;
          border-color: #EC4899;
          animation-delay: 0.3s;
        }

        @keyframes squareRotate {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(180deg); }
        }

        /* ==================== ORBIT LOADER ==================== */
        .orbit-loader {
          position: relative;
        }

        .orbit-center {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #6366F1, #EC4899);
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .orbit-ball {
          position: absolute;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          top: 0;
          left: 50%;
          transform-origin: 50% 30px;
          animation: orbit 1.5s linear infinite;
        }

        .orbit-ball:nth-child(1) {
          background: #6366F1;
          animation-delay: 0s;
        }

        .orbit-ball:nth-child(2) {
          background: #EC4899;
          animation-delay: 0.5s;
        }

        .orbit-ball:nth-child(3) {
          background: #F59E0B;
          animation-delay: 1s;
        }

        @keyframes orbit {
          to { transform: rotate(360deg); }
        }

        /* ==================== WAVE LOADER ==================== */
        .wave-loader {
          display: flex;
          gap: 0.25rem;
          align-items: center;
          height: 60px;
        }

        .wave-bar {
          width: 6px;
          background: linear-gradient(180deg, #6366F1, #EC4899);
          border-radius: 50px;
          animation: wave 1s ease-in-out infinite;
        }

        .wave-bar:nth-child(1) { animation-delay: 0s; }
        .wave-bar:nth-child(2) { animation-delay: 0.1s; }
        .wave-bar:nth-child(3) { animation-delay: 0.2s; }
        .wave-bar:nth-child(4) { animation-delay: 0.3s; }
        .wave-bar:nth-child(5) { animation-delay: 0.4s; }
        .wave-bar:nth-child(6) { animation-delay: 0.5s; }
        .wave-bar:nth-child(7) { animation-delay: 0.6s; }

        @keyframes wave {
          0%, 100% { height: 15px; }
          50% { height: 50px; }
        }

        /* ==================== FLIP LOADER ==================== */
        .flip-loader {
          perspective: 200px;
        }

        .flip-card {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #6366F1, #EC4899);
          border-radius: 12px;
          animation: flip 2s ease-in-out infinite;
          box-shadow: 0 8px 24px rgba(99, 102, 241, 0.3);
        }

        @keyframes flip {
          0%, 100% { transform: rotateY(0deg) rotateX(0deg); }
          50% { transform: rotateY(180deg) rotateX(180deg); }
        }

        /* ==================== BOUNCE LOADER ==================== */
        .bounce-loader {
          display: flex;
          gap: 0.5rem;
        }

        .bounce-ball {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: linear-gradient(135deg, #6366F1, #EC4899);
          animation: bounce 1.4s ease-in-out infinite;
        }

        .bounce-ball:nth-child(1) { animation-delay: 0s; }
        .bounce-ball:nth-child(2) { animation-delay: 0.2s; }
        .bounce-ball:nth-child(3) { animation-delay: 0.4s; }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-30px); }
        }

        /* ==================== INFINITY LOADER ==================== */
        .infinity-loader {
          position: relative;
        }

        .infinity-shape {
          width: 100%;
          height: 50%;
          position: relative;
        }

        .infinity-shape::before,
        .infinity-shape::after {
          content: '';
          position: absolute;
          width: 40%;
          height: 100%;
          border: 4px solid #6366F1;
          border-radius: 50%;
          animation: infinityRotate 2s linear infinite;
        }

        .infinity-shape::before {
          left: 0;
          border-right: transparent;
        }

        .infinity-shape::after {
          right: 0;
          border-left: transparent;
          animation-delay: 1s;
        }

        @keyframes infinityRotate {
          to { transform: rotate(360deg); }
        }
      `}</style>

      {type === 'gradient' && (
        <div className={`gradient-spinner loader-${size}`}></div>
      )}

      {type === 'dots' && (
        <div className="dots-loader">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      )}

      {type === 'pulse' && (
        <div className={`pulse-loader loader-${size}`}>
          <div className="pulse-ring"></div>
          <div className="pulse-ring"></div>
          <div className="pulse-ring"></div>
          <div className="pulse-core"></div>
        </div>
      )}

      {type === 'bars' && (
        <div className="bars-loader">
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      )}

      {type === 'circle' && (
        <div className={`circle-loader loader-${size}`}>
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
        </div>
      )}

      {type === 'square' && (
        <div className={`square-loader loader-${size}`}>
          <div className="square"></div>
          <div className="square"></div>
        </div>
      )}

      {type === 'orbit' && (
        <div className={`orbit-loader loader-${size}`}>
          <div className="orbit-center"></div>
          <div className="orbit-ball"></div>
          <div className="orbit-ball"></div>
          <div className="orbit-ball"></div>
        </div>
      )}

      {type === 'wave' && (
        <div className="wave-loader">
          <div className="wave-bar"></div>
          <div className="wave-bar"></div>
          <div className="wave-bar"></div>
          <div className="wave-bar"></div>
          <div className="wave-bar"></div>
          <div className="wave-bar"></div>
          <div className="wave-bar"></div>
        </div>
      )}

      {type === 'flip' && (
        <div className={`flip-loader loader-${size}`}>
          <div className="flip-card"></div>
        </div>
      )}

      {type === 'bounce' && (
        <div className="bounce-loader">
          <div className="bounce-ball"></div>
          <div className="bounce-ball"></div>
          <div className="bounce-ball"></div>
        </div>
      )}

      {type === 'infinity' && (
        <div className={`infinity-loader loader-${size}`}>
          <div className="infinity-shape"></div>
        </div>
      )}

      {text && <p className="loader-text">{text}</p>}
    </div>
  );
};

export default ModernLoader;


