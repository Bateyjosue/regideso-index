import { useState } from 'react'

const LeakageMap = () => {
  const [selectedLeak, setSelectedLeak] = useState<number | null>(null)

  const leaks = [
    { id: 1, x: 25, y: 30, severity: 'high', location: 'Kigali Central - Avenue de la Paix', reported: '2 hours ago' },
    { id: 2, x: 60, y: 45, severity: 'medium', location: 'Butare - Rue Commerciale', reported: '5 hours ago' },
    { id: 3, x: 40, y: 70, severity: 'low', location: 'Gitarama - Avenue Nyamirambo', reported: '1 day ago' },
    { id: 4, x: 75, y: 25, severity: 'high', location: 'Ruhengeri - Rue Principale', reported: '30 minutes ago' },
    { id: 5, x: 15, y: 60, severity: 'medium', location: 'Gisenyi - Avenue du Lac', reported: '3 hours ago' },
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-500 border-red-600'
      case 'medium': return 'bg-yellow-500 border-yellow-600'
      case 'low': return 'bg-blue-500 border-blue-600'
      default: return 'bg-gray-500 border-gray-600'
    }
  }

  const getSeverityText = (severity: string) => {
    switch (severity) {
      case 'high': return 'High Priority'
      case 'medium': return 'Medium Priority'
      case 'low': return 'Low Priority'
      default: return 'Unknown'
    }
  }

  return (
    <div className="bg-white dark:bg-boxdark rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Leak Detection Map
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Real-time leak monitoring across the network
          </p>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-gray-600 dark:text-gray-400">High</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-gray-600 dark:text-gray-400">Medium</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-gray-600 dark:text-gray-400">Low</span>
          </div>
        </div>
      </div>

      <div className="relative">
        {/* Map Container */}
        <div className="relative w-full h-80 bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900 dark:to-blue-900 rounded-lg overflow-hidden">
          {/* Simulated Map Background */}
          <div className="absolute inset-0 opacity-20">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {/* Roads */}
              <path d="M0,20 L100,20" stroke="currentColor" strokeWidth="0.5" className="text-gray-600" />
              <path d="M0,40 L100,40" stroke="currentColor" strokeWidth="0.5" className="text-gray-600" />
              <path d="M0,60 L100,60" stroke="currentColor" strokeWidth="0.5" className="text-gray-600" />
              <path d="M0,80 L100,80" stroke="currentColor" strokeWidth="0.5" className="text-gray-600" />
              <path d="M20,0 L20,100" stroke="currentColor" strokeWidth="0.5" className="text-gray-600" />
              <path d="M40,0 L40,100" stroke="currentColor" strokeWidth="0.5" className="text-gray-600" />
              <path d="M60,0 L60,100" stroke="currentColor" strokeWidth="0.5" className="text-gray-600" />
              <path d="M80,0 L80,100" stroke="currentColor" strokeWidth="0.5" className="text-gray-600" />
            </svg>
          </div>

          {/* Leak Markers */}
          {leaks.map((leak) => (
            <div
              key={leak.id}
              className={`absolute w-4 h-4 rounded-full border-2 cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ${getSeverityColor(leak.severity)} ${
                selectedLeak === leak.id ? 'scale-150 z-10' : 'hover:scale-125'
              }`}
              style={{ left: `${leak.x}%`, top: `${leak.y}%` }}
              onClick={() => setSelectedLeak(selectedLeak === leak.id ? null : leak.id)}
            >
              {leak.severity === 'high' && (
                <div className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-75"></div>
              )}
            </div>
          ))}

          {/* Tooltip */}
          {selectedLeak && (
            <div className="absolute z-20 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 max-w-xs">
              {(() => {
                const leak = leaks.find(l => l.id === selectedLeak)
                if (!leak) return null
                return (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-3 h-3 rounded-full ${getSeverityColor(leak.severity).split(' ')[0]}`}></div>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {getSeverityText(leak.severity)}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      {leak.location}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-500">
                      Reported: {leak.reported}
                    </div>
                  </div>
                )
              })()}
            </div>
          )}
        </div>
      </div>

      {/* Leak Summary */}
      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="text-center">
          <div className="text-2xl font-bold text-red-600">
            {leaks.filter(l => l.severity === 'high').length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">High Priority</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-yellow-600">
            {leaks.filter(l => l.severity === 'medium').length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Medium Priority</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">
            {leaks.filter(l => l.severity === 'low').length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Low Priority</div>
        </div>
      </div>
    </div>
  )
}

export default LeakageMap