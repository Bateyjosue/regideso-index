import { useState, useEffect } from 'react'

interface RealtimeMetricsProps {
  data: {
    waterPressure: number
    waterQuality: number
    systemEfficiency: number
  }
}

const RealtimeMetrics = ({ data }: RealtimeMetricsProps) => {
  const [animatedValues, setAnimatedValues] = useState({
    waterPressure: 0,
    waterQuality: 0,
    systemEfficiency: 0
  })

  useEffect(() => {
    // Animate values when data changes
    const animateValue = (start: number, end: number, duration: number) => {
      const startTime = Date.now()
      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        const current = start + (end - start) * progress
        
        setAnimatedValues(prev => ({
          ...prev,
          waterPressure: data.waterPressure === end ? current : prev.waterPressure,
          waterQuality: data.waterQuality === end ? current : prev.waterQuality,
          systemEfficiency: data.systemEfficiency === end ? current : prev.systemEfficiency
        }))

        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      animate()
    }

    animateValue(animatedValues.waterPressure, data.waterPressure, 1000)
    animateValue(animatedValues.waterQuality, data.waterQuality, 1000)
    animateValue(animatedValues.systemEfficiency, data.systemEfficiency, 1000)
  }, [data])

  const getStatusColor = (value: number, thresholds: { good: number; warning: number }) => {
    if (value >= thresholds.good) return 'text-green-600'
    if (value >= thresholds.warning) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getProgressColor = (value: number, thresholds: { good: number; warning: number }) => {
    if (value >= thresholds.good) return 'bg-green-500'
    if (value >= thresholds.warning) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  const metrics = [
    {
      title: 'Water Pressure',
      value: animatedValues.waterPressure,
      unit: 'PSI',
      icon: '💧',
      thresholds: { good: 80, warning: 60 },
      description: 'System pressure levels'
    },
    {
      title: 'Water Quality',
      value: animatedValues.waterQuality,
      unit: '%',
      icon: '🔬',
      thresholds: { good: 90, warning: 75 },
      description: 'Quality index score'
    },
    {
      title: 'System Efficiency',
      value: animatedValues.systemEfficiency,
      unit: '%',
      icon: '⚡',
      thresholds: { good: 85, warning: 70 },
      description: 'Overall performance'
    }
  ]

  return (
    <div className="bg-white dark:bg-boxdark rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          Real-time System Metrics
        </h3>
        <div className="flex items-center gap-2 text-sm text-green-600">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          Live
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((metric, index) => (
          <div key={index} className="relative">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{metric.icon}</span>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {metric.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {metric.description}
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-3">
              <div className="flex items-baseline gap-1">
                <span className={`text-3xl font-bold ${getStatusColor(metric.value, metric.thresholds)}`}>
                  {metric.value.toFixed(1)}
                </span>
                <span className="text-lg text-gray-600 dark:text-gray-400">
                  {metric.unit}
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
              <div
                className={`h-2 rounded-full transition-all duration-1000 ease-out ${getProgressColor(metric.value, metric.thresholds)}`}
                style={{ width: `${Math.min(metric.value, 100)}%` }}
              ></div>
            </div>

            {/* Status Indicators */}
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>0</span>
              <span className="flex items-center gap-1">
                <div className={`w-2 h-2 rounded-full ${
                  metric.value >= metric.thresholds.good ? 'bg-green-500' :
                  metric.value >= metric.thresholds.warning ? 'bg-yellow-500' : 'bg-red-500'
                }`}></div>
                {metric.value >= metric.thresholds.good ? 'Optimal' :
                 metric.value >= metric.thresholds.warning ? 'Warning' : 'Critical'}
              </span>
              <span>100</span>
            </div>
          </div>
        ))}
      </div>

      {/* System Status Summary */}
      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="font-medium text-gray-900 dark:text-white">
              System Status: Operational
            </span>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Last updated: {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RealtimeMetrics