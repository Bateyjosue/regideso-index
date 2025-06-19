import { useState } from 'react'

const AlertsPanel = () => {
  const [alerts] = useState([
    {
      id: 1,
      type: 'critical',
      title: 'High Pressure Alert',
      message: 'Pressure exceeding safe limits in Kigali Central',
      time: '2 minutes ago',
      icon: '⚠️'
    },
    {
      id: 2,
      type: 'warning',
      title: 'Low Water Quality',
      message: 'Quality index dropped below 85% in Butare',
      time: '15 minutes ago',
      icon: '🔍'
    },
    {
      id: 3,
      type: 'info',
      title: 'Maintenance Scheduled',
      message: 'Routine maintenance planned for Gitarama',
      time: '1 hour ago',
      icon: '🔧'
    },
    {
      id: 4,
      type: 'success',
      title: 'Leak Repaired',
      message: 'Avenue de la Paix leak successfully fixed',
      time: '2 hours ago',
      icon: '✅'
    }
  ])

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical': return 'border-l-red-500 bg-red-50 dark:bg-red-900/20'
      case 'warning': return 'border-l-yellow-500 bg-yellow-50 dark:bg-yellow-900/20'
      case 'info': return 'border-l-blue-500 bg-blue-50 dark:bg-blue-900/20'
      case 'success': return 'border-l-green-500 bg-green-50 dark:bg-green-900/20'
      default: return 'border-l-gray-500 bg-gray-50 dark:bg-gray-900/20'
    }
  }

  const getTextColor = (type: string) => {
    switch (type) {
      case 'critical': return 'text-red-800 dark:text-red-200'
      case 'warning': return 'text-yellow-800 dark:text-yellow-200'
      case 'info': return 'text-blue-800 dark:text-blue-200'
      case 'success': return 'text-green-800 dark:text-green-200'
      default: return 'text-gray-800 dark:text-gray-200'
    }
  }

  return (
    <div className="bg-white dark:bg-boxdark rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            System Alerts
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Recent notifications and warnings
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {alerts.filter(a => a.type === 'critical').length} Critical
          </span>
        </div>
      </div>

      <div className="space-y-3 max-h-80 overflow-y-auto">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`border-l-4 p-4 rounded-r-lg ${getAlertColor(alert.type)}`}
          >
            <div className="flex items-start gap-3">
              <span className="text-lg">{alert.icon}</span>
              <div className="flex-1 min-w-0">
                <div className={`font-medium ${getTextColor(alert.type)} mb-1`}>
                  {alert.title}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {alert.message}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-500">
                  {alert.time}
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <button className="w-full text-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium">
          View All Alerts
        </button>
      </div>
    </div>
  )
}

export default AlertsPanel