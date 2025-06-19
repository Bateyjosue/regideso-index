const QuickActions = () => {
  const actions = [
    {
      title: 'Emergency Shutdown',
      description: 'Shut down water supply',
      icon: '🚨',
      color: 'bg-red-500 hover:bg-red-600',
      urgent: true
    },
    {
      title: 'Dispatch Team',
      description: 'Send repair team',
      icon: '🚐',
      color: 'bg-blue-500 hover:bg-blue-600',
      urgent: false
    },
    {
      title: 'Quality Test',
      description: 'Run water quality test',
      icon: '🧪',
      color: 'bg-green-500 hover:bg-green-600',
      urgent: false
    },
    {
      title: 'Pressure Adjust',
      description: 'Adjust system pressure',
      icon: '⚙️',
      color: 'bg-purple-500 hover:bg-purple-600',
      urgent: false
    }
  ]

  return (
    <div className="bg-white dark:bg-boxdark rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Quick Actions
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Emergency controls and operations
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {actions.map((action, index) => (
          <button
            key={index}
            className={`${action.color} text-white p-4 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 ${
              action.urgent ? 'ring-2 ring-red-300 animate-pulse' : ''
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{action.icon}</span>
              <div className="text-left">
                <div className="font-medium">{action.title}</div>
                <div className="text-sm opacity-90">{action.description}</div>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">
            Emergency Protocol Active
          </span>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-600 dark:text-green-400">Ready</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuickActions