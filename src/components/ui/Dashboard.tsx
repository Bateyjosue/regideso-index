import { useState, useEffect } from 'react'
import CardStats from "./CardStats"
import WaterConsumptionChart from "./charts/WaterConsumptionChart"
import LeakageMap from "./charts/LeakageMap"
import RealtimeMetrics from "./charts/RealtimeMetrics"
import SubscriberGrowthChart from "./charts/SubscriberGrowthChart"
import TopPerformingAgencies from "./charts/TopPerformingAgencies"
import WaterQualityIndicator from "./charts/WaterQualityIndicator"
import AlertsPanel from "./charts/AlertsPanel"
import QuickActions from "./charts/QuickActions"

const Dashboard = () => {
  const [realTimeData, setRealTimeData] = useState({
    totalSubscribers: 10000,
    activeAgents: 200,
    currentLeaks: 43,
    totalAgencies: 56,
    waterPressure: 85,
    waterQuality: 92,
    systemEfficiency: 88
  })

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        ...prev,
        totalSubscribers: prev.totalSubscribers + Math.floor(Math.random() * 3),
        currentLeaks: Math.max(0, prev.currentLeaks + (Math.random() > 0.7 ? 1 : -1)),
        waterPressure: Math.max(0, Math.min(100, prev.waterPressure + (Math.random() - 0.5) * 2)),
        waterQuality: Math.max(0, Math.min(100, prev.waterQuality + (Math.random() - 0.5) * 1)),
        systemEfficiency: Math.max(0, Math.min(100, prev.systemEfficiency + (Math.random() - 0.5) * 1.5))
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Water Management Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Real-time monitoring and analytics for REGIDESO operations
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          Live Data
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <CardStats 
          title="Total Subscribers" 
          total={realTimeData.totalSubscribers.toLocaleString()} 
          rate="+2.5%" 
          levelUp
        >
          <svg className="fill-primary dark:fill-white" width="22" height="18" viewBox="0 0 22 18" fill="none">
            <path d="M7.18418 8.03751C9.31543 8.03751 11.0686 6.35313 11.0686 4.25626C11.0686 2.15938 9.31543 0.475006 7.18418 0.475006C5.05293 0.475006 3.2998 2.15938 3.2998 4.25626C3.2998 6.35313 5.05293 8.03751 7.18418 8.03751Z" fill=""/>
            <path d="M15.8124 9.6875C17.6687 9.6875 19.1468 8.24375 19.1468 6.42188C19.1468 4.6 17.6343 3.15625 15.8124 3.15625C13.9905 3.15625 12.478 4.6 12.478 6.42188C12.478 8.24375 13.9905 9.6875 15.8124 9.6875Z" fill=""/>
          </svg>
        </CardStats>

        <CardStats 
          title="Active Agents" 
          total={realTimeData.activeAgents.toString()} 
          rate="+12%" 
          levelUp
        >
          <svg className="fill-primary dark:fill-white" width="22" height="18" viewBox="0 0 22 18" fill="none">
            <path d="M11 9C13.7614 9 16 6.76142 16 4C16 1.23858 13.7614 -1 11 -1C8.23858 -1 6 1.23858 6 4C6 6.76142 8.23858 9 11 9Z" fill=""/>
            <path d="M11 11C6.58172 11 3 14.5817 3 19H19C19 14.5817 15.4183 11 11 11Z" fill=""/>
          </svg>
        </CardStats>

        <CardStats 
          title="Active Leaks" 
          total={realTimeData.currentLeaks.toString()} 
          rate="-8%" 
          levelDown
        >
          <svg className="fill-red-500 dark:fill-red-400" width="22" height="18" viewBox="0 0 22 18" fill="none">
            <path d="M11 0C7.5 0 4.5 3 4.5 6.5C4.5 10 7.5 13 11 13C14.5 13 17.5 10 17.5 6.5C17.5 3 14.5 0 11 0Z" fill=""/>
            <path d="M11 15C9.5 15 8.5 16 8.5 17.5C8.5 18.3 9.2 19 10 19H12C12.8 19 13.5 18.3 13.5 17.5C13.5 16 12.5 15 11 15Z" fill=""/>
          </svg>
        </CardStats>

        <CardStats 
          title="System Efficiency" 
          total={`${realTimeData.systemEfficiency.toFixed(1)}%`} 
          rate="+3.2%" 
          levelUp
        >
          <svg className="fill-primary dark:fill-white" width="22" height="18" viewBox="0 0 22 18" fill="none">
            <path d="M11 2L13.09 8.26L20 9L14 14.74L15.18 21.02L11 18.77L6.82 21.02L8 14.74L2 9L8.91 8.26L11 2Z" fill=""/>
          </svg>
        </CardStats>
      </div>

      {/* Real-time Metrics */}
      <RealtimeMetrics data={realTimeData} />

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Water Consumption Chart - Takes 2 columns */}
        <div className="xl:col-span-2">
          <WaterConsumptionChart />
        </div>
        
        {/* Water Quality Indicator */}
        <div className="xl:col-span-1">
          <WaterQualityIndicator quality={realTimeData.waterQuality} />
        </div>
      </div>

      {/* Secondary Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SubscriberGrowthChart />
        <TopPerformingAgencies />
      </div>

      {/* Map and Alerts */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <LeakageMap />
        </div>
        <div className="xl:col-span-1 space-y-6">
          <AlertsPanel />
          <QuickActions />
        </div>
      </div>
    </div>
  )
}

export default Dashboard