'use client';

import { useEffect, useState } from 'react';
import { Calendar, TrendingUp, TrendingDown, Wallet, Users, DollarSign } from 'lucide-react';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export default function MonthlySummarySection() {
  const now = new Date();

  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [apiyear ,setApiyear] =useState([]);

  const fetchSummary = async () => {
    setLoading(true);
    const res = await fetch(
      `/api/monthly-summary?year=${year}&month=${month}`
    );
    const json = await res.json();
    if (json.success) {
        setData(json.data);
        setApiyear(json.data.years)
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSummary();
  }, [year, month]);

  const isPositiveBalance = data?.balance >= 0;

  return (
    <div className="w-full mt-6 md:mt-8 bg-gradient-to-br from-white to-gray-50/50 rounded-2xl md:rounded-3xl shadow-lg md:shadow-xl shadow-gray-200/50 border border-gray-100 p-4 md:p-6 lg:p-8 space-y-5 md:space-y-6 transition-all duration-300 hover:shadow-xl md:hover:shadow-2xl hover:shadow-gray-200/60">
      
      {/* Header Section */}
      <div className="flex flex-col gap-3 md:gap-4 pb-4 border-b border-gray-200">
        <div>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Monthly Summary
          </h2>
          <p className="text-xs md:text-sm text-gray-500 mt-1">
            {MONTHS[month - 1]} {year} Financial Overview
          </p>
        </div>
        
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 px-3 md:px-4 py-2 rounded-full border border-blue-100 self-start">
          <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-600" />
          <span className="text-xs md:text-sm font-medium text-blue-900">Period View</span>
        </div>
      </div>

      {/* Filters - Enhanced Design */}
      <div className="grid grid-cols-2 gap-2.5 md:gap-3">
        <div className="relative">
          <label className="block text-xs font-semibold text-gray-600 mb-1.5 ml-0.5">
            Year
          </label>
          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="w-full appearance-none bg-white border-2 border-gray-200 rounded-lg md:rounded-xl px-3 md:px-4 py-2.5 md:py-3 pr-9 md:pr-10 text-sm font-medium text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all cursor-pointer hover:border-gray-300"
          >
            {apiyear.map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
          <div className="absolute right-2.5 md:right-3 top-[34px] md:top-[38px] pointer-events-none">
            <svg className="w-4 h-4 md:w-5 md:h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        <div className="relative">
          <label className="block text-xs font-semibold text-gray-600 mb-1.5 ml-0.5">
            Month
          </label>
          <select
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}
            className="w-full appearance-none bg-white border-2 border-gray-200 rounded-lg md:rounded-xl px-3 md:px-4 py-2.5 md:py-3 pr-9 md:pr-10 text-sm font-medium text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all cursor-pointer hover:border-gray-300"
          >
            {MONTHS.map((m, i) => (
              <option key={i} value={i + 1}>{m}</option>
            ))}
          </select>
          <div className="absolute right-2.5 md:right-3 top-[34px] md:top-[38px] pointer-events-none">
            <svg className="w-4 h-4 md:w-5 md:h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-12 md:py-16 space-y-3 md:space-y-4">
          <div className="relative">
            <div className="w-12 h-12 md:w-16 md:h-16 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
            <DollarSign className="w-5 h-5 md:w-6 md:h-6 text-blue-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          <p className="text-xs md:text-sm font-medium text-gray-500">Loading summary...</p>
        </div>
      ) : (
        <div className="space-y-5 md:space-y-6 animate-fadeIn">
          {/* Main Stats Grid */}
          <div className="grid grid-cols-1 gap-3 md:gap-4 lg:gap-5">
            <SummaryCard 
              title="Funds Collected" 
              value={data.totalFunds}
              icon={<TrendingUp className="w-5 h-5" />}
              gradient="from-emerald-500 to-green-600"
              bgGradient="from-emerald-50 to-green-50"
              trend="+12%"
            />
            <SummaryCard 
              title="Expenses" 
              value={data.totalExpenses}
              icon={<TrendingDown className="w-5 h-5" />}
              gradient="from-rose-500 to-red-600"
              bgGradient="from-rose-50 to-red-50"
              trend="-8%"
            />
            <SummaryCard 
              title="Balance" 
              value={data.balance}
              icon={<Wallet className="w-5 h-5" />}
              gradient={isPositiveBalance ? "from-blue-500 to-indigo-600" : "from-orange-500 to-amber-600"}
              bgGradient={isPositiveBalance ? "from-blue-50 to-indigo-50" : "from-orange-50 to-amber-50"}
              isBalance
              isPositive={isPositiveBalance}
            />
          </div>

          {/* Contributors Section */}
          <div className="bg-gradient-to-br from-white to-gray-50/30 rounded-xl md:rounded-2xl border border-gray-200/60 p-4 md:p-5 lg:p-6 shadow-sm">
            <div className="flex items-center gap-2.5 md:gap-3 mb-3 md:mb-4 pb-3 border-b border-gray-200">
              <div className="p-2 md:p-2.5 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg md:rounded-xl shadow-lg shadow-purple-200">
                <Users className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </div>
              <div>
                <h3 className="text-base md:text-lg font-bold text-gray-900">
                  Contributors
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  {data.contributors.length} active contributor{data.contributors.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>

            <div className="space-y-2 md:space-y-2.5">
              {data.contributors.length === 0 ? (
                <div className="text-center py-6 md:py-8">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-3">
                    <Users className="w-6 h-6 md:w-8 md:h-8 text-gray-400" />
                  </div>
                  <p className="text-xs md:text-sm text-gray-500">No contributors for this period</p>
                </div>
              ) : (
                data.contributors.map((c, i) => (
                  <div
                    key={i}
                    className="group flex items-center justify-between bg-white hover:bg-gradient-to-r hover:from-gray-50 hover:to-white rounded-lg md:rounded-xl px-3 md:px-4 py-3 md:py-3.5 border border-gray-100 hover:border-gray-200 transition-all duration-200 hover:shadow-md active:scale-[0.98]"
                  >
                    <div className="flex items-center gap-2.5 md:gap-3">
                      <div className="w-9 h-9 md:w-10 md:h-10 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center font-bold text-blue-700 text-sm group-hover:scale-110 transition-transform flex-shrink-0">
                        {(c._id || 'A')[0].toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <span className="font-medium text-gray-900 text-sm block truncate">
                          {c._id || 'Anonymous'}
                        </span>
                        <p className="text-xs text-gray-500 mt-0.5">Contributor</p>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0 ml-2">
                      <span className="font-bold text-gray-900 text-sm md:text-base block">
                        PKR {c.total.toLocaleString()}
                      </span>
                      <p className="text-xs text-gray-500 mt-0.5">Total</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SummaryCard({ title, value, icon, gradient, bgGradient, trend, isBalance, isPositive }) {
  return (
    <div className="group relative overflow-hidden rounded-xl md:rounded-2xl bg-white border border-gray-200/60 p-4 md:p-5 lg:p-6 shadow-sm hover:shadow-xl transition-all duration-300 active:scale-[0.98] md:hover:-translate-y-1">
      {/* Background Gradient Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
      
      <div className="relative z-10">
        {/* Icon & Trend */}
        <div className="flex items-start justify-between mb-3 md:mb-4">
          <div className={`p-2.5 md:p-3 bg-gradient-to-br ${gradient} rounded-lg md:rounded-xl shadow-lg shadow-gray-200 group-hover:scale-110 transition-transform duration-300`}>
            <div className="text-white">
              {icon}
            </div>
          </div>
          {trend && (
            <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 md:px-2.5 py-1 rounded-full">
              {trend}
            </span>
          )}
        </div>

        {/* Title */}
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 md:mb-2">
          {title}
        </p>

        {/* Value */}
        <p className={`text-xl md:text-2xl lg:text-3xl font-bold ${
          isBalance 
            ? isPositive 
              ? 'text-blue-700' 
              : 'text-orange-600'
            : 'text-gray-900'
        }`}>
          {isBalance && (isPositive ? '+' : '')}PKR {value.toLocaleString()}
        </p>
      </div>

      {/* Decorative Element */}
      <div className={`absolute -bottom-8 -right-8 w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br ${gradient} opacity-5 rounded-full group-hover:scale-150 transition-transform duration-500`}></div>
    </div>
  );
}