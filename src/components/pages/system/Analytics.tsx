import { useState, useEffect } from 'react'
import { Line, Bar, Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import Breadcrumb from '../../ui/Breadcrumb'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('7d')
  const [selectedMetric, setSelectedMetric] = useState('consumption')
  const [loading, setLoading] = useState(false)

  // Mock analytics data
  const [analyticsData, setAnalyticsData] = useState({
    totalSubscribers: 12547,
    activeAgents: 156,
    waterConsumption: 847.2,
    systemEfficiency: 94.8,
    revenue: 2847500,
    leaksDetected: 23,
    avgResponseTime: 2.4,
    customerSatisfaction: 4.6
  })

  const consumptionData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Water Consumption (m³)',
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Predicted Consumption',
        data: [850, 920, 890, 950, 1280, 1350, 1300],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        borderDash: [5, 5],
        fill: false,
        tension: 0.4,
      }
    ]
  }

  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue (RWF)',
        data: [2200000, 2400000, 2300000, 2600000, 2800000, 2847500],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(6, 182, 212, 0.8)'
        ],
        borderColor: [
          'rgb(59, 130, 246)',
          'rgb(16, 185, 129)',
          'rgb(245, 158, 11)',
          'rgb(239, 68, 68)',
          'rgb(139, 92, 246)',
          'rgb(6, 182, 212)'
        ],
        borderWidth: 1,
        borderRadius: 8,
      }
    ]
  }

  const distributionData = {
    labels: ['Domestic Basic', 'Domestic Premium', 'Commercial', 'Industrial', 'Public Services'],
    datasets: [
      {
        data: [45, 25, 15, 10, 5],
        backgroundColor: [
          '#3B82F6',
          '#10B981',
          '#F59E0B',
          '#EF4444',
          '#8B5CF6'
        ],
        borderWidth: 2,
        borderColor: '#ffffff'
      }
    ]
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: 'rgba(0, 0, 0, 0.6)',
        }
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: 'rgba(0, 0, 0, 0.6)',
        }
      },
    },
  }

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        callbacks: {
          label: function(context: any) {
            return `${context.label}: ${context.parsed}%`
          }
        }
      }
    },
    cutout: '60%',
  }

  const kpiCards = [
    {
      title: 'Total Subscribers',
      value: analyticsData.totalSubscribers.toLocaleString(),
      change: '+5.2%',
      trend: 'up',
      icon: '👥',
      color: 'blue'
    },
    {
      title: 'Water Consumption',
      value: `${analyticsData.waterConsumption}k m³`,
      change: '+2.1%',
      trend: 'up',
      icon: '💧',
      color: 'cyan'
    },
    {
      title: 'System Efficiency',
      value: `${analyticsData.systemEfficiency}%`,
      change: '+1.8%',
      trend: 'up',
      icon: '⚡',
      color: 'green'
    },
    {
      title: 'Monthly Revenue',
      value: `${(analyticsData.revenue / 1000000).toFixed(1)}M RWF`,
      change: '+8.4%',
      trend: 'up',
      icon: '💰',
      color: 'purple'
    },
    {
      title: 'Active Agents',
      value: analyticsData.activeAgents.toString(),
      change: '+3.1%',
      trend: 'up',
      icon: '👨‍💼',
      color: 'indigo'
    },
    {
      title: 'Leaks Detected',
      value: analyticsData.leaksDetected.toString(),
      change: '-12.5%',
      trend: 'down',
      icon: '🔧',
      color: 'red'
    },
    {
      title: 'Avg Response Time',
      value: `${analyticsData.avgResponseTime}h`,
      change: '-8.2%',
      trend: 'down',
      icon: '⏱️',
      color: 'orange'
    },
    {
      title: 'Customer Rating',
      value: `${analyticsData.customerSatisfaction}/5`,
      change: '+0.3',
      trend: 'up',
      icon: '⭐',
      color: 'yellow'
    }
  ]

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
      cyan: 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400',
      green: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
      purple: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
      indigo: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400',
      red: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400',
      orange: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400',
      yellow: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  const getTrendColor = (trend: string) => {
    return trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
  }

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? '↗️' : '↘️'
  }

  return (
    <div className="space-y-6">
      <Breadcrumb pageName="Analytics Dashboard" />

      {/* Header */}
      <div className="bg-white dark:bg-boxdark rounded-xl shadow-lg p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Analytics Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Comprehensive insights and performance metrics for water management operations
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              {['24h', '7d', '30d', '90d'].map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                    timeRange === range
                      ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
            
            <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export Data
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((kpi, index) => (
          <div key={index} className="bg-white dark:bg-boxdark rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getColorClasses(kpi.color)}`}>
                <span className="text-2xl">{kpi.icon}</span>
              </div>
              <div className={`flex items-center gap-1 text-sm font-medium ${getTrendColor(kpi.trend)}`}>
                <span>{getTrendIcon(kpi.trend)}</span>
                <span>{kpi.change}</span>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {kpi.value}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {kpi.title}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Water Consumption Trends */}
        <div className="xl:col-span-2 bg-white dark:bg-boxdark rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Water Consumption Trends
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Daily consumption patterns with AI predictions
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">Actual</span>
              <div className="w-3 h-3 border-2 border-green-500 border-dashed rounded-full"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">Predicted</span>
            </div>
          </div>
          <div className="h-80">
            <Line data={consumptionData} options={chartOptions} />
          </div>
        </div>

        {/* Subscriber Distribution */}
        <div className="bg-white dark:bg-boxdark rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Subscriber Distribution
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                By service category
              </p>
            </div>
          </div>
          <div className="h-80">
            <Doughnut data={distributionData} options={doughnutOptions} />
          </div>
        </div>
      </div>

      {/* Revenue Analysis */}
      <div className="bg-white dark:bg-boxdark rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Revenue Analysis
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Monthly revenue trends across all service categories
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {(analyticsData.revenue / 1000000).toFixed(1)}M RWF
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                This Month
              </div>
            </div>
          </div>
        </div>
        <div className="h-80">
          <Bar data={revenueData} options={chartOptions} />
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Performance */}
        <div className="bg-white dark:bg-boxdark rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            System Performance
          </h3>
          <div className="space-y-4">
            {[
              { label: 'Water Quality Index', value: 96.8, color: 'bg-green-500' },
              { label: 'System Uptime', value: 99.2, color: 'bg-blue-500' },
              { label: 'Pressure Stability', value: 94.5, color: 'bg-purple-500' },
              { label: 'Leak Detection Rate', value: 87.3, color: 'bg-orange-500' }
            ].map((metric, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 dark:text-gray-300 font-medium">
                    {metric.label}
                  </span>
                  <span className="text-gray-900 dark:text-white font-bold">
                    {metric.value}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${metric.color} transition-all duration-1000`}
                    style={{ width: `${metric.value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Regional Performance */}
        <div className="bg-white dark:bg-boxdark rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Regional Performance
          </h3>
          <div className="space-y-4">
            {[
              { region: 'Kigali Central', efficiency: 97.2, subscribers: 4250, status: 'excellent' },
              { region: 'Butare', efficiency: 94.8, subscribers: 3180, status: 'good' },
              { region: 'Gitarama', efficiency: 91.5, subscribers: 2890, status: 'good' },
              { region: 'Ruhengeri', efficiency: 88.3, subscribers: 1920, status: 'fair' },
              { region: 'Gisenyi', efficiency: 85.7, subscribers: 1650, status: 'fair' }
            ].map((region, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {region.region}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {region.subscribers.toLocaleString()} subscribers
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-900 dark:text-white">
                    {region.efficiency}%
                  </div>
                  <div className={`text-xs px-2 py-1 rounded-full ${
                    region.status === 'excellent' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                    region.status === 'good' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' :
                    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                  }`}>
                    {region.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Insights and Recommendations */}
      <div className="bg-white dark:bg-boxdark rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          AI-Powered Insights & Recommendations
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              type: 'optimization',
              title: 'Peak Hour Optimization',
              description: 'Consider implementing dynamic pricing during peak hours (6-8 AM, 6-8 PM) to reduce consumption by 12%',
              impact: 'High',
              icon: '📊'
            },
            {
              type: 'maintenance',
              title: 'Preventive Maintenance',
              description: 'Schedule maintenance for Gitarama region next week to prevent potential efficiency drop',
              impact: 'Medium',
              icon: '🔧'
            },
            {
              type: 'expansion',
              title: 'Service Expansion',
              description: 'Ruhengeri region shows 15% growth potential based on demographic analysis',
              impact: 'High',
              icon: '📈'
            }
          ].map((insight, index) => (
            <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{insight.icon}</span>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {insight.title}
                  </h4>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    insight.impact === 'High' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' :
                    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                  }`}>
                    {insight.impact} Impact
                  </span>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {insight.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Analytics