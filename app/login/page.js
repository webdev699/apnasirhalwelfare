'use client'
import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Github, Chrome } from 'lucide-react';
import axios from 'axios';
import { DEFAULT_MAX_POSTPONED_STATE_SIZE } from 'next/dist/server/config-shared';

const ModernLoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    const response = await axios.post("/api/admin-login", { email, password });

    // Example: if your API returns a success flag
    if (response.data.success) {
      alert("Login successful!");
      // You can redirect to dashboard
      window.location.href = "/dashboard";
    } else {
      alert("Invalid credentials!");
    }

    // Clear fields after API call
    setEmail("");
    setPassword("");

  } catch (error) {
    console.error("Login error:", error);
    alert("Something went wrong. Please try again.");
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div className="login-container">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        :root {
          --primary: #6366F1;
          --primary-dark: #4F46E5;
          --secondary: #EC4899;
          --accent: #8B5CF6;
          --success: #10B981;
          --text: #0F172A;
          --text-light: #64748B;
          --border: #E2E8F0;
          --bg: #F8FAFC;
          --white: #FFFFFF;
        }

        body {
          font-family: 'Outfit', sans-serif;
          -webkit-font-smoothing: antialiased;
        }

        .login-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
          padding: 2rem;
          position: relative;
          overflow: hidden;
        }

        .login-container::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: 
            radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(236, 72, 153, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.1) 0%, transparent 40%);
        }

        /* Floating particles */
        .particles {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }

        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 50%;
          animation: float 15s infinite;
        }

        .particle:nth-child(1) { left: 10%; top: 20%; animation-delay: 0s; }
        .particle:nth-child(2) { left: 20%; top: 80%; animation-delay: 2s; }
        .particle:nth-child(3) { left: 30%; top: 40%; animation-delay: 4s; }
        .particle:nth-child(4) { left: 40%; top: 90%; animation-delay: 6s; }
        .particle:nth-child(5) { left: 50%; top: 10%; animation-delay: 8s; }
        .particle:nth-child(6) { left: 60%; top: 60%; animation-delay: 10s; }
        .particle:nth-child(7) { left: 70%; top: 30%; animation-delay: 12s; }
        .particle:nth-child(8) { left: 80%; top: 70%; animation-delay: 14s; }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          50% {
            transform: translateY(-80px) translateX(30px);
          }
        }

        .login-wrapper {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 480px;
          animation: slideUp 0.8s ease-out;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .login-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 32px;
          padding: 3rem;
          box-shadow: 0 20px 80px rgba(0, 0, 0, 0.15);
          border: 1px solid rgba(255, 255, 255, 0.5);
        }

        .login-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .logo {
          width: 64px;
          height: 64px;
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          border-radius: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
          box-shadow: 0 12px 32px rgba(99, 102, 241, 0.3);
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 12px 32px rgba(99, 102, 241, 0.3);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 16px 40px rgba(99, 102, 241, 0.4);
          }
        }

        .logo svg {
          width: 32px;
          height: 32px;
          color: white;
        }

        .login-title {
          font-size: 2rem;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 0.5rem;
          letter-spacing: -0.02em;
        }

        .login-subtitle {
          font-size: 1rem;
          color: var(--text-light);
          font-weight: 500;
        }

        .login-form {
          margin-bottom: 2rem;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-label {
          display: block;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text);
          margin-bottom: 0.625rem;
          letter-spacing: 0.01em;
        }

        .input-wrapper {
          position: relative;
        }

        .input-icon {
          position: absolute;
          left: 1.125rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-light);
          pointer-events: none;
        }

        .form-input {
          width: 100%;
          padding: 1.125rem 1.125rem 1.125rem 3.25rem;
          font-size: 1rem;
          font-family: 'Outfit', sans-serif;
          font-weight: 500;
          border: 2px solid var(--border);
          border-radius: 16px;
          background: var(--white);
          color: var(--text);
          transition: all 0.3s ease;
          outline: none;
        }

        .form-input:focus {
          border-color: var(--primary);
          box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
        }

        .form-input::placeholder {
          color: var(--text-light);
          font-weight: 400;
        }

        .password-toggle {
          position: absolute;
          right: 1.125rem;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: var(--text-light);
          cursor: pointer;
          padding: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color 0.3s ease;
        }

        .password-toggle:hover {
          color: var(--primary);
        }

        .form-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .remember-me {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .checkbox {
          width: 20px;
          height: 20px;
          border: 2px solid var(--border);
          border-radius: 6px;
          cursor: pointer;
          appearance: none;
          transition: all 0.3s ease;
          position: relative;
        }

        .checkbox:checked {
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          border-color: var(--primary);
        }

        .checkbox:checked::after {
          content: '✓';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: white;
          font-size: 12px;
          font-weight: 700;
        }

        .checkbox-label {
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--text);
          cursor: pointer;
          user-select: none;
        }

        .forgot-password {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--primary);
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .forgot-password:hover {
          color: var(--primary-dark);
        }

        .submit-btn {
          width: 100%;
          padding: 1.25rem;
          font-size: 1.125rem;
          font-weight: 700;
          font-family: 'Outfit', sans-serif;
          color: white;
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          border: none;
          border-radius: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 8px 24px rgba(99, 102, 241, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          position: relative;
          overflow: hidden;
        }

        .submit-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, var(--primary-dark), var(--accent));
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .submit-btn:hover::before {
          opacity: 1;
        }

        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(99, 102, 241, 0.4);
        }

        .submit-btn:active {
          transform: translateY(0);
        }

        .btn-text {
          position: relative;
          z-index: 1;
        }

        .btn-icon {
          position: relative;
          z-index: 1;
          transition: transform 0.3s ease;
        }

        .submit-btn:hover .btn-icon {
          transform: translateX(4px);
        }

        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .loading-spinner {
          width: 20px;
          height: 20px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .divider {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin: 2rem 0;
        }

        .divider-line {
          flex: 1;
          height: 1px;
          background: var(--border);
        }

        .divider-text {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-light);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .social-login {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .social-btn {
          padding: 1rem;
          font-size: 1rem;
          font-weight: 600;
          font-family: 'Outfit', sans-serif;
          color: var(--text);
          background: var(--white);
          border: 2px solid var(--border);
          border-radius: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.625rem;
        }

        .social-btn:hover {
          border-color: var(--primary);
          background: var(--bg);
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
        }

        .signup-link {
          text-align: center;
          font-size: 0.95rem;
          color: var(--text-light);
          font-weight: 500;
        }

        .signup-link a {
          color: var(--primary);
          font-weight: 700;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .signup-link a:hover {
          color: var(--primary-dark);
          text-decoration: underline;
        }

        /* Responsive */
        @media (max-width: 640px) {
          .login-card {
            padding: 2rem 1.5rem;
            border-radius: 24px;
          }

          .login-header {
            margin-bottom: 2rem;
          }

          .login-title {
            font-size: 1.75rem;
          }

          .login-subtitle {
            font-size: 0.95rem;
          }

          .social-login {
            grid-template-columns: 1fr;
          }

          .form-footer {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;
          }
        }

        @media (max-width: 480px) {
          .login-container {
            padding: 1rem;
          }

          .login-card {
            padding: 1.75rem 1.25rem;
          }

          .login-title {
            font-size: 1.5rem;
          }

          .logo {
            width: 56px;
            height: 56px;
          }

          .logo svg {
            width: 28px;
            height: 28px;
          }
        }
      `}</style>

      {/* Floating Particles */}
      <div className="particles">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="particle"></div>
        ))}
      </div>

      <div className="login-wrapper">
        <div className="login-card">
          {/* Header */}
          <div className="login-header">
            <div className="logo">
              <Lock />
            </div>
            <h1 className="login-title">Welcome Back</h1>
            <p className="login-subtitle">Sign in to continue to your account</p>
          </div>

          {/* Form */}
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="email">Email Address</label>
              <div className="input-wrapper">
                <Mail className="input-icon" size={20} />
                <input
                  type="email"
                  id="email"
                  className="form-input"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="password">Password</label>
              <div className="input-wrapper">
                <Lock className="input-icon" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  className="form-input"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="form-footer">
              <div className="remember-me">
                <input
                  type="checkbox"
                  id="remember"
                  className="checkbox"
                />
                <label htmlFor="remember" className="checkbox-label">
                  Remember me
                </label>
              </div>
              <a href="#" className="forgot-password">Forgot Password?</a>
            </div>

            <button type="submit" className="submit-btn" disabled={isLoading}>
              {isLoading ? (
                <>
                  <div className="loading-spinner"></div>
                  <span className="btn-text">Signing in...</span>
                </>
              ) : (
                <>
                  <span className="btn-text">Sign In</span>
                  <ArrowRight className="btn-icon" size={20} />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
       
          {/* Social Login */}
        


        </div>
      </div>
    </div>
  );
};

export default ModernLoginForm;