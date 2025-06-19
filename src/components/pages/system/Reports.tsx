import { useState } from 'react'
import Breadcrumb from '../../ui/Breadcrumb'
import toast from 'react-hot-toast'

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState<string>('')
  const [dateRange, setDateRange] = useState({ start: '', end: '' })
  const [filters, setFilters] = useState({
    region: '',
    category: '',
    agent: '',
    format: 'pdf'
  })
  const [loading, setLoading] = useState(false)

  const reportTypes = [
    {
      id: 'consumption',
      name: 'Water Consumption Report',
      description: 'Detailed analysis of water consumption patterns across all regions',
      icon: '💧',
      category: 'Operations',
      frequency: 'Daily/Weekly/Monthly',
      estimatedTime: '2-3 minutes'
    },
    {
      id: 'revenue',
      name: 'Revenue Analysis Report',
      description: 'Financial performance and revenue breakdown by service categories',
      icon: '💰',
      category: 'Financial',
      frequency: 'Monthly/Quarterly',
      estimatedTime: '3-5 minutes'
    },
    {
      id: 'subscriber',
      name: 'Subscriber Management Report',
      description: 'Subscriber growth, churn analysis, and demographic insights',
      icon: '👥',
      category: 'Customer',
      frequency: 'Weekly/Monthly',
      estimatedTime: '2-4 minutes'
    },
    {
      id: 'performance',
      name: 'System Performance Report',
      description: 'Infrastructure performance, uptime, and efficiency metrics',
      icon: '⚡',
      category: 'Technical',
      frequency: 'Daily/Weekly',
      estimatedTime: '1-2 minutes'
    },
    {
      id: 'agent',
      name: 'Agent Performance Report',
      description: 'Field agent productivity, response times, and task completion rates',
      icon: '👨‍💼',
      category: 'HR',
      frequency: 'Weekly/Monthly',
      estimatedTime: '2-3 minutes'
    },
    {
      id: 'maintenance',
      name: 'Maintenance & Repairs Report',
      description: 'Maintenance schedules, repair costs, and equipment status',
      icon: '🔧',
      category: 'Operations',
      frequency: 'Weekly/Monthly',
      estimatedTime: '3-4 minutes'
    },
    {
      id: 'quality',
      name: 'Water Quality Report',
      description: 'Water quality testing results and compliance monitoring',
      icon: '🧪',
      category: 'Quality',
      frequency: 'Daily/Weekly',
      estimatedTime: '1-2 minutes'
    },
    {
      id: 'leaks',
      name: 'Leak Detection Report',
      description: 'Leak incidents, response times, and resolution status',
      icon: '🚰',
      category: 'Operations',
      frequency: 'Daily/Weekly',
      estimatedTime: '2-3 minutes'
    },
    {
      id: 'compliance',
      name: 'Regulatory Compliance Report',
      description: 'Compliance status with government regulations and standards',
      icon: '📋',
      category: 'Compliance',
      frequency: 'Monthly/Quarterly',
      estimatedTime: '5-7 minutes'
    }
  ]

  const recentReports = [
    {
      id: 1,
      name: 'Monthly Revenue Analysis - November 2024',
      type: 'Revenue Analysis Report',
      generatedBy: 'Admin User',
      generatedAt: '2024-12-01 09:30',
      status: 'completed',
      size: '2.4 MB',
      downloads: 12
    },
    {
      id: 2,
      name: 'Weekly Consumption Report - Week 48',
      type: 'Water Consumption Report',
      generatedBy: 'System Auto',
      generatedAt: '2024-11-30 06:00',
      status: 'completed',
      size: '1.8 MB',
      downloads: 8
    },
    {
      id: 3,
      name: 'Agent Performance - November 2024',
      type: 'Agent Performance Report',
      generatedBy: 'HR Manager',
      generatedAt: '2024-11-29 14:15',
      status: 'completed',
      size: '3.1 MB',
      downloads: 15
    },
    {
      id: 4,
      name: 'System Performance - Daily Report',
      type: 'System Performance Report',
      generatedBy: 'System Auto',
      generatedAt: '2024-11-29 00:05',
      status: 'completed',
      size: '892 KB',
      downloads: 5
    },
    {
      id: 5,
      name: 'Water Quality Report - November 2024',
      type: 'Water Quality Report',
      generatedBy: 'Quality Manager',
      generatedAt: '2024-11-28 16:45',
      status: 'processing',
      size: '-',
      downloads: 0
    }
  ]

  const handleGenerateReport = async () => {
    if (!selectedReport) {
      toast.error('Please select a report type')
      return
    }

    if (!dateRange.start || !dateRange.end) {
      toast.error('Please select date range')
      return
    }

    setLoading(true)
    
    try {
      // Simulate report generation
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      const reportType = reportTypes.find(r => r.id === selectedReport)
      toast.success(`${reportType?.name} generated successfully!`)
      
      // Reset form
      setSelectedReport('')
      setDateRange({ start: '', end: '' })
      setFilters({ region: '', category: '', agent: '', format: 'pdf' })
    } catch (error) {
      toast.error('Failed to generate report')
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      case 'processing': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
      case 'failed': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
    }
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      'Operations': 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
      'Financial': 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      'Customer': 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400',
      'Technical': 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400',
      'HR': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-400',
      'Quality': 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/20 dark:text-cyan-400',
      'Compliance': 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
    }
    return colors[category as keyof typeof colors] || colors.Operations
  }

  return (
    <div className="space-y-6">
      <Breadcrumb pageName="Reports & Analytics" />

      {/* Header */}
      <div className="bg-white dark:bg-boxdark rounded-xl shadow-lg p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Reports & Analytics
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Generate comprehensive reports and export data for analysis
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="inline-flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Schedule Reports
            </button>
            
            <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              View Analytics
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Report Generation */}
        <div className="xl:col-span-2 space-y-6">
          {/* Report Types */}
          <div className="bg-white dark:bg-boxdark rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Generate New Report
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {reportTypes.map((report) => (
                <div
                  key={report.id}
                  onClick={() => setSelectedReport(report.id)}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    selectedReport === report.id
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{report.icon}</span>
                    <div>
                      <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(report.category)}`}>
                        {report.category}
                      </span>
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {report.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {report.description}
                  </p>
                  <div className="space-y-1 text-xs text-gray-500 dark:text-gray-500">
                    <div>Frequency: {report.frequency}</div>
                    <div>Est. Time: {report.estimatedTime}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Report Configuration */}
            {selectedReport && (
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Report Configuration
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={dateRange.start}
                      onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={dateRange.end}
                      onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Region Filter
                    </label>
                    <select
                      value={filters.region}
                      onChange={(e) => setFilters(prev => ({ ...prev, region: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="">All Regions</option>
                      <option value="kigali">Kigali Central</option>
                      <option value="butare">Butare</option>
                      <option value="gitarama">Gitarama</option>
                      <option value="ruhengeri">Ruhengeri</option>
                      <option value="gisenyi">Gisenyi</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Export Format
                    </label>
                    <select
                      value={filters.format}
                      onChange={(e) => setFilters(prev => ({ ...prev, format: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="pdf">PDF Document</option>
                      <option value="excel">Excel Spreadsheet</option>
                      <option value="csv">CSV File</option>
                      <option value="json">JSON Data</option>
                    </select>
                  </div>
                </div>
                
                <div className="mt-6">
                  <button
                    onClick={handleGenerateReport}
                    disabled={loading}
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                        Generating Report...
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Generate Report
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Recent Reports */}
        <div className="bg-white dark:bg-boxdark rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Recent Reports
            </h2>
            <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium">
              View All
            </button>
          </div>
          
          <div className="space-y-4">
            {recentReports.map((report) => (
              <div key={report.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 dark:text-white truncate">
                      {report.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {report.type}
                    </p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(report.status)}`}>
                    {report.status}
                  </span>
                </div>
                
                <div className="space-y-1 text-xs text-gray-500 dark:text-gray-500 mb-3">
                  <div>By: {report.generatedBy}</div>
                  <div>Generated: {report.generatedAt}</div>
                  <div>Size: {report.size}</div>
                  <div>Downloads: {report.downloads}</div>
                </div>
                
                {report.status === 'completed' && (
                  <div className="flex gap-2">
                    <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm font-medium transition-colors">
                      Download
                    </button>
                    <button className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      Share
                    </button>
                  </div>
                )}
                
                {report.status === 'processing' && (
                  <div className="flex items-center gap-2 text-sm text-yellow-600 dark:text-yellow-400">
                    <div className="animate-spin w-4 h-4 border-2 border-yellow-600 border-t-transparent rounded-full"></div>
                    Processing...
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-boxdark rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2v1a1 1 0 102 0V3a2 2 0 012-2h1a2 2 0 012 2v1a1 1 0 102 0V3a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 2a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">247</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Reports Generated</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-boxdark rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd"/>
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">1,847</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Total Downloads</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-boxdark rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">12</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Scheduled Reports</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-boxdark rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-orange-600 dark:text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">2.3</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Avg Gen Time (min)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reports