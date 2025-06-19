import { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const WaterConsumptionChart = () => {
  const [timeRange, setTimeRange] = useState('24h')
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    // Generate mock data based on time range
    const generateData = () => {
      const now = new Date()
      const points = timeRange === '24h' ? 24 : timeRange === '7d' ? 7 : 30
      const labels = []
      const consumption = []
      const pressure = []

      for (let i = points - 1; i >= 0; i--) {
        let date
        if (timeRange === '24h') {
          date = new Date(now.getTime() - i * 60 * 60 * 1000)
          labels.push(date.getHours().toString().padStart(2, '0') + ':00')
        } else if (timeRange === '7d') {
          date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000)
          labels.push(date.toLocaleDateString('en-US', { weekday: 'short' }))
        } else {
          date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000)
          labels.push(date.getDate().toString())
        }

        // Generate realistic consumption data with daily patterns
        const baseConsumption = timeRange === '24h' 
          ? 800 + Math.sin((date.getHours() - 6) * Math.PI / 12) * 200
          : 800 + Math.random() * 400
        
        consumption.push(Math.max(0, baseConsumption + (Math.random() - 0.5) * 100))
        pressure.push(Math.max(0, 85 + (Math.random() - 0.5) * 20))
      }

      return {
        labels,
        datasets: [
          {
            label: 'Water Consumption (m³/h)',
            data: consumption,
            borderColor: 'rgb(59, 130, 246)',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            fill: true,
            tension: 0.4,
            pointRadius: 3,
            pointHoverRadius: 6,
          },
          {
            label: 'System Pressure (PSI)',
            data: pressure,
            borderColor: 'rgb(16, 185, 129)',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            fill: true,
            tension: 0.4,
            pointRadius: 3,
            pointHoverRadius: 6,
            yAxisID: 'y1',
          }
        ]
      }
    }

    setData(generateData())
  }, [timeRange])

  const options = {
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
      title: {
        display: false,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
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
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: 'rgba(0, 0, 0, 0.6)',
          callback: function(value: any) {
            return value + ' m³/h'
          }
        }
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          color: 'rgba(0, 0, 0, 0.6)',
          callback: function(value: any) {
            return value + ' PSI'
          }
        }
      },
    },
    interaction: {
      mode: 'nearest' as const,
      axis: 'x' as const,
      intersect: false,
    },
    elements: {
      point: {
        hoverBackgroundColor: 'white',
        hoverBorderWidth: 2,
      }
    }
  }

  return (
    <div className="bg-white dark:bg-boxdark rounded-lg shadow-lg p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Water Consumption & Pressure
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Real-time monitoring of water distribution system
          </p>
        </div>
        
        <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1 mt-4 sm:mt-0">
          {['24h', '7d', '30d'].map((range) => (
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
      </div>

      <div className="h-80">
        {data && <Line data={data} options={options} />}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">847</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Avg m³/h</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">92.3</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Avg PSI</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">1,247</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Peak m³/h</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-orange-600">98.5%</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Uptime</div>
        </div>
      </div>
    </div>
  )
}

export default WaterConsumptionChart