import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

interface IAgent {
  id: string
  matricule: string
  firstName: string
  lastName: string
  category: string
  level: string
  agency: string
  permissions: string[]
}

interface ILeakReport {
  id: string
  location: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  description: string
  reportedBy: string
  reportedAt: string
  status: 'pending' | 'assigned' | 'in-progress' | 'resolved'
  photos?: string[]
}

interface IIndexReading {
  id: string
  subscriberId: string
  subscriberName: string
  previousReading: number
  currentReading: number
  consumption: number
  readingDate: string
  agentId: string
  notes?: string
}

const AgentDashboard = () => {
  const navigate = useNavigate()
  const [agent, setAgent] = useState<IAgent | null>(null)
  const [activeTab, setActiveTab] = useState<'dashboard' | 'leaks' | 'readings' | 'tasks'>('dashboard')
  const [loading, setLoading] = useState(false)

  // Leak reporting state
  const [leakForm, setLeakForm] = useState({
    location: '',
    severity: 'medium' as 'low' | 'medium' | 'high' | 'critical',
    description: '',
    photos: [] as string[]
  })

  // Index reading state
  const [readingForm, setReadingForm] = useState({
    subscriberId: '',
    subscriberName: '',
    previousReading: 0,
    currentReading: 0,
    notes: ''
  })

  // Mock data
  const [recentLeaks, setRecentLeaks] = useState<ILeakReport[]>([
    {
      id: '1',
      location: 'Avenue de la Paix, Sector 5',
      severity: 'high',
      description: 'Major pipe burst causing water loss',
      reportedBy: 'AG001',
      reportedAt: '2024-12-01 14:30',
      status: 'in-progress'
    },
    {
      id: '2',
      location: 'Nyamirambo Avenue, House #45',
      severity: 'medium',
      description: 'Small leak at connection point',
      reportedBy: 'AG001',
      reportedAt: '2024-12-01 10:15',
      status: 'resolved'
    }
  ])

  const [recentReadings, setRecentReadings] = useState<IIndexReading[]>([
    {
      id: '1',
      subscriberId: 'SUB001',
      subscriberName: 'Marie Uwimana',
      previousReading: 1250,
      currentReading: 1285,
      consumption: 35,
      readingDate: '2024-12-01',
      agentId: 'AG001',
      notes: 'Normal reading, meter in good condition'
    },
    {
      id: '2',
      subscriberId: 'SUB002',
      subscriberName: 'Jean Nkurunziza',
      previousReading: 890,
      currentReading: 920,
      consumption: 30,
      readingDate: '2024-12-01',
      agentId: 'AG001'
    }
  ])

  const [todayTasks] = useState([
    { id: 1, type: 'reading', description: 'Complete meter readings for Sector 3', priority: 'high', deadline: '17:00' },
    { id: 2, type: 'inspection', description: 'Inspect reported leak at Kimisagara', priority: 'urgent', deadline: '15:00' },
    { id: 3, type: 'maintenance', description: 'Check valve at Avenue Nyamirambo', priority: 'medium', deadline: '16:30' },
    { id: 4, type: 'reading', description: 'Verify high consumption readings', priority: 'low', deadline: '18:00' }
  ])

  // Initialize mock agent data
  useEffect(() => {
    const mockAgent: IAgent = {
      id: 'AG001',
      matricule: 'AG001',
      firstName: 'Jean',
      lastName: 'Mukamana',
      category: 'Field Operations',
      level: 'Senior Agent',
      agency: 'Kigali Central',
      permissions: ['read_meters', 'report_leaks', 'handle_complaints', 'emergency_response']
    }
    setAgent(mockAgent)
  }, [])

  const handleReportLeak = async () => {
    if (!leakForm.location || !leakForm.description) {
      toast.error('Please fill in all required fields')
      return
    }

    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const newLeak: ILeakReport = {
        id: Date.now().toString(),
        location: leakForm.location,
        severity: leakForm.severity,
        description: leakForm.description,
        reportedBy: agent?.matricule || '',
        reportedAt: new Date().toISOString(),
        status: 'pending'
      }
      
      setRecentLeaks(prev => [newLeak, ...prev])
      setLeakForm({ location: '', severity: 'medium', description: '', photos: [] })
      toast.success('Leak reported successfully!')
    } catch (error) {
      toast.error('Failed to report leak')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitReading = async () => {
    if (!readingForm.subscriberId || !readingForm.currentReading) {
      toast.error('Please fill in all required fields')
      return
    }

    if (readingForm.currentReading < readingForm.previousReading) {
      toast.error('Current reading cannot be less than previous reading')
      return
    }

    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const newReading: IIndexReading = {
        id: Date.now().toString(),
        subscriberId: readingForm.subscriberId,
        subscriberName: readingForm.subscriberName,
        previousReading: readingForm.previousReading,
        currentReading: readingForm.currentReading,
        consumption: readingForm.currentReading - readingForm.previousReading,
        readingDate: new Date().toISOString().split('T')[0],
        agentId: agent?.id || '',
        notes: readingForm.notes
      }
      
      setRecentReadings(prev => [newReading, ...prev])
      setReadingForm({ subscriberId: '', subscriberName: '', previousReading: 0, currentReading: 0, notes: '' })
      toast.success('Index reading submitted successfully!')
    } catch (error) {
      toast.error('Failed to submit reading')
    } finally {
      setLoading(false)
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
      case 'high': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400'
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      case 'in-progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
      case 'assigned': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400'
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
      case 'high': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400'
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
    }
  }

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <span className="text-2xl font-bold">
              {agent?.firstName.charAt(0)}{agent?.lastName.charAt(0)}
            </span>
          </div>
          <div>
            <h1 className="text-2xl font-bold">Welcome back, {agent?.firstName}!</h1>
            <p className="opacity-90">{agent?.level} • {agent?.category}</p>
            <p className="opacity-75 text-sm">Matricule: {agent?.matricule} • {agent?.agency}</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-boxdark rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{todayTasks.length}</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Today's Tasks</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-boxdark rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{recentReadings.length}</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Readings Today</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-boxdark rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-orange-600 dark:text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2L3 7v11a2 2 0 002 2h4v-6a1 1 0 011-1h2a1 1 0 011 1v6h4a2 2 0 002-2V7l-7-5z"/>
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{recentLeaks.length}</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Leaks Reported</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-boxdark rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">95%</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Completion Rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Today's Tasks */}
      <div className="bg-white dark:bg-boxdark rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Today's Tasks</h2>
        <div className="space-y-4">
          {todayTasks.map((task) => (
            <div key={task.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">{task.description}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Deadline: {task.deadline}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 text-xs rounded-full ${getPriorityColor(task.priority)}`}>
                  {task.priority}
                </span>
                <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium">
                  Start
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderLeakReporting = () => (
    <div className="space-y-6">
      {/* Report New Leak */}
      <div className="bg-white dark:bg-boxdark rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Report New Leak</h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Location *
            </label>
            <input
              type="text"
              value={leakForm.location}
              onChange={(e) => setLeakForm(prev => ({ ...prev, location: e.target.value }))}
              placeholder="Enter exact location (street, house number, landmarks)"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Severity Level *
            </label>
            <select
              value={leakForm.severity}
              onChange={(e) => setLeakForm(prev => ({ ...prev, severity: e.target.value as any }))}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="low">Low - Minor drip or seepage</option>
              <option value="medium">Medium - Steady leak</option>
              <option value="high">High - Major leak affecting service</option>
              <option value="critical">Critical - Emergency situation</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description *
            </label>
            <textarea
              rows={4}
              value={leakForm.description}
              onChange={(e) => setLeakForm(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe the leak in detail (size, water flow, potential causes, impact on service)"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Photos (Optional)
            </label>
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Click to upload photos or drag and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500">
                PNG, JPG up to 10MB each
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleReportLeak}
              disabled={loading}
              className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              {loading ? 'Reporting...' : 'Report Leak'}
            </button>
            <button
              onClick={() => setLeakForm({ location: '', severity: 'medium', description: '', photos: [] })}
              className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Clear Form
            </button>
          </div>
        </div>
      </div>

      {/* Recent Leak Reports */}
      <div className="bg-white dark:bg-boxdark rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Recent Leak Reports</h2>
        <div className="space-y-4">
          {recentLeaks.map((leak) => (
            <div key={leak.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">{leak.location}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{leak.description}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <span className={`px-3 py-1 text-xs rounded-full ${getSeverityColor(leak.severity)}`}>
                    {leak.severity}
                  </span>
                  <span className={`px-3 py-1 text-xs rounded-full ${getStatusColor(leak.status)}`}>
                    {leak.status}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-500">
                <span>Reported: {new Date(leak.reportedAt).toLocaleString()}</span>
                <span>ID: {leak.id}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderIndexReadings = () => (
    <div className="space-y-6">
      {/* Submit New Reading */}
      <div className="bg-white dark:bg-boxdark rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Submit Index Reading</h2>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Subscriber ID *
              </label>
              <input
                type="text"
                value={readingForm.subscriberId}
                onChange={(e) => setReadingForm(prev => ({ ...prev, subscriberId: e.target.value }))}
                placeholder="Enter subscriber ID"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Subscriber Name
              </label>
              <input
                type="text"
                value={readingForm.subscriberName}
                onChange={(e) => setReadingForm(prev => ({ ...prev, subscriberName: e.target.value }))}
                placeholder="Enter subscriber name"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Previous Reading
              </label>
              <input
                type="number"
                value={readingForm.previousReading}
                onChange={(e) => setReadingForm(prev => ({ ...prev, previousReading: Number(e.target.value) }))}
                placeholder="Previous meter reading"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Current Reading *
              </label>
              <input
                type="number"
                value={readingForm.currentReading}
                onChange={(e) => setReadingForm(prev => ({ ...prev, currentReading: Number(e.target.value) }))}
                placeholder="Current meter reading"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Notes (Optional)
            </label>
            <textarea
              rows={3}
              value={readingForm.notes}
              onChange={(e) => setReadingForm(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Any observations about the meter or reading"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleSubmitReading}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              {loading ? 'Submitting...' : 'Submit Reading'}
            </button>
            <button
              onClick={() => setReadingForm({ subscriberId: '', subscriberName: '', previousReading: 0, currentReading: 0, notes: '' })}
              className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Clear Form
            </button>
          </div>
        </div>
      </div>

      {/* Recent Readings */}
      <div className="bg-white dark:bg-boxdark rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Meter Readings</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Subscriber
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Previous
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Current
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Consumption
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {recentReadings.map((reading) => (
                <tr key={reading.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{reading.subscriberName}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{reading.subscriberId}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {reading.previousReading}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {reading.currentReading}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      reading.consumption > 50 ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' :
                      reading.consumption > 30 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                      'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                    }`}>
                      {reading.consumption} m³
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {new Date(reading.readingDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-3">
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderTasks = () => (
    <div className="space-y-6">
      {/* Task Calendar */}
      <div className="bg-white dark:bg-boxdark rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Task Schedule</h2>
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="text-gray-700 dark:text-gray-300 font-medium">December 2024</span>
            <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Calendar Placeholder */}
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center">
          <p className="text-gray-600 dark:text-gray-400">Calendar view coming soon</p>
        </div>
      </div>

      {/* Task List */}
      <div className="bg-white dark:bg-boxdark rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Today's Tasks</h2>
        <div className="space-y-4">
          {todayTasks.map((task) => (
            <div key={task.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  {task.type === 'reading' && (
                    <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
                    </svg>
                  )}
                  {task.type === 'inspection' && (
                    <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 9a2 2 0 114 0 2 2 0 01-4 0z" />
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a4 4 0 00-3.446 6.032l-2.261 2.26a1 1 0 101.414 1.415l2.261-2.261A4 4 0 1011 5z" clipRule="evenodd" />
                    </svg>
                  )}
                  {task.type === 'maintenance' && (
                    <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">{task.description}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Deadline: {task.deadline}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 text-xs rounded-full ${getPriorityColor(task.priority)}`}>
                  {task.priority}
                </span>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors">
                  Start
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const getTabContent = () => {
    switch (activeTab) {
      case 'dashboard': return renderDashboard()
      case 'leaks': return renderLeakReporting()
      case 'readings': return renderIndexReadings()
      case 'tasks': return renderTasks()
      default: return renderDashboard()
    }
  }

  if (!agent) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-boxdark rounded-xl shadow-lg p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Agent Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your field operations and tasks
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              New Task
            </button>
            
            <button className="inline-flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export Data
            </button>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white dark:bg-boxdark rounded-xl shadow-lg overflow-hidden">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {[
              { key: 'dashboard', label: 'Dashboard', icon: '📊' },
              { key: 'leaks', label: 'Report Leaks', icon: '💧' },
              { key: 'readings', label: 'Meter Readings', icon: '📝' },
              { key: 'tasks', label: 'Tasks', icon: '✅' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.key
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span>{tab.icon}</span>
                  {tab.label}
                </span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {getTabContent()}
        </div>
      </div>
    </div>
  )
}

export default AgentDashboard