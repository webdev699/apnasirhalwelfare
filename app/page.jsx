'use client'
import React, { useState, useEffect } from 'react';
import { Menu, X, Heart, Users, Activity, BookOpen, ArrowRight, Calendar, DollarSign, TrendingUp, Award, Target, Zap, CheckCircle, ArrowUpRight } from 'lucide-react';
import Modernloading from "./Components/Loading"
const VillageWelfareLanding = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [totalfunds, settotalfunds] = useState(0);
  const [totalexpenses, settotalexpenses] = useState(0);
  const [balance, setbalance] = useState(0);
const [loading, setloading] = useState(true)
  async function fetchData() {
    try {
      const res = await fetch('/api/stats');
      if (!res.ok) throw new Error('Network response not ok');
      const jsonData = await res.json();
      settotalfunds(jsonData.data.totalFundsCollected);
      settotalexpenses(jsonData.data.totalFundsSpent);
      setbalance(jsonData.data.currentBalance);
      setloading(false);
      console.log(jsonData);
    } catch (err) {
      console.error('Fetch error:', err);
    }
  }

  useEffect(() => { 
    fetchData();
  }, []);
  
  const projects = [
    {
      title: "Roshan sirhal lights",
      image: "https://res.cloudinary.com/dc3n1nrte/image/upload/v1740408168/lwukcbkdwizm884wsxns.jpg",
      status: "Completed",
      amount: "50000pkr",
      date: "Dec 2024",
      impact: "500+ families"
    },
    {
      title: "Trees for Tomorrow",
      image: "https://res.cloudinary.com/dc3n1nrte/image/upload/v1740460792/lxd61khvtq8htkvq7drw.jpg",
      status: "Completed",
      amount: "40000pkr",
      date: "March 2025",
      impact: "1000+ trees"
    },
    {
      title: "Helping needy families",
      image: "/helping-needy-people.webp",
      status: "On Going",
      amount: "---",
      date: "Feb 2026",
      impact: "20+ families helped"
    } 
  ];

  const stats = [
    { value: "200+", label: "Lives Impacted", icon: Users, color: "#FF6B6B" },
    { value: "5", label: "Projects Completed", icon: CheckCircle, color: "#4ECDC4" },
    { value: "95%", label: "Satisfaction Rate", icon: TrendingUp, color: "#FFD93D" },
  ];

  const galleryImages = [
    "https://res.cloudinary.com/dc3n1nrte/image/upload/v1740460776/s4c44pdgh9ywisrrrl9j.jpg",
    "https://res.cloudinary.com/dc3n1nrte/image/upload/v1740460755/reygt1zivjurlva1twi0.jpg",
    "https://res.cloudinary.com/dc3n1nrte/image/upload/v1740460759/n2grfuy2erefasdj1t6v.jpg",
    "https://res.cloudinary.com/dc3n1nrte/image/upload/v1740460765/rvjhwizddx8yuycrm3ri.jpg",
    "https://res.cloudinary.com/dc3n1nrte/image/upload/v1740461007/shjw67nhivaxn35ts7qc.jpg",
    "https://res.cloudinary.com/dc3n1nrte/image/upload/v1740461019/ddm1h4l1gd48epsocfr1.jpg"
  ];

  return (
    <div className="app-container">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Clash+Display:wght@400;500;600;700&family=Sora:wght@300;400;500;600;700;800&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        :root {
          --primary: #6366F1;
          --primary-dark: #4F46E5;
          --secondary: #EC4899;
          --accent: #F59E0B;
          --success: #10B981;
          --teal: #14B8A6;
          --purple: #A855F7;
          --coral: #FF6B6B;
          --mint: #4ECDC4;
          --sunshine: #FFD93D;
          --lavender: #C084FC;
          --bg: #FAFBFF;
          --bg-alt: #F1F5FF;
          --text: #0F172A;
          --text-light: #475569;
          --text-lighter: #94A3B8;
          --white: #FFFFFF;
          --border: #E2E8F0;
          --shadow-sm: 0 2px 12px rgba(99, 102, 241, 0.08);
          --shadow-md: 0 8px 32px rgba(99, 102, 241, 0.12);
          --shadow-lg: 0 20px 60px rgba(99, 102, 241, 0.15);
          --shadow-colored: 0 20px 60px rgba(236, 72, 153, 0.2);
        }

        body {
          font-family: 'Sora', sans-serif;
          background: var(--bg);
          color: var(--text);
          line-height: 1.7;
          overflow-x: hidden;
          -webkit-font-smoothing: antialiased;
        }

        .app-container {
          min-height: 100vh;
        }

        /* Hero Section */
        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding: 5rem 2rem 2rem;
          overflow: hidden;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
        }

        .hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url('/apnasirhal-hero.webp');
          background-size: cover;
          background-position: center;
          opacity: 0.15;
          z-index: 0;
        }

        .hero-pattern {
          position: absolute;
          inset: 0;
          background-image: 
            radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(236, 72, 153, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 40% 60%, rgba(99, 102, 241, 0.1) 0%, transparent 40%);
          z-index: 1;
        }

        .hero-particles {
          position: absolute;
          inset: 0;
          overflow: hidden;
          z-index: 1;
        }

        .particle {
          position: absolute;
          width: 8px;
          height: 8px;
          background: rgba(255, 255, 255, 0.6);
          border-radius: 50%;
          animation: float 20s infinite;
        }

        .particle:nth-child(1) { left: 10%; top: 20%; animation-delay: 0s; }
        .particle:nth-child(2) { left: 20%; top: 40%; animation-delay: 2s; width: 6px; height: 6px; }
        .particle:nth-child(3) { left: 30%; top: 60%; animation-delay: 4s; width: 10px; height: 10px; }
        .particle:nth-child(4) { left: 40%; top: 80%; animation-delay: 6s; }
        .particle:nth-child(5) { left: 50%; top: 30%; animation-delay: 8s; width: 12px; height: 12px; }
        .particle:nth-child(6) { left: 60%; top: 50%; animation-delay: 10s; }
        .particle:nth-child(7) { left: 70%; top: 70%; animation-delay: 12s; width: 7px; height: 7px; }
        .particle:nth-child(8) { left: 80%; top: 25%; animation-delay: 14s; }
        .particle:nth-child(9) { left: 90%; top: 45%; animation-delay: 16s; width: 9px; height: 9px; }
        .particle:nth-child(10) { left: 85%; top: 65%; animation-delay: 18s; }

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
            transform: translateY(-100px) translateX(50px);
          }
        }

        .hero-content {
          max-width: 1400px;
          margin: 0 auto;
          width: 100%;
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 5rem;
          align-items: center;
          position: relative;
          z-index: 3;
        }

        .hero-text {
          animation: fadeInUp 1s ease-out;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(10px);
          padding: 0.75rem 1.5rem;
          border-radius: 50px;
          color: white;
          font-size: 0.9rem;
          font-weight: 600;
          margin-bottom: 2rem;
          border: 1px solid rgba(255, 255, 255, 0.3);
          animation: fadeInUp 1s ease-out 0.2s backwards;
        }

        .badge-dot {
          width: 8px;
          height: 8px;
          background: var(--success);
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.1);
          }
        }

        .hero-title {
          font-family: 'Clash Display', sans-serif;
          font-size: clamp(2.5rem, 5vw, 4.5rem);
          line-height: 1.1;
          color: white;
          margin-bottom: 1.75rem;
          font-weight: 700;
          letter-spacing: -0.03em;
          animation: fadeInUp 1s ease-out 0.3s backwards;
        }

        .gradient-text {
          background: linear-gradient(135deg, #FFD93D, #FF6B6B);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-subtitle {
          font-size: clamp(1rem, 2vw, 1.35rem);
          color: rgba(255, 255, 255, 0.95);
          margin-bottom: 3rem;
          line-height: 1.8;
          font-weight: 400;
          animation: fadeInUp 1s ease-out 0.5s backwards;
        }

        .hero-buttons {
          display: flex;
          gap: 1.25rem;
          animation: fadeInUp 1s ease-out 0.7s backwards;
          flex-wrap: wrap;
        }

        .hero-btn-primary {
          background: white;
          color: var(--primary);
          padding: 1.25rem 3rem;
          border: none;
          border-radius: 50px;
          font-size: 1.125rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
        }

        .hero-btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.2);
        }

        .hero-btn-secondary {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(10px);
          color: white;
          padding: 1.25rem 3rem;
          border: 2px solid rgba(255, 255, 255, 0.5);
          border-radius: 50px;
          font-size: 1.125rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
        }

        .hero-btn-secondary:hover {
          background: rgba(255, 255, 255, 0.25);
          transform: translateY(-3px);
        }

        .hero-visual {
          position: relative;
          animation: fadeInRight 1s ease-out 0.5s backwards;
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .hero-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 32px;
          padding: 3rem;
          box-shadow: 0 24px 80px rgba(0, 0, 0, 0.15);
          border: 1px solid rgba(255, 255, 255, 0.5);
        }

        .hero-card-image {
          width: 100%;
          height: 320px;
          border-radius: 24px;
          overflow: hidden;
          margin-bottom: 2rem;
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
        }

        .hero-card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .hero-stats {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }

        .stat-item {
          text-align: center;
          padding: 1.5rem;
          background: var(--bg);
          border-radius: 20px;
          transition: all 0.3s ease;
        }

        .stat-item:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-md);
        }

        .stat-value {
          font-family: 'Clash Display', sans-serif;
          font-size: clamp(1.8rem, 3vw, 2.5rem);
          font-weight: 700;
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 0.5rem;
        }

        .stat-label {
          font-size: 0.9rem;
          color: var(--text-light);
          font-weight: 600;
        }

        /* Fund Cards */
        .fund-cards {
          position: absolute;
          bottom: -100px;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          max-width: 1200px;
          padding: 0 2rem;
          z-index: 10;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        /* Mobile fund cards container */
        .fund-cards-mobile {
          display: none;
        }

        .fund-card {
          background: white;
          border-radius: 24px;
          padding: 2.5rem;
          box-shadow: var(--shadow-lg);
          border: 1px solid var(--border);
          transition: all 0.4s ease;
          animation: fadeInUp 1s ease-out backwards;
          position: relative;
          overflow: hidden;
        }

        .fund-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, var(--primary), var(--secondary));
        }

        .fund-card:nth-child(1) { animation-delay: 0.9s; }
        .fund-card:nth-child(2) { animation-delay: 1.1s; }
        .fund-card:nth-child(3) { animation-delay: 1.3s; }

        .fund-card:hover {
          transform: translateY(-12px);
          box-shadow: var(--shadow-colored);
        }

        .fund-header {
          display: flex;
          justify-content: space-between;
          align-items: start;
          margin-bottom: 1.5rem;
        }

        .fund-label {
          font-size: 0.95rem;
          color: var(--text-light);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .fund-icon-wrapper {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(236, 72, 153, 0.1));
        }

        .fund-amount {
          font-family: 'Clash Display', sans-serif;
          font-size: clamp(2rem, 3vw, 3rem);
          font-weight: 700;
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 0.75rem;
        }

        .fund-change {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.9rem;
          color: var(--success);
          font-weight: 600;
        }

        /* Stats Section */
        .stats-section {
          padding: 14rem 2rem 6rem;
          background: var(--bg);
        }

        .stats-container {
          max-width: 1400px;
          margin: 0 auto;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2.5rem;
        }

        .stat-card {
          background: white;
          padding: 3rem 2rem;
          border-radius: 24px;
          text-align: center;
          box-shadow: var(--shadow-sm);
          border: 1px solid var(--border);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .stat-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--primary), var(--secondary));
          transform: scaleX(0);
          transition: transform 0.4s ease;
        }

        .stat-card:hover::before {
          transform: scaleX(1);
        }

        .stat-card:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-lg);
        }

        .stat-icon {
          width: 80px;
          height: 80px;
          margin: 0 auto 1.5rem;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          transition: all 0.4s ease;
        }

        .stat-card:hover .stat-icon {
          transform: scale(1.1) rotate(5deg);
        }

        .stat-number {
          font-family: 'Clash Display', sans-serif;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 700;
          color: var(--text);
          margin-bottom: 0.75rem;
        }

        .stat-text {
          font-size: 1.125rem;
          color: var(--text-light);
          font-weight: 600;
        }

        /* Impact Section */
        .impact-section {
          padding: 6rem 2rem;
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          position: relative;
          overflow: hidden;
        }

        .impact-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: 
            radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 70% 70%, rgba(255, 255, 255, 0.08) 0%, transparent 50%);
        }

        .impact-container {
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .section-header {
          text-align: center;
          margin-bottom: 5rem;
        }

        .section-badge {
          display: inline-block;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          padding: 0.75rem 1.5rem;
          border-radius: 50px;
          color: white;
          font-size: 0.9rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .section-title {
          font-family: 'Clash Display', sans-serif;
          font-size: clamp(2.5rem, 5vw, 4rem);
          color: white;
          margin-bottom: 1.5rem;
          font-weight: 700;
          letter-spacing: -0.02em;
        }

        .section-desc {
          font-size: clamp(1rem, 2vw, 1.35rem);
          color: rgba(255, 255, 255, 0.9);
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.8;
        }

        .impact-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
        }

        .impact-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          padding: 3rem 2rem;
          border-radius: 24px;
          text-align: center;
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.5);
          transition: all 0.4s ease;
        }

        .impact-card:hover {
          transform: translateY(-12px);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
          background: white;
        }

        .impact-icon {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
          color: white;
          transition: all 0.4s ease;
          box-shadow: 0 8px 24px rgba(99, 102, 241, 0.3);
        }

        .impact-card:hover .impact-icon {
          transform: scale(1.1) rotate(-5deg);
        }

        .impact-title {
          font-family: 'Clash Display', sans-serif;
          font-size: clamp(1.25rem, 2vw, 1.5rem);
          color: var(--text);
          font-weight: 700;
          margin-bottom: 1rem;
        }

        .impact-desc {
          font-size: 1rem;
          color: var(--text-light);
          line-height: 1.7;
        }

        /* Projects Section */
        .projects-section {
          padding: 8rem 2rem;
          background: var(--bg-alt);
        }

        .projects-container {
          max-width: 1400px;
          margin: 0 auto;
        }

        .projects-header {
          text-align: center;
          margin-bottom: 5rem;
        }

        .projects-title {
          font-family: 'Clash Display', sans-serif;
          font-size: clamp(2.5rem, 5vw, 4rem);
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 1.5rem;
          font-weight: 700;
        }

        .projects-subtitle {
          font-size: clamp(1rem, 2vw, 1.25rem);
          color: var(--text-light);
          max-width: 600px;
          margin: 0 auto;
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 3rem;
          margin-bottom: 4rem;
        }

        .project-card {
          background: white;
          border-radius: 28px;
          overflow: hidden;
          box-shadow: var(--shadow-sm);
          border: 1px solid var(--border);
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .project-card:hover {
          transform: translateY(-12px);
          box-shadow: var(--shadow-colored);
        }

        .project-image {
          width: 100%;
          height: 280px;
          overflow: hidden;
          position: relative;
        }

        .project-image::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.3), transparent);
        }

        .project-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .project-card:hover .project-image img {
          transform: scale(1.15);
        }

        .project-content {
          padding: 2.5rem;
        }

        .project-header {
          display: flex;
          justify-content: space-between;
          align-items: start;
          margin-bottom: 1.5rem;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .project-title {
          font-family: 'Clash Display', sans-serif;
          font-size: clamp(1.25rem, 2vw, 1.5rem);
          color: var(--text);
          font-weight: 700;
          flex: 1;
          min-width: 200px;
        }

        .status-badge {
          padding: 0.625rem 1.25rem;
          border-radius: 50px;
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          white-space: nowrap;
        }

        .status-completed {
          background: linear-gradient(135deg, #10B981, #059669);
          color: white;
        }

        .status-ongoing {
          background: linear-gradient(135deg, #F59E0B, #D97706);
          color: white;
        }

        .status-inprogress {
          background: linear-gradient(135deg, #3B82F6, #2563EB);
          color: white;
        }

        .project-impact {
          font-size: 0.95rem;
          color: var(--text-light);
          margin-bottom: 1.5rem;
          font-weight: 600;
        }

        .project-meta {
          display: flex;
          gap: 2rem;
          padding-top: 1.5rem;
          border-top: 2px solid var(--bg-alt);
          flex-wrap: wrap;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 0.625rem;
          color: var(--text-light);
          font-size: 1rem;
          font-weight: 600;
        }

        .meta-icon {
          color: var(--primary);
        }

        /* Gallery Section */
        .gallery-section {
          padding: 8rem 2rem;
          background: white;
        }

        .gallery-container {
          max-width: 1400px;
          margin: 0 auto;
        }

        .gallery-header {
          text-align: center;
          margin-bottom: 5rem;
        }

        .gallery-title {
          font-family: 'Clash Display', sans-serif;
          font-size: clamp(2.5rem, 5vw, 4rem);
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 1.5rem;
          font-weight: 700;
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
        }

        .gallery-item {
          border-radius: 24px;
          overflow: hidden;
          aspect-ratio: 1;
          box-shadow: var(--shadow-sm);
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
        }

        .gallery-item::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.8), rgba(236, 72, 153, 0.8));
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .gallery-item:hover::after {
          opacity: 1;
        }

        .gallery-item:hover {
          transform: scale(1.05);
          box-shadow: var(--shadow-lg);
          z-index: 10;
        }

        .gallery-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .gallery-item:hover img {
          transform: scale(1.1);
        }

        /* CTA Section */
        .cta-section {
          padding: 8rem 2rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          position: relative;
          overflow: hidden;
        }

        .cta-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: 
            radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(255, 255, 255, 0.08) 0%, transparent 50%);
        }

        .cta-content {
          max-width: 900px;
          margin: 0 auto;
          text-align: center;
          position: relative;
          z-index: 1;
        }

        .cta-badge {
          display: inline-block;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          padding: 0.75rem 1.5rem;
          border-radius: 50px;
          color: white;
          font-size: 0.9rem;
          font-weight: 700;
          margin-bottom: 2rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .cta-title {
          font-family: 'Clash Display', sans-serif;
          font-size: clamp(2rem, 5vw, 4rem);
          color: white;
          margin-bottom: 2rem;
          font-weight: 700;
          line-height: 1.2;
        }

        .cta-text {
          font-size: clamp(1rem, 2vw, 1.35rem);
          color: rgba(255, 255, 255, 0.95);
          margin-bottom: 3.5rem;
          line-height: 1.8;
        }

        .cta-buttons {
          display: flex;
          gap: 1.5rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .cta-btn-primary {
          background: white;
          color: var(--primary);
          padding: 1.25rem 3.5rem;
          border: none;
          border-radius: 50px;
          font-size: 1.125rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
        }

        .cta-btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.2);
        }

        .cta-btn-secondary {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(10px);
          color: white;
          padding: 1.25rem 3.5rem;
          border: 2px solid white;
          border-radius: 50px;
          font-size: 1.125rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .cta-btn-secondary:hover {
          background: white;
          color: var(--primary);
          transform: translateY(-3px);
        }

        /* Responsive Design */
        @media (max-width: 1200px) {
          .hero {
            padding: 4rem 1.5rem 2rem;
          }
          
          .hero-content {
            gap: 4rem;
          }

          .fund-cards {
            padding: 0 1.5rem;
          }
        }

        @media (max-width: 968px) {
          .hero {
            padding: 3rem 1.5rem 2rem;
          }

          .hero-content {
            grid-template-columns: 1fr;
            gap: 3rem;
          }

          .hero-buttons {
            gap: 1rem;
          }

          .hero-btn-primary,
          .hero-btn-secondary {
            padding: 1.125rem 2.5rem;
            font-size: 1rem;
          }

          /* Hide desktop fund cards on mobile */
          .fund-cards {
            display: none;
          }

          /* Show mobile fund cards */
          .fund-cards-mobile {
            display: grid;
            grid-template-columns: 1fr;
            gap: 1.5rem;
            padding: 2rem 1.5rem 0;
            position: relative;
            z-index: 3;
          }

          .stats-section {
            padding-top: 6rem;
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .projects-grid {
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          }
        }

        @media (max-width: 640px) {
          .hero {
            padding: 2rem 1rem 2rem;
          }

          .hero-content {
            gap: 2.5rem;
          }

          .hero-badge {
            font-size: 0.8rem;
            padding: 0.625rem 1.25rem;
          }

          .hero-buttons {
            flex-direction: column;
            width: 100%;
          }

          .hero-btn-primary,
          .hero-btn-secondary {
            width: 100%;
            justify-content: center;
            padding: 1.125rem 2rem;
          }

          .hero-card {
            padding: 2rem;
          }

          .hero-card-image {
            height: 260px;
          }

          .hero-stats {
            grid-template-columns: 1fr;
          }

          .fund-cards-mobile {
            padding: 2rem 1rem 0;
            gap: 1.25rem;
          }

          .fund-card {
            padding: 2rem;
          }

          .stats-section {
            padding: 6rem 1rem 4rem;
          }

          .stats-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .impact-section,
          .projects-section,
          .gallery-section,
          .cta-section {
            padding: 4rem 1rem;
          }

          .section-header,
          .projects-header,
          .gallery-header {
            margin-bottom: 3rem;
          }

          .impact-grid {
            grid-template-columns: 1fr;
          }

          .projects-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .project-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .status-badge {
            align-self: flex-start;
          }

          .gallery-grid {
            grid-template-columns: 1fr;
          }

          .cta-buttons {
            flex-direction: column;
            width: 100%;
          }

          .cta-btn-primary,
          .cta-btn-secondary {
            width: 100%;
            padding: 1.125rem 2rem;
          }
        }

        @media (max-width: 480px) {
          .hero-card-image {
            height: 220px;
          }

          .hero-card {
            padding: 1.5rem;
          }

          .fund-card {
            padding: 1.5rem;
          }

          .project-content {
            padding: 2rem;
          }

          .project-meta {
            gap: 1rem;
          }
        }

        /* Smooth Scroll */
        html {
          scroll-behavior: smooth;
        }
      `}</style>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-pattern"></div>
        <div className="hero-particles">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="particle"></div>
          ))}
        </div>
        
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-badge">
              <span className="badge-dot"></span>
              Trusted by 200+ Community Members
            </div>
            
            <h1 className="hero-title">
              Building a <span className="gradient-text">Brighter Future</span> for Our Village
            </h1>
            
            <p className="hero-subtitle">
              Transparent community welfare dedicated to uplifting lives through education, healthcare, and sustainable development. Together, we create lasting positive change.
            </p>
            
            <div className="hero-buttons">
              <button className="hero-btn-primary">
                Get Started <ArrowRight size={22} />
              </button>
              <button className="hero-btn-secondary">
                Learn More
              </button>
            </div>
          </div>
          
          <div className="hero-visual">
            <div className="hero-card">
              <div className="hero-card-image">
                <img src="/apnasirhal-hero.webp" alt="Community impact" />
              </div>
              
              <div className="hero-stats">
                <div className="stat-item">
                  <div className="stat-value">{loading ? "Loading..." : `${totalfunds}`}</div>
                  <div className="stat-label">Raised</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fund Transparency Cards */}
        <div className="fund-cards">
          <div className="fund-card">
            <div className="fund-header">
              <div className="fund-label">Total Collected</div>
              <div className="fund-icon-wrapper">
                PKR
              </div>
            </div>
            <div className="fund-amount">{loading ? "Loading..." : `${totalfunds} PKR`}</div>
            <div className="fund-change">
              <TrendingUp size={16} />
              +12.5% this month
            </div>
          </div>
          
          <div className="fund-card">
            <div className="fund-header">
              <div className="fund-label">Funds Spent</div>
              <div className="fund-icon-wrapper">
                <Activity size={24} color="#EC4899" />
              </div>
            </div>
            <div className="fund-amount">{loading ? "Loading..." : `${totalexpenses} PKR`}</div>
            <div className="fund-change">
              <CheckCircle size={16} />
              48 projects funded
            </div>
          </div>
          
          <div className="fund-card">
            <div className="fund-header">
              <div className="fund-label">Current Balance</div>
              <div className="fund-icon-wrapper">
                <Heart size={24} color="#F59E0B" />
              </div>
            </div>
            <div className="fund-amount">{loading ? "Loading..." : `${balance} PKR`}</div>
            <div className="fund-change">
              <Target size={16} />
              Available for impact
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Fund Cards - Only visible on mobile */}
      <div className="fund-cards-mobile">
        <div className="fund-card">
          <div className="fund-header">
            <div className="fund-label">Total Collected</div>
            <div className="fund-icon-wrapper">
              PKR
            </div>
          </div>
          <div className="fund-amount">{totalfunds} PKR</div>
          <div className="fund-change">
            <TrendingUp size={16} />
            +12.5% this month
          </div>
        </div>
        
        <div className="fund-card">
          <div className="fund-header">
            <div className="fund-label">Funds Spent</div>
            <div className="fund-icon-wrapper">
              <Activity size={24} color="#EC4899" />
            </div>
          </div>
          <div className="fund-amount">{totalexpenses} PKR</div>
          <div className="fund-change">
            <CheckCircle size={16} />
            48 projects funded
          </div>
        </div>
        
        <div className="fund-card">
          <div className="fund-header">
            <div className="fund-label">Current Balance</div>
            <div className="fund-icon-wrapper">
              <Heart size={24} color="#F59E0B" />
            </div>
          </div>
          <div className="fund-amount">{balance} PKR</div>
          <div className="fund-change">
            <Target size={16} />
            Available for impact
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-icon" style={{ background: stat.color }}>
                  <stat.icon size={40} />
                </div>
                <div className="stat-number">{stat.value}</div>
                <div className="stat-text">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section id="about" className="impact-section">
        <div className="impact-container">
          <div className="section-header">
            <div className="section-badge">Our Impact Areas</div>
            <h2 className="section-title">Creating Real Change</h2>
            <p className="section-desc">
              We focus on four key areas to maximize our community impact and create sustainable development for generations to come.
            </p>
          </div>
          
          <div className="impact-grid">
            <div className="impact-card">
              <div className="impact-icon">
                <Heart size={40} />
              </div>
              <h3 className="impact-title">Helping the Needy</h3>
              <p className="impact-desc">Direct aid to families in crisis and vulnerable community members who need support</p>
            </div>
            
            <div className="impact-card">
              <div className="impact-icon">
                <Users size={40} />
              </div>
              <h3 className="impact-title">Community Growth</h3>
              <p className="impact-desc">Building infrastructure and creating sustainable opportunities for everyone</p>
            </div>
            
            <div className="impact-card">
              <div className="impact-icon">
                <Activity size={40} />
              </div>
              <h3 className="impact-title">Healthcare Support</h3>
              <p className="impact-desc">Medical camps, health awareness programs, and emergency assistance</p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Projects Section */}
      <section id="projects" className="projects-section">
        <div className="projects-container">
          <div className="projects-header">
            <h2 className="projects-title">Recent Projects</h2>
            <p className="projects-subtitle">
              See how your contributions are making a real difference in our community
            </p>
          </div>
          
          <div className="projects-grid">
            {projects.map((project, index) => (
              <div key={index} className="project-card">
                <div className="project-image">
                  <img src={project.image} alt={project.title} />
                </div>
                
                <div className="project-content">
                  <div className="project-header">
                    <h3 className="project-title">{project.title}</h3>
                    <span className={`status-badge status-${project.status.toLowerCase().replace(' ', '')}`}>
                      {project.status}
                    </span>
                  </div>
                  
                  <div className="project-impact">
                    <Award size={18} style={{ display: 'inline', marginRight: '0.5rem', color: '#F59E0B' }} />
                    Impact: {project.impact}
                  </div>
                  
                  <div className="project-meta">
                    <div className="meta-item">
                      <DollarSign className="meta-icon" size={20} />
                      {project.amount}
                    </div>
                    <div className="meta-item">
                      <Calendar className="meta-icon" size={20} />
                      {project.date}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section className="gallery-section">
        <div className="gallery-container">
          <div className="gallery-header">
            <h2 className="gallery-title">Photo Gallery</h2>
            <p className="projects-subtitle">
              Capturing moments of hope, joy, and community transformation
            </p>
          </div>
          
          <div className="gallery-grid">
            {galleryImages.map((img, index) => (
              <div key={index} className="gallery-item">
                <img src={img} alt={`Community work ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <div className="cta-content">
          <div className="cta-badge">Join Our Mission</div>
          
          <h2 className="cta-title">
            Together We Can Make a Lasting Difference
          </h2>
          
          <p className="cta-text">
            Every contribution, big or small, helps us build a stronger, healthier, and more prosperous community. Join hundreds of supporters creating positive change.
          </p>
          
          <div className="cta-buttons">
            <button className="cta-btn-primary">
              Get Involved <ArrowRight size={22} />
            </button>
            <button className="cta-btn-secondary">Contact Us</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VillageWelfareLanding;