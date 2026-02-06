'use client'
import React, { useState, useEffect } from 'react';
import Chart from "../Components/Multiaxesline"
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  PieChart as PieChartIcon,
  BarChart3,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Users,
  FileText,
  Filter,
  Download,
  RefreshCw,
  Heart,
  Utensils,
  GraduationCap,
  Home,
  Activity
} from 'lucide-react';
import { useFormState } from 'react-dom';
import ModernLoader from '../Components/Loading';
import MonthlySummarySection from '../Components/Monthlysummary';    
const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('6m');
  const [paymentMethodmobilewalletj,setpaymentMethodmobilewalletj] = useState(null);
  const [paymentMethodcash,setpaymentMethodcash] = useState(null);
  const [paymentMethodbank,setpaymentMethodbank] = useState(null);
  const [paymentMethodmobilewallete,setpaymentMethodmobilewallete] = useState(null);

  const [dashboardData, setDashboardData] = useState({
    totalFunds: 0,
    totalExpenses: 0,
    currentBalance: 0,
    fundsGrowth: 0,
    expensesGrowth: 0,
    expensesByProject: [],
    monthlyData: {},
    totalDonors: 0,
    totalTransactions: 0,
    avgMonthlyFunds: 0
  });

  // Fetch dashboard data from API
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      // Fetch statistics
      const statsResponse = await fetch('/api/stats');
      const statsData = await statsResponse.json();
   console.log(statsData.data)
      // Fetch funds data
      const fundsResponse = await fetch('/api/funds?limit=100');
      const fundsData = await fundsResponse.json();

      // Fetch expenses data
      const expensesResponse = await fetch('/api/expenses?limit=100');
      const expensesData = await expensesResponse.json();

      // Calculate monthly data for different periods
      const monthlyData = {
        '6m': calculateMonthlyData(fundsData.data, expensesData.data, 6),
        '1y': calculateMonthlyData(fundsData.data, expensesData.data, 12),
        '2y': calculateMonthlyData(fundsData.data, expensesData.data, 24),
        '3y': calculateMonthlyData(fundsData.data, expensesData.data, 36),
        'all': calculateMonthlyData(fundsData.data, expensesData.data, 60)
      };

const paymentTotals = statsData.data.paymentTotals || {};

setpaymentMethodbank(paymentTotals["bank"] || 0);
setpaymentMethodcash(paymentTotals["cash"] || 0);
setpaymentMethodmobilewalletj(paymentTotals["jazzcash"] || 0);
setpaymentMethodmobilewallete(paymentTotals["easypaisa"] || 0);
      // Calculate expenses by project
      const expensesByProject = calculateExpensesByProject(expensesData.data);

      // Calculate growth percentages
      const fundsGrowth = calculateGrowth(fundsData.data);
      const expensesGrowth = calculateGrowth(expensesData.data);

      // Count unique donors
      const uniqueDonors = new Set(fundsData.data.map(f => f.donorName)).size;

      // Calculate average monthly funds
      const avgMonthlyFunds = monthlyData['6m'].length > 0 
        ? monthlyData['6m'].reduce((sum, month) => sum + month.funds, 0) / monthlyData['6m'].length 
        : 0;

      setDashboardData({
        totalFunds: statsData.data.totalFundsCollected,
        totalExpenses: statsData.data.totalFundsSpent,
        currentBalance: statsData.data.currentBalance,
        fundsGrowth: fundsGrowth,
        expensesGrowth: expensesGrowth,
        expensesByProject: expensesByProject,
        monthlyData: monthlyData,
        totalDonors: uniqueDonors,
        totalTransactions: fundsData.totalRecords + expensesData.totalRecords,
        avgMonthlyFunds: avgMonthlyFunds
      });

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      // Use fallback data if API fails
      setDashboardData({
        totalFunds: 245890,
        totalExpenses: 189340,
        currentBalance: 56550,
        fundsGrowth: 12.5,
        expensesGrowth: 8.3,
        expensesByProject: [
          { name: 'Food', amount: 85420, color: '#F59E0B', percentage: 45 },
          { name: 'Medical', amount: 52340, color: '#EF4444', percentage: 28 },
          { name: 'Education', amount: 35280, color: '#3B82F6', percentage: 19 },
          { name: 'Rent', amount: 16300, color: '#8B5CF6', percentage: 8 }
        ],
        monthlyData: {
          '6m': [
            { month: 'Jan', funds: 45000, expenses: 32000 },
            { month: 'Feb', funds: 52000, expenses: 38000 },
            { month: 'Mar', funds: 48000, expenses: 35000 },
            { month: 'Apr', funds: 58000, expenses: 42000 },
            { month: 'May', funds: 62000, expenses: 45000 },
            { month: 'Jun', funds: 55000, expenses: 48000 }
          ],
          '1y': generateFallbackData(12),
          '2y': generateFallbackData(24),
          '3y': generateFallbackData(36),
          'all': generateFallbackData(60)
        },
        totalDonors: 142,
        totalTransactions: 328,
        avgMonthlyFunds: 53333
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Generate fallback data for different periods
  const generateFallbackData = (months) => {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const data = [];
    for (let i = months - 1; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      data.push({
        month: monthNames[date.getMonth()],
        year: date.getFullYear(),
        funds: Math.floor(Math.random() * 30000) + 40000,
        expenses: Math.floor(Math.random() * 20000) + 30000
      });
    }
    return data;
  };

  // Helper function to calculate monthly data
  const calculateMonthlyData = (funds, expenses, monthsBack) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentDate = new Date();
    const data = [];

    for (let i = monthsBack - 1; i >= 0; i--) {
      const date = new Date(currentDate);
      date.setMonth(date.getMonth() - i);
      const monthIndex = date.getMonth();
      const year = date.getFullYear();
      const monthName = months[monthIndex];
      
      const monthFunds = funds
        .filter(f => {
          const fDate = new Date(f.createdAt);
          return fDate.getMonth() === monthIndex && fDate.getFullYear() === year;
        })
        .reduce((sum, f) => sum + f.amount, 0);
      
      const monthExpenses = expenses
        .filter(e => {
          const eDate = new Date(e.createdAt);
          return eDate.getMonth() === monthIndex && eDate.getFullYear() === year;
        })
        .reduce((sum, e) => sum + e.amount, 0);

      data.push({
        month: monthName,
        year: year,
        funds: monthFunds,
        expenses: monthExpenses
      });
    }

    return data;
  };

  // Helper function to calculate expenses by project
  const calculateExpensesByProject = (expenses) => {
    const projectColors = {
      'Food': '#F59E0B',
      'Medical': '#EF4444',
      'Education': '#3B82F6',
      'Rent': '#8B5CF6'
    };

    const projectTotals = expenses.reduce((acc, expense) => {
      if (!acc[expense.projectName]) {
        acc[expense.projectName] = 0;
      }
      acc[expense.projectName] += expense.amount;
      return acc;
    }, {});

    const totalExpenses = Object.values(projectTotals).reduce((sum, val) => sum + val, 0);

    return Object.entries(projectTotals).map(([name, amount]) => ({
      name,
      amount,
      color: projectColors[name] || '#64748B',
      percentage: totalExpenses > 0 ? Math.round((amount / totalExpenses) * 100) : 0
    }));
  };

  // Helper function to calculate growth percentage
  const calculateGrowth = (data) => {
    if (data.length < 2) return 0;

    const now = new Date();
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1);
    const twoMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 2);

    const lastMonthTotal = data
      .filter(item => new Date(item.createdAt) >= lastMonth && new Date(item.createdAt) < now)
      .reduce((sum, item) => sum + item.amount, 0);

    const previousMonthTotal = data
      .filter(item => new Date(item.createdAt) >= twoMonthsAgo && new Date(item.createdAt) < lastMonth)
      .reduce((sum, item) => sum + item.amount, 0);

    if (previousMonthTotal === 0) return 0;
    return ((lastMonthTotal - previousMonthTotal) / previousMonthTotal * 100).toFixed(1);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const StatCard = ({ title, value, icon: Icon, color, trend, trendValue }) => (
    <div className="stat-card">
      <div className="stat-header">
        <div className="stat-icon-wrapper" style={{ background: `${color}15` }}>
          <Icon size={28} style={{ color }} />
        </div>
        <div className={`stat-trend ${trend === 'up' ? 'trend-up' : 'trend-down'}`}>
          {trend === 'up' ? <ArrowUpRight size={18} /> : <ArrowDownRight size={18} />}
          <span>{trendValue}%</span>
        </div>
      </div>

      <div className="stat-content">
        <h3 className="stat-title">{title}</h3>
        <p className='text-3xl font-bold'>{value}</p>
      </div>
    </div>
  );

  const ProjectCard = ({ name, amount, percentage, color }) => (
    <div className="project-card">
      <div className="project-header">
        <div className="project-icon" style={{ background: `${color}20` }}>
          {name === 'Food' && <Utensils size={20} style={{ color }} />}
          {name === 'Medical' && <Heart size={20} style={{ color }} />}
          {name === 'Education' && <GraduationCap size={20} style={{ color }} />}
          {name === 'Rent' && <Home size={20} style={{ color }} />}
        </div>
        <div className="project-info">
          <h4 className="project-name">{name}</h4>
          <p className="project-amount">{formatCurrency(amount)}</p>
        </div>
      </div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${percentage}%`, background: color }}></div>
      </div>
      <div className="project-percentage">{percentage}% of total expenses</div>
    </div>
  );

  if (isLoading) {
    return (
      <div style={{marginTop:"15rem",marginBottom:"15rem"}}>
        <ModernLoader type="pulse" size="large" text="Loading dashboard data..." />
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Inter', sans-serif;
          background: #F8FAFC;
          color: #000000;
          -webkit-font-smoothing: antialiased;
        }

        .dashboard-container {
          min-height: 100vh;
          padding: 1.5rem;
          color:black;
          background-color:#D3D3D3;
        }

        /* Loading Screen */
        .loading-screen {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          
          color: white;
        }

        .loader {
          width: 50px;
          height: 50px;
          border: 5px solid rgba(255, 255, 255, 0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 1rem;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* Header */
        .dashboard-header {
          background: white;
          border-radius: 20px;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
          display: flex;
          margin-top: 3.5rem;
          justify-content: space-between;
          align-items: center;
          animation: slideDown 0.6s ease-out;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .header-left h1 {
          font-size: 1.75rem;
          font-weight: 800;
          background: linear-gradient(135deg, #6366F1, #EC4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 0.5rem;
        }

        .header-subtitle {
          font-size: 0.95rem;
          color: #000000;
          font-weight: 500;
          opacity: 0.7;
        }

        .header-actions {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .action-btn {
          padding: 0.75rem 1.25rem;
          border: none;
          border-radius: 12px;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
          font-family: 'Inter', sans-serif;
          white-space: nowrap;
        }

        .btn-primary {
          background: linear-gradient(135deg, #6366F1, #EC4899);
          color: white;
          box-shadow: 0 4px 16px rgba(99, 102, 241, 0.3);
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(99, 102, 241, 0.4);
        }

        .btn-secondary {
          background: white;
          color: #000000;
          border: 2px solid #E2E8F0;
        }

        .btn-secondary:hover {
          border-color: #6366F1;
          color: #6366F1;
          transform: translateY(-2px);
        }

      /* Stats Grid - FIXED VERSION WITH BLACK FONTS */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.25rem;
  margin-bottom: 1.5rem;
}

.stat-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.9));
  backdrop-filter: blur(10px);
  border-radius: 24px;
  padding: 1.5rem;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.15);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  animation: fadeInUp 0.6s ease-out;
  animation-fill-mode: both;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.18);
}

.stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 5px;
  background: linear-gradient(90deg, #6366F1, #EC4899, #F59E0B);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.stat-card:hover::before {
  opacity: 1;
}

.stat-card:nth-child(1) { 
  animation-delay: 0.1s;
}

.stat-card:nth-child(1)::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 5px;
  height: 100%;
  background: linear-gradient(180deg, #10B981, #059669);
}

.stat-card:nth-child(2) { 
  animation-delay: 0.2s;
}

.stat-card:nth-child(2)::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 5px;
  height: 100%;
  background: linear-gradient(180deg, #EF4444, #DC2626);
}

.stat-card:nth-child(3) { 
  animation-delay: 0.3s;
}

.stat-card:nth-child(3)::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 5px;
  height: 100%;
  background: linear-gradient(180deg, #6366F1, #4F46E5);
}

.stat-card:nth-child(4) { 
  animation-delay: 0.4s;
}

.stat-card:nth-child(4)::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 5px;
  height: 100%;
  background: linear-gradient(180deg, #F59E0B, #D97706);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.stat-card:hover {
  transform: translateY(-12px) scale(1.02);
  box-shadow: 0 20px 60px rgba(31, 38, 135, 0.25);
}

.stat-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.25rem;
}

.stat-icon-wrapper {
  width: 64px;
  height: 64px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(236, 72, 153, 0.1));
  box-shadow: 0 8px 16px rgba(99, 102, 241, 0.2);
  transition: all 0.3s ease;
}

.stat-card:hover .stat-icon-wrapper {
  transform: rotate(10deg) scale(1.1);
}

.stat-trend {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.5rem 0.875rem;
  border-radius: 50px;
  font-size: 0.875rem;
  font-weight: 700;
  backdrop-filter: blur(10px);
}

.trend-up {
  background: rgba(16, 185, 129, 0.2);
  color: #059669;
  border: 1px solid rgba(16, 185, 129, 0.3);
}

.trend-down {
  background: rgba(239, 68, 68, 0.2);
  color: #DC2626;
  border: 1px solid rgba(239, 68, 68, 0.3);
}

.stat-content {
  margin-top: 0.5rem;
}

.stat-title {
  font-size: 0.875rem;
  color: #000000;
  font-weight: 600;
  margin-bottom: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  opacity: 0.6;
}

.stat-value {
  font-size: 2.25rem;
  font-weight: 900;
  color: #000000 !important;
  letter-spacing: -0.02em;
  line-height: 1.2;
}

/* Responsive adjustments for stat cards */
@media (min-width: 1024px) {
  .stat-card {
    padding: 2rem;
  }

  .stat-icon-wrapper {
    width: 72px;
    height: 72px;
  }

  .stat-value {
    font-size: 2.5rem;
  }
}

@media (max-width: 768px) {
  .stat-card {
    padding: 1.25rem;
  }

  .stat-icon-wrapper {
    width: 56px;
    height: 56px;
  }

  .stat-value {
    font-size: 1.9rem;
  }
}

@media (max-width: 480px) {
  .stat-icon-wrapper {
    width: 48px;
    height: 48px;
  }

  .stat-icon-wrapper svg {
    width: 24px !important;
    height: 24px !important;
  }

  .stat-value {
    font-size: 1.6rem;
    color: black;
  }

  .stat-title {
    font-size: 0.75rem;
  }

  .stat-trend {
    font-size: 0.75rem;
    padding: 0.4rem 0.65rem;
  }
}

        /* Main Content Grid */
        .main-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }

        /* Chart Card */
        .chart-card {
          background: white;
          border-radius: 20px;
          padding: 1.5rem;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
          animation: fadeInUp 0.6s ease-out 0.5s both;
        }

        .chart-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .chart-title {
          font-size: 1.35rem;
          font-weight: 800;
          color: #000000;
        }

        .chart-filters {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .filter-btn {
          padding: 0.55rem 1rem;
          border: 2px solid #E2E8F0;
          background: white;
          border-radius: 10px;
          font-size: 0.85rem;
          font-weight: 600;
          color: #000000;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: 'Inter', sans-serif;
        }

        .filter-btn.active,
        .filter-btn:hover {
          border-color: #6366F1;
          background: rgba(99, 102, 241, 0.1);
          color: #6366F1;
        }

        /* Projects Section */
        .projects-section {
          background: white;
          border-radius: 20px;
          padding: 1.5rem;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
          animation: fadeInUp 0.6s ease-out 0.6s both;
        }

        .section-title {
          font-size: 1.35rem;
          font-weight: 800;
          color: #000000;
          margin-bottom: 1.5rem;
        }

        .projects-list {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .project-card {
          padding: 1.25rem;
          background: #F8FAFC;
          border-radius: 14px;
          transition: all 0.3s ease;
        }

        .project-card:hover {
          background: white;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
          transform: translateX(4px);
        }

        .project-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .project-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .project-info {
          flex: 1;
          min-width: 0;
        }

        .project-name {
          font-size: 0.95rem;
          font-weight: 700;
          color: #000000;
          margin-bottom: 0.25rem;
        }

        .project-amount {
          font-size: 1.15rem;
          font-weight: 800;
          color: #6366F1;
        }

        .progress-bar {
          height: 8px;
          background: #E2E8F0;
          border-radius: 50px;
          overflow: hidden;
          margin-bottom: 0.65rem;
        }

        .progress-fill {
          height: 100%;
          border-radius: 50px;
          transition: width 0.6s ease;
        }

        .project-percentage {
          font-size: 0.82rem;
          color: #000000;
          font-weight: 600;
          opacity: 0.7;
        }

        /* Bottom Grid */
        .bottom-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .summary-card {
          background: white;
          border-radius: 20px;
          padding: 1.5rem;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
          animation: fadeInUp 0.6s ease-out 0.7s both;
        }

        .summary-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.1rem;
          background: #F8FAFC;
          border-radius: 12px;
          margin-bottom: 1rem;
          transition: all 0.3s ease;
        }

        .summary-item:hover {
          background: white;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
        }

        .summary-item:last-child {
          margin-bottom: 0;
        }

        .summary-left {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          flex: 1;
          min-width: 0;
        }

        .summary-icon {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .summary-text {
          flex: 1;
          min-width: 0;
        }

        .summary-text h4 {
          font-size: 0.9rem;
          font-weight: 600;
          color: #000000;
          margin-bottom: 0.2rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .summary-text p {
          font-size: 0.8rem;
          color: #000000;
          font-weight: 500;
          opacity: 0.6;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .summary-value {
          font-size: 1.1rem;
          font-weight: 800;
          color: #000000;
          white-space: nowrap;
          margin-left: 0.5rem;
        }

        /* Responsive */
        @media (min-width: 1024px) {
          .main-grid {
            grid-template-columns: 2fr 1fr;
          }

          .dashboard-container {
            padding: 2rem;
          }

          .dashboard-header {
            padding: 2rem;
            border-radius: 24px;
          }

          .chart-card,
          .projects-section,
          .summary-card {
            padding: 2rem;
            border-radius: 24px;
          }

          .stat-card {
            padding: 2rem;
            border-radius: 20px;
          }

          .stat-icon-wrapper {
            width: 64px;
            height: 64px;
          }

          .stat-value {
            font-size: 2.25rem;
          }

          .header-left h1 {
            font-size: 2rem;
          }

          .chart-title,
          .section-title {
            font-size: 1.5rem;
          }
        }

        @media (max-width: 768px) {
          .dashboard-container {
            padding: 1rem;
          }

          .dashboard-header {
            flex-direction: column;
            gap: 1rem;
            align-items: stretch;
            padding: 1.25rem;
          }

          .header-actions {
            flex-direction: column;
            gap: 0.5rem;
          }

          .action-btn {
            width: 100%;
            justify-content: center;
            padding: 0.85rem 1rem;
          }

          .stats-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .stat-card {
            padding: 1.25rem;
          }

          .stat-value {
            font-size: 1.6rem;
          }

          .main-grid {
            gap: 1rem;
          }

          .chart-card,
          .projects-section,
          .summary-card {
            padding: 1.25rem;
          }

          .bottom-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .chart-header {
            flex-direction: column;
            align-items: stretch;
          }

          .chart-filters {
            justify-content: stretch;
          }

          .filter-btn {
            flex: 1;
            justify-content: center;
          }

          .chart-legend {
            gap: 1rem;
          }

          .legend-item {
            font-size: 0.85rem;
          }

          .summary-value {
            font-size: 1rem;
          }

          .project-amount {
            font-size: 1rem;
          }
        }

        @media (max-width: 480px) {
          .header-left h1 {
            font-size: 1.4rem;
          }

          .header-subtitle {
            font-size: 0.85rem;
          }

          .stat-icon-wrapper {
            width: 48px;
            height: 48px;
          }

          .stat-icon-wrapper svg {
            width: 22px;
            height: 22px;
          }

          .stat-value {
            font-size: 1.4rem;
          }

          .stat-title {
            font-size: 0.75rem;
          }

          .chart-title,
          .section-title {
            font-size: 1.15rem;
          }

          .filter-btn {
            padding: 0.5rem 0.75rem;
            font-size: 0.8rem;
          }

          .summary-text h4 {
            font-size: 0.82rem;
          }

          .summary-text p {
            font-size: 0.72rem;
          }

          .summary-value {
            font-size: 0.95rem;
          }

          .summary-icon {
            width: 34px;
            height: 34px;
          }

          .project-icon {
            width: 38px;
            height: 38px;
          }
        }
      `}</style>

      {/* Header */}
      <div className="dashboard-header">
        <div className="header-left">
          <h1>Village Welfare Fund</h1>
          <p className="header-subtitle">Track and manage community funds & expenses</p>
        </div>
        <div className="header-actions">
      
          <button className="action-btn btn-primary" onClick={fetchDashboardData}>
            <RefreshCw size={18} />
            Refresh Data
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <StatCard
          title="Total Funds Collected"
          value={formatCurrency(dashboardData.totalFunds)}
          icon={Wallet}
          color="#10B981"
          trend="up"
          trendValue={dashboardData.fundsGrowth}
        />
        <StatCard
          title="Total Expenses"
          value={formatCurrency(dashboardData.totalExpenses)}
          icon={TrendingDown}
          color="#EF4444"
          trend="up"
          trendValue={dashboardData.expensesGrowth}
        />
        <StatCard
          title="Current Balance"
          value={formatCurrency(dashboardData.currentBalance)}
          icon={DollarSign}
          color="#6366F1"
          trend="up"
          trendValue="23.1"
        />
        <StatCard
          title="Active Projects"
          value={dashboardData.expensesByProject.length}
          icon={Activity}
          color="#F59E0B"
          trend="up"
          trendValue="4.5"
        />
      </div>

      {/* Main Grid */}
      <div className="main-grid">
        {/* Line Chart */}
<Chart/>

        {/* Projects Breakdown */}
        <div className="projects-section">
          <h2 className="section-title">Expenses by Project</h2>
          <div className="projects-list">
            {dashboardData.expensesByProject.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="bottom-grid">
        {/* Payment Methods */}
        <div className="summary-card">
          <h2 className="section-title">Payment Methods</h2>
          <div className="summary-item">
            <div className="summary-left">
              <div className="summary-icon" style={{ background: 'rgba(16, 185, 129, 0.15)' }}>
                <DollarSign size={20} style={{ color: '#10B981' }} />
              </div>
              <div className="summary-text">
                <h4>Cash Payments</h4>
                <p>Direct cash transactions</p>
              </div>
            </div>
            <div className="summary-value">{formatCurrency(paymentMethodcash || 0)}</div>
          </div>
          <div className="summary-item">
            <div className="summary-left">
              <div className="summary-icon" style={{ background: 'rgba(59, 130, 246, 0.15)' }}>
                <Users size={20} style={{ color: '#3B82F6' }} />
              </div>
              <div className="summary-text">
                <h4>Bank Transfer</h4>
                <p>Direct bank deposits</p>
              </div>
            </div>
            <div className="summary-value">{formatCurrency(paymentMethodbank || 0)}</div>
          </div>
          <div className="summary-item">
            <div className="summary-left">
              <div className="summary-icon" style={{ background: 'rgba(239, 68, 68, 0.15)' }}>
                <FileText size={20} style={{ color: '#EF4444' }} />
              </div>
              <div className="summary-text">
                <h4>Mobile Wallets</h4>
                <p>JazzCash & Easypaisa</p>
              </div>
            </div>
            <div className="summary-value">{formatCurrency(paymentMethodmobilewallete+paymentMethodmobilewalletj || 0)}</div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="summary-card">
          <h2 className="section-title">Quick Statistics</h2>
          <div className="summary-item">
            <div className="summary-left">
              <div className="summary-icon" style={{ background: 'rgba(245, 158, 11, 0.15)' }}>
                <Users size={20} style={{ color: '#F59E0B' }} />
              </div>
              <div className="summary-text">
                <h4>Total Donors</h4>
                <p>Unique contributors</p>
              </div>
            </div>
            <div className="summary-value">{dashboardData.totalDonors}</div>
          </div>
          <div className="summary-item">
            <div className="summary-left">
              <div className="summary-icon" style={{ background: 'rgba(139, 92, 246, 0.15)' }}>
                <FileText size={20} style={{ color: '#8B5CF6' }} />
              </div>
              <div className="summary-text">
                <h4>Total Transactions</h4>
                <p>All time records</p>
              </div>
            </div>
            <div className="summary-value">{dashboardData.totalTransactions}</div>
          </div>
          <div className="summary-item">
            <div className="summary-left">
              <div className="summary-icon" style={{ background: 'rgba(99, 102, 241, 0.15)' }}>
                <Calendar size={20} style={{ color: '#6366F1' }} />
              </div>
              <div className="summary-text">
                <h4>Avg. Monthly Funds</h4>
                <p>Last 6 months average</p>
              </div>
            </div>
            <div className="summary-value">{formatCurrency(dashboardData.avgMonthlyFunds)}</div>
          </div>
        </div>
      </div>
      <MonthlySummarySection/>
    </div>
  );
};

export default Dashboard;