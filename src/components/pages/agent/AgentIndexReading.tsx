import { useState, useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'
import QRCode from 'react-qr-code'

interface IIndexReadingInput {
  subscriberId: string
  subscriberName: string
  previousReading: number
  currentReading: number
  notes: string
}

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

const AgentIndexReading = () => {
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showScanner, setShowScanner] = useState(false)
  const [selectedSubscriber, setSelectedSubscriber] = useState<ISubscriber | null>(null)
  const [recentReadings, setRecentReadings] = useState<IIndexReading[]>([])
  const [cameraActive, setCameraActive] = useState(false)
  const [scanResult, setScanResult] = useState<string | null>(null)

  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<IIndexReadingInput>()
  
  const currentReading = watch('currentReading')
  const previousReading = watch('previousReading')
  const consumption = currentReading && previousReading ? currentReading - previousReading : 0

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

  // Initialize recent readings
  useEffect(() => {
    const mockReadings: IIndexReading[] = [
      {
        id: '1',
        subscriberId: 'SUB001',
        subscriberName: 'Marie Uwimana',
        previousReading: 1200,
        currentReading: 1250,
        consumption: 50,
        readingDate: '2024-11-01',
        agentId: 'AG001',
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
        agentId: 'AG001'
      }
    ]
    setRecentReadings(mockReadings)
  }, [])

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
        setValue('subscriberId', subscriber.id)
        setValue('subscriberName', subscriber.name)
        setValue('previousReading', subscriber.previousReading)
        setValue('currentReading', 0)
        setValue('notes', '')
      } else {
        toast.error('Subscriber not found')
        setSelectedSubscriber(null)
        reset()
      }
      
      setLoading(false)
    }, 1000)
  }

  const handleScanComplete = (result: string) => {
    setScanResult(result)
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
        setValue('subscriberId', subscriber.id)
        setValue('subscriberName', subscriber.name)
        setValue('previousReading', subscriber.previousReading)
        setValue('currentReading', 0)
        setValue('notes', '')
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
    setCameraActive(true)
    
    // In a real implementation, we would initialize the camera here
    // For demo purposes, we'll simulate scanning after a delay
    setTimeout(() => {
      if (Math.random() > 0.3) { // 70% chance of success
        handleScanComplete('SUB001')
      }
    }, 3000)
  }

  const stopScanner = () => {
    setShowScanner(false)
    setCameraActive(false)
  }

  const handleSubmitReading: SubmitHandler<IIndexReadingInput> = async (data) => {
    if (data.currentReading < data.previousReading) {
      toast.error('Current reading cannot be less than previous reading')
      return
    }

    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const newReading: IIndexReading = {
        id: Date.now().toString(),
        subscriberId: data.subscriberId,
        subscriberName: data.subscriberName,
        previousReading: data.previousReading,
        currentReading: data.currentReading,
        consumption: data.currentReading - data.previousReading,
        readingDate: new Date().toISOString().split('T')[0],
        agentId: 'AG001', // Mock agent ID
        notes: data.notes
      }
      
      setRecentReadings(prev => [newReading, ...prev])
      toast.success('Index reading submitted successfully!')
      
      // Reset form
      setSelectedSubscriber(null)
      setSearchQuery('')
      reset()
    } catch (error) {
      toast.error('Failed to submit reading')
    } finally {
      setLoading(false)
    }
  }

  return (
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
                <div className="qr-scanner-overlay">
                  <div className="qr-scanner-frame">
                    <div className="qr-scanner-corners"></div>
                    <div className="scanning-line"></div>
                  </div>
                </div>
                
                {/* This would be replaced with actual camera feed in a real implementation */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {cameraActive ? (
                    <div className="text-white text-center">
                      <div className="animate-pulse mb-2">Scanning...</div>
                      <div className="text-sm opacity-75">Position the QR code within the frame</div>
                    </div>
                  ) : (
                    <div className="text-white text-center">
                      <div className="mb-2">Camera initializing...</div>
                      <div className="text-sm opacity-75">Please allow camera access when prompted</div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Scan the QR code on the subscriber's water meter or account card
                </p>
                
                {/* For demo purposes, we'll show a sample QR code */}
                <div className="bg-white p-4 rounded-lg inline-block mb-4">
                  <QRCode value="SUB001" size={160} />
                </div>
                
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
          
          <form onSubmit={handleSubmit(handleSubmitReading)} className="space-y-6">
            <input type="hidden" {...register('subscriberId')} />
            <input type="hidden" {...register('subscriberName')} />
            <input type="hidden" {...register('previousReading')} />
            
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
                  {...register('currentReading', { required: true, min: selectedSubscriber.previousReading })}
                  placeholder="Enter current meter reading"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                {errors.currentReading && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.currentReading.type === 'required' 
                      ? 'Current reading is required' 
                      : 'Current reading must be greater than or equal to previous reading'}
                  </p>
                )}
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Consumption
                </label>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  consumption > 50 ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' :
                  consumption > 30 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                  'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                }`}>
                  {consumption} m³
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div 
                  className={`h-2.5 rounded-full ${
                    consumption > 50 ? 'bg-red-500' :
                    consumption > 30 ? 'bg-yellow-500' :
                    'bg-green-500'
                  }`}
                  style={{ width: `${Math.min(consumption, 100)}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Notes (Optional)
              </label>
              <textarea
                {...register('notes')}
                rows={3}
                placeholder="Any observations about the meter or reading"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                {loading ? 'Submitting...' : 'Submit Reading'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedSubscriber(null)
                  setSearchQuery('')
                  reset()
                }}
                className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
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
}

export default AgentIndexReading