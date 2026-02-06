'use client'
import React, { useState } from 'react';
import { DollarSign, FileText, CreditCard, Check, X, Loader, TrendingDown, ArrowRight, Banknote, Smartphone, Building2, MoreHorizontal, AlertCircle, Utensils, Heart, GraduationCap, Home } from 'lucide-react';
import axios from "axios";

const AddExpensesForm = () => {
  const [formData, setFormData] = useState({
    amount: '',
    projectName: '',
    customProjectName: '',
    description: '',
    paymentMethod: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  const projectCategories = [
    { value: 'Food', label: 'Food', icon: Utensils, color: '#F59E0B', description: 'Meals & groceries' },
    { value: 'Medical', label: 'Medical', icon: Heart, color: '#EF4444', description: 'Healthcare expenses' },
    { value: 'Education', label: 'Education', icon: GraduationCap, color: '#3B82F6', description: 'School supplies' },
    { value: 'Rent', label: 'Rent', icon: Home, color: '#8B5CF6', description: 'Housing costs' },
    { value: 'Custom', label: 'Other', icon: FileText, color: '#10B981', description: 'Enter custom project' }
  ];

  const paymentMethods = [
    { value: 'cash', label: 'Cash', icon: Banknote, color: '#10B981', description: 'Pay in cash' },
    { value: 'bank', label: 'Bank Transfer', icon: Building2, color: '#3B82F6', description: 'Direct bank transfer' },
    { value: 'jazzcash', label: 'JazzCash', icon: Smartphone, color: '#EF4444', description: 'Mobile wallet' },
    { value: 'easypaisa', label: 'Easypaisa', icon: Smartphone, color: '#10B981', description: 'Mobile wallet' },
    { value: 'other', label: 'Other', icon: MoreHorizontal, color: '#8B5CF6', description: 'Other methods' }
  ];

  const quickAmounts = [500, 1000, 2500, 5000, 10000];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setShowError(false);
    setErrorMessage('');

    // Use custom project name if "Custom" is selected, otherwise use selected category
    const finalProjectName = formData.projectName === 'Custom' 
      ? formData.customProjectName 
      : formData.projectName;

    try {
      
const response = await axios.post(
  "/api/add-expenses",
  {
    amount: parseFloat(formData.amount),
    projectName: finalProjectName,
    description: formData.description || undefined,
    paymentMethod: formData.paymentMethod,
  },
  {
    headers: {
      "Content-Type": "application/json",
    },
  }
);

// axios data is here 👇
const data = response.data;

if (response.status === 201 || data.success) {
  setShowSuccess(true);
  setFormData({
    amount: '',
    projectName: '',
    customProjectName: '',
    description: '',
    paymentMethod: ''
  });
  setShowCustomInput(false);
  setTimeout(() => setShowSuccess(false), 5000);
} else {
  setShowError(true);
  setErrorMessage(data.message || "Failed to add expense");
}




    
    } catch (error) {
      setShowError(true);
      setErrorMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAmount = (amount) => {
    setFormData({ ...formData, amount: amount.toString() });
  };

  const handleProjectSelect = (value) => {
    if (value === 'Custom') {
      setShowCustomInput(true);
      setFormData({ ...formData, projectName: value, customProjectName: '' });
    } else {
      setShowCustomInput(false);
      setFormData({ ...formData, projectName: value, customProjectName: '' });
    }
  };

  return (
    <div className="expenses-container">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

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
          --error: #EF4444;
          --warning: #F59E0B;
          --text: #0F172A;
          --text-light: #64748B;
          --border: #E2E8F0;
          --bg: #F8FAFC;
          --white: #FFFFFF;
        }

        body {
          font-family: 'Plus Jakarta Sans', sans-serif;
          -webkit-font-smoothing: antialiased;
        }

        .expenses-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
          padding: 2rem;
          position: relative;
          overflow: hidden;
        }

        .expenses-container::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: 
            radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(236, 72, 153, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.1) 0%, transparent 40%);
        }

        /* Animated Background */
        .bg-shapes {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }

        .shape {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          animation: float 20s infinite ease-in-out;
        }

        .shape:nth-child(1) {
          width: 300px;
          height: 300px;
          left: -150px;
          top: 20%;
          animation-delay: 0s;
        }

        .shape:nth-child(2) {
          width: 200px;
          height: 200px;
          right: -100px;
          bottom: 20%;
          animation-delay: 7s;
        }

        .shape:nth-child(3) {
          width: 150px;
          height: 150px;
          left: 30%;
          bottom: -75px;
          animation-delay: 14s;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0) scale(1);
            opacity: 0.1;
          }
          50% {
            transform: translateY(-50px) translateX(30px) scale(1.1);
            opacity: 0.2;
          }
        }

        .form-wrapper {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 700px;
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

        .form-card {
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(20px);
          border-radius: 32px;
          padding: 3rem;
          box-shadow: 0 24px 80px rgba(0, 0, 0, 0.15);
          border: 1px solid rgba(255, 255, 255, 0.5);
        }

        .form-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .header-icon {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #EF4444, #F59E0B);
          border-radius: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
          box-shadow: 0 12px 40px rgba(239, 68, 68, 0.3);
          animation: pulse 3s infinite;
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        .header-icon svg {
          width: 40px;
          height: 40px;
          color: white;
        }

        .form-title {
          font-size: 2.25rem;
          font-weight: 800;
          color: var(--text);
          margin-bottom: 0.75rem;
          letter-spacing: -0.02em;
        }

        .form-subtitle {
          font-size: 1.125rem;
          color: var(--text-light);
          font-weight: 500;
          line-height: 1.6;
        }

        /* Alert Messages */
        .alert {
          padding: 1.125rem 1.5rem;
          border-radius: 16px;
          margin-bottom: 2rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          animation: slideDown 0.4s ease-out;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .alert-success {
          background: rgba(16, 185, 129, 0.1);
          border: 2px solid var(--success);
          color: var(--success);
        }

        .alert-error {
          background: rgba(239, 68, 68, 0.1);
          border: 2px solid var(--error);
          color: var(--error);
        }

        .alert-icon {
          flex-shrink: 0;
        }

        .alert-text {
          flex: 1;
          font-weight: 600;
          font-size: 0.95rem;
        }

        .alert-close {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0.6;
          transition: opacity 0.3s ease;
        }

        .alert-close:hover {
          opacity: 1;
        }

        /* Form */
        .expenses-form {
          margin-bottom: 1.5rem;
        }

        .form-section {
          margin-bottom: 2rem;
        }

        .section-label {
          font-size: 1rem;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 1rem;
          letter-spacing: 0.01em;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .required {
          color: var(--error);
          font-size: 1.125rem;
        }

        .optional-badge {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-light);
          background: var(--bg);
          padding: 0.25rem 0.625rem;
          border-radius: 6px;
          margin-left: 0.5rem;
        }

        /* Quick Amount Buttons */
        .quick-amounts {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }

        .quick-amount-btn {
          padding: 1rem 0.5rem;
          font-size: 0.875rem;
          font-weight: 700;
          font-family: 'Plus Jakarta Sans', sans-serif;
          color: var(--text);
          background: var(--white);
          border: 2px solid var(--border);
          border-radius: 14px;
          cursor: pointer;
          transition: all 0.3s ease;
          white-space: nowrap;
        }

        .quick-amount-btn:hover {
          border-color: var(--primary);
          background: rgba(99, 102, 241, 0.05);
          transform: translateY(-2px);
        }

        .quick-amount-btn.active {
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          border-color: transparent;
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(99, 102, 241, 0.3);
        }

        /* Input Fields */
        .input-wrapper {
          position: relative;
        }

        .input-label {
          display: block;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text);
          margin-bottom: 0.625rem;
          letter-spacing: 0.01em;
        }

        .input-icon {
          position: absolute;
          left: 1.125rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-light);
          pointer-events: none;
        }

        .input-currency {
          position: absolute;
          right: 1.125rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-light);
          font-weight: 700;
          font-size: 1rem;
          pointer-events: none;
        }

        .form-input {
          width: 100%;
          padding: 1.125rem 3.5rem 1.125rem 3.25rem;
          font-size: 1rem;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 600;
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
          font-weight: 500;
        }

        .form-textarea {
          width: 100%;
          padding: 1.125rem;
          font-size: 1rem;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 500;
          border: 2px solid var(--border);
          border-radius: 16px;
          background: var(--white);
          color: var(--text);
          transition: all 0.3s ease;
          outline: none;
          resize: vertical;
          min-height: 120px;
        }

        .form-textarea:focus {
          border-color: var(--primary);
          box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
        }

        .form-textarea::placeholder {
          color: var(--text-light);
          font-weight: 500;
        }

        /* Project Categories */
        .project-categories {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .custom-input-wrapper {
          animation: slideDown 0.4s ease-out;
          margin-top: 1rem;
        }

        .custom-input {
          width: 100%;
          padding: 1.125rem 1.125rem 1.125rem 3.25rem;
          font-size: 1rem;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 600;
          border: 2px solid var(--border);
          border-radius: 16px;
          background: var(--white);
          color: var(--text);
          transition: all 0.3s ease;
          outline: none;
        }

        .custom-input:focus {
          border-color: var(--success);
          box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.1);
        }

        .custom-input::placeholder {
          color: var(--text-light);
          font-weight: 500;
        }

        .project-category {
          padding: 1.25rem;
          border: 2px solid var(--border);
          border-radius: 16px;
          background: var(--white);
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .project-category::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--primary), var(--secondary));
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }

        .project-category:hover {
          border-color: var(--primary);
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
        }

        .project-category.active {
          border-color: var(--primary);
          background: rgba(99, 102, 241, 0.05);
          box-shadow: 0 8px 24px rgba(99, 102, 241, 0.15);
        }

        .project-category.active::before {
          transform: scaleX(1);
        }

        .category-icon-wrapper {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 0.875rem;
          transition: all 0.3s ease;
        }

        .project-category.active .category-icon-wrapper {
          transform: scale(1.1);
        }

        .category-label {
          font-size: 1rem;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 0.25rem;
        }

        .category-description {
          font-size: 0.8rem;
          color: var(--text-light);
          font-weight: 500;
        }

        .category-check {
          position: absolute;
          top: 1rem;
          right: 1rem;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transform: scale(0);
          transition: all 0.3s ease;
        }

        .project-category.active .category-check {
          opacity: 1;
          transform: scale(1);
        }

        .category-check svg {
          width: 14px;
          height: 14px;
          color: white;
        }

        /* Payment Methods */
        .payment-methods {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
        }

        .payment-method {
          padding: 1.125rem;
          border: 2px solid var(--border);
          border-radius: 16px;
          background: var(--white);
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          text-align: center;
        }

        .payment-method::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--primary), var(--secondary));
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }

        .payment-method:hover {
          border-color: var(--primary);
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
        }

        .payment-method.active {
          border-color: var(--primary);
          background: rgba(99, 102, 241, 0.05);
          box-shadow: 0 8px 24px rgba(99, 102, 241, 0.15);
        }

        .payment-method.active::before {
          transform: scaleX(1);
        }

        .payment-icon-wrapper {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 0.75rem;
          transition: all 0.3s ease;
        }

        .payment-method.active .payment-icon-wrapper {
          transform: scale(1.1);
        }

        .payment-label {
          font-size: 0.875rem;
          font-weight: 700;
          color: var(--text);
        }

        .payment-check {
          position: absolute;
          top: 0.75rem;
          right: 0.75rem;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transform: scale(0);
          transition: all 0.3s ease;
        }

        .payment-method.active .payment-check {
          opacity: 1;
          transform: scale(1);
        }

        .payment-check svg {
          width: 12px;
          height: 12px;
          color: white;
        }

        /* Submit Button */
        .submit-btn {
          width: 100%;
          padding: 1.375rem;
          font-size: 1.125rem;
          font-weight: 700;
          font-family: 'Plus Jakarta Sans', sans-serif;
          color: white;
          background: linear-gradient(135deg, #EF4444, #F59E0B);
          border: none;
          border-radius: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 8px 24px rgba(239, 68, 68, 0.3);
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
          background: linear-gradient(135deg, #DC2626, #D97706);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .submit-btn:hover::before {
          opacity: 1;
        }

        .submit-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 32px rgba(239, 68, 68, 0.4);
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

        .submit-btn:disabled:hover {
          transform: none;
          box-shadow: 0 8px 24px rgba(239, 68, 68, 0.3);
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

        /* Helper Text */
        .helper-text {
          text-align: center;
          margin-top: 1.5rem;
          font-size: 0.875rem;
          color: var(--text-light);
          font-weight: 500;
        }

        .helper-text a {
          color: var(--primary);
          font-weight: 700;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .helper-text a:hover {
          color: var(--primary-dark);
          text-decoration: underline;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .payment-methods {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .form-card {
            padding: 2rem 1.5rem;
            border-radius: 24px;
          }

          .form-header {
            margin-bottom: 2rem;
          }

          .form-title {
            font-size: 1.875rem;
          }

          .form-subtitle {
            font-size: 1rem;
          }

          .quick-amounts {
            grid-template-columns: repeat(3, 1fr);
          }

          .project-categories {
            grid-template-columns: repeat(2, 1fr);
          }

          .payment-methods {
            grid-template-columns: 1fr;
          }

          .header-icon {
            width: 70px;
            height: 70px;
          }

          .header-icon svg {
            width: 36px;
            height: 36px;
          }
        }

        @media (max-width: 480px) {
          .expenses-container {
            padding: 1rem;
          }

          .form-card {
            padding: 1.75rem 1.25rem;
          }

          .form-title {
            font-size: 1.625rem;
          }

          .quick-amounts {
            grid-template-columns: repeat(2, 1fr);
            gap: 0.625rem;
          }

          .quick-amount-btn {
            padding: 0.875rem 0.5rem;
            font-size: 0.8rem;
          }
        }
      `}</style>

      {/* Animated Background */}
      <div className="bg-shapes">
        <div className="shape"></div>
        <div className="shape"></div>
        <div className="shape"></div>
      </div>

      <div className="form-wrapper">
        <div className="form-card">
          {/* Header */}
          <div className="form-header">
            <div className="header-icon">
              <TrendingDown />
            </div>
            <h1 className="form-title">Add Expense</h1>
            <p className="form-subtitle">
              Record and track expenses for community welfare projects
            </p>
          </div>

          {/* Success Alert */}
          {showSuccess && (
            <div className="alert alert-success">
              <Check className="alert-icon" size={24} />
              <span className="alert-text">
                Expense added successfully! Transaction recorded.
              </span>
              <button className="alert-close" onClick={() => setShowSuccess(false)}>
                <X size={20} />
              </button>
            </div>
          )}

          {/* Error Alert */}
          {showError && (
            <div className="alert alert-error">
              <AlertCircle className="alert-icon" size={24} />
              <span className="alert-text">{errorMessage}</span>
              <button className="alert-close" onClick={() => setShowError(false)}>
                <X size={20} />
              </button>
            </div>
          )}

          {/* Form */}
          <form className="expenses-form" onSubmit={handleSubmit}>
            {/* Amount Section */}
            <div className="form-section">
              <div className="section-label">
                Expense Amount <span className="required">*</span>
              </div>
              
              {/* Quick Amount Buttons */}
              <div className="quick-amounts">
                {quickAmounts.map((amount) => (
                  <button
                    key={amount}
                    type="button"
                    className={`quick-amount-btn ${formData.amount === amount.toString() ? 'active' : ''}`}
                    onClick={() => handleQuickAmount(amount)}
                  >
                    {formatCurrency(amount)}
                  </button>
                ))}
              </div>

              {/* Custom Amount Input */}
              <div className="input-wrapper">
                <DollarSign className="input-icon" size={20} />
                <input
                  type="number"
                  className="form-input"
                  placeholder="Enter expense amount"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  min="0"
                  step="1"
                  required
                />
                <span className="input-currency">PKR</span>
              </div>
            </div>

            {/* Project Category Section */}
            <div className="form-section">
              <div className="section-label">
                Project Category <span className="required">*</span>
              </div>
              
              <div className="project-categories">
                {projectCategories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <div
                      key={category.value}
                      className={`project-category ${formData.projectName === category.value ? 'active' : ''}`}
                      onClick={() => handleProjectSelect(category.value)}
                    >
                      <div
                        className="category-icon-wrapper"
                        style={{ background: `${category.color}15` }}
                      >
                        <Icon size={24} style={{ color: category.color }} />
                      </div>
                      <div className="category-label">{category.label}</div>
                      <div className="category-description">{category.description}</div>
                      <div className="category-check">
                        <Check />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Custom Project Name Input */}
              {showCustomInput && (
                <div className="custom-input-wrapper">
                  <div className="input-wrapper">
                    <FileText className="input-icon" size={20} />
                    <input
                      type="text"
                      className="form-input custom-input"
                      placeholder="Enter custom project name"
                      value={formData.customProjectName}
                      onChange={(e) => setFormData({ ...formData, customProjectName: e.target.value })}
                      required={formData.projectName === 'Custom'}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Description Section */}
            <div className="form-section">
              <div className="section-label">
                Description
                <span className="optional-badge">Optional</span>
              </div>
              
              <textarea
                className="form-textarea"
                placeholder="Add notes or details about this expense (optional)"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows="4"
              />
            </div>

            {/* Payment Method Section */}
            <div className="form-section">
              <div className="section-label">
                Payment Method <span className="required">*</span>
              </div>
              
              <div className="payment-methods">
                {paymentMethods.map((method) => {
                  const Icon = method.icon;
                  return (
                    <div
                      key={method.value}
                      className={`payment-method ${formData.paymentMethod === method.value ? 'active' : ''}`}
                      onClick={() => setFormData({ ...formData, paymentMethod: method.value })}
                    >
                      <div
                        className="payment-icon-wrapper"
                        style={{ background: `${method.color}15` }}
                      >
                        <Icon size={20} style={{ color: method.color }} />
                      </div>
                      <div className="payment-label">{method.label}</div>
                      <div className="payment-check">
                        <Check />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="submit-btn"
              disabled={
                isLoading || 
                !formData.amount || 
                !formData.projectName || 
                (formData.projectName === 'Custom' && !formData.customProjectName) ||
                !formData.paymentMethod
              }
            >
              {isLoading ? (
                <>
                  <div className="loading-spinner"></div>
                  <span className="btn-text">Processing...</span>
                </>
              ) : (
                <>
                  <span className="btn-text">Add Expense</span>
                  <ArrowRight className="btn-icon" size={20} />
                </>
              )}
            </button>
          </form>

          {/* Helper Text */}
          <p className="helper-text">
            Need help? <a href="#">View Guidelines</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddExpensesForm;