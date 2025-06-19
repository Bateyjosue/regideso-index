import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import QrScanner from 'qr-scanner'

interface ISubscriber {
  id: string
  name: string
  address: string
  category: string
  previousReading: number
  lastReadingDate: string
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

const FieldAgentDashboard = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'readings' | 'leaks' | 'tasks'>('readings')
  const [loading, setLoading] = useState(false)
  const [agent, setAgent] = useState({
    id: 'FA001',
    matricule: 'FA001',
    firstName: 'Jean',
    lastName: 'Mukamana',
    category: 'Field Operations',
    level: 'Field Agent',
    agency: 'Kigali Central',
    permissions: ['read_meters', 'report_leaks']
  })

  // Index reading state
  const [showScanner, setShowScanner] = useState(false)
  const [scanner, setScanner] = useState<QrScanner | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSubscriber, setSelectedSubscriber] = useState<ISubscriber | null>(null)
  const [readingForm, setReadingForm] = useState({
    subscriberId: '',
    subscriberName: '',
    previousReading: 0,
    currentReading: 0,
    notes: ''
  })
  const [recentReadings, setRecentReadings] = useState<IIndexReading[]>([])

  // Leak reporting state
  const [leakForm, setLeakForm] = useState({
    location: '',
    severity: 'medium' as 'low' | 'medium' | 'high' | 'critical',
    description: '',
    photos: [] as string[]
  })
  const [recentLeaks, setRecentLeaks] = useState<ILeakReport[]>([])

  // Tasks state
  const [todayTasks, setTodayTasks] = useState([
    { id: 1, type: 'reading', description: 'Complete meter readings for Sector 3', priority: 'high', deadline: '17:00', status: 'pending' },
    { id: 2, type: 'inspection', description: 'Inspect reported leak at Kimisagara', priority: 'urgent', deadline: '15:00', status: 'pending' },
    { id: 3, type: 'maintenance', description: 'Check valve at Avenue Nyamirambo', priority: 'medium', deadline: '16:30', status: 'pending' }
  ])

  // Mock subscribers data
  const [subscribers] = useState<ISubscriber[]>([
    {
      id: 'SUB001',
      name: 'Marie Uwimana',
      address: 'Avenue de la Paix, House #123',
      category: 'Domestic Premium',
      previousReading: 1250,
      lastReadingDate: '2024-11-01'
    },
    {
      id: 'SUB002',
      name: 'Jean Nkurunziza',
      address: 'Avenue Nyamirambo, House #45',
      category: 'Domestic Basic',
      previousReading: 890,
      lastReadingDate: '2024-11-02'
    },
    {
      id: 'SUB003',
      name: 'Claire Mukashema',
      address: 'Avenue Kimisagara, House #78',
      category: 'Commercial',
      previousReading: 3450,
      lastReadingDate: '2024-11-03'
    }
  ])

  // Initialize mock data
  useEffect(() => {
    // Initialize recent readings
    const mockReadings: IIndexReading[] = [
      {
        id: '1',
        subscriberId: 'SUB001',
        subscriberName: 'Marie Uwimana',
        previousReading: 1200,
        currentReading: 1250,
        consumption: 50,
        readingDate: '2024-11-01',
        agentId: 'FA001',
        notes: 'Normal reading, meter in good condition'
      },
      {
        id: '2',
        subscriberId: 'SUB002',
        subscriberName: 'Jean Nkurunziza',
        previousReading: 850,
        currentReading: 890,
        consumption: 40,
        readingDate: '2024-11-02',
        agentId: 'FA001'
      }
    ]
    setRecentReadings(mockReadings)

    // Initialize recent leaks
    const mockLeaks: ILeakReport[] = [
      {
        id: '1',
        location: 'Avenue de la Paix, Sector 5',
        severity: 'medium',
        description: 'Small leak at connection point',
        reportedBy: 'FA001',
        reportedAt: '2024-12-01 10:15',
        status: 'pending'
      }
    ]
    setRecentLeaks(mockLeaks)

    return () => {
      // Clean up QR scanner if it exists
      if (scanner) {
        scanner.stop()
      }
    }
  }, [])

  // QR Scanner setup
  useEffect(() => {
    if (showScanner) {
      const videoElement = document.getElementById('qr-scanner') as HTMLVideoElement
      if (videoElement) {
        const newScanner = new QrScanner(
          videoElement,
          (result) => {
            handleScanComplete(result.data)
          },
          {
            highlightScanRegion: true,
            highlightCodeOutline: true,
          }
        )
        
        setScanner(newScanner)
        newScanner.start().catch(error => {
          console.error('Scanner start error:', error)
          toast.error('Failed to start camera')
        })
      }
    } else {
      if (scanner) {
        scanner.stop()
      }
    }
  }, [showScanner])

  const handleSearchSubscriber = () => {
    if (!searchQuery) {
      toast.error('Please enter a subscriber ID')
      return
    }

    setLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      const subscriber = subscribers.find(s => s.id === searchQuery)
      
      if (subscriber) {
        setSelectedSubscriber(subscriber)
        setReadingForm({
          subscriberId: subscriber.id,
          subscriberName: subscriber.name,
          previousReading: subscriber.previousReading,
          currentReading: 0,
          notes: ''
        })
      } else {
        toast.error('Subscriber not found')
        setSelectedSubscriber(null)
      }
      
      setLoading(false)
    }, 1000)
  }

  const handleScanComplete = (result: string) => {
    setShowScanner(false)
    
    // Parse QR code data
    try {
      // In a real app, the QR would contain JSON data
      // For demo, we'll simulate parsing the QR code data
      const subscriberId = result
      const subscriber = subscribers.find(s => s.id === subscriberId)
      
      if (subscriber) {
        setSearchQuery(subscriberId)
        setSelectedSubscriber(subscriber)
        setReadingForm({
          subscriberId: subscriber.id,
          subscriberName: subscriber.name,
          previousReading: subscriber.previousReading,
          currentReading: 0,
          notes: ''
        })
        toast.success('Subscriber information loaded from QR code')
      } else {
        toast.error('Subscriber not found')
      }
    } catch (error) {
      toast.error('Invalid QR code format')
    }
  }

  const startScanner = () => {
    setShowScanner(true)
  }

  const stopScanner = () => {
    setShowScanner(false)
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const newReading: IIndexReading = {
        id: Date.now().toString(),
        subscriberId: readingForm.subscriberId,
        subscriberName: readingForm.subscriberName,
        previousReading: readingForm.previousReading,
        currentReading: readingForm.currentReading,
        consumption: readingForm.currentReading - readingForm.previousReading,
        readingDate: new Date().toISOString().split('T')[0],
        agentId: agent.id,
        notes: readingForm.notes
      }
      
      setRecentReadings(prev => [newReading, ...prev])
      toast.success('Index reading submitted successfully!')
      
      // Reset form
      setSelectedSubscriber(null)
      setSearchQuery('')
      setReadingForm({
        subscriberId: '',
        subscriberName: '',
        previousReading: 0,
        currentReading: 0,
        notes: ''
      })
    } catch (error) {
      toast.error('Failed to submit reading')
    } finally {
      setLoading(false)
    }
  }

  const handleReportLeak = async () => {
    if (!leakForm.location || !leakForm.description) {
      toast.error('Please fill in all required fields')
      return
    }

    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const newLeak: ILeakReport = {
        id: Date.now().toString(),
        location: leakForm.location,
        severity: leakForm.severity,
        description: leakForm.description,
        reportedBy: agent.id,
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

  const handleUpdateTaskStatus = (taskId: number, status: string) => {
    setTodayTasks(prev => 
      prev.map(task => 
        task.id === taskId ? { ...task, status } : task
      )
    )
    toast.success(`Task marked as ${status}`)
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
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
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

  const renderMeterReadings = () => (
    <div className="space-y-6">
      {/* Search Subscriber */}
      <div className="bg-white dark:bg-boxdark rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Find Subscriber</h2>
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter subscriber ID"
                className="w-full px-4 py-3 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={handleSearchSubscriber}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-4 py-3 rounded-lg font-medium transition-colors"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
            
            <button
              onClick={startScanner}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-3 rounded-lg font-medium transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
              </svg>
            </button>
          </div>
        </div>

        {/* QR Scanner Modal */}
        {showScanner && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-boxdark rounded-xl p-6 max-w-md w-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Scan Subscriber QR Code</h3>
                <button
                  onClick={stopScanner}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="qr-scanner-container mb-4">
                <video id="qr-scanner" className="w-full h-full object-cover"></video>
              </div>
              
              <div className="text-center">
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Scan the QR code on the subscriber's water meter or account card
                </p>
                
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => handleScanComplete('SUB001')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    Simulate Scan
                  </button>
                  <button
                    onClick={stopScanner}
                    className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Subscriber Details & Reading Form */}
      {selectedSubscriber && (
        <div className="bg-white dark:bg-boxdark rounded-xl shadow-lg p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Subscriber Details</h2>
              <p className="text-gray-600 dark:text-gray-400">Enter the current meter reading</p>
            </div>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 rounded-full text-sm">
              {selectedSubscriber.category}
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Subscriber ID</div>
              <div className="font-medium text-gray-900 dark:text-white">{selectedSubscriber.id}</div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Name</div>
              <div className="font-medium text-gray-900 dark:text-white">{selectedSubscriber.name}</div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Address</div>
              <div className="font-medium text-gray-900 dark:text-white">{selectedSubscriber.address}</div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Last Reading</div>
              <div className="font-medium text-gray-900 dark:text-white">
                {selectedSubscriber.previousReading} m³ ({new Date(selectedSubscriber.lastReadingDate).toLocaleDateString()})
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Previous Reading
                </label>
                <input
                  type="number"
                  value={selectedSubscriber.previousReading}
                  disabled
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white"
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
                  placeholder="Enter current meter reading"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Consumption
                </label>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  readingForm.currentReading - readingForm.previousReading > 50 ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' :
                  readingForm.currentReading - readingForm.previousReading > 30 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                  'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                }`}>
                  {Math.max(0, readingForm.currentReading - readingForm.previousReading)} m³
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div 
                  className={`h-2.5 rounded-full ${
                    readingForm.currentReading - readingForm.previousReading > 50 ? 'bg-red-500' :
                    readingForm.currentReading - readingForm.previousReading > 30 ? 'bg-yellow-500' :
                    'bg-green-500'
                  }`}
                  style={{ width: `${Math.min(readingForm.currentReading - readingForm.previousReading, 100)}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Notes (Optional)
              </label>
              <textarea
                value={readingForm.notes}
                onChange={(e) => setReadingForm(prev => ({ ...prev, notes: e.target.value }))}
                rows={3}
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
                onClick={() => {
                  setSelectedSubscriber(null)
                  setSearchQuery('')
                  setReadingForm({
                    subscriberId: '',
                    subscriberName: '',
                    previousReading: 0,
                    currentReading: 0,
                    notes: ''
                  })
                }}
                className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

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
                </tr>
              ))}
            </tbody>
          </table>
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

  const renderTasks = () => (
    <div className="space-y-6">
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
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`px-2 py-0.5 text-xs rounded-full ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Deadline: {task.deadline}
                    </span>
                    <span className={`px-2 py-0.5 text-xs rounded-full ${getStatusColor(task.status)}`}>
                      {task.status}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {task.status === 'pending' && (
                  <>
                    <button 
                      onClick={() => handleUpdateTaskStatus(task.id, 'in-progress')}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                    >
                      Start
                    </button>
                  </>
                )}
                {task.status === 'in-progress' && (
                  <button 
                    onClick={() => handleUpdateTaskStatus(task.id, 'completed')}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                  >
                    Complete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const getTabContent = () => {
    switch (activeTab) {
      case 'readings': return renderMeterReadings()
      case 'leaks': return renderLeakReporting()
      case 'tasks': return renderTasks()
      default: return renderMeterReadings()
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-boxdark rounded-xl shadow-lg p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Field Agent Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Welcome, {agent.firstName} {agent.lastName} | {agent.level}
            </p>
          </div>
          
          <button
            onClick={() => navigate('/login')}
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sign Out
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-boxdark rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
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
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
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
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{todayTasks.length}</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Tasks Today</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white dark:bg-boxdark rounded-xl shadow-lg overflow-hidden">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {[
              { key: 'readings', label: 'Meter Readings', icon: '📝' },
              { key: 'leaks', label: 'Report Leaks', icon: '💧' },
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

export default FieldAgentDashboard