'use client';

import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import Loading from './Loading';
// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const MONTH_NAMES = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

export default function MultiAxisLineChart() {
  const [months, setMonths] = useState([]);
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear()
  );
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch chart data
  const fetchChartData = async (year) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/charts?year=${year}`);
      const json = await res.json();

      if (json.success) {
        setMonths(json.data.months);
        setYears(json.data.years);
      }
    } catch (err) {
      console.error('Chart fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Initial load + year change
  useEffect(() => {
    fetchChartData(selectedYear);
  }, [selectedYear]);

  // 🔹 Chart Data
  const data = {
    labels: months.map(m => MONTH_NAMES[m.month - 1]),
    datasets: [
      {
        label: 'Funds Collected',
        data: months.map(m => m.funds),
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        yAxisID: 'y',
        tension: 0.4,
      },
      {
        label: 'Expenses',
        data: months.map(m => m.expenses),
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.2)',
        yAxisID: 'y1',
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Funds vs Expenses (${selectedYear})`,
      },
    },
    scales: {
      y: {
        type: 'linear',
        position: 'left',
        title: {
          display: true,
          text: 'Funds (PKR)',
        },
      },
      y1: {
        type: 'linear',
        position: 'right',
        title: {
          display: true,
          text: 'Expenses (PKR)',
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  return (
    <div className="w-full space-y-4">
      {/* 🔽 Year Dropdown */}
<div className="flex flex-col sm:flex-row sm:justify-end gap-2">

        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
className="
    w-full sm:w-auto
    border rounded-md
    px-3 py-2
    text-sm
    bg-white
    focus:outline-none
    focus:ring-2
    focus:ring-emerald-500
  "
>
          {years.map(year => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* 📈 Chart */}
      {loading ? (
        <Loading type="pulse" size="large" text="Loading chart..." />
      ) : (
        <Line options={options} data={data} />
      )}
    </div>
  );
}
