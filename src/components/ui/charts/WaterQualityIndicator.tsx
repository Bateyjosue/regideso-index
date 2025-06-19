interface WaterQualityIndicatorProps {
  quality: number
}

const WaterQualityIndicator = ({ quality }: WaterQualityIndicatorProps) => {
  const getQualityStatus = (value: number) => {
    if (value >= 95) return { status: 'Excellent', color: 'text-green-600', bgColor: 'bg-green-500' }
    if (value >= 85) return { status: 'Good', color: 'text-blue-600', bgColor: 'bg-blue-500' }
    if (value >= 75) return { status: 'Fair', color: 'text-yellow-600', bgColor: 'bg-yellow-500' }
    return { status: 'Poor', color: 'text-red-600', bgColor: 'bg-red-500' }
  }

  const qualityStatus = getQualityStatus(quality)
  const circumference = 2 * Math.PI * 45
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (quality / 100) * circumference

  const parameters = [
    { name: 'pH Level', value: 7.2, unit: '', status: 'Normal' },
    { name: 'Chlorine', value: 0.8, unit: 'mg/L', status: 'Normal' },
    { name: 'Turbidity', value: 0.3, unit: 'NTU', status: 'Good' },
    { name: 'Bacteria', value: 0, unit: 'CFU/100ml', status: 'Safe' },
  ]

  return (
    <div className="bg-white dark:bg-boxdark rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Water Quality Index
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Real-time quality monitoring
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-green-600">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          Live
        </div>
      </div>

      {/* Circular Progress */}
      <div className="flex justify-center mb-6">
        <div className="relative w-32 h-32">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-gray-200 dark:text-gray-700"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className={qualityStatus.color.replace('text-', 'text-')}
              style={{
                transition: 'stroke-dashoffset 1s ease-in-out',
              }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className={`text-2xl font-bold ${qualityStatus.color}`}>
                {quality.toFixed(1)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Quality Index
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Status */}
      <div className="text-center mb-6">
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${qualityStatus.color} bg-opacity-10`}>
          <div className={`w-2 h-2 rounded-full ${qualityStatus.bgColor}`}></div>
          {qualityStatus.status}
        </div>
      </div>

      {/* Parameters */}
      <div className="space-y-3">
        <h4 className="font-medium text-gray-900 dark:text-white mb-3">
          Quality Parameters
        </h4>
        {parameters.map((param, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div>
              <div className="font-medium text-gray-900 dark:text-white">
                {param.name}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {param.value} {param.unit}
              </div>
            </div>
            <div className={`px-2 py-1 rounded text-xs font-medium ${
              param.status === 'Normal' || param.status === 'Good' || param.status === 'Safe'
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
            }`}>
              {param.status}
            </div>
          </div>
        ))}
      </div>

      {/* Last Updated */}
      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>
    </div>
  )
}

export default WaterQualityIndicator